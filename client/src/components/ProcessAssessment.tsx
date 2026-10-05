import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calendar, CheckCircle2, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { getAttribution, trackCustomEvent, trackLeadCreated, withUtmParams } from "@/lib/tracking";

type Assessment = {
  title: string;
  summary: string;
  approach: string[];
  systems: string[];
  humanControl: string;
  complexity: "Starter" | "Connected" | "Bespoke";
  price: string;
  timeframe: string;
};

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
};

const systemMatchers: Array<[string, RegExp]> = [
  ["Email", /email|inbox|outlook|gmail/i],
  ["Spreadsheets", /spreadsheet|excel|csv|sheet/i],
  ["CRM", /crm|salesforce|hubspot|pipedrive/i],
  ["Finance", /invoice|finance|xero|quickbooks|sage|account/i],
  ["Website", /website|web form|form|chatbot|customer enquiry/i],
  ["Calendar", /calendar|booking|appointment|meeting/i],
  ["APIs / internal systems", /api|erp|sap|internal system|database/i],
  ["Documents", /pdf|document|attachment|word file/i],
];

function buildAssessment(process: string): Assessment {
  const text = process.toLowerCase();
  const systems = systemMatchers.filter(([, matcher]) => matcher.test(process)).map(([name]) => name);
  const detectedSystems = systems.length ? systems : ["Existing business tools"];

  let score = 0;
  if (/api|erp|sap|database|legacy|custom system/.test(text)) score += 2;
  if (/multiple|several|three|four|five|across systems|integration/.test(text)) score += 1;
  if (systems.length >= 3) score += 1;
  if (/sensitive|personal data|financial|regulated|confidential/.test(text)) score += 1;

  let title = "A bounded workflow automation looks practical";
  let summary = "This looks like a repeatable process where information can be captured once, moved to the right place and used to trigger the next step automatically.";
  let approach = [
    "Map the current trigger, hand-offs and final outcome.",
    "Connect the smallest number of systems needed to remove the manual step.",
    "Keep exceptions visible so a person can intervene when needed.",
  ];
  let humanControl = "Review exceptions and approve any action that needs judgement.";

  if (/spreadsheet|excel|csv|report|download|combine|copy and paste|copy/.test(text)) {
    title = "This is a strong candidate for admin and data automation";
    summary = "The repetitive collection, copying or combining of information can usually be turned into one controlled workflow, leaving the team with a prepared output rather than manual consolidation.";
    approach = [
      "Identify the source files or systems and the fields that matter.",
      "Automate the collection, cleaning and combination of the data.",
      "Produce the report, record or update in the format the team already uses.",
    ];
    humanControl = "A person can review the prepared output before it is circulated or used for a decision.";
  } else if (/customer|enquiry|question|chatbot|book|booking|appointment|website/.test(text)) {
    title = "This could become a customer assistant that completes the next action";
    summary = "Rather than stopping at an answer, the journey can understand the request, give a useful response and carry the customer into a booking, lead or follow-up workflow.";
    approach = [
      "Define the questions the assistant should answer and the information it can use.",
      "Connect the next action — for example booking, CRM lead creation or follow-up.",
      "Record the outcome back into the business system so the team has a clean hand-off.",
    ];
    humanControl = "Escalate unclear requests and keep a person in control of exceptions or sensitive conversations.";
  } else if (/invoice|won|order|finance|payment|crm/.test(text)) {
    title = "This looks like a connected workflow between business systems";
    summary = "A change in one system can become the trigger for the next step in another, avoiding duplicate entry and making the hand-off visible end to end.";
    approach = [
      "Agree the event that starts the workflow and the data that must move.",
      "Create or update the downstream record automatically.",
      "Return a confirmation or reference so the originating system stays current.",
    ];
    humanControl = "Use approval gates for financial, contractual or irreversible actions where appropriate.";
  } else if (/prospect|sales|follow up|follow-up|outreach|personalised|personalized/.test(text)) {
    title = "This could remove much of the preparation around sales follow-up";
    summary = "Existing customer and opportunity context can prepare the next communication automatically while keeping the final decision to send with your team.";
    approach = [
      "Use the relevant account, contact and opportunity context already held in your systems.",
      "Prepare the follow-up and present it for review rather than sending blindly.",
      "Record the approved action back in CRM so activity remains visible.",
    ];
    humanControl = "Human approval stays immediately before anything is sent externally.";
  }

  const complexity: Assessment["complexity"] = score >= 4 ? "Bespoke" : score >= 2 ? "Connected" : "Starter";
  const price = complexity === "Starter"
    ? "from £1,250"
    : complexity === "Connected"
      ? "typically £2,500–£5,000"
      : "scoped individually — usually £5,000+";
  const timeframe = complexity === "Starter"
    ? "often 1–2 weeks once access and rules are agreed"
    : complexity === "Connected"
      ? "often 2–4 weeks, depending on system access and testing"
      : "confirmed after a short discovery and integration check";

  return { title, summary, approach, systems: detectedSystems, humanControl, complexity, price, timeframe };
}

