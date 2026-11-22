import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  name: string;
  company?: string;
  email: string;
  booking_started_at?: string | null;
  appointment_scheduled_at?: string | null;
  appointment_canceled_at?: string | null;
};

type LeadsResponse = {
  ok?: boolean;
  leads?: Lead[];
  code?: string;
};

type Confidence = 50 | 80 | 95;

const WINDOW_DAYS = 30;
const TOKEN_KEY = "aim_admin_token";
const STATUS_OPTIONS = [
  "lead",
  "booking_started",
  "appointment_scheduled",
  "appointment_canceled",
  "proposal",
  "customer",
  "lost",
];

const zByConfidence: Record<Confidence, number> = {
  50: 0.67448975,
  80: 1.28155157,
  95: 1.95996398,
};

function wilson(successes: number, total: number, confidence: Confidence): [number, number] | null {
  if (total <= 0) return null;
  const z = zByConfidence[confidence];
  const p = successes / total;
  const z2 = z * z;
  const denominator = 1 + z2 / total;
  const centre = (p + z2 / (2 * total)) / denominator;
  const margin = (z / denominator) * Math.sqrt((p * (1 - p) + z2 / (4 * total)) / total);
  return [Math.max(0, centre - margin), Math.min(1, centre + margin)];
}

function pct(value: number): string {
  return `${(value * 100).toFixed(value >= 0.1 ? 1 : 2)}%`;
}

function confidenceText(successes: number, total: number, confidence: Confidence): string {
  if (!total) return "Not enough data yet";
  const interval = wilson(successes, total, confidence);
  if (!interval) return "Not enough data yet";
  return `${pct(successes / total)} · ${confidence}% CI ${pct(interval[0])}–${pct(interval[1])}`;
}

