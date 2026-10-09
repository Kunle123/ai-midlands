import { describe, expect, it, vi } from "vitest";
import { D1BookingStore, uploadReadyBookings, type BookingDatabase } from "./booking-upload.ts";

const TOKEN = "11111111-1111-4111-8111-111111111111";
const TOKEN_TWO = "22222222-2222-4222-8222-222222222222";

type Row = {
  token: string;
  created_at: string;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  calendly_invitee_uri: string | null;
  booking_created_at: string | null;
  conversion_state: string;
  upload_claimed_at: string | null;
};

function readyRow(token: string, gclid = "gclid-1"): Row {
  return {
    token,
    created_at: "2026-10-09T18:00:00.000Z",
    gclid,
    gbraid: null,
    wbraid: null,
    calendly_invitee_uri: "invitee-1",
    booking_created_at: "2026-10-09T19:30:00.987Z",
    conversion_state: "ready",
    upload_claimed_at: null,
  };
}

class FakeDb implements BookingDatabase {
  rows = new Map<string, Row>();

  prepare(sql: string) {
    const run = async (...values: unknown[]) => {
      if (sql.includes("SET conversion_state = 'uploading'")) {
        const [nowIso, token] = values as [string, string];
        const row = this.rows.get(token);
        if (!row || row.conversion_state !== "ready") return { meta: { changes: 0 } };
        row.conversion_state = "uploading";
        row.upload_claimed_at = nowIso;
        return { meta: { changes: 1 } };
      }
      if (sql.includes("SET conversion_state = 'uploaded'")) {
        const [token] = values as [string];
        const row = this.rows.get(token);
        if (!row || row.conversion_state !== "uploading") return { meta: { changes: 0 } };
        row.conversion_state = "uploaded";
        row.upload_claimed_at = null;
        return { meta: { changes: 1 } };
      }
      if (sql.includes("SET conversion_state = 'rejected'")) {
        const [token] = values as [string];
        const row = this.rows.get(token);
        if (!row || row.conversion_state !== "uploading") return { meta: { changes: 0 } };
        row.conversion_state = "rejected";
        row.upload_claimed_at = null;
        return { meta: { changes: 1 } };
      }
      if (sql.includes("upload_claimed_at IS NOT NULL AND upload_claimed_at < ?")) {
        const [cutoff] = values as [string];
        for (const row of this.rows.values()) {
          if (row.conversion_state === "uploading" && row.upload_claimed_at && row.upload_claimed_at < cutoff) {
            row.conversion_state = "ready";
            row.upload_claimed_at = null;
          }
        }
        return { meta: { changes: 1 } };
      }
      if (sql.includes("SET conversion_state = 'ready'")) {
        const [token] = values as [string];
        const row = this.rows.get(token);
        if (!row || row.conversion_state !== "uploading") return { meta: { changes: 0 } };
        row.conversion_state = "ready";
        row.upload_claimed_at = null;
        return { meta: { changes: 1 } };
      }
      if (sql.includes("SET calendly_invitee_uri")) {
        const [uri, createdAt, state, claimedAt, token] = values as [string | null, string | null, string, string | null, string];
        const row = this.rows.get(token);
        if (!row) return { meta: { changes: 0 } };
        row.calendly_invitee_uri = uri;
        row.booking_created_at = createdAt;
        row.conversion_state = state;
        row.upload_claimed_at = claimedAt;
        return { meta: { changes: 1 } };
      }
      return { meta: { changes: 0 } };
    };
    const first = async <T>(...values: unknown[]) => {
      if (sql.includes("WHERE calendly_invitee_uri = ?")) {
        const [uri] = values as [string];
        return ([...this.rows.values()].find(row => row.calendly_invitee_uri === uri) || null) as T | null;
      }
      const [token] = values as [string];
      return (this.rows.get(token) || null) as T | null;
    };
    const all = async <T>(...values: unknown[]) => {
      const [limit] = values as [number];
      const results = [...this.rows.values()]
        .filter(row => row.conversion_state === "ready" && row.booking_created_at)
        .slice(0, limit);
      return { results: results as T[] };
    };
    return {
      bind: (...values: unknown[]) => ({
        bind: () => { throw new Error("double bind"); },
        run: () => run(...values),
        first: <T>() => first<T>(...values),
        all: <T>() => all<T>(...values),
      }),
    };
  }
}

