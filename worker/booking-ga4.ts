import {
  buildBookedConsultation,
  interpretGa4Collect,
  interpretGa4Debug,
  onInviteeCanceled,
  onInviteeCreated,
  UPLOAD_CLAIM_TIMEOUT_MS,
  validGa4MeasurementId,
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

export type Ga4BookingEnv = {
  GA4_MEASUREMENT_ID?: string;
  GA4_API_SECRET?: string;
};

export type SendSummary = {
  ok: boolean;
  code?: string;
  attempted: number;
  sent: number;
  failed: number;
};

type StoredBooking = {
  token: string;
  created_at: string;
  ga_client_id: string | null;
  ga_session_id: string | null;
  calendly_invitee_uri: string | null;
  booking_created_at: string | null;
  conversion_state: BookingState;
  upload_claimed_at: string | null;
};

const SELECT_COLUMNS = "token, created_at, ga_client_id, ga_session_id, calendly_invitee_uri, booking_created_at, conversion_state, upload_claimed_at";

function toRecord(row: StoredBooking): BookingRecord {
  return {
    token: row.token,
    createdAt: row.created_at,
    gaClientId: row.ga_client_id || "",
    gaSessionId: row.ga_session_id || "",
    calendlyInviteeUri: row.calendly_invitee_uri,
    bookingCreatedAt: row.booking_created_at,
    conversionState: row.conversion_state,
    uploadClaimedAt: row.upload_claimed_at,
  };
}

export class D1BookingStore {
  constructor(private readonly db: BookingDatabase) {}

  async get(token: string): Promise<BookingRecord | null> {
    const row = await this.db.prepare(
      `SELECT ${SELECT_COLUMNS} FROM booking_attribution WHERE token = ?`,
    ).bind(token).first<StoredBooking>();
    return row ? toRecord(row) : null;
  }

  async findByInvitee(inviteeUri: string): Promise<BookingRecord | null> {
    const row = await this.db.prepare(
      `SELECT ${SELECT_COLUMNS} FROM booking_attribution WHERE calendly_invitee_uri = ?`,
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
      `SELECT ${SELECT_COLUMNS} FROM booking_attribution WHERE conversion_state = 'ready' AND booking_created_at IS NOT NULL ORDER BY booking_created_at LIMIT ?`,
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

function resolveGa4(env: Ga4BookingEnv): { measurementId: string; apiSecret: string } | null {
  const measurementId = validGa4MeasurementId(env.GA4_MEASUREMENT_ID);
  const apiSecret = env.GA4_API_SECRET?.trim() || "";
  if (!measurementId || !apiSecret) return null;
  return { measurementId, apiSecret };
}

export function ga4BookingConfigured(env: Ga4BookingEnv): boolean {
  return resolveGa4(env) !== null;
}

async function postGa4(
  config: { measurementId: string; apiSecret: string },
  debug: boolean,
  body: unknown,
  fetchImpl: typeof fetch,
): Promise<{ status: number; json: unknown }> {
  const url = new URL(debug
    ? "https://www.google-analytics.com/debug/mp/collect"
    : "https://www.google-analytics.com/mp/collect");
  url.searchParams.set("measurement_id", config.measurementId);
  url.searchParams.set("api_secret", config.apiSecret);
  try {
    const response = await fetchImpl(url.toString(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await response.json().catch(() => null);
    return { status: response.status, json };
  } catch {
    return { status: 0, json: null };
  }
}

export async function sendReadyBookings(
  store: D1BookingStore,
  env: Ga4BookingEnv,
  fetchImpl: typeof fetch,
  nowMs = Date.now(),
): Promise<SendSummary> {
  const config = resolveGa4(env);
  if (!config) return { ok: false, code: "ga4_not_configured", attempted: 0, sent: 0, failed: 0 };
  await store.releaseStaleClaims(new Date(nowMs - UPLOAD_CLAIM_TIMEOUT_MS).toISOString());
  const rows = await store.listReady(50);
  let sent = 0;
  let failed = 0;
  const nowIso = new Date(nowMs).toISOString();
  for (const row of rows) {
    if (!(await store.claim(row.token, nowIso))) continue;
    const current = await store.get(row.token);
    const payload = current?.conversionState === "uploading"
      ? buildBookedConsultation({
        clientId: current.gaClientId,
        sessionId: current.gaSessionId,
        token: current.token,
        bookingCreatedAt: current.bookingCreatedAt || "",
        nowMs,
      })
      : null;
    if (!payload) {
      await store.markRejected(row.token);
      failed += 1;
      continue;
    }
    const debug = await postGa4(config, true, payload, fetchImpl);
    const validation = interpretGa4Debug(debug.status, debug.json);
    if (validation === "retry") {
      await store.releaseClaim(row.token);
      failed += 1;
      continue;
    }
    if (validation === "rejected") {
      await store.markRejected(row.token);
      failed += 1;
      continue;
    }
    const collected = await postGa4(config, false, payload, fetchImpl);
    if (interpretGa4Collect(collected.status) === "accepted") {
      if (await store.markUploaded(row.token)) sent += 1;
    } else {
      await store.releaseClaim(row.token);
      failed += 1;
    }
  }
  return { ok: failed === 0, attempted: rows.length, sent, failed };
}