function formatDate(value?: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(value: string): string {
  return value.replaceAll("_", " ");
}

function MetricCard({
  eyebrow,
  value,
  detail,
  note,
}: {
  eyebrow: string;
  value: string | number;
  detail: string;
  note?: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#e8ded6] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,43,0.04)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9b4a3b]">{eyebrow}</p>
      <div className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#0f172b]">{value}</div>
      <p className="mt-3 text-sm font-medium text-slate-700">{detail}</p>
      {note && <p className="mt-2 text-xs leading-relaxed text-slate-500">{note}</p>}
    </div>
  );
}

export default function AdminPerformance() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem(TOKEN_KEY) || "";
  });
  const [tokenInput, setTokenInput] = useState(token);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confidence, setConfidence] = useState<Confidence>(80);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads?limit=250", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json().catch(() => null) as LeadsResponse | null;
      if (!response.ok || !data?.ok || !Array.isArray(data.leads)) {
        if (response.status === 401) throw new Error("That admin token was not accepted.");
        throw new Error("The performance data could not be loaded.");
      }
      setLeads(data.leads);
      setToken(authToken);
      window.sessionStorage.setItem(TOKEN_KEY, authToken);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The performance data could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) void load(token);
    // Deliberately run only once for the token recovered from this browser session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cutoff = useMemo(() => Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000, []);
  const inWindow = (value?: string | null) => Boolean(value && new Date(value).getTime() >= cutoff);

  const metrics = useMemo(() => {
    const cohort = leads.filter(lead => inWindow(lead.created_at));
    const cohortBooked = cohort.filter(lead => Boolean(lead.appointment_scheduled_at));
    const cohortCustomers = cohort.filter(lead => lead.status === "customer");
    const cohortBookedCustomers = cohortBooked.filter(lead => lead.status === "customer");

    const bookings = leads.filter(lead => inWindow(lead.appointment_scheduled_at));
    const customers = leads.filter(lead => lead.status === "customer" && inWindow(lead.updated_at));
    const cancellations = leads.filter(lead => inWindow(lead.appointment_canceled_at));

    return {
      cohort,
      cohortBooked,
      cohortCustomers,
      cohortBookedCustomers,
      bookings,
      customers,
      cancellations,
    };
  }, [leads, cutoff]);

  const trend = useMemo(() => {
    const dayMs = 24 * 60 * 60 * 1000;
    const now = new Date();
    const rows = Array.from({ length: WINDOW_DAYS }, (_, index) => {
      const date = new Date(now.getTime() - (WINDOW_DAYS - 1 - index) * dayMs);
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        label: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date),
        Leads: 0,
        Bookings: 0,
        Customers: 0,
      };
    });
    const byDay = new Map(rows.map(row => [row.key, row]));

    for (const lead of leads) {
      if (inWindow(lead.created_at)) {
        const row = byDay.get(lead.created_at.slice(0, 10));
        if (row) row.Leads += 1;
      }
      if (inWindow(lead.appointment_scheduled_at)) {
        const row = byDay.get(lead.appointment_scheduled_at!.slice(0, 10));
        if (row) row.Bookings += 1;
      }
      if (lead.status === "customer" && inWindow(lead.updated_at)) {
        const row = byDay.get(lead.updated_at.slice(0, 10));
        if (row) row.Customers += 1;
      }
    }

    return rows;
  }, [leads, cutoff]);

  const authenticate = (event: FormEvent) => {
    event.preventDefault();
    void load(tokenInput.trim());
  };

  const forgetToken = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setTokenInput("");
    setLeads([]);
    setError("");
  };

  const updateStatus = async (leadId: string, status: string) => {
    if (!token) return;
    setUpdatingId(leadId);
    setError("");
    try {
      const response = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("The lead status could not be updated.");
      await load(token);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The lead status could not be updated.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!token || !leads.length && error) {
    return (
      <main className="min-h-screen bg-[#fbf8f5] text-[#0f172b]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
          <div className="w-full rounded-[30px] border border-[#e8ded6] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,43,0.06)] md:p-10">
            <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[48px] w-auto" />
            <div className="mt-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0ea] text-[#b43a28]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Private performance dashboard</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Use the existing AI Midlands admin token. It is kept only in this browser tab session and is not built into the website.
            </p>
            <form onSubmit={authenticate} className="mt-7 space-y-4">
              <label className="block text-sm font-semibold text-slate-800" htmlFor="admin-token">Admin token</label>
              <input
                id="admin-token"
                type="password"
                value={tokenInput}
                onChange={event => setTokenInput(event.target.value)}
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]"
              />
              {error && <p className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={!tokenInput.trim() || loading}
                className="inline-flex items-center justify-center rounded-full bg-[#c83927] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a92f21] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Checking…" : "Open dashboard"}
              </button>
            </form>
            <a href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0f172b]">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </a>
          </div>
        </div>
      </main>
    );
  }

  const bookingRateText = confidenceText(metrics.cohortBooked.length, metrics.cohort.length, confidence);
  const closeRateText = confidenceText(metrics.cohortBookedCustomers.length, metrics.cohortBooked.length, confidence);
  const overallRateText = confidenceText(metrics.cohortCustomers.length, metrics.cohort.length, confidence);

  return (
    <main className="min-h-screen bg-[#fbf8f5] text-[#0f172b]">
      <header className="sticky top-0 z-20 border-b border-[#e8ded6] bg-[#fbf8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[42px] w-auto" /></a>
            <div className="hidden h-7 w-px bg-[#ddd2ca] sm:block" />
            <span className="hidden text-sm font-semibold text-slate-700 sm:inline">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void load(token)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-[#ddd2ca] bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button type="button" onClick={forgetToken} className="rounded-full px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900">Lock</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b43a28]">Rolling {WINDOW_DAYS} days</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Bookings and conversions</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Counts are exact. Confidence intervals describe the underlying conversion rates implied by the current sample.
            </p>
          </div>
          <div className="rounded-full border border-[#ddd2ca] bg-white p-1">
            {([50, 80, 95] as Confidence[]).map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setConfidence(value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${confidence === value ? "bg-[#0f172b] text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                {value}% CI
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
        {leads.length >= 250 && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            The current admin endpoint returned its 250-record maximum. The dashboard should be upgraded to a paginated analytics endpoint before volume reaches this level consistently.
          </div>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            eyebrow="Leads"
            value={metrics.cohort.length}
            detail="New leads in the last 30 days"
            note="Exact count"
          />
          <MetricCard
            eyebrow="Bookings"
            value={metrics.bookings.length}
            detail={`Lead → booking: ${bookingRateText}`}
            note={`${metrics.cancellations.length} cancellation${metrics.cancellations.length === 1 ? "" : "s"} recorded in the window`}
          />
          <MetricCard
            eyebrow="Customers"
            value={metrics.customers.length}
            detail={`Booking → customer: ${closeRateText}`}
            note="A customer conversion is recorded when a lead is marked Customer."
          />
          <MetricCard
            eyebrow="Overall conversion"
            value={metrics.cohort.length ? pct(metrics.cohortCustomers.length / metrics.cohort.length) : "—"}
            detail={`Lead → customer: ${overallRateText}`}
            note="Rate uses leads first seen within this 30-day cohort."
          />
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e8ded6] bg-white p-5 md:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b4a3b]">Daily movement</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Last 30 days</h2>
            </div>
            <p className="text-xs text-slate-500">Leads · scheduled bookings · customers</p>
          </div>
          <div className="mt-7 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ece5df" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} interval={4} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#e8ded6", boxShadow: "0 12px 30px rgba(15,23,43,.08)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Leads" stroke="#0f172b" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Bookings" stroke="#c83927" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Customers" stroke="#7c3aed" strokeWidth={2.2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#e8ded6] bg-white">
          <div className="border-b border-[#eee6e0] px-5 py-5 md:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b4a3b]">Pipeline</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Recent leads</h2>
              <p className="text-xs text-slate-500">Mark a lead Customer here to record a conversion.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="bg-[#fbf8f5] text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold md:px-7">Lead</th>
                  <th className="px-5 py-3 font-semibold">Created</th>
                  <th className="px-5 py-3 font-semibold">Booked</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee6e0]">
                {leads.slice(0, 80).map(lead => (
                  <tr key={lead.id} className="align-middle">
                    <td className="px-5 py-4 md:px-7">
                      <div className="font-semibold text-[#0f172b]">{lead.name}</div>
                      <div className="mt-0.5 text-xs text-slate-500">{lead.company || lead.email}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(lead.created_at)}</td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(lead.appointment_scheduled_at)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={event => void updateStatus(lead.id, event.target.value)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm capitalize text-slate-700 outline-none focus:border-[#c83927] disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map(status => <option key={status} value={status}>{formatStatus(status)}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {!leads.length && (
                  <tr><td colSpan={4} className="px-7 py-12 text-center text-sm text-slate-500">No leads recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Statistical note: the confidence bands use Wilson score intervals, which behave better than a simple ± margin at low volumes. Booking and customer counts themselves are exact database counts; uncertainty applies to the inferred rates.
        </p>
      </div>
    </main>
  );
}