const configured = {
  GOOGLE_ADS_CLIENT_ID: "client",
  GOOGLE_ADS_CLIENT_SECRET: "secret",
  GOOGLE_ADS_REFRESH_TOKEN: "refresh",
  GOOGLE_ADS_DEVELOPER_TOKEN: "developer",
  GOOGLE_ADS_CUSTOMER_ID: "6483337211",
  GOOGLE_ADS_CONVERSION_ACTION_ID: "7833321822",
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

describe("offline booking upload", () => {
  it("uploads one confirmed booking at the default £25 and does not upload it again", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    db.rows.set("pending-token", { ...readyRow("pending-token"), conversion_state: "pending", booking_created_at: null, calendly_invitee_uri: null });
    db.rows.set("canceled-token", { ...readyRow("canceled-token"), conversion_state: "canceled" });
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("oauth2.googleapis.com")) return jsonResponse(200, { access_token: "access" });
      return jsonResponse(200, { results: [{ conversionAction: "customers/6483337211/conversionActions/7833321822", orderId: TOKEN }] });
    });
    const store = new D1BookingStore(db);
    const first = await uploadReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:00:00.000Z"));
    const second = await uploadReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:30:00.000Z"));
    const uploadCalls = fetchImpl.mock.calls.filter(call => String(call[0]).includes("uploadClickConversions"));
    expect(first).toMatchObject({ ok: true, uploaded: 1, failed: 0 });
    expect(second).toMatchObject({ ok: true, attempted: 0, uploaded: 0 });
    expect(uploadCalls).toHaveLength(1);
    const payload = JSON.parse(String((uploadCalls[0]?.[1] as RequestInit).body));
    expect(payload.conversions[0]).toMatchObject({
      conversionValue: 25,
      currencyCode: "GBP",
      orderId: TOKEN,
      conversionDateTime: "2026-10-09 19:30:00+00:00",
      conversionAction: "customers/6483337211/conversionActions/7833321822",
    });
    expect(JSON.stringify(payload)).not.toMatch(/email|phone/i);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("uploaded");
    expect(db.rows.get("pending-token")?.conversion_state).toBe("pending");
    expect(db.rows.get("canceled-token")?.conversion_state).toBe("canceled");
  });

  it("uses a configured booking value without affecting the request shape", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("oauth2")) return jsonResponse(200, { access_token: "access" });
      return jsonResponse(200, { results: [{ orderId: TOKEN }] });
    });
    await uploadReadyBookings(new D1BookingStore(db), { ...configured, GOOGLE_ADS_BOOKING_CONVERSION_VALUE: "40" }, fetchImpl);
    const upload = fetchImpl.mock.calls.find(call => String(call[0]).includes("uploadClickConversions"));
    const payload = JSON.parse(String((upload?.[1] as RequestInit).body));
    expect(payload.conversions[0].conversionValue).toBe(40);
  });

  it("lets only one claim upload a booking", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const store = new D1BookingStore(db);
    const now = "2026-10-09T20:00:00.000Z";
    expect(await store.claim(TOKEN, now)).toBe(true);
    expect(await store.claim(TOKEN, now)).toBe(false);
  });

  it("retries an API failure and then settles a duplicate acknowledgement", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    db.rows.set(TOKEN_TWO, readyRow(TOKEN_TWO, "gclid-2"));
    let uploads = 0;
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("oauth2")) return jsonResponse(200, { access_token: "access" });
      uploads += 1;
      if (uploads === 1) return jsonResponse(503, {});
      if (uploads === 2) {
        return jsonResponse(200, {
          partialFailureError: { details: [{ errors: [{ errorCode: { conversionUploadError: "DUPLICATE_ORDER_ID" } }] }] },
          results: [{}],
        });
      }
      return jsonResponse(200, { results: [{ orderId: TOKEN_TWO }] });
    });
    const store = new D1BookingStore(db);
    const first = await uploadReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:00:00.000Z"));
    expect(first.failed).toBeGreaterThan(0);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("ready");
    const second = await uploadReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:30:00.000Z"));
    expect(second.uploaded).toBe(1);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("uploaded");
    expect(db.rows.get(TOKEN_TWO)?.conversion_state).toBe("uploaded");
  });

  it("does not retry a permanently rejected click", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("oauth2")) return jsonResponse(200, { access_token: "access" });
      return jsonResponse(200, {
        partialFailureError: { details: [{ errors: [{ errorCode: { conversionUploadError: "UNPARSEABLE_GCLID" } }] }] },
        results: [{}],
      });
    });
    const store = new D1BookingStore(db);
    await uploadReadyBookings(store, configured, fetchImpl);
    await uploadReadyBookings(store, configured, fetchImpl);
    const uploads = fetchImpl.mock.calls.filter(call => String(call[0]).includes("uploadClickConversions"));
    expect(uploads).toHaveLength(1);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("rejected");
  });

  it("does not upload when Google Ads credentials are missing", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const fetchImpl = vi.fn();
    const summary = await uploadReadyBookings(new D1BookingStore(db), {
      GOOGLE_ADS_CUSTOMER_ID: "6483337211",
      GOOGLE_ADS_CONVERSION_ACTION_ID: "7833321822",
    }, fetchImpl);
    expect(summary).toMatchObject({ ok: false, code: "google_ads_not_configured", uploaded: 0 });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("ready");
  });
});
