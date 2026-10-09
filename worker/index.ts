type D1Result = { success?: boolean; meta?: { changes?: number } };

type D1StatementLike = {
  bind: (...values: unknown[]) => D1StatementLike;
  run: () => Promise<D1Result>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<{ results?: T[] }>;
};

type D1DatabaseLike = {
  prepare: (query: string) => D1StatementLike;
};

type EmailBindingLike = {
  send: (message: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string;
  }) => Promise<unknown>;
};

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  LEADS_DB?: D1DatabaseLike;
  LEAD_NOTIFY?: EmailBindingLike;
  RESEND_API_KEY?: string;
  LEADS_ADMIN_TOKEN?: string;
  CALENDLY_WEBHOOK_SIGNING_KEY?: string;
  GOOGLE_ADS_CLIENT_ID?: string;
  GOOGLE_ADS_CLIENT_SECRET?: string;
  GOOGLE_ADS_REFRESH_TOKEN?: string;
  GOOGLE_ADS_DEVELOPER_TOKEN?: string;
  GOOGLE_ADS_CUSTOMER_ID?: string;
  GOOGLE_ADS_CONVERSION_ACTION_ID?: string;
  GOOGLE_ADS_API_VERSION?: string;
};

type ExecutionContextLike = {
  waitUntil: (promise: Promise<unknown>) => void;
};

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  process?: unknown;
  assessment?: unknown;
  attribution?: unknown;
  pagePath?: unknown;
  website?: unknown;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function cleanText(value: unknown, max = 5000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function safeJson(value: unknown, max = 12000): string {
  try {
    return JSON.stringify(value ?? null).slice(0, max);
  } catch {
    return "null";
  }
}

function attributionValue(attribution: unknown, key: string): string {
  if (!attribution || typeof attribution !== "object") return "";
  return cleanText((attribution as Record<string, unknown>)[key], 500);
}

async function readJson<T>(request: Request): Promise<T | null> {
  const length = Number(request.headers.get("content-length") || "0");
  if (length > 50_000) return null;
  try {
    return await request.json<T>();
  } catch {
    return null;
  }
}

function leadNotificationText(input: {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  processText: string;
  assessment: Record<string, unknown>;
  systems: string[];
}): string {
  const { id, name, company, email, phone, processText, assessment, systems } = input;
  return [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Complexity: ${cleanText(assessment.complexity, 80) || "—"}`,
    `Budget: ${cleanText(assessment.price, 120) || "—"}`,
    `Systems: ${systems.join(", ") || "—"}`,
    "",
    "Process:",
    processText,
    "",
    `Lead ID: ${id}`,
  ].join("\n");
}

async function sendResendLeadNotification(
  apiKey: string,
  input: {
    id: string;
    name: string;
    company: string;
    email: string;
    text: string;
  },
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `ai-midlands-lead/${input.id}`,
    },
    body: JSON.stringify({
      from: "AI Midlands <website@notify.ai-midlands.co.uk>",
      to: ["enquiries@ai-midlands.co.uk"],
      reply_to: input.email,
      subject: `New AI Midlands assessment lead — ${input.company || input.name}`,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Resend notification failed (${response.status}): ${detail}`);
  }
}

