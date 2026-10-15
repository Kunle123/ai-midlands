import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AimArrow, ApprovalIcon, AssessmentIcon, BookingIcon, ControlIcon, EnquiryIcon } from "@/components/brand/AiMidlandsIcons";
import { getAttribution, trackCustomEvent, trackLeadCreated, withUtmParams } from "@/lib/tracking";
import { buildAssessment, type Assessment, type ProcessDetails } from "@/lib/processAssessment";

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
};

const emptyDetails: ProcessDetails = { trigger: "", systems: "", outcome: "", frequency: "" };

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

function StepMark() {
  return <span className="mt-1 h-2 w-2 rounded-full bg-[#c83927] shrink-0" />;
}

export function ProcessAssessment() {
  const [process, setProcess] = useState("");
  const [details, setDetails] = useState<ProcessDetails>(emptyDetails);
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
    if (!details.trigger || !details.systems.trim() || !details.outcome || !details.frequency) {
      setError("Answer the four short questions so the first-pass assessment has enough context.");
      return;
    }
    const result = buildAssessment(clean, details);
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
    setDetails(emptyDetails);
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
    <section id="assessment" className="border-y border-[#eadfd6] bg-[#fff4ed] py-18 md:py-24">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]"><AssessmentIcon className="w-7 h-7" /><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Start with the problem</p></div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-tight mb-5">Tell us about one task your team should not have to do by hand.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">In a few lines, tell us what happens now. We will come back with a straight view of what could be simplified, what might be worth automating, which systems are involved, and the likely budget range.</p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            <form onSubmit={assess} className="rounded-[28px] border border-[#eadfd6] bg-white p-6 md:p-8">
              <label htmlFor="process-assessment" className="block font-semibold text-[#0f172b] mb-2">What happens today?</label>
              <p className="text-sm text-slate-500 mb-4">For example: “Each Friday, we combine three sales spreadsheets before the team meeting.”</p>
              <textarea
                id="process-assessment"
                value={process}
                onChange={(event) => setProcess(event.target.value)}
                rows={7}
                placeholder="For example: “Each Friday, we combine three sales spreadsheets before the team meeting.”"
                className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]"
              />
              <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                <p className="text-sm font-semibold text-[#0f172b]">A few details to make the first view more relevant</p>
                <label className="block text-sm text-slate-700">What starts the process?
                  <select value={details.trigger} onChange={e => setDetails(current => ({ ...current, trigger: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]">
                    <option value="">Choose one</option><option value="Email or shared inbox">Email or shared inbox</option><option value="Website form">Website form</option><option value="CRM status or sales event">CRM status or sales event</option><option value="Document or file arrives">Document or file arrives</option><option value="Approval is requested">Approval is requested</option><option value="Scheduled or recurring task">Scheduled or recurring task</option><option value="Customer question or request">Customer question or request</option><option value="Not sure">Not sure</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">Which systems are involved?
                  <input value={details.systems} onChange={e => setDetails(current => ({ ...current, systems: e.target.value }))} placeholder="For example: Outlook, HubSpot and Xero" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]" />
                </label>
                <label className="block text-sm text-slate-700">What outcome is needed?
                  <select value={details.outcome} onChange={e => setDetails(current => ({ ...current, outcome: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]">
                    <option value="">Choose one</option><option value="Create or update a CRM record">Create or update a CRM record</option><option value="Prepare or send a follow-up">Prepare or send a follow-up</option><option value="Create an invoice or finance record">Create an invoice or finance record</option><option value="Route or assign work">Route or assign work</option><option value="Prepare a report">Prepare a report</option><option value="Answer a customer">Answer a customer</option><option value="Collect an approval">Collect an approval</option><option value="Not sure">Not sure</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">How often does it happen?
                  <select value={details.frequency} onChange={e => setDetails(current => ({ ...current, frequency: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-[#c83927] focus:ring-4 focus:ring-[#f8ddd3]">
                    <option value="">Choose one</option><option value="Several times a day">Several times a day</option><option value="Daily">Daily</option><option value="Weekly">Weekly</option><option value="Monthly">Monthly</option><option value="Irregularly">Irregularly</option><option value="Not sure">Not sure</option>
                  </select>
                </label>
              </div>
              {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
              <div className="mt-4 flex justify-end">
                <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#c83927] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#a92f21]">Get a first view of this process <AimArrow className="w-4 h-4 [--aim-icon-accent:#fff]" /></button>
              </div>
            </form>

            <div className="rounded-[28px] bg-[#0f172b] p-6 md:p-8 text-white min-h-[360px]">
              {!assessment ? (
                <div className="h-full flex flex-col justify-between gap-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4 [--aim-icon-accent:#f0a08b]"><EnquiryIcon className="w-7 h-7 text-white" /><p className="text-[#f0a08b] text-xs font-bold uppercase tracking-[0.16em]">What you will get</p></div>
                    <h3 className="text-2xl font-semibold mb-3">A clear view of what to fix first.</h3>
                    <p className="text-slate-400 mb-5">We will look at the process before suggesting a tool.</p>
                    <div className="space-y-3 text-slate-300">{["The steps that could be simpler", "The hand-offs that may be worth automating", "The systems and people involved", "The points where someone should stay in control", "A likely level of complexity, budget range, and sensible next step"].map(item => <div key={item} className="flex items-start gap-3"><StepMark /><span>{item}</span></div>)}</div>
                  </div>
                  <p className="text-xs text-slate-500">This is an initial view, not a fixed quote. We confirm what is feasible once we have checked the real process, systems, access, and rules involved.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-5 mb-6">
                    <div><p className="text-[#f0a08b] text-xs font-bold uppercase tracking-[0.16em] mb-2">Your first-pass assessment</p><h3 className="text-2xl font-semibold leading-tight">{assessment.title}</h3></div>
                    <button type="button" onClick={reset} className="text-xs text-slate-400 hover:text-white underline underline-offset-4">Start again</button>
                  </div>

                    <p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-wider mb-2">{assessment.processType} · {assessment.confidence === "clear" ? "First-pass view" : "Needs a little more detail"}</p>
                    <p className="text-slate-300 leading-relaxed mb-6">{assessment.summary}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"><p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Indicative complexity</p><p className="font-semibold">{assessment.complexity}</p></div>
                    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"><p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Indicative budget</p><p className="font-semibold">{assessment.price}</p></div>
                  </div>

                  <div className="mb-6"><p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Likely approach</p><div className="space-y-2">{assessment.approach.map(item => <div key={item} className="flex gap-3 text-sm text-slate-300"><StepMark /><span>{item}</span></div>)}</div></div>

                  <div className="rounded-xl border border-slate-700 p-4 mb-6 [--aim-icon-accent:#f0a08b]"><div className="flex items-start gap-3"><ApprovalIcon className="w-5 h-5 mt-0.5 text-white shrink-0" /><div><p className="font-semibold text-sm mb-1">Human control</p><p className="text-sm text-slate-400">{assessment.humanControl}</p></div></div></div>

                  <div className="flex flex-wrap gap-2 mb-6">{assessment.systems.map(system => <span key={system} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">{system}</span>)}</div>
                  <p className="text-sm text-slate-400 mb-6">Typical delivery: {assessment.timeframe}.</p>

                  {captureAvailable && leadState !== "sent" && (
                    <form onSubmit={submitLead} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 mb-5">
                      <p className="font-semibold mb-1">Send this assessment to AI Midlands</p>
                      <p className="text-sm text-slate-400 mb-4">Leave your details and we’ll have the process and first-pass assessment ready when we respond.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input value={lead.name} onChange={e => setLead(current => ({ ...current, name: e.target.value }))} placeholder="Your name *" aria-label="Your name" autoComplete="name" required minLength={2} className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#f0a08b]" />
                        <input value={lead.company} onChange={e => setLead(current => ({ ...current, company: e.target.value }))} placeholder="Company" autoComplete="organization" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#f0a08b]" />
                        <input value={lead.email} onChange={e => setLead(current => ({ ...current, email: e.target.value }))} placeholder="Work email *" aria-label="Work email" type="email" autoComplete="email" required className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#f0a08b]" />
                        <input value={lead.phone} onChange={e => setLead(current => ({ ...current, phone: e.target.value }))} placeholder="Phone (optional)" type="tel" autoComplete="tel" className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#f0a08b]" />
                      </div>
                      <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={lead.website} onChange={e => setLead(current => ({ ...current, website: e.target.value }))} className="hidden" name="website" />
                      {leadError && <p className="mt-3 text-sm text-orange-200">{leadError}</p>}
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><p className="text-[11px] leading-relaxed text-slate-500">By sending this, you’re asking AI Midlands to contact you about this assessment. See our <a className="underline hover:text-slate-300" href="/privacy">privacy notice</a>.</p><button disabled={leadState === "submitting"} type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-[#fff4ed] disabled:opacity-60">{leadState === "submitting" ? "Sending…" : "Send assessment"} <AimArrow className="w-4 h-4" /></button></div>
                    </form>
                  )}

                  {leadState === "sent" && <div className="rounded-2xl border border-green-800 bg-green-950/30 p-5 mb-5"><p className="font-semibold text-green-200 mb-1">Assessment received.</p><p className="text-sm text-green-100/70">We now have the process and your first-pass assessment. If you want, book a short review and your email will be pre-filled.</p></div>}
                  {leadState === "error" && leadError && <p className="mb-4 text-sm text-orange-200">{leadError}</p>}

                  <div className="grid sm:grid-cols-2 gap-3">
                    <a href={bookingUrl} target="_blank" rel="noreferrer" onClick={markBookingStarted} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c83927] px-4 py-3 text-sm font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]"><BookingIcon className="w-5 h-5" /> Discuss this assessment</a>
                    <a href={assessmentMail} onClick={() => trackCustomEvent("assessment_contact_intent", { intent: "process_assessment", complexity: assessment.complexity })} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 [--aim-icon-accent:#f0a08b]"><EnquiryIcon className="w-5 h-5" /> Email it to us</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 [--aim-icon-accent:#c83927]"><ControlIcon className="w-5 h-5 text-[#0f172b]" /><span>Your information is used only to assess and respond to your enquiry.</span></div>
        </div>
      </div>
    </section>
  );
}
