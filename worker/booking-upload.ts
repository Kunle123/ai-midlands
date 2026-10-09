import {
  bookingConversionValue,
  buildClickConversion,
  interpretGoogleAdsUpload,
  onInviteeCanceled,
  onInviteeCreated,
  UPLOAD_CLAIM_TIMEOUT_MS,
  type BookingRecord,
  type BookingState,
} from "../shared/booking-conversion.ts";

type D1Result = { meta?: { changes?: number } };
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<D1Result>;
  first: <T>() => Promise<T | null>;
  all: <T>() => Promise<{ results?: T[] }>;
};
export type BookingDatabase = { prepare: (query: string) => D1Statement };

export type GoogleAdsBookingEnv = {
  GOOGLE_ADS_CLIENT_ID?: string;
  GOOGLE_ADS_CLIENT_SECRET?: string;
  GOOGLE_ADS_REFRESH_TOKEN?: string;
  GOOGLE_ADS_DEVELOPER_TOKEN?: string;
  GOOGLE_ADS_CUSTOMER_ID?: string;
  GOOGLE_ADS_CONVERSION_ACTION_ID?: string;
  GOOGLE_ADS_API_VERSION?: string;
  GOOGLE_ADS_BOOKING_CONVERSION_VALUE?: string;
  GOOGLE_ADS_LOGIN_CUSTOMER_ID?: string;
};

export type UploadSummary = {
  ok: boolean;
  code?: string;
  attempted: number;
  uploaded: number;
  failed: number;
};

type StoredBooking = {
  token: string;
  created_at: string;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  calendly_invitee_uri: string | null;
  booking_created_at: string | null;
  conversion_state: BookingState;
  upload_claimed_at: string | null;
};

const SELECT_ROW = `SELECT token, created_at, gclid, gbraid, wbraid, calendly_invitee_uri, booking_created_at, conversion_state, upload_claimed_at FROM booking_attribution WHERE token = ?`;

function toRecord(row: StoredBooking): BookingRecord {
  return {
    token: row.token,
    createdAt: row.created_at,
    gclid: row.gclid || "",
    gbraid: row.gbraid || "",
    wbraid: row.wbraid || "",
    calendlyInviteeUri: row.calendly_invitee_uri,
    bookingCreatedAt: row.booking_created_at,
    conversionState: row.conversion_state,
    uploadClaimedAt: row.upload_claimed_at,
  };
}

export class D1BookingStore {
  constructor(private readonly db: BookingDatabase) {}

  async get(token: string): Promise<BookingRecord | null> {
    const row = await this.db.prepare(SELECT_ROW).bind(token).first<StoredBooking>();
    return row ? toRecord(row) : null;
  }

  async findByInvitee(inviteeUri: string): Promise<BookingRecord | null> {
    const row = await this.db.prepare(
      `SELECT token, created_at, gclid, gbraid, wbraid, calendly_invitee_uri, booking_created_at, conversion_state, upload_claimed_at FROM booking_attribution WHERE calendly_invitee_uri = ?`,
    ).bind(inviteeUri).first<StoredBooking>();
    return row ? toRecord(row) : null;
  }

  async save(row: BookingRecord): Promise<boolean> {
    const result = await this.db.prepare(
      `UPDATE booking_attribution SET calendly_invitee_uri = ?, booking_created_at = ?, conversion_state = ?, upload_claimed_at = ? WHERE token = ?`,
    ).bind(row.calendlyInviteeUri, row.bookingCreatedAt, row.conversionState, row.uploadClaimedAt, row.token).run();
    return Boolean(result.meta?.changes);
  }

  async releaseStaleClaims(staleBeforeIso: string): Promise<void> {
    await this.db.prepare(
      `UPDATE booking_attribution SET conversion_state = 'ready', upload_claimed_at = NULL WHERE conversion_state = 'uploading' AND upload_claimed_at IS NOT NULL AND upload_claimed_at < ?`,
    ).bind(staleBeforeIso).run();
  }

  async listReady(limit: number): Promise<BookingRecord[]> {
    const rows = await this.db.prepare(
      `SELECT token, created_at, gclid, gbraid, wbraid, calendly_invitee_uri, booking_created_at, conversion_state, upload_claimed_at FROM booking_attribution WHERE conversion_state = 'ready' AND booking_created_at IS NOT NULL ORDER BY booking_created_at LIMIT ?`,
    ).bind(limit).all<StoredBooking>();
    return (rows.results || []).map(toRecord);
  }

  async claim(token: string, nowIso: string): Promise<boolean> {
    const result = await this.db.prepare(
      `UPDATE booking_attribution SET conversion_state = 'uploading', upload_claimed_at = ? WHERE token = ? AND conversion_state = 'ready'`,
    ).bind(nowIso, token).run();
    return Boolean(result.meta?.changes);
  }

  async markUploaded(token: string): Promise<boolean> {
    const result = await this.db.prepare(
      `UPDATE booking_attribution SET conversion_state = 'uploaded', upload_claimed_at = NULL WHERE token = ? AND conversion_state = 'uploading'`,
    ).bind(token).run();
    return Boolean(result.meta?.changes);
  }

  async markRejected(token: string): Promise<boolean> {
    const result = await this.db.prepare(
      `UPDATE booking_attribution SET conversion_state = 'rejected', upload_claimed_at = NULL WHERE token = ? AND conversion_state = 'uploading'`,
    ).bind(token).run();
    return Boolean(result.meta?.changes);
  }