async function createLead(request: Request, env: Env, ctx: ExecutionContextLike): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);

  const payload = await readJson<LeadPayload>(request);
  if (!payload) return json({ ok: false, code: "invalid_json" }, 400);

  // Honeypot. Real visitors never see or populate this field.
  if (cleanText(payload.website, 200)) return json({ ok: true, id: crypto.randomUUID() }, 201);

  const name = cleanText(payload.name, 160);
  const company = cleanText(payload.company, 200);
  const email = cleanText(payload.email, 254).toLowerCase();
  const phone = cleanText(payload.phone, 80);
  const processText = cleanText(payload.process, 8000);
  const pagePath = cleanText(payload.pagePath, 1200);

  if (name.length < 2 || !isEmail(email) || processText.length < 20) {
    return json({ ok: false, code: "invalid_lead" }, 400);
  }

  const assessment = payload.assessment && typeof payload.assessment === "object"
    ? payload.assessment as Record<string, unknown>
    : {};
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const systems = Array.isArray(assessment.systems)
    ? assessment.systems.filter((item): item is string => typeof item === "string").slice(0, 20)
    : [];

  await env.LEADS_DB.prepare(`
    INSERT INTO leads (
      id, created_at, updated_at, status,
      name, company, email, phone, process_text,
      assessment_title, complexity, budget_band, timeframe, systems_json,
      human_control, assessment_json, page_path,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term, oppref,
      gclid, gbraid, wbraid
    ) VALUES (?, ?, ?, 'lead', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    now,
    now,
    name,
    company,
    email,
    phone,
    processText,
    cleanText(assessment.title, 500),
    cleanText(assessment.complexity, 80),
    cleanText(assessment.price, 120),
    cleanText(assessment.timeframe, 300),
    safeJson(systems, 2500),
    cleanText(assessment.humanControl, 1200),
    safeJson(assessment),
    pagePath,
    attributionValue(payload.attribution, "utm_source"),
    attributionValue(payload.attribution, "utm_medium"),
    attributionValue(payload.attribution, "utm_campaign"),
    attributionValue(payload.attribution, "utm_content"),
    attributionValue(payload.attribution, "utm_term"),
    attributionValue(payload.attribution, "oppref"),
    attributionValue(payload.attribution, "gclid"),
    attributionValue(payload.attribution, "gbraid"),
    attributionValue(payload.attribution, "wbraid"),
  ).run();

  const notificationText = leadNotificationText({
    id,
    name,
    company,
    email,
    phone,
    processText,
    assessment,
    systems,
  });

  if (env.RESEND_API_KEY) {
    ctx.waitUntil(
      sendResendLeadNotification(env.RESEND_API_KEY, {
        id,
        name,
        company,
        email,
        text: notificationText,
      }).catch(() => undefined),
    );
  } else if (env.LEAD_NOTIFY) {
    const notification = env.LEAD_NOTIFY.send({
      from: "website@ai-midlands.co.uk",
      to: "enquiries@ai-midlands.co.uk",
      replyTo: email,
      subject: `New AI Midlands assessment lead — ${company || name}`,
      text: notificationText,
    }).catch(() => undefined);
    ctx.waitUntil(notification);
  }

  return json({ ok: true, id }, 201);
}

async function markBookingStarted(leadId: string, env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  const now = new Date().toISOString();
  const result = await env.LEADS_DB.prepare(`
    UPDATE leads
    SET status = CASE WHEN status = 'lead' THEN 'booking_started' ELSE status END,
        booking_started_at = COALESCE(booking_started_at, ?),
        updated_at = ?
    WHERE id = ?
  `).bind(now, now, leadId).run();

  if (!result.meta?.changes) return json({ ok: false, code: "lead_not_found" }, 404);
  return json({ ok: true });
}

function parseCalendlySignature(header: string | null): { timestamp: string; signature: string } | null {
  if (!header) return null;
  const pairs = Object.fromEntries(header.split(",").map(part => part.trim().split("=", 2)));
  return pairs.t && pairs.v1 ? { timestamp: pairs.t, signature: pairs.v1 } : null;
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
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}


type BookingAttributionInput = {
  consent?: unknown;
  gclid?: unknown;
  gbraid?: unknown;
  wbraid?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  utm_term?: unknown;
};

async function createBookingAttribution(request: Request, env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).origin !== new URL(request.url).origin) {
    return json({ ok: false, code: "invalid_origin" }, 403);
  }
  const input = await readJson<BookingAttributionInput>(request);
  if (!input || input.consent !== true) return json({ ok: false, code: "consent_required" }, 403);
  const gclid = cleanText(input.gclid, 200);
  const gbraid = cleanText(input.gbraid, 200);
  const wbraid = cleanText(input.wbraid, 200);
  if (![gclid, gbraid, wbraid].some(Boolean)) return json({ ok: false, code: "no_google_click" }, 400);
  const token = crypto.randomUUID();
  await env.LEADS_DB.prepare(`
    INSERT INTO booking_attribution
    (token, created_at, gclid, gbraid, wbraid, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(token, new Date().toISOString(), gclid, gbraid, wbraid,
    cleanText(input.utm_source, 300), cleanText(input.utm_medium, 300),
    cleanText(input.utm_campaign, 300), cleanText(input.utm_content, 300),
    cleanText(input.utm_term, 300)).run();
  return json({ ok: true, token }, 201);
}

async function linkCalendlyBooking(payload: Record<string, unknown>, env: Env): Promise<void> {
  if (!env.LEADS_DB) return;
  const tracking = payload.tracking && typeof payload.tracking === "object"
    ? payload.tracking as Record<string, unknown> : {};
  const token = cleanText(tracking.utm_content, 100);
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27,40}$/i.test(token)) return;
  const uri = cleanText(payload.uri, 1200);
  if (!uri) return;
  const createdAt = cleanText(payload.created_at, 80) || new Date().toISOString();
  const cutoff = new Date(Date.now() - 7 * 24 * 3600_000).toISOString();
  // Only link one confirmed booking to a recently issued token. Replay is idempotent.
  await env.LEADS_DB.prepare(`
    UPDATE booking_attribution
    SET calendly_invitee_uri = ?, booking_created_at = ?, conversion_state = 'ready'
    WHERE token = ? AND created_at >= ? AND calendly_invitee_uri IS NULL
  `).bind(uri, createdAt, token, cutoff).run();
}

