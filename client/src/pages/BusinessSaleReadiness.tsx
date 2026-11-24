import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AimArrow } from "@/components/brand/AiMidlandsIcons";

const bookCall = "https://calendly.com/kunle2000/30min";
const emailKunle = "mailto:kunle@ai-midlands.co.uk?subject=Private%20enquiry";
const examples = [
  {
    name: "Repeat orders",
    question: "Who knows what this customer usually orders?",
    today: "An order arrives by email. Someone asks you which part the customer means and whether last year’s price still applies.",
    change: "Match the email to the order history and draft a job card. Flag changes in price or specification for the nominated colleague to check.",
    evidence: "A completed job card showing who checked the details and released the order.",
  },
  {
    name: "Quoting",
    question: "Who can price a job while you’re away?",
    today: "The team can prepare a quote, but you remember which jobs need a different margin or a longer lead time.",
    change: "Record the pricing rules, bring costs into a draft quote and send unusual jobs to a named reviewer.",
    evidence: "A quote issued by the team, with the price, approval and reasoning recorded.",
  },
  {
    name: "Invoicing",
    question: "Who spots a finished job that hasn’t been invoiced?",
    today: "Accounts waits for you to confirm which jobs are complete and which ones still have a snag.",
    change: "Use the signed job record to prepare a draft invoice. Accounts reviews it and sees any disputed jobs in a separate list.",
    evidence: "A clear trail from completed job to approved invoice, including any items still on hold.",
  },
];

const buttonStyle = "inline-flex items-center justify-center gap-3 rounded-full bg-[#b63827] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#942e20] focus-visible:outline-2 focus-visible:outline-offset-4";
const sectionLabel = "mb-4 text-sm font-semibold text-[#a43324]";

export default function BusinessSaleReadiness() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];

  useEffect(() => {
    const previousTitle = document.title;
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const meta = existing ?? document.createElement("meta");
    const previousDescription = meta.content;
    document.title = "Preparing Your Business for Sale | AI Midlands";
    meta.name = "description";
    meta.content = "Preparing to sell a Midlands business? Reduce day-to-day reliance on you and show a buyer how your team handles orders, quotes and invoicing.";
    if (!existing) document.head.append(meta);
    return () => {
      document.title = previousTitle;
      if (existing) meta.content = previousDescription;
      else meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0f172b]">
      <header className="border-b border-[#e4dad0]">
        <div className="container flex min-h-[74px] max-w-6xl items-center justify-between gap-4">
          <Link href="/"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands home" className="h-9 w-auto sm:h-11" /></Link>
          <a href={emailKunle} className="text-sm font-semibold text-[#9f3427] underline underline-offset-4">Email Kunle</a>
        </div>
      </header>

      <main>
        <section className="container grid max-w-6xl items-center gap-10 py-12 md:grid-cols-[1.08fr_0.92fr] md:gap-14 md:py-20">
          <div>
            <p className={sectionLabel}>Preparing your business for sale</p>
            <h1 className="max-w-[15ch] text-[clamp(2.65rem,5.5vw,4.75rem)] leading-[1.04] font-semibold tracking-[-0.055em]">
              Could someone else run the business without calling you?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
              When a buyer asks how the business will run after you leave, it helps to show them. We help Midlands owners take one job that still depends on them and put it in their team’s hands.
            </p>
            <a className={buttonStyle + " mt-7"} href={bookCall}>Book a private 30-minute call <AimArrow className="h-4 w-4 [--aim-icon-accent:white]" /></a>
            <p className="mt-3 text-sm text-slate-600">Speak directly with Kunle Ibidun in Redditch.</p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-[#d9cfc6] bg-white">
            <img src="/brand/hero-industrial-bg.jpg" alt="" className="h-44 w-full object-cover object-center sm:h-56 lg:h-64" />
            <figcaption className="border-t-4 border-[#b63827] p-6 sm:p-8">
              <p className={sectionLabel}>A question to start with</p>
              <p className="max-w-[24ch] font-serif text-2xl leading-tight sm:text-3xl">Think back to your last week off. What did the team still have to ring you about?</p>
            </figcaption>
          </figure>
        </section>

        <section className="border-y border-[#e4dad0] bg-white">
          <div className="container grid max-w-6xl gap-8 py-12 md:grid-cols-[0.82fr_1.18fr] md:gap-16 md:py-16">
            <div>
              <p className={sectionLabel}>Example handovers</p>
              <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">What could a buyer see working?</h2>
              <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose a handover example">
                {examples.map((item, index) => (
                  <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="handover-example"
                    className="rounded-full border border-[#cfc6bc] px-4 py-2 text-sm font-medium aria-pressed:border-[#0f172b] aria-pressed:bg-[#0f172b] aria-pressed:text-white hover:border-[#0f172b]"
                    onClick={() => setSelected(index)}>{item.name}</button>
                ))}
              </div>
            </div>
            <article id="handover-example" aria-live="polite" aria-atomic="true" className="border-l-2 border-[#b63827] pl-5 sm:pl-7">
              <h3 className="mb-5 text-2xl leading-tight font-semibold">{example.question}</h3>
              <dl className="space-y-4 text-base leading-relaxed text-slate-700">
                <div><dt className="font-semibold text-[#0f172b]">Where it sticks</dt><dd>{example.today}</dd></div>
                <div><dt className="font-semibold text-[#0f172b]">What we could automate</dt><dd>{example.change}</dd></div>
                <div><dt className="font-semibold text-[#0f172b]">What the buyer can see</dt><dd>{example.evidence}</dd></div>
              </dl>
            </article>
          </div>
        </section>

        <section className="container grid max-w-6xl gap-6 py-12 md:grid-cols-[0.82fr_1.18fr] md:gap-16 md:py-16">
          <div>
            <p className={sectionLabel}>Your first conversation</p>
            <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Bring one job you’d like to hand over.</h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-slate-700">
            <p>On the call we’ll talk through who does the work, where they need your judgement and what would help them take it on. A recent example is enough. You can leave customer names and sale figures out of it.</p>
            <p>If it makes sense to go further, we’ll scope and price the work first. That could mean documenting a decision, automating a routine step and testing whether a colleague can run it unaided. You’ll have the instructions and a worked example to hand over.</p>
            <p className="text-base"><strong>Already on the market?</strong> We’ll focus on what can realistically be improved before handover and what is better left for the new owner.</p>
            <div className="flex flex-wrap items-center gap-5 pt-2"><a className={buttonStyle} href={bookCall}>Book a private call <AimArrow className="h-4 w-4 [--aim-icon-accent:white]" /></a><a href={emailKunle} className="text-sm font-semibold text-[#9f3427] underline underline-offset-4">Email Kunle directly</a></div>
          </div>
        </section>
      </main>
      <footer className="bg-[#0f172b] py-8 text-sm text-white">
        <div className="container flex max-w-6xl flex-wrap items-center justify-between gap-5">
          <Link href="/"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands home" className="h-8 w-auto brightness-0 invert" /></Link>
          <nav aria-label="Footer" className="flex gap-5"><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
        </div>
      </footer>
    </div>
  );
}
