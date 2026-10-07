type D1Result = { success?: boolean; meta?: { changes?: number } };

type D1StatementLike = {
  bind: (...values: unknown[]) => D1StatementLike;
  run: () => Promise<D1Result>;
  all: <T = Record<string, unknown>>() => Promise<{ results?: T[] }>;
};

type D1DatabaseLike = {
  prepare: (query: string) => D1StatementLike;
};

type PerformanceEnv = {
  LEADS_DB?: D1DatabaseLike;
  LEADS_ADMIN_TOKEN?: string;
};

type LeadRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  name: string;
  company?: string | null;
  email: string;
  appointment_scheduled_at?: string | null;
  appointment_canceled_at?: string | null;
  customer_at?: string | null;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function authorised(request: Request, env: PerformanceEnv): boolean {
  if (!env.LEADS_ADMIN_TOKEN) return false;
  return (request.headers.get("authorization") || "") === `Bearer ${env.LEADS_ADMIN_TOKEN}`;
}

function inWindow(value: string | null | undefined, cutoff: string): boolean {
  return Boolean(value && value >= cutoff);
}

function dayKey(value: string | null | undefined): string | null {
  return value ? value.slice(0, 10) : null;
}

function customerTimestamp(row: LeadRow): string | null {
  if (row.customer_at) return row.customer_at;
  return row.status === "customer" ? row.updated_at : null;
}

async function performanceSnapshot(request: Request, env: PerformanceEnv): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  if (!authorised(request, env)) return json({ ok: false, code: "unauthorised" }, 401);

  const url = new URL(request.url);
  const requestedDays = Number(url.searchParams.get("days") || "30");
  const days = Math.max(7, Math.min(90, Number.isFinite(requestedDays) ? Math.floor(requestedDays) : 30));
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const cutoff = cutoffDate.toISOString();

  const result = await env.LEADS_DB.prepare(`
    SELECT id, created_at, updated_at, status, name, company, email,
           appointment_scheduled_at, appointment_canceled_at, customer_at
    FROM leads
    WHERE created_at >= ?
       OR appointment_scheduled_at >= ?
       OR appointment_canceled_at >= ?
       OR customer_at >= ?
       OR (status = 'customer' AND updated_at >= ?)
    ORDER BY created_at DESC
    LIMIT 2000
  `).bind(cutoff, cutoff, cutoff, cutoff, cutoff).all<LeadRow>();

  const rows = result.results || [];
  const totals = {
    leads: 0,
    bookings: 0,
    cancellations: 0,
    customers: 0,
  };
  const cohort = {
    leads: 0,
    booked: 0,
    customers: 0,
  };
  const trend = new Map<string, { day: string; leads: number; bookings: number; customers: number }>();

  const addTrend = (day: string | null, key: "leads" | "bookings" | "customers") => {
    if (!day) return;
    const current = trend.get(day) || { day, leads: 0, bookings: 0, customers: 0 };
    current[key] += 1;
    trend.set(day, current);
  };

  for (const row of rows) {
    const customerAt = customerTimestamp(row);

    if (inWindow(row.created_at, cutoff)) {
      totals.leads += 1;
      cohort.leads += 1;
      if (row.appointment_scheduled_at) cohort.booked += 1;
      if (customerAt) cohort.customers += 1;
      addTrend(dayKey(row.created_at), "leads");
    }

    if (inWindow(row.appointment_scheduled_at, cutoff)) {
      totals.bookings += 1;
      addTrend(dayKey(row.appointment_scheduled_at), "bookings");
    }

    if (inWindow(row.appointment_canceled_at, cutoff)) totals.cancellations += 1;

    if (inWindow(customerAt, cutoff)) {
      totals.customers += 1;
      addTrend(dayKey(customerAt), "customers");
    }
  }

  const recent = rows
    .filter(row => inWindow(row.created_at, cutoff) || inWindow(row.appointment_scheduled_at, cutoff) || inWindow(customerTimestamp(row), cutoff))
    .slice(0, 80)
    .map(row => ({
      id: row.id,
      created_at: row.created_at,
      status: row.status,
      name: row.name,
      company: row.company || "",
      email: row.email,
      appointment_scheduled_at: row.appointment_scheduled_at || null,
      appointment_canceled_at: row.appointment_canceled_at || null,
      customer_at: customerTimestamp(row),
    }));

  return json({
    ok: true,
    window: {
      days,
      start: cutoff,
      end: now.toISOString(),
    },
    totals,
    cohort,
    trend: Array.from(trend.values()).sort((a, b) => a.day.localeCompare(b.day)),
    recent,
  });
}

async function updatePerformanceLead(request: Request, leadId: string, env: PerformanceEnv): Promise<Response> {
  if (!env.LEADS_DB) return json({ ok: false, code: "lead_store_not_configured" }, 503);
  if (!authorised(request, env)) return json({ ok: false, code: "unauthorised" }, 401);

  let body: { status?: unknown } | null = null;
  try {
    body = await request.json<{ status?: unknown }>();
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  const status = typeof body?.status === "string" ? body.status.trim() : "";
  const allowed = new Set(["lead", "booking_started", "appointment_scheduled", "appointment_canceled", "proposal", "customer", "lost"]);
  if (!allowed.has(status)) return json({ ok: false, code: "invalid_status" }, 400);

  const now = new Date().toISOString();
  const result = await env.LEADS_DB.prepare(`
    UPDATE leads
    SET status = ?,
        customer_at = CASE
          WHEN ? = 'customer' THEN COALESCE(customer_at, ?)
          WHEN status = 'customer' AND ? <> 'customer' THEN NULL
          ELSE customer_at
        END,
        updated_at = ?
    WHERE id = ?
  `).bind(status, status, now, status, now, leadId).run();

  if (!result.meta?.changes) return json({ ok: false, code: "lead_not_found" }, 404);
  return json({ ok: true });
}

export async function handlePerformanceApi(
  request: Request,
  env: PerformanceEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/admin/performance" && request.method === "GET") {
    return performanceSnapshot(request, env);
  }

  const leadMatch = url.pathname.match(/^\/api\/admin\/performance\/leads\/([^/]+)$/);
  if (leadMatch && request.method === "PATCH") {
    return updatePerformanceLead(request, decodeURIComponent(leadMatch[1]), env);
  }

  return null;
}