async function calendlyWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  if (!env.CALENDLY_WEBHOOK_SIGNING_KEY) return json({ ok: false, code: "calendly_webhook_not_configured" }, 503);

  const rawBody = await request.text();
  const signature = parseCalendlySignature(request.headers.get("Calendly-Webhook-Signature"));
  if (!signature) return json({ ok: false, code: "missing_signature" }, 401);

  const timestamp = Number(signature.timestamp);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 180) {
    return json({ ok: false, code: "stale_signature" }, 401);
  }

  const expected = await hmacHex(env.CALENDLY_WEBHOOK_SIGNING_KEY, `${signature.timestamp}.${rawBody}`);
  if (!constantTimeEqual(expected, signature.signature)) return json({ ok: false, code: "invalid_signature" }, 401);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  const eventType = cleanText(body.event, 80);
  const payload = body.payload && typeof body.payload === "object" ? body.payload as Record<string, unknown> : {};
  if (eventType === "invitee.created") await linkCalendlyBooking(payload, env);
  const email = cleanText(payload.email, 254).toLowerCase();
  if (!isEmail(email)) return json({ ok: true, matched: false });

  const now = new Date().toISOString();
  if (eventType === "invitee.created") {
    const result = await env.LEADS_DB.prepare(`
      UPDATE leads
      SET status = 'appointment_scheduled',
          appointment_scheduled_at = ?,
          calendly_invitee_uri = ?,
          calendly_event_uri = ?,
          updated_at = ?
      WHERE id = (
        SELECT id FROM leads WHERE lower(email) = lower(?) ORDER BY created_at DESC LIMIT 1
      )
    `).bind(
      now,
      cleanText(payload.uri, 1200),
      cleanText(payload.event, 1200),
      now,
      email,
    ).run();
    return json({ ok: true, matched: Boolean(result.meta?.changes) });
  }

  if (eventType === "invitee.canceled") {
    const result = await env.LEADS_DB.prepare(`
      UPDATE leads
      SET status = 'appointment_canceled',
          appointment_canceled_at = ?,
          updated_at = ?
      WHERE id = (
        SELECT id FROM leads WHERE lower(email) = lower(?) ORDER BY created_at DESC LIMIT 1
      )
    `).bind(now, now, email).run();
    return json({ ok: true, matched: Boolean(result.meta?.changes) });
  }

  return json({ ok: true, ignored: true });
}


