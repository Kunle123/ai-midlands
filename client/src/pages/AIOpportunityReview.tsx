import { useEffect } from "react";
import { Link } from "wouter";
import {
  AimArrow,
  ApprovalIcon,
  BookingIcon,
  ControlIcon,
  IntegrationIcon,
  WorkflowIcon,
} from "@/components/brand/AiMidlandsIcons";

const BOOK_CALL_URL = "https://calendly.com/kunle2000/30min";

const opportunityLenses = [
  { title: "Faster processing", text: "Where could AI shorten cycle times, remove waiting, or help work move sooner?" },
  { title: "Reduced workload", text: "Where are people repeatedly reading, re-keying, checking, chasing, or preparing information?" },
  { title: "Reduced cost", text: "Where could effort, rework, external spend, or avoidable processing cost be reduced?" },
  { title: "Self-service", text: "Where could customers or staff get answers or complete useful tasks without waiting for someone else?" },
  { title: "Data mining", text: "What useful insight, risk, pattern, or opportunity may already be hidden in the information you hold?" },
  { title: "Quality and consistency", text: "Where could AI reduce errors, improve completeness, or help teams apply a process more consistently?" },
  { title: "Capacity and scale", text: "Where could the business handle more work without increasing effort at the same rate?" },
  { title: "Customer and revenue", text: "Where could faster responses, better information, or more relevant interactions improve service or growth?" },
];

const outputs = [
  {
    title: "AI Opportunity Map",
    text: "A visual view of where AI could create value across efficiency, self-service, information, quality, capacity, customer experience, and growth.",
  },
  {
    title: "Prioritised AI Roadmap",
    text: "A ranked shortlist showing which opportunities are worth pursuing first, using value, feasibility, risk, effort, data readiness, and time to value.",
  },
  {
    title: "AI Change Delivery Pack",
    text: "A practical pack for the selected opportunity covering future process, impacted roles, ownership, training, communications, adoption, benefits, risks, and readiness.",
  },
];

const engagementSteps = [
  {
    number: "01",
    title: "Listen",
    text: "Start with the leadership context: why AI matters now, where the pressure is, and what the business is trying to improve. You do not need to arrive with a use case.",
  },
  {
    number: "02",
    title: "Scan",
    text: "Speak to the people closest to the work and review the main workflows, systems, information sources, customer journeys, and recurring decisions.",
  },
  {
    number: "03",
    title: "Map",
    text: "Use the AI Midlands Opportunity Lens to identify where AI or automation could create useful value — and where it probably would not.",
  },
  {
    number: "04",
    title: "Prioritise",
    text: "Assess the strongest opportunities for value, feasibility, risk, effort, data readiness, integration complexity, and how quickly useful evidence could be produced.",
  },
  {
    number: "05",
    title: "Prepare for change",
    text: "For the selected opportunity, define what changes around the technology: process, roles, decisions, ownership, training, communications, adoption, and benefits measures.",
  },
  {
    number: "06",
    title: "Deliver",
    text: "Your own change or transformation team can deliver against the pack, we can work alongside them, or AI Midlands can implement the first technical solution as a separate engagement.",
  },
];

