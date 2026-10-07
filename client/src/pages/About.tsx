import { useEffect } from "react";
import { Link } from "wouter";
import { AimArrow, ApprovalIcon, BookingIcon, ControlIcon, EnquiryIcon, IntegrationIcon, WorkflowIcon } from "@/components/brand/AiMidlandsIcons";

const FOUNDER_IMAGE = "/brand/kunle-founder.jpg";
const BOOK_CALL_URL = "https://calendly.com/kunle2000/30min";

const principles = [
  { title: "Redesign before automation", text: "We map how the work actually happens and remove avoidable steps before deciding what should be automated.", icon: EnquiryIcon },
  { title: "Technology fits the work", text: "We use and connect the systems your team already depends on wherever possible, rather than adding another disconnected tool, login or place to copy information.", icon: IntegrationIcon },
  { title: "Keep people in control", text: "Approvals, exceptions and judgement stay with people when they should. Automation handles the repeatable work around them.", icon: ApprovalIcon },
  { title: "Delivery discipline", text: "A small automation still needs clear scope, reliable hand-offs, testing, controls and ownership if it is going to make work genuinely easier.", icon: ControlIcon },
];

export default function About() {
  useEffect(() => {
    document.title = "About Kunle Ibidun | AI Midlands";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Meet Kunle Ibidun, founder of AI Midlands. Process redesign, AI automation and integration grounded in more than two decades of complex digital delivery.");
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-[#e8e0d8] bg-[#faf8f5]/94 backdrop-blur-xl">
        <div className="container min-h-[74px] flex items-center justify-between gap-6">
          <Link href="/"><div className="cursor-pointer shrink-0" aria-label="AI Midlands home"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[46px] w-auto object-contain" /></div></Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a href="/#services" className="text-slate-600 hover:text-[#c83927] transition-colors">Services</a>
            <a href="/#proof" className="text-slate-600 hover:text-[#c83927] transition-colors">Examples</a>
            <a href="/#pricing" className="text-slate-600 hover:text-[#c83927] transition-colors">Pricing</a>
            <a href="/#approach" className="text-slate-600 hover:text-[#c83927] transition-colors">How we work</a>
            <span className="font-semibold text-[#0f172b]">About</span>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/#assessment" className="hidden sm:inline-flex items-center gap-2 border-b-2 border-[#c83927] pb-1 text-sm font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">Assess a process <AimArrow className="w-4 h-4" /></a>
            <a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a92f21] transition-colors [--aim-icon-accent:#fff]">Book a call <AimArrow className="w-4 h-4" /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            <div>
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">About AI Midlands</p>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.02] text-[#0f172b] mb-7">Practical AI, delivered with enterprise discipline.</h1>
              <p className="text-xl leading-relaxed text-slate-700 mb-5">I’m Kunle Ibidun, founder of AI Midlands. I’ve spent more than two decades delivering complex digital, integration and technology change.</p>
              <p className="text-lg leading-relaxed text-slate-600 mb-8">AI Midlands starts with the work itself: how people, information and decisions move today, what could be simpler, and only then where AI, automation or integration genuinely helps.</p>
              <div className="flex flex-wrap gap-3"><a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-6 py-3 text-white font-semibold hover:bg-[#a92f21] [--aim-icon-accent:#fff]"><BookingIcon className="w-5 h-5" /> Book an automation review</a><a href="mailto:hello@ai-midlands.co.uk?subject=AI%20Midlands%20automation%20enquiry" className="inline-flex items-center gap-2 rounded-full border border-[#d9cfc6] bg-white px-6 py-3 text-slate-700 font-semibold hover:border-[#c83927] [--aim-icon-accent:#c83927]"><EnquiryIcon className="w-5 h-5" /> Tell me the process</a></div>
            </div>
            <figure className="relative max-w-[500px] lg:ml-auto"><div className="absolute -inset-5 rounded-[2rem] bg-[#f4dfd5] -rotate-2" aria-hidden="true" /><div className="relative overflow-hidden rounded-[1.75rem] border border-[#eadfd6] bg-white"><img src={FOUNDER_IMAGE} alt="Kunle Ibidun, founder of AI Midlands" className="aspect-[3/4] w-full object-cover object-top" /><figcaption className="border-t border-[#eadfd6] bg-white px-5 py-4"><p className="font-semibold text-[#0f172b]">Kunle Ibidun</p><p className="text-sm text-slate-500">Founder · AI Midlands</p></figcaption></div></figure>
          </div>
        </section>

        <section className="border-y border-[#e8e0d8] bg-white py-8"><div className="container"><div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[["20+ years","digital and integration delivery"],["Public sector","complex, governed environments"],["Transport & energy","digital and systems change"],["Financial services","delivery, data and integration"]].map(([a,b]) => <div key={a} className="border-l-2 border-[#c83927] pl-4"><p className="text-xl font-semibold text-[#0f172b]">{a}</p><p className="text-sm text-slate-500 mt-1">{b}</p></div>)}</div></div></section>

        <section className="container py-20 md:py-28"><div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start"><div><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Why AI Midlands exists</p><h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06]">Automating one step is not the same as improving the work.</h2></div><div className="space-y-5 text-lg leading-relaxed text-slate-600"><p>If your team has to open another application, remember another password, copy information somewhere else or change the way they work just to accommodate an automation, we have probably moved the problem rather than solved it.</p><p>That is why process redesign is a standard part of every AI Midlands engagement. We listen to the people doing the work, map how information and decisions actually move through the business, and look for the simplest way the process could work. Then we decide where AI, automation or integration genuinely helps.</p><p className="font-semibold text-[#0f172b]">The technology should fit the work. Not the other way around.</p></div></div></section>

        <section className="bg-[#fff4ed] border-y border-[#eadfd6] py-20 md:py-24"><div className="container"><div className="max-w-6xl mx-auto"><div className="max-w-3xl mb-12"><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">What buying from AI Midlands means</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b]">A small engagement should still be designed and delivered properly.</h2></div><div className="grid md:grid-cols-2 gap-5">{principles.map(({title,text,icon:Icon}) => <article key={title} className="rounded-[26px] border border-[#eadfd6] bg-white p-7"><div className="w-11 h-11 rounded-2xl border border-[#eadfd6] bg-[#fffaf6] text-[#0f172b] grid place-items-center [--aim-icon-accent:#c83927] mb-5"><Icon className="w-6 h-6" /></div><h3 className="text-xl font-semibold text-[#0f172b] mb-2">{title}</h3><p className="text-slate-600 leading-relaxed">{text}</p></article>)}</div></div></div></section>

        <section className="container py-20 md:py-24"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start"><div><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Builder as well as delivery lead</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] mb-5">I also build products, not just recommendations.</h2><p className="text-slate-600 leading-relaxed mb-6">I’m also the founder of Arokin, a companion app for projects and programmes. Building and operating a product keeps the work grounded in the practical details that matter: data, integrations, user experience, testing and deployment.</p><a href="https://arokin.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324]">See Arokin <AimArrow className="w-4 h-4" /></a></div><div className="rounded-[26px] bg-[#0f172b] text-white p-7 [--aim-icon-accent:#f0a08b]"><div className="flex items-center gap-3 mb-5"><WorkflowIcon className="w-7 h-7" /><p className="font-semibold">Delivery perspective</p></div><div className="space-y-4 text-slate-300">{["Complex multi-team and multi-supplier delivery","Integration and digital delivery","Governance, dependencies and risk","Executive reporting and decision support"].map(item => <div key={item} className="flex gap-3"><span className="h-2 w-2 rounded-full bg-[#f0a08b] mt-2 shrink-0" /><span>{item}</span></div>)}</div></div></div></section>

        <section className="bg-[#0f172b] py-16 text-white"><div className="container"><div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8"><div><p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Have a process in mind?</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em]">Show me the work. I’ll tell you what looks practical.</h2></div><Link href="/"><span className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-6 py-3 font-semibold cursor-pointer">Assess a process <AimArrow className="w-4 h-4 [--aim-icon-accent:#fff]" /></span></Link></div></div></section>
      </main>
    </div>
  );
}