async function uploadGoogleBookings(env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  const required = [env.GOOGLE_ADS_CLIENT_ID, env.GOOGLE_ADS_CLIENT_SECRET,
    env.GOOGLE_ADS_REFRESH_TOKEN, env.GOOGLE_ADS_DEVELOPER_TOKEN,
    env.GOOGLE_ADS_CUSTOMER_ID, env.GOOGLE_ADS_CONVERSION_ACTION_ID];
  if (required.some(value => !value)) return json({ ok: false, code: "google_ads_not_configured" }, 503);
  const customer = env.GOOGLE_ADS_CUSTOMER_ID!.replace(/\\D/g, "");
  const action = env.GOOGLE_ADS_CONVERSION_ACTION_ID!.replace(/\\D/g, "");
  const version = env.GOOGLE_ADS_API_VERSION || "v22";
  if (!/^v\\d+$/.test(version) || !customer || !action) return json({ ok: false, code: "invalid_google_ads_config" }, 503);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token",
      client_id: env.GOOGLE_ADS_CLIENT_ID!, client_secret: env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN! }),
  });
  if (!tokenResponse.ok) return json({ ok: false, code: "google_oauth_failed" }, 502);
  const token = await tokenResponse.json() as { access_token?: string };
  if (!token.access_token) return json({ ok: false, code: "google_oauth_missing_token" }, 502);
  const rows = await env.LEADS_DB.prepare(`
    SELECT token, gclid, gbraid, wbraid, booking_created_at
    FROM booking_attribution WHERE conversion_state = 'ready'
    AND booking_created_at IS NOT NULL ORDER BY booking_created_at LIMIT 50
  `).all<{token:string;gclid:string|null;gbraid:string|null;wbraid:string|null;booking_created_at:string}>();
  if (!rows.results?.length) return json({ ok: true, attempted: 0, uploaded: 0 });
  const conversions = rows.results.map(row => {
    const timestamp = new Date(row.booking_created_at);
    // Google Ads requires a timezone offset, not a trailing Z.
    const conversionDateTime = Number.isFinite(timestamp.getTime())
      ? timestamp.toISOString().replace("T", " ").replace("Z", "+00:00") : "";
    return { conversionAction: `customers/${customer}/conversionActions/${action}`,
      conversionDateTime, conversionValue: 1, currencyCode: "GBP",
      ...(row.gclid ? { gclid: row.gclid } : row.gbraid ? { gbraid: row.gbraid } : { wbraid: row.wbraid }) };
  });
  if (conversions.some(row => !row.conversionDateTime)) return json({ ok: false, code: "invalid_booking_timestamp" }, 422);
  const response = await fetch(`https://googleads.googleapis.com/${version}/customers/${customer}:uploadClickConversions`, {
    method: "POST",
    headers: { authorization: `Bearer ${token.access_token}`,
      "developer-token": env.GOOGLE_ADS_DEVELOPER_TOKEN!, "content-type": "application/json" },
    body: JSON.stringify({ conversions, partialFailure: true }),
  });
  if (!response.ok) return json({ ok: false, code: "google_ads_upload_failed", status: response.status }, 502);
  const result = await response.json() as { partialFailureError?: unknown; results?: unknown[] };
  // Do not mark partial failures as delivered; keep rows retryable for review.
  if (result.partialFailureError || (result.results?.length ?? 0) !== conversions.length)
    return json({ ok: false, code: "google_ads_partial_failure", attempted: conversions.length }, 502);
  for (const row of rows.results) {
    await env.LEADS_DB.prepare("UPDATE booking_attribution SET conversion_state = 'uploaded' WHERE token = ? AND conversion_state = 'ready'")
      .bind(row.token).run();
  }
  return json({ ok: true, attempted: conversions.length, uploaded: conversions.length });
}

