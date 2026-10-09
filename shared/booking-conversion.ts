export const CALENDLY_BOOKING_URL = "https://calendly.com/kunle2000/30min";
export const CALENDLY_BOOKING_PATH = "/kunle2000/30min";
export const BOOKED_CONSULTATION_EVENT = "booked_consultation";
export const BOOKING_CONVERSION_VALUE = 25;
export const BOOKING_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const UPLOAD_CLAIM_TIMEOUT_MS = 15 * 60 * 1000;
export const GA4_EVENT_MAX_AGE_MS = 72 * 60 * 60 * 1000;

const BOOKING_TOKEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]+$/;
const GA4_CLIENT_ID = /^\d{1,20}\.\d{1,20}$/;
const GA4_SESSION_ID = /^\d{1,20}$/;

export type BookingState = "pending" | "ready" | "uploading" | "uploaded" | "rejected" | "canceled";

export type BookingRecord = {
  token: string;
  createdAt: string;
  gaClientId: string;
  gaSessionId: string;
  calendlyInviteeUri: string | null;
  bookingCreatedAt: string | null;
  conversionState: BookingState;
  uploadClaimedAt: string | null;
};

export type Ga4SendOutcome = "valid" | "accepted" | "retry" | "rejected";

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

export function validGa4MeasurementId(value: string | undefined): string | null {
  const measurementId = value?.trim() || "";
  return GA4_MEASUREMENT_ID.test(measurementId) ? measurementId : null;
}

export function validGa4ClientId(value: string | undefined): string | null {
  const clientId = value?.trim() || "";
  return GA4_CLIENT_ID.test(clientId) ? clientId : null;
}

export function validGa4SessionId(value: string | number | undefined): string | null {
  const sessionId = String(value ?? "").trim();
  return GA4_SESSION_ID.test(sessionId) ? sessionId : null;
}

export function ga4SessionCookieName(measurementId: string): string | null {
  const id = validGa4MeasurementId(measurementId);
  return id ? `_ga_${id.slice(2)}` : null;
}

function cookieValue(cookieHeader: string, name: string): string {
  const parts = cookieHeader.split(";").map(part => part.trim());
  const prefix = `${name}=`;
  return parts.find(part => part.startsWith(prefix))?.slice(prefix.length) || "";
}

export function ga4IdentityFromCookies(
  cookieHeader: string,
  measurementId: string,
): { clientId: string; sessionId: string } | null {
  const clientId = validGa4ClientId(cookieValue(cookieHeader, "_ga").match(/GA\d+\.\d+\.(\d+\.\d+)/)?.[1]);
  const sessionCookie = cookieValue(cookieHeader, ga4SessionCookieName(measurementId) || "");
  const sessionMatch = sessionCookie.match(/^GS1\.1\.(\d+)\./) || sessionCookie.match(/^GS2\.1\.s(\d+)(?:\$|$)/);
  const sessionId = validGa4SessionId(sessionMatch?.[1]);
  return clientId && sessionId ? { clientId, sessionId } : null;
}

export function bookingAttributionRejection(input: {
  consent?: unknown;
  clientId?: string;
  sessionId?: string;
}): "consent_required" | "ga4_client_required" | null {
  if (input.consent !== true) return "consent_required";
  if (!validGa4ClientId(input.clientId) || !validGa4SessionId(input.sessionId)) return "ga4_client_required";
  return null;
}

export function buildBookedConsultation(input: {
  clientId: string;
  sessionId: string;
  token: string;
  bookingCreatedAt: string;
  nowMs: number;
}): Record<string, unknown> | null {
  const clientId = validGa4ClientId(input.clientId);
  const sessionId = validGa4SessionId(input.sessionId);
  const bookedAt = Date.parse(input.bookingCreatedAt);
  if (!clientId || !sessionId || !Number.isFinite(bookedAt)) return null;
  if (input.nowMs - bookedAt > GA4_EVENT_MAX_AGE_MS) return null;
  const eventMs = Math.min(bookedAt, input.nowMs);
  return {
    client_id: clientId,
    timestamp_micros: String(eventMs * 1000),
    events: [{
      name: BOOKED_CONSULTATION_EVENT,
      params: {
        session_id: sessionId,
        engagement_time_msec: 100,
        currency: "GBP",
        value: BOOKING_CONVERSION_VALUE,
        transaction_id: input.token,
      },
    }],
  };
}

export function interpretGa4Debug(status: number, body: unknown): Ga4SendOutcome {
  if (status === 429 || status >= 500 || status === 0) return "retry";
  if (status !== 200 || !body || typeof body !== "object") return "retry";
  const messages = (body as { validationMessages?: unknown }).validationMessages;
  if (!Array.isArray(messages)) return "retry";
  return messages.length === 0 ? "valid" : "rejected";
}

export function interpretGa4Collect(status: number): Ga4SendOutcome {
  if (status === 204 || status === 200) return "accepted";
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