  async releaseClaim(token: string): Promise<boolean> {
    const result = await this.db.prepare(
      `UPDATE booking_attribution SET conversion_state = 'ready', upload_claimed_at = NULL WHERE token = ? AND conversion_state = 'uploading'`,
    ).bind(token).run();
    return Boolean(result.meta?.changes);
  }
}

export async function linkConfirmedCalendlyBooking(
  store: D1BookingStore,
  token: string,
  inviteeUri: string,
  bookingCreatedAt: string,
  nowMs: number,
): Promise<boolean> {
  const row = await store.get(token);
  if (!row) return false;
  const next = onInviteeCreated(row, inviteeUri, bookingCreatedAt, nowMs);
  if (!next) return false;
  return store.save(next);
}

export async function cancelCalendlyBooking(
  store: D1BookingStore,
  token: string | null,
  inviteeUri: string,
): Promise<boolean> {
  const row = (token ? await store.get(token) : null) || (inviteeUri ? await store.findByInvitee(inviteeUri) : null);
  if (!row) return false;
  const next = onInviteeCanceled(row);
  if (!next) return false;
  return store.save(next);
}

type ResolvedGoogleAds = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  developerToken: string;
  customerId: string;
  conversionActionId: string;
  apiVersion: string;
  conversionValue: number;
  loginCustomerId: string;
};

function resolveGoogleAds(env: GoogleAdsBookingEnv): ResolvedGoogleAds | null {
  const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/\D/g, "") || "";
  const conversionActionId = env.GOOGLE_ADS_CONVERSION_ACTION_ID?.replace(/\D/g, "") || "";
  const apiVersion = env.GOOGLE_ADS_API_VERSION?.trim() || "v24";
  const loginCustomerId = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/\D/g, "") || "";
  if (!env.GOOGLE_ADS_CLIENT_ID || !env.GOOGLE_ADS_CLIENT_SECRET || !env.GOOGLE_ADS_REFRESH_TOKEN
    || !env.GOOGLE_ADS_DEVELOPER_TOKEN || !customerId || !conversionActionId || !/^v\d+$/.test(apiVersion)) {
    return null;
  }
  return {
    clientId: env.GOOGLE_ADS_CLIENT_ID,
    clientSecret: env.GOOGLE_ADS_CLIENT_SECRET,
    refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN,
    developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN,
    customerId,
    conversionActionId,
    apiVersion,
    conversionValue: bookingConversionValue(env.GOOGLE_ADS_BOOKING_CONVERSION_VALUE),
    loginCustomerId,
  };
}

export function googleAdsBookingConfigured(env: GoogleAdsBookingEnv): boolean {
  return resolveGoogleAds(env) !== null;
}

async function googleAccessToken(config: ResolvedGoogleAds, fetchImpl: typeof fetch): Promise<string | null> {
  const response = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
    }),
  });
  if (!response.ok) return null;
  const body = await response.json() as { access_token?: string };
  return body.access_token || null;
}

export async function uploadReadyBookings(
  store: D1BookingStore,
  env: GoogleAdsBookingEnv,
  fetchImpl: typeof fetch,
  nowMs = Date.now(),
): Promise<UploadSummary> {
  const config = resolveGoogleAds(env);
  if (!config) return { ok: false, code: "google_ads_not_configured", attempted: 0, uploaded: 0, failed: 0 };
  await store.releaseStaleClaims(new Date(nowMs - UPLOAD_CLAIM_TIMEOUT_MS).toISOString());
  let accessToken: string | null;
  try {
    accessToken = await googleAccessToken(config, fetchImpl);
  } catch {
    return { ok: false, code: "google_oauth_failed", attempted: 0, uploaded: 0, failed: 0 };
  }
  if (!accessToken) return { ok: false, code: "google_oauth_failed", attempted: 0, uploaded: 0, failed: 0 };

  const rows = await store.listReady(50);
  let uploaded = 0;
  let failed = 0;
  const nowIso = new Date(nowMs).toISOString();
  for (const row of rows) {
    if (!(await store.claim(row.token, nowIso))) continue;
    const current = await store.get(row.token);
    const conversion = current?.conversionState === "uploading"
      ? buildClickConversion({
        customerId: config.customerId,
        conversionActionId: config.conversionActionId,
        token: current.token,
        bookingCreatedAt: current.bookingCreatedAt || "",
        conversionValue: config.conversionValue,
        gclid: current.gclid,
        gbraid: current.gbraid,
        wbraid: current.wbraid,
      })
      : null;
    if (!conversion) {
      await store.markRejected(row.token);
      failed += 1;
      continue;
    }
    try {
      const headers: Record<string, string> = {
        authorization: `Bearer ${accessToken}`,
        "developer-token": config.developerToken,
        "content-type": "application/json",
      };
      if (config.loginCustomerId) headers["login-customer-id"] = config.loginCustomerId;
      const response = await fetchImpl(
        `https://googleads.googleapis.com/${config.apiVersion}/customers/${config.customerId}:uploadClickConversions`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ conversions: [conversion], partialFailure: true }),
        },
      );
      const body = await response.json().catch(() => null);
      const outcome = interpretGoogleAdsUpload(response.status, body);
      if (outcome === "uploaded" || outcome === "duplicate") {
        if (await store.markUploaded(row.token)) uploaded += 1;
      } else if (outcome === "rejected") {
        await store.markRejected(row.token);
        failed += 1;
      } else {
        await store.releaseClaim(row.token);
        failed += 1;
      }
    } catch {
      await store.releaseClaim(row.token);
      failed += 1;
    }
  }
  return { ok: failed === 0, attempted: rows.length, uploaded, failed };
}