function authorised(request: Request, env: Env): boolean {
  if (!env.LEADS_ADMIN_TOKEN) return false;
  const header = request.headers.get("authorization") || "";
  return header === `Bearer ${env.LEADS_ADMIN_TOKEN}`;
}

async function adminList(request: Request, env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  if (!authorised(request, env)) return json({ ok: false, code: "unauthorised" }, 401);
  const url = new URL(request.url);
  const limit = Math.max(1, Math.min(250, Number(url.searchParams.get("limit") || "100")));
  const result = await env.LEADS_DB.prepare(`
    SELECT id, created_at, updated_at, status, name, company, email, phone,
           process_text, assessment_title, complexity, budget_band, timeframe,
           systems_json, page_path, utm_source, utm_medium, utm_campaign,
           utm_content, utm_term, oppref, booking_started_at,
           appointment_scheduled_at, appointment_canceled_at
    FROM leads ORDER BY created_at DESC LIMIT ?
  `).bind(limit).all();
  return json({ ok: true, leads: result.results || [] });
}

async function adminUpdateStatus(request: Request, leadId: string, env: Env): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  if (!authorised(request, env)) return json({ ok: false, code: "unauthorised" }, 401);
  const body = await readJson<{ status?: unknown }>(request);
  const status = cleanText(body?.status, 80);
  const allowed = new Set(["lead", "booking_started", "appointment_scheduled", "appointment_canceled", "proposal", "customer", "lost"]);
  if (!allowed.has(status)) return json({ ok: false, code: "invalid_status" }, 400);
  const now = new Date().toISOString();
  const result = await env.LEADS_DB.prepare("UPDATE leads SET status = ?, updated_at = ? WHERE id = ?")
    .bind(status, now, leadId).run();
  if (!result.meta?.changes) return json({ ok: false, code: "lead_not_found" }, 404);
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContextLike): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({
        ok: true,
        leadCapture: Boolean(env.LEADS_DB),
        notifications: Boolean(env.RESEND_API_KEY || env.LEAD_NOTIFY),
        notificationProvider: env.RESEND_API_KEY ? "resend" : env.LEAD_NOTIFY ? "cloudflare" : null,
        calendlyWebhook: Boolean(env.CALENDLY_WEBHOOK_SIGNING_KEY),
      });
    }

    if (url.pathname === "/api/booking-attribution" && request.method === "POST") {
      return createBookingAttribution(request, env);
    }

    if (url.pathname === "/api/leads" && request.method === "POST") {
      return createLead(request, env, ctx);
    }

    const bookingMatch = url.pathname.match(/^\/api\/leads\/([^/]+)\/booking-started$/);
    if (bookingMatch && request.method === "POST") {
      return markBookingStarted(decodeURIComponent(bookingMatch[1]), env);
    }

    if (url.pathname === "/api/calendly" && request.method === "POST") {
      return calendlyWebhook(request, env);
    }

    if (url.pathname === "/api/admin/google-ads/upload-bookings" && request.method === "POST") {
      if (!authorised(request, env)) return json({ ok: false, code: "unauthorised" }, 401);
      return uploadGoogleBookings(env);
    }

    if (url.pathname === "/api/admin/leads" && request.method === "GET") {
      return adminList(request, env);
    }

    const adminLeadMatch = url.pathname.match(/^\/api\/admin\/leads\/([^/]+)$/);
    if (adminLeadMatch && request.method === "PATCH") {
      return adminUpdateStatus(request, decodeURIComponent(adminLeadMatch[1]), env);
    }

    if (url.pathname.startsWith("/api/")) return json({ ok: false, code: "not_found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
