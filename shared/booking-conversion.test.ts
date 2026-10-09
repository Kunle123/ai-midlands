import { describe, expect, it } from "vitest";
import {
  bookingAttributionRejection,
  bookingTokenFromTracking,
  buildBookedConsultation,
  calendlySignatureFresh,
  calendlyUrlWithBookingToken,
  ga4IdentityFromCookies,
  interpretGa4Collect,
  interpretGa4Debug,
  isKunleCalendlyBookingUrl,
  onInviteeCanceled,
  onInviteeCreated,
  payloadMatchesBookingEvent,
  verifyCalendlyWebhook,
  type BookingRecord,
} from "./booking-conversion.ts";

const TOKEN = "11111111-1111-4111-8111-111111111111";

function row(overrides: Partial<BookingRecord> = {}): BookingRecord {
  return {
    token: TOKEN,
    createdAt: "2026-10-09T18:00:00.000Z",
    gaClientId: "111.222",
    gaSessionId: "1699999999",
    calendlyInviteeUri: null,
    bookingCreatedAt: null,
    conversionState: "pending",
    uploadClaimedAt: null,
    ...overrides,
  };
}

async function sign(secret: string, timestamp: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`));
  return Array.from(new Uint8Array(mac)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

describe("booking consent and Calendly URL", () => {
  it("requires measurement consent and a GA4 client and session before a booking token", () => {
    expect(bookingAttributionRejection({ consent: false, clientId: "111.222", sessionId: "1699999999" })).toBe("consent_required");
    expect(bookingAttributionRejection({ consent: true })).toBe("ga4_client_required");
    expect(bookingAttributionRejection({ consent: true, clientId: "111.222", sessionId: "1699999999" })).toBeNull();
  });

  it("reads GA4 identifiers from the measurement cookies", () => {
    const cookies = "_ga=GA1.1.111.222; _ga_W3T6L19819=GS2.1.s1699999999$o1$g1$t1699999999$j0$l0$h0";
    expect(ga4IdentityFromCookies(cookies, "G-W3T6L19819")).toEqual({ clientId: "111.222", sessionId: "1699999999" });
    expect(ga4IdentityFromCookies("_ga=GA1.1.111.222; _ga_W3T6L19819=GS1.1.1700000000.1.1.1700000000.0.0.0", "G-W3T6L19819")?.sessionId).toBe("1700000000");
    expect(ga4IdentityFromCookies(cookies, "G-OTHER")).toBeNull();
  });

  it("recognises only the 30-minute Calendly event", () => {
    expect(isKunleCalendlyBookingUrl("https://calendly.com/kunle2000/30min")).toBe(true);
    expect(isKunleCalendlyBookingUrl("https://calendly.com/kunle2000/30min?utm_source=ads")).toBe(true);
    expect(isKunleCalendlyBookingUrl("https://calendly.com/kunle2000/intro")).toBe(false);
  });

  it("puts the opaque token in utm_content and removes click ids", () => {
    const url = calendlyUrlWithBookingToken(
      "https://calendly.com/kunle2000/30min?gclid=secret-click&utm_source=google",
      TOKEN,
    );
    const parsed = new URL(url);
    expect(parsed.searchParams.get("utm_content")).toBe(TOKEN);
    expect(parsed.searchParams.get("gclid")).toBeNull();
    expect(parsed.searchParams.get("utm_source")).toBe("google");
  });
});

describe("booked consultation payload", () => {
  const nowMs = Date.parse("2026-10-09T21:21:08.000Z");

  it("sends booked_consultation at £25 and no personal details", () => {
    const payload = buildBookedConsultation({
      clientId: "111.222",
      sessionId: "1699999999",
      token: TOKEN,
      bookingCreatedAt: "2026-10-09T21:21:08.987Z",
      nowMs,
    });
    expect(payload).toMatchObject({
      client_id: "111.222",
      events: [{
        name: "booked_consultation",
        params: { currency: "GBP", value: 25, session_id: "1699999999", transaction_id: TOKEN },
      }],
    });
    expect(JSON.stringify(payload)).not.toMatch(/email|phone|gclid|api_secret/i);
  });

  it("rejects an event older than the Measurement Protocol window", () => {
    expect(buildBookedConsultation({
      clientId: "111.222",
      sessionId: "1699999999",
      token: TOKEN,
      bookingCreatedAt: "2026-10-01T21:21:08.000Z",
      nowMs,
    })).toBeNull();
  });
});

describe("Calendly webhook", () => {
  it("accepts a fresh signed body and rejects tampering, stale signatures, and missing signatures", async () => {
    const body = JSON.stringify({ event: "invitee.created" });
    const timestamp = "1760000000";
    const signature = await sign("signing-secret", timestamp, body);
    const nowMs = 1760000000 * 1000;
    expect(await verifyCalendlyWebhook({
      secret: "signing-secret",
      signatureHeader: `t=${timestamp},v1=${signature}`,
      rawBody: body,
      nowMs,
    })).toBe("ok");
    expect(await verifyCalendlyWebhook({
      secret: "signing-secret",
      signatureHeader: `t=${timestamp},v1=${signature}`,
      rawBody: `${body} `,
      nowMs,
    })).toBe("invalid_signature");
    expect(calendlySignatureFresh(timestamp, nowMs + 181_000)).toBe(false);
    expect(await verifyCalendlyWebhook({
      secret: "signing-secret",
      signatureHeader: null,
      rawBody: body,
      nowMs,
    })).toBe("missing_signature");
  });

  it("reads only a booking token from Calendly tracking and ignores other events", () => {
    expect(bookingTokenFromTracking({ utm_content: TOKEN.toUpperCase() })).toBe(TOKEN);
    expect(bookingTokenFromTracking({ utm_content: "autumn-campaign" })).toBeNull();
    expect(payloadMatchesBookingEvent({ scheduled_event: { location: "https://calendly.com/kunle2000/intro" } })).toBe(false);
    expect(payloadMatchesBookingEvent({ scheduled_event: { event_type: "https://api.calendly.com/event_types/abc" } })).toBe(true);
    expect(payloadMatchesBookingEvent({ scheduled_event: { location: "https://calendly.com/kunle2000/30min" } })).toBe(true);
  });
});

describe("confirmed booking state", () => {
  const now = Date.parse("2026-10-09T20:00:00.000Z");

  it("does not treat a click token as a booking", () => {
    expect(row().conversionState).toBe("pending");
    expect(row().bookingCreatedAt).toBeNull();
  });

  it("links one confirmed invitee and ignores a replay", () => {
    const linked = onInviteeCreated(row(), "invitee-a", "2026-10-09T19:30:00.000Z", now);
    expect(linked?.conversionState).toBe("ready");
    expect(onInviteeCreated(linked!, "invitee-a", "2026-10-09T19:30:00.000Z", now)).toBeNull();
    expect(onInviteeCreated(linked!, "invitee-b", "2026-10-09T19:40:00.000Z", now)).toBeNull();
  });

  it("stops a canceled booking from uploading and allows one reschedule", () => {
    const linked = onInviteeCreated(row(), "invitee-a", "2026-10-09T19:30:00.000Z", now)!;
    const canceled = onInviteeCanceled(linked);
    expect(canceled?.conversionState).toBe("canceled");
    expect(onInviteeCreated(canceled!, "invitee-a", "2026-10-09T19:30:00.000Z", now)).toBeNull();
    const rescheduled = onInviteeCreated(canceled!, "invitee-b", "2026-10-09T19:50:00.000Z", now);
    expect(rescheduled?.conversionState).toBe("ready");
    expect(rescheduled?.calendlyInviteeUri).toBe("invitee-b");
  });

  it("does not reopen an uploaded booking", () => {
    const uploaded = row({ conversionState: "uploaded", calendlyInviteeUri: "invitee-a", bookingCreatedAt: "2026-10-09T19:30:00.000Z" });
    expect(onInviteeCanceled(uploaded)).toBeNull();
    expect(onInviteeCreated(uploaded, "invitee-b", "2026-10-09T19:50:00.000Z", now)).toBeNull();
  });
});

describe("GA4 Measurement Protocol acknowledgement", () => {
  it("accepts a debug payload with no validation messages and a 204 collect response", () => {
    expect(interpretGa4Debug(200, { validationMessages: [] })).toBe("valid");
    expect(interpretGa4Collect(204)).toBe("accepted");
  });

  it("retries transport failures and rejects an invalid payload", () => {
    expect(interpretGa4Debug(503, {})).toBe("retry");
    expect(interpretGa4Debug(200, { validationMessages: [{ validationCode: "VALUE_INVALID" }] })).toBe("rejected");
    expect(interpretGa4Collect(500)).toBe("retry");
  });
});