function addCalendlyPrefill(url: string, lead: LeadForm): string {
  try {
    const parsed = new URL(url);
    if (lead.name) parsed.searchParams.set("name", lead.name);
    if (lead.email) parsed.searchParams.set("email", lead.email);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function ProcessAssessment() {
  const [process, setProcess] = useState("");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState("");
  const [captureAvailable, setCaptureAvailable] = useState(false);
  const [lead, setLead] = useState<LeadForm>({ name: "", company: "", email: "", phone: "", website: "" });
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadState, setLeadState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health", { headers: { accept: "application/json" } })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!cancelled) setCaptureAvailable(Boolean(data?.leadCapture));
      })
      .catch(() => {
        if (!cancelled) setCaptureAvailable(false);
      });
    return () => { cancelled = true; };
  }, []);

  const assessmentMail = useMemo(() => {
    if (!assessment) return "";
    const body = [
      "Hi Kunle,",
      "",
      "I used the AI Midlands process assessment and would like to discuss this process:",
      "",
      process,
      "",
      `Initial assessment: ${assessment.title}`,
      `Indicative level: ${assessment.complexity}`,
      `Indicative budget: ${assessment.price}`,
      `Systems likely involved: ${assessment.systems.join(", ")}`,
      "",
      "Best regards,",
    ].join("\n");
    return `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent("My process assessment")}&body=${encodeURIComponent(body)}`;
  }, [assessment, process]);

  const assess = (event: FormEvent) => {
    event.preventDefault();
    const clean = process.trim();
    if (clean.length < 20) {
      setError("Give us a little more detail — one or two sentences is enough.");
      return;
    }
    setError("");
    if (!started.current) {
      trackCustomEvent("assessment_started", { intent: "process_assessment" });
      started.current = true;
    }
    const result = buildAssessment(clean);
    setAssessment(result);
    setLeadId(null);
    setLeadState("idle");
    trackCustomEvent("assessment_completed", {
      intent: "process_assessment",
      complexity: result.complexity,
      systems_count: result.systems.length,
    });
  };

  const submitLead = async (event: FormEvent) => {
    event.preventDefault();
    if (!assessment || leadState === "submitting") return;
    if (lead.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email.trim())) {
      setLeadError("Please add your name and a valid email address.");
      return;
    }

    setLeadState("submitting");
    setLeadError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          ...lead,
          process,
          assessment,
          attribution: getAttribution(),
          pagePath: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const data = await response.json().catch(() => null) as { ok?: boolean; id?: string; code?: string } | null;
      if (!response.ok || !data?.ok || !data.id) throw new Error(data?.code || "lead_capture_failed");

      setLeadId(data.id);
      setLeadState("sent");
      trackCustomEvent("lead_submitted", {
        intent: "process_assessment",
        complexity: assessment.complexity,
        systems_count: assessment.systems.length,
      });
      trackLeadCreated("process_assessment");
    } catch {
      setLeadState("error");
      setLeadError("We couldn't save the assessment just now. You can still email it to us or book a call below.");
    }
  };

  const reset = () => {
    setAssessment(null);
    setProcess("");
    setError("");
    setLead({ name: "", company: "", email: "", phone: "", website: "" });
    setLeadId(null);
    setLeadState("idle");
    setLeadError("");
    started.current = false;
  };

  const baseBookingUrl = withUtmParams("https://calendly.com/kunle2000/30min");
  const bookingUrl = addCalendlyPrefill(baseBookingUrl, lead);

  const markBookingStarted = () => {
    trackCustomEvent("booking_started", { intent: "process_assessment" });
    if (!leadId) return;
    void fetch(`/api/leads/${encodeURIComponent(leadId)}/booking-started`, {
      method: "POST",
      headers: { accept: "application/json" },
      keepalive: true,
    }).catch(() => undefined);
  };

  return (
    <section id="assessment" className="border-y border-orange-100 bg-[#fdf6ee] py-16 md:py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-9">
            <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Start with your problem</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-slate-900 leading-tight mb-5">What would you like to work better?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Describe one process that is repetitive, slow or awkward. We’ll give you an immediate first-pass view of what looks practical, the likely shape of a solution and the budget band it may sit in.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            <form onSubmit={assess} className="rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm">
              <label htmlFor="process-assessment" className="block font-semibold text-slate-900 mb-2">Describe the process</label>
              <p className="text-sm text-slate-500 mb-4">For example: “Every Friday Sarah downloads three spreadsheets and combines them for our sales meeting.”</p>
              <textarea
                id="process-assessment"
                value={process}
                onChange={(event) => setProcess(event.target.value)}
                rows={7}
                placeholder="What happens today, who does it, and which systems or files are involved?"
                className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
              {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs leading-relaxed text-slate-400">Don’t include passwords, confidential records or personal customer data.</p>
                <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#e85d2a] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#d14e1e]">
                  Assess this process <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="rounded-3xl bg-slate-900 p-6 md:p-8 text-white min-h-[360px]">
              {!assessment ? (
                <div className="h-full flex flex-col justify-between gap-10">
                  <div>
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">What you’ll get</p>
                    <h3 className="text-2xl font-bold mb-5">A practical first view, not an AI sales pitch.</h3>
                    <div className="space-y-3 text-slate-300">
                      {["What looks automatable", "Likely systems and hand-offs", "Where human control should remain", "Indicative complexity and budget band", "A sensible next step"].map(item => (
                        <div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 mt-1 text-orange-400 shrink-0" /><span>{item}</span></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">This is an indicative assessment, not a fixed quote. We confirm feasibility after checking the actual systems, access and rules involved.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-5 mb-6">
                    <div>
                      <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Your first-pass assessment</p>
                      <h3 className="text-2xl font-bold leading-tight">{assessment.title}</h3>
                    </div>
                    <button type="button" onClick={reset} className="text-slate-400 hover:text-white" aria-label="Start again"><RotateCcw className="w-4 h-4" /></button>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6">{assessment.summary}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"><p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Likely level</p><p className="font-semibold">{assessment.complexity}</p></div>
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"><p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Indicative budget</p><p className="font-semibold">{assessment.price}</p></div>
                  </div>

                  <div className="mb-6">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Likely approach</p>
                    <div className="space-y-2">{assessment.approach.map(item => <div key={item} className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>{item}</span></div>)}</div>
                  </div>

                  <div className="rounded-xl border border-slate-700 p-4 mb-6">
                    <div className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 mt-1 text-orange-400 shrink-0" /><div><p className="font-semibold text-sm mb-1">Human control</p><p className="text-sm text-slate-400">{assessment.humanControl}</p></div></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">{assessment.systems.map(system => <span key={system} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">{system}</span>)}</div>
                  <p className="text-sm text-slate-400 mb-6">Typical delivery: {assessment.timeframe}.</p>

                  {captureAvailable && leadState !== "sent" && (
                    <form onSubmit={submitLead} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 mb-5">
                      <p className="font-semibold mb-1">Send this assessment to AI Midlands</p>
                      <p className="text-sm text-slate-400 mb-4">Leave your details and we’ll have the process and first-pass assessment ready when we respond.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input value={lead.name} onChange={e => setLead(current => ({ ...current, name: e.target.value }))} placeholder="Your name *" autoComplete="name" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400" />
                        <input value={lead.company} onChange={e => setLead(current => ({ ...current, company: e.target.value }))} placeholder="Company" autoComplete="organization" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400" />
                        <input value={lead.email} onChange={e => setLead(current => ({ ...current, email: e.target.value }))} placeholder="Work email *" type="email" autoComplete="email" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400" />
                        <input value={lead.phone} onChange={e => setLead(current => ({ ...current, phone: e.target.value }))} placeholder="Phone (optional)" type="tel" autoComplete="tel" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400" />
                      </div>
                      <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={lead.website} onChange={e => setLead(current => ({ ...current, website: e.target.value }))} className="hidden" name="website" />
                      {leadError && <p className="mt-3 text-sm text-orange-200">{leadError}</p>}
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-[11px] leading-relaxed text-slate-500">By sending this, you’re asking AI Midlands to contact you about this assessment. See our <a className="underline hover:text-slate-300" href="/privacy">privacy notice</a>.</p>
                        <button disabled={leadState === "submitting"} type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-orange-50 disabled:opacity-60">{leadState === "submitting" ? "Sending…" : "Send assessment"} <ArrowRight className="w-4 h-4" /></button>
                      </div>
                    </form>
                  )}

                  {leadState === "sent" && (
                    <div className="rounded-2xl border border-green-800 bg-green-950/30 p-5 mb-5">
                      <p className="font-semibold text-green-200 mb-1">Assessment received.</p>
                      <p className="text-sm text-green-100/70">We now have the process and your first-pass assessment. If you want, book a short review and your email will be pre-filled.</p>
                    </div>
                  )}

                  {leadState === "error" && leadError && <p className="mb-4 text-sm text-orange-200">{leadError}</p>}

                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={markBookingStarted}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e85d2a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#d14e1e]"
                    ><Calendar className="w-4 h-4" /> Discuss this assessment</a>
                    <a
                      href={assessmentMail}
                      onClick={() => trackCustomEvent("assessment_contact_intent", { intent: "process_assessment", complexity: assessment.complexity })}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                    ><Mail className="w-4 h-4" /> Email it to us</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
