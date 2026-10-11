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

const opportunities = [
  {
    title: "Find where AI is genuinely useful",
    text: "Look across the work your teams already do and identify where AI or automation could remove effort, improve speed, or make better use of information.",
  },
  {
    title: "Separate useful ideas from distractions",
    text: "Not every process needs AI. We filter out ideas that are too risky, too complicated, or unlikely to create enough value to justify the effort.",
  },
  {
    title: "Choose the right first move",
    text: "Rank the strongest opportunities by value, feasibility, risk, and effort so you can start with something useful rather than something fashionable.",
  },
];

const reviewSteps = [
  {
    number: "01",
    title: "Understand the business",
    text: "We start with how the business works today: where time goes, where information gets stuck, what customers need, and where teams are doing repetitive work.",
  },
  {
    number: "02",
    title: "Map the opportunities",
    text: "We identify practical uses of AI and automation across operations, customer service, sales, finance, reporting, and internal workflows.",
  },
  {
    number: "03",
    title: "Prioritise what is worth doing",
    text: "Each opportunity is assessed for likely value, complexity, data needs, risk, and how quickly it could be tested.",
  },
  {
    number: "04",
    title: "Recommend the first move",
    text: "You leave with a prioritised shortlist, a sensible first project, and a clear view of what to do next — including what not to pursue yet.",
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
      "Not sure where AI fits your business? AI Midlands identifies practical opportunities, filters out distractions, and gives you a prioritised roadmap for what to do first.",
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
                Not sure where AI fits your business?
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-7 max-w-3xl">
                You do not need an AI strategy full of ideas. You need to know where AI could create real value, what is practical now, and what should wait. We help you find the opportunities worth pursuing and choose a sensible first move.
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
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28] mb-5">What you leave with</p>
              <div className="space-y-4">
                {[
                  "A practical shortlist of AI and automation opportunities",
                  "A simple view of value, feasibility, effort, and risk",
                  "The 2–3 opportunities worth exploring first",
                  "A recommended first project and next-step roadmap",
                  "A clear view of ideas that are not worth pursuing yet",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-[#eee7e0] bg-[#fffaf6] px-4 py-4">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c83927]" />
                    <p className="text-slate-700 leading-relaxed">{item}</p>
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
                  AI is moving quickly. You can see competitors experimenting, your team is hearing about new tools, and there is pressure to do something — but no obvious place to start.
                </p>
              </article>
              <article className="rounded-[26px] bg-[#0f172b] p-7 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a08b] mb-3">The outcome</p>
                <p className="text-lg leading-relaxed text-slate-100">
                  A grounded view of where AI could help your business, which opportunities deserve attention now, and the first move most likely to produce useful evidence.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-10">
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">What the review is for</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-4">
                Turn vague AI interest into a small number of decisions.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The aim is not to produce a long list of possibilities. It is to reduce uncertainty and give you a practical route from curiosity to action.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {opportunities.map((item, index) => (
                <article key={item.title} className="rounded-[24px] border border-[#e5ddd5] bg-white p-6">
                  <span className="text-[#b43a28] text-xs font-bold tracking-[0.16em]">0{index + 1}</span>
                  <h3 className="font-semibold text-[#0f172b] text-lg mt-6 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.text}</p>
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
                  <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">How it works</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06]">
                  Start with the business, not the technology.
                </h2>
              </div>
              <div className="space-y-4">
                {reviewSteps.map((step) => (
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
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
            <article className="rounded-[26px] border border-[#eadfd6] bg-[#fff4ed] p-7">
              <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]">
                <ControlIcon className="w-6 h-6" />
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">No pressure to automate everything</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-3">
                Sometimes the right answer is “not yet”.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We are as interested in ruling out weak ideas as finding strong ones. If a process is not ready, the data is not suitable, or the effort is unlikely to pay back, that should be visible before you invest in it.
              </p>
            </article>

            <article className="rounded-[26px] border border-[#e5ddd5] bg-white p-7">
              <div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]">
                <IntegrationIcon className="w-6 h-6" />
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">If there is something worth building</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-3">
                The review can lead directly into implementation.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If the review identifies a worthwhile first project, AI Midlands can design and implement it. Our fixed-scope automation work starts from £2,000, with the outcome agreed up front.
              </p>
              <Link href="/">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">
                  See how we deliver automation <AimArrow className="w-4 h-4" />
                </span>
              </Link>
            </article>
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
                  Tell us what the business does, where you think AI might matter, and what is creating pressure or curiosity. We will help you decide whether an Opportunity Review is the right next step.
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
