export const CALENDLY_BOOKING_URL = "https://calendly.com/kunle2000/30min";
export const CALENDLY_BOOKING_PATH = "/kunle2000/30min";
export const DEFAULT_BOOKING_CONVERSION_VALUE = 25;
export const BOOKING_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const UPLOAD_CLAIM_TIMEOUT_MS = 15 * 60 * 1000;

const BOOKING_TOKEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type BookingState = "pending" | "ready" | "uploading" | "uploaded" | "rejected" | "canceled";

export type BookingRecord = {
  token: string;
  createdAt: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  calendlyInviteeUri: string | null;
  bookingCreatedAt: string | null;
  conversionState: BookingState;
  uploadClaimedAt: string | null;
};

export type UploadOutcome = "uploaded" | "duplicate" | "retry" | "rejected";

const PERMANENT_UPLOAD_ERRORS = new Set([
  "UNPARSEABLE_GCLID",
  "UNPARSEABLE_GBRAID",
  "UNPARSEABLE_WBRAID",
  "EXPIRED_EVENT",
  "EVENT_NOT_FOUND",
  "CLICK_NOT_FOUND",
  "CONVERSION_PRECEDES_EVENT",
  "TOO_RECENT_CONVERSION_ACTION",
  "INVALID_CONVERSION_ACTION",
  "INVALID_CONVERSION_ACTION_TYPE",
  "INVALID_CUSTOMER_FOR_CLICK",
  "ONE_PER_CLICK_CONVERSION_ACTION_NOT_PERMITTED",
]);

export function isKunleCalendlyBookingUrl(target: string, base = "https://ai-midlands.co.uk"): boolean {
  try {
    const url = new URL(target, base);
    const host = url.hostname.toLowerCase();
    if (host !== "calendly.com" && !host.endsWith(".calendly.com")) return false;
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return path === CALENDLY_BOOKING_PATH;
  } catch {
    return false;
  }
}

export function calendlyUrlWithBookingToken(target: string, token: string): string {
  const url = new URL(target);
  url.searchParams.set("utm_content", token);
  url.searchParams.delete("gclid");
  url.searchParams.delete("gbraid");
  url.searchParams.delete("wbraid");
  return url.toString();
}

export function bookingConversionValue(raw: string | undefined): number {
  if (raw == null || raw.trim() === "") return DEFAULT_BOOKING_CONVERSION_VALUE;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return DEFAULT_BOOKING_CONVERSION_VALUE;
  return Math.round(value * 100) / 100;
}

export function formatGoogleAdsDateTime(value: string): string | null {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return `${date.toISOString().slice(0, 19).replace("T", " ")}+00:00`;
}

export function googleAdsClickIdentifier(row: {
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
}): { gclid: string } | { gbraid: string } | { wbraid: string } | null {
  const gclid = row.gclid?.trim();
  const gbraid = row.gbraid?.trim();
  const wbraid = row.wbraid?.trim();
  if (gclid) return { gclid };
  if (gbraid) return { gbraid };
  if (wbraid) return { wbraid };
  return null;
}

export function bookingAttributionRejection(input: {
  consent?: unknown;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
}): "consent_required" | "no_google_click" | null {
  if (input.consent !== true) return "consent_required";
  if (!googleAdsClickIdentifier(input)) return "no_google_click";
  return null;
}

export function buildClickConversion(input: {
  customerId: string;
  conversionActionId: string;
  token: string;
  bookingCreatedAt: string;
  conversionValue: number;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
}): Record<string, unknown> | null {
  const click = googleAdsClickIdentifier(input);
  const conversionDateTime = formatGoogleAdsDateTime(input.bookingCreatedAt);
  if (!click || !conversionDateTime) return null;
  return {
    conversionAction: `customers/${input.customerId}/conversionActions/${input.conversionActionId}`,
    conversionDateTime,
    conversionValue: input.conversionValue,
    currencyCode: "GBP",
    orderId: input.token,
    consent: { adUserData: "GRANTED", adPersonalization: "DENIED" },
    ...click,
  };
}

function collectErrorCodes(body: unknown, into: string[] = []): string[] {
  if (!body || typeof body !== "object") return into;
  const record = body as Record<string, unknown>;
  const errorCode = record.errorCode;
  if (errorCode && typeof errorCode === "object") {
    for (const value of Object.values(errorCode as Record<string, unknown>)) {
      if (typeof value === "string") into.push(value);
    }
  }
  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      for (const item of value) collectErrorCodes(item, into);
    } else if (value && typeof value === "object") {
      collectErrorCodes(value, into);
    }
  }
  return into;
}