export default function AIOpportunityReview() {
  useEffect(() => {
    document.title = "AI Opportunity Review for Business | AI Midlands";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "AI Midlands helps leaders find where AI can create value, prioritise what is practical, and give their teams a clear route to deliver the change.",
    );
  }, []);

  const mailHref = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent("AI Opportunity Review")}&body=${encodeURIComponent("Hi Kunle,\n\nI would like to discuss where AI could be useful in our business.\n\nA little about the business:\n\n")}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-[#eadfd6] bg-[#faf8f5]/95 backdrop-blur-xl">
        <div className="container min-h-[76px] flex items-center justify-between gap-6">
          <Link href="/">
            <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[42px] w-auto cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/about">
              <span className="hidden md:inline text-sm text-slate-600 hover:text-[#c83927] cursor-pointer">About</span>
            </Link>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]"
            >
              <BookingIcon className="w-4 h-4" /> Book an AI opportunity call
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.06fr_0.94fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">AI Opportunity Review</p>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.03] text-[#0f172b] mb-6">
                You do not need to know your AI use case.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-7 max-w-3xl">
                We help you find where AI can create value, decide what is practical, and give your team a clear route to deliver it. The aim is not a long AI strategy. It is a small number of useful decisions and a first move the business can actually carry through.
              </p>
              <div className="flex flex-wrap gap-3 mb-5">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-6 py-3 text-white font-semibold hover:bg-[#a92f21] [--aim-icon-accent:#fff]"
                >
                  <BookingIcon className="w-5 h-5" /> Book an AI opportunity call
                </a>
                <a
                  href={mailHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d9cfc6] bg-white px-6 py-3 font-semibold text-slate-700 hover:border-[#c83927] [--aim-icon-accent:#c83927]"
                >
                  Tell us about your business <AimArrow className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-slate-500">For leaders who know AI matters but do not yet have a defined use case.</p>
            </div>

            <div className="rounded-[30px] border border-[#e5ddd5] bg-white p-6 md:p-8 shadow-[0_24px_60px_rgba(15,23,43,0.08)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28] mb-5">Three practical outputs</p>
              <div className="space-y-4">
                {outputs.map((item, index) => (
                  <div key={item.title} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-[#eee7e0] bg-[#fffaf6] px-4 py-4">
                    <span className="text-[#b43a28] text-xs font-bold tracking-[0.16em] pt-1">0{index + 1}</span>
                    <div>
                      <p className="font-semibold text-[#0f172b] mb-1">{item.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#eadfd6] bg-[#fff4ed] py-16">
          <div className="container">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              <article className="rounded-[26px] border border-[#eadfd6] bg-white p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28] mb-3">The situation</p>
                <p className="text-lg leading-relaxed text-slate-700">
                  You can see AI moving quickly and know the business should understand what it means. But buying tools before knowing where the value is risks creating experiments that never become useful change.
                </p>
              </article>
              <article className="rounded-[26px] bg-[#0f172b] p-7 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a08b] mb-3">The outcome</p>
                <p className="text-lg leading-relaxed text-slate-100">
                  A grounded view of where AI could help, the opportunities worth pursuing first, and what has to change around the technology for the benefit to be realised.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-10">
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">The AI Midlands Opportunity Lens</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-4">
                Look for value before looking for technology.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We look across the business through a consistent set of lenses. That helps uncover opportunities executives can recognise even when nobody has yet defined an AI project.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {opportunityLenses.map((item) => (
                <article key={item.title} className="rounded-[22px] border border-[#e5ddd5] bg-white p-5">
                  <h3 className="font-semibold text-[#0f172b] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-[#e8e0d8] py-20 md:py-24">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-20 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]">
                  <WorkflowIcon className="w-6 h-6" />
                  <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">The engagement</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-4">
                  Listen. Scan. Map. Prioritise. Prepare for change. Deliver.
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  The technology is only part of the job. The process is designed to move from executive uncertainty to a deliverable change, without requiring you to know the answer at the start.
                </p>
              </div>
              <div className="space-y-4">
                {engagementSteps.map((step) => (
                  <article key={step.number} className="grid grid-cols-[auto_1fr] gap-4 rounded-[22px] border border-[#e8e0d8] bg-[#faf8f5] p-5">
                    <span className="text-[#b43a28] text-xs font-bold tracking-[0.16em] pt-1">{step.number}</span>
                    <div>
                      <h3 className="font-semibold text-[#0f172b] mb-1">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-stretch">
            <article className="rounded-[28px] border border-[#eadfd6] bg-[#fff4ed] p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]">
                <ControlIcon className="w-6 h-6" />
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">The change dimension</p>
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-4">
                Finding the opportunity is not enough.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                A useful AI idea can still fail if the surrounding process, roles, ownership, decisions, training, communications, or measures do not change with it. For the selected opportunity, we make those dependencies explicit before delivery begins.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {["Current and future process", "Impacted roles and teams", "Decision rights and human oversight", "Training and communications", "Adoption and readiness measures", "Benefits baseline and tracking", "Risks and resistance", "Ownership and support model"].map((item) => (
                  <div key={item} className="flex gap-2 items-start"><span className="mt-1.5 h-2 w-2 rounded-full bg-[#c83927] shrink-0" />{item}</div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-[#e5ddd5] bg-white p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]">
                <ApprovalIcon className="w-6 h-6" />
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Built to work with your team</p>
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-4">
                Your change team can deliver against the pack.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                If you already have change, transformation, operations, or delivery capability, the review is designed to strengthen it rather than replace it. We provide a practical AI Change Delivery Pack your team can take forward.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you need more support, AI Midlands can work alongside that team or implement the first technical solution as a separate engagement.
              </p>
            </article>
          </div>
        </section>

        <section className="border-y border-[#e8e0d8] bg-white py-16">
          <div className="container">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              <article className="rounded-[26px] border border-[#eadfd6] bg-[#faf8f5] p-7">
                <p className="text-[#b43a28] text-xs font-bold uppercase tracking-[0.16em] mb-3">We also rule things out</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-3">Sometimes the right answer is “not yet”.</h2>
                <p className="text-slate-600 leading-relaxed">
                  If the data is not ready, the process is unstable, the risk is too high, or the likely benefit does not justify the effort, that should be visible before you spend money on implementation.
                </p>
              </article>

              <article className="rounded-[26px] bg-[#0f172b] p-7 text-white">
                <div className="flex items-center gap-3 mb-4 [--aim-icon-accent:#f0a08b]">
                  <IntegrationIcon className="w-6 h-6" />
                  <p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em]">When something is worth building</p>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] mb-3">The roadmap can move directly into delivery.</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  AI Midlands can design and implement a selected opportunity. Fixed-scope automation work starts from £2,000, with the outcome agreed up front.
                </p>
                <Link href="/">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f0a08b] cursor-pointer">
                    See how we deliver automation <AimArrow className="w-4 h-4" />
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#0f172b] py-16 text-white">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3 [--aim-icon-accent:#f0a08b]">
                  <ApprovalIcon className="w-6 h-6" />
                  <p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em]">A sensible first conversation</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em]">You do not need to know the use case before you call.</h2>
                <p className="text-slate-300 mt-3 max-w-2xl">
                  Tell us what the business does, what is creating pressure or curiosity, and where you think AI may matter. We will help you decide whether an Opportunity Review is the right next step.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c83927] px-6 py-3 font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]"
                >
                  <BookingIcon className="w-5 h-5" /> Book an AI opportunity call
                </a>
                <a href={mailHref} className="inline-flex items-center justify-center text-sm font-semibold text-slate-400 hover:text-white">
                  Email us instead
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e8e0d8] bg-white">
        <div className="container py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-slate-500">
          <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[36px] w-auto" />
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/about"><span className="cursor-pointer hover:text-[#c83927]">About</span></Link>
            <Link href="/privacy"><span className="cursor-pointer hover:text-[#c83927]">Privacy</span></Link>
            <Link href="/terms"><span className="cursor-pointer hover:text-[#c83927]">Terms</span></Link>
            <Link href="/"><span className="cursor-pointer hover:text-[#c83927]">Home</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
