import { describe, expect, it, vi } from "vitest";
import { D1BookingStore, sendReadyBookings, type BookingDatabase } from "./booking-ga4.ts";

const TOKEN = "11111111-1111-4111-8111-111111111111";
const TOKEN_TWO = "22222222-2222-4222-8222-222222222222";

type Row = {
  token: string;
  created_at: string;
  ga_client_id: string | null;
  ga_session_id: string | null;
  calendly_invitee_uri: string | null;
  booking_created_at: string | null;
  conversion_state: string;
  upload_claimed_at: string | null;
};

function readyRow(token: string): Row {
  return {
    token,
    created_at: "2026-10-09T18:00:00.000Z",
    ga_client_id: "111.222",
    ga_session_id: "1699999999",
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
  GA4_MEASUREMENT_ID: "G-W3T6L19819",
  GA4_API_SECRET: "test-api-secret",
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function emptyResponse(status: number): Response {
  return new Response(null, { status });
}

describe("GA4 booked consultation send", () => {
  it("sends one confirmed booking at £25 and does not send it again", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    db.rows.set("pending-token", { ...readyRow("pending-token"), conversion_state: "pending", booking_created_at: null, calendly_invitee_uri: null });
    db.rows.set("canceled-token", { ...readyRow("canceled-token"), conversion_state: "canceled" });
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/debug/")) return jsonResponse(200, { validationMessages: [] });
      return emptyResponse(204);
    });
    const store = new D1BookingStore(db);
    const first = await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:00:00.000Z"));
    const second = await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:30:00.000Z"));
    const collectCalls = fetchImpl.mock.calls.filter(call => String(call[0]).includes("/mp/collect") && !String(call[0]).includes("/debug/"));
    expect(first).toMatchObject({ ok: true, sent: 1, failed: 0 });
    expect(second).toMatchObject({ ok: true, attempted: 0, sent: 0 });
    expect(collectCalls).toHaveLength(1);
    const collectUrl = new URL(String(collectCalls[0]?.[0]));
    expect(collectUrl.searchParams.get("measurement_id")).toBe("G-W3T6L19819");
    expect(collectUrl.searchParams.get("api_secret")).toBe("test-api-secret");
    const payload = JSON.parse(String((collectCalls[0]?.[1] as RequestInit).body));
    expect(payload.events[0]).toMatchObject({
      name: "booked_consultation",
      params: { value: 25, currency: "GBP", transaction_id: TOKEN },
    });
    expect(JSON.stringify(payload)).not.toMatch(/api_secret|email|gclid/i);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("uploaded");
    expect(db.rows.get("pending-token")?.conversion_state).toBe("pending");
    expect(db.rows.get("canceled-token")?.conversion_state).toBe("canceled");
  });

  it("lets only one claim send a booking", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const store = new D1BookingStore(db);
    const now = "2026-10-09T20:00:00.000Z";
    expect(await store.claim(TOKEN, now)).toBe(true);
    expect(await store.claim(TOKEN, now)).toBe(false);
  });

  it("retries a collect failure and does not collect when debug validation fails", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    db.rows.set(TOKEN_TWO, { ...readyRow(TOKEN_TWO), ga_client_id: "333.444" });
    let collects = 0;
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("/debug/")) return jsonResponse(200, { validationMessages: [] });
      collects += 1;
      if (collects === 1) return emptyResponse(503);
      return emptyResponse(204);
    });
    const store = new D1BookingStore(db);
    const first = await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:00:00.000Z"));
    expect(first.failed).toBeGreaterThan(0);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("ready");
    const second = await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:30:00.000Z"));
    expect(second.sent).toBe(1);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("uploaded");
    expect(db.rows.get(TOKEN_TWO)?.conversion_state).toBe("uploaded");
  });

  it("does not retry a payload GA4 rejects", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("/debug/")) return jsonResponse(200, { validationMessages: [{ validationCode: "VALUE_INVALID" }] });
      return emptyResponse(204);
    });
    const store = new D1BookingStore(db);
    await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:00:00.000Z"));
    await sendReadyBookings(store, configured, fetchImpl, Date.parse("2026-10-09T20:30:00.000Z"));
    const collects = fetchImpl.mock.calls.filter(call => String(call[0]).includes("/mp/collect") && !String(call[0]).includes("/debug/"));
    expect(collects).toHaveLength(0);
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("rejected");
  });

  it("does not send when the GA4 secret is missing", async () => {
    const db = new FakeDb();
    db.rows.set(TOKEN, readyRow(TOKEN));
    const fetchImpl = vi.fn();
    const summary = await sendReadyBookings(new D1BookingStore(db), { GA4_MEASUREMENT_ID: "G-W3T6L19819" }, fetchImpl);
    expect(summary).toMatchObject({ ok: false, code: "ga4_not_configured", sent: 0 });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(db.rows.get(TOKEN)?.conversion_state).toBe("ready");
  });
});