export function interpretGoogleAdsUpload(status: number, body: unknown): UploadOutcome {
  if (status === 429 || status === 401 || status === 403 || status >= 500) return "retry";
  const codes = collectErrorCodes(body);
  if (codes.some(code => /ALREADY_EXISTS|DUPLICATE/.test(code))) return "duplicate";
  const record = body && typeof body === "object" ? body as { partialFailureError?: unknown; results?: Array<Record<string, unknown>> } : {};
  if (status === 200 && !record.partialFailureError) {
    const result = record.results?.[0];
    if (result && (result.conversionAction || result.gclid || result.gbraid || result.wbraid || result.orderId)) {
      return "uploaded";
    }
    return "retry";
  }
  if (codes.some(code => PERMANENT_UPLOAD_ERRORS.has(code))) return "rejected";
  return "retry";
}

export function parseCalendlySignature(header: string | null): { timestamp: string; signature: string } | null {
  if (!header) return null;
  const pairs = Object.fromEntries(header.split(",").map(part => {
    const [key, value = ""] = part.trim().split("=", 2);
    return [key, value];
  }));
  return pairs.t && pairs.v1 ? { timestamp: pairs.t, signature: pairs.v1 } : null;
}

export function calendlySignatureFresh(timestamp: string, nowMs: number, toleranceSeconds = 180): boolean {
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds)) return false;
  return Math.abs(nowMs / 1000 - seconds) <= toleranceSeconds;
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  const left = a.toLowerCase();
  const right = b.toLowerCase();
  if (left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i += 1) result |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return result === 0;
}

export async function verifyCalendlyWebhook(input: {
  secret: string;
  signatureHeader: string | null;
  rawBody: string;
  nowMs: number;
}): Promise<"ok" | "missing_signature" | "stale_signature" | "invalid_signature"> {
  const signature = parseCalendlySignature(input.signatureHeader);
  if (!signature) return "missing_signature";
  if (!calendlySignatureFresh(signature.timestamp, input.nowMs)) return "stale_signature";
  const expected = await hmacHex(input.secret, `${signature.timestamp}.${input.rawBody}`);
  return constantTimeEqual(expected, signature.signature) ? "ok" : "invalid_signature";
}

export function bookingTokenFromTracking(tracking: unknown): string | null {
  if (!tracking || typeof tracking !== "object") return null;
  const token = typeof (tracking as { utm_content?: unknown }).utm_content === "string"
    ? (tracking as { utm_content: string }).utm_content.trim()
    : "";
  return BOOKING_TOKEN.test(token) ? token.toLowerCase() : null;
}

export function payloadMatchesBookingEvent(payload: Record<string, unknown>): boolean {
  const scheduled = payload.scheduled_event;
  if (!scheduled || typeof scheduled !== "object") return true;
  const publicUrls = JSON.stringify(scheduled).match(/https:\/\/calendly\.com\/[^"\\]+/g) || [];
  if (publicUrls.length === 0) return true;
  return publicUrls.some(url => url.includes(CALENDLY_BOOKING_PATH));
}

function withinTokenTtl(row: BookingRecord, nowMs: number): boolean {
  const created = Date.parse(row.createdAt);
  return Number.isFinite(created) && nowMs - created <= BOOKING_TOKEN_TTL_MS && nowMs >= created;
}

export function onInviteeCreated(
  row: BookingRecord,
  inviteeUri: string,
  bookingCreatedAt: string,
  nowMs: number,
): BookingRecord | null {
  if (!inviteeUri || !withinTokenTtl(row, nowMs)) return null;
  if (row.conversionState === "uploaded" || row.conversionState === "rejected" || row.conversionState === "uploading") return null;
  if (row.conversionState === "ready") return null;
  if (row.conversionState === "canceled" && row.calendlyInviteeUri === inviteeUri) return null;
  if (row.conversionState !== "pending" && row.conversionState !== "canceled") return null;
  return {
    ...row,
    calendlyInviteeUri: inviteeUri,
    bookingCreatedAt,
    conversionState: "ready",
    uploadClaimedAt: null,
  };
}

export function onInviteeCanceled(row: BookingRecord): BookingRecord | null {
  if (row.conversionState !== "pending" && row.conversionState !== "ready" && row.conversionState !== "uploading") {
    return null;
  }
  return { ...row, conversionState: "canceled", uploadClaimedAt: null };
}
