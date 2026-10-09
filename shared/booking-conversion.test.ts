import { describe, expect, it } from "vitest";
import {
  bookingAttributionRejection,
  bookingConversionValue,
  bookingTokenFromTracking,
  buildClickConversion,
  calendlySignatureFresh,
  calendlyUrlWithBookingToken,
  formatGoogleAdsDateTime,
  googleAdsClickIdentifier,
  interpretGoogleAdsUpload,
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
    gclid: "test-gclid",
    gbraid: "",
    wbraid: "",
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
  it("requires measurement consent and a Google click id before a booking token", () => {
    expect(bookingAttributionRejection({ consent: false, gclid: "abc" })).toBe("consent_required");
    expect(bookingAttributionRejection({ consent: true })).toBe("no_google_click");
    expect(bookingAttributionRejection({ consent: true, gclid: "abc" })).toBeNull();
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

describe("booking conversion payload", () => {
  it("defaults the booking value to £25 and keeps an explicit value", () => {
    expect(bookingConversionValue(undefined)).toBe(25);
    expect(bookingConversionValue("")).toBe(25);
    expect(bookingConversionValue("nope")).toBe(25);
    expect(bookingConversionValue("40")).toBe(40);
  });

  it("formats Google Ads timestamps without milliseconds", () => {
    expect(formatGoogleAdsDateTime("2026-10-09T21:21:08.987Z")).toBe("2026-10-09 21:21:08+00:00");
    expect(formatGoogleAdsDateTime("not-a-date")).toBeNull();
  });

  it("sends one click id, the confirmed action, and no personal details", () => {
    expect(googleAdsClickIdentifier({ gclid: "g", gbraid: "b", wbraid: "w" })).toEqual({ gclid: "g" });
    expect(googleAdsClickIdentifier({ gclid: "", gbraid: "", wbraid: "" })).toBeNull();
    const conversion = buildClickConversion({
      customerId: "6483337211",
      conversionActionId: "7833321822",
      token: TOKEN,
      bookingCreatedAt: "2026-10-09T21:21:08.987Z",
      conversionValue: 25,
      gclid: "test-gclid",
    });
    expect(conversion).toMatchObject({
      conversionAction: "customers/6483337211/conversionActions/7833321822",
      conversionDateTime: "2026-10-09 21:21:08+00:00",
      conversionValue: 25,
      currencyCode: "GBP",
      orderId: TOKEN,
      gclid: "test-gclid",
    });
    expect(conversion).not.toHaveProperty("gbraid");
    expect(JSON.stringify(conversion)).not.toMatch(/email|phone|name/i);
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

describe("Google Ads upload acknowledgement", () => {
  it("accepts an echoed result and does not treat an empty result as success", () => {
    expect(interpretGoogleAdsUpload(200, {
      results: [{ conversionAction: "customers/6483337211/conversionActions/7833321822", orderId: TOKEN }],
    })).toBe("uploaded");
    expect(interpretGoogleAdsUpload(200, { results: [{}] })).toBe("retry");
  });

  it("retries transport failures, settles duplicates, and rejects a bad click id", () => {
    expect(interpretGoogleAdsUpload(503, {})).toBe("retry");
    expect(interpretGoogleAdsUpload(200, {
      partialFailureError: { details: [{ errors: [{ errorCode: { conversionUploadError: "CLICK_CONVERSION_ALREADY_EXISTS" } }] }] },
      results: [{}],
    })).toBe("duplicate");
    expect(interpretGoogleAdsUpload(200, {
      partialFailureError: { details: [{ errors: [{ errorCode: { conversionUploadError: "UNPARSEABLE_GCLID" } }] }] },
      results: [{}],
    })).toBe("rejected");
  });
});
