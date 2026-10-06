import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { ProcessAssessment } from "@/components/ProcessAssessment";
import { Button } from "@/components/ui/button";
import {
  AimArrow,
  ApprovalIcon,
  AssistantIcon,
  ControlIcon,
  EnquiryIcon,
  IntegrationIcon,
  OutreachIcon,
  ScopeIcon,
  WorkflowIcon,
} from "@/components/brand/AiMidlandsIcons";

const FOUNDER_IMAGE = "https://arokin.org/media/kunle-ibidun-founder.jpg";

const SERVICE_CARDS = [
  {
    number: "01",
    title: "Automate enquiries and admin",
    description: "Turn incoming emails, forms and documents into structured records, tasks and updates without re-keying information by hand.",
    examples: ["Email → CRM or spreadsheet", "Document data extraction", "Automatic triage and routing"],
    icon: EnquiryIcon,
    href: "/business-automation",
  },
  {
    number: "02",
    title: "Automate business processes",
    description: "Connect the steps your team already performs so one business event can trigger the next action automatically.",
    examples: ["CRM win → invoice", "Approval → follow-up task", "Status change → customer update"],
    icon: WorkflowIcon,
    href: "/workflow-automation",
  },
  {
    number: "03",
    title: "Build useful customer assistants",
    description: "Give customers fast, useful answers and let the assistant carry the conversation through to a real business outcome.",
    examples: ["Answer common questions", "Book calls or appointments", "Create and update CRM leads"],
    icon: AssistantIcon,
    href: "/customer-assistants",
  },
  {
    number: "04",
    title: "Improve sales follow-up",
    description: "Use the information already in your CRM and systems to prepare relevant outreach, while keeping people in control of what gets sent.",
    examples: ["Personalised email drafts", "Human approval before send", "CRM status updated automatically"],
    icon: OutreachIcon,
    href: "/sales-automation",
  },
];

const PROOF_EXAMPLES = [
  {
    eyebrow: "ENQUIRY HANDLING",
    title: "From an email to a usable business record",
    before: "A person reads a customer email, identifies the service and value, then copies the information into a spreadsheet or CRM.",
    automation: "The enquiry is read once. Customer, service, location and value are identified and structured automatically.",
    outcome: "A clean new record is created without repetitive re-keying.",
    icon: EnquiryIcon,
  },
  {
    eyebrow: "CONNECTED WORKFLOW",
    title: "From a won deal to an invoice",
    before: "A salesperson marks an opportunity Won, then somebody re-enters the same customer and deal information into finance.",
    automation: "The CRM event creates the invoice using information already held in the business systems.",
    outcome: "The invoice is created and its reference is returned to CRM automatically.",
    icon: WorkflowIcon,
  },
  {
    eyebrow: "CUSTOMER ASSISTANT",
    title: "From a website question to a booked follow-up",
    before: "A visitor gets an answer, then has to find another form or wait for somebody to pick up the enquiry.",
    automation: "The assistant answers the question, offers the next action and records a call request in CRM.",
    outcome: "The customer gets a useful response and the team receives a structured lead with the next action attached.",
    icon: AssistantIcon,
  },
];

const DELIVERY_STEPS = [
  ["01", "Show us the problem", "Describe one repetitive, slow or awkward process."],
  ["02", "We find the simplest useful solution", "We map the trigger, systems, hand-offs and exceptions before choosing technology."],
  ["03", "We build it around your tools", "We connect only the systems needed to make that process work better."],
  ["04", "You test and approve it", "Human approval remains wherever judgement, risk or customer impact requires it."],
  ["05", "We support and improve it", "Once it works reliably, we can support it and extend the same approach to the next bottleneck."],
];

const FAQS = [
  ["Can you work with the systems we already use?", "Usually, yes. We check how your existing tools exchange information — through APIs, exports, email, files or other supported routes — and choose the simplest reliable option."],
  ["Do we need an AI strategy first?", "No. A specific process that wastes time, creates duplicate work or slows a customer down is enough to start."],
  ["How long does a small automation take?", "A bounded starter workflow can often be delivered in around one to two weeks once access, rules and test examples are available."],
  ["Can a person approve actions before they happen?", "Yes. Human approval can sit immediately before emails are sent, records are committed, financial actions are taken or any other step where judgement matters."],
];

function BrandIconFrame({ children }: { children: React.ReactNode }) {
  return <div className="w-11 h-11 rounded-2xl border border-[#eadfd6] bg-[#fffaf6] text-[#0f172b] grid place-items-center [--aim-icon-accent:#c83927]">{children}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <div className="bg-[#0f172b] text-slate-300 text-[12px] py-2 px-4 text-center">
        <Link href="/bbc-article">
          <span className="inline-flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c83927]" />
            <span>Trusted commentary featured on <span className="font-semibold text-white">BBC Radio West Midlands</span> — Kunle Ibidun on AI and the future of customer service</span>
            <span className="text-[#d95535]">→</span>
          </span>
        </Link>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#eadfd6] bg-[#faf8f5]/95 backdrop-blur-xl">
        <div className="container min-h-[76px] flex items-center justify-between gap-6">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer shrink-0" aria-label="AI Midlands home">
              <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[42px] w-auto object-contain" />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            <a href="#services" className="text-slate-600 hover:text-[#c83927] transition-colors">Services</a>
            <a href="#proof" className="text-slate-600 hover:text-[#c83927] transition-colors">Examples</a>
            <a href="#pricing" className="text-slate-600 hover:text-[#c83927] transition-colors">Pricing</a>
            <a href="#approach" className="text-slate-600 hover:text-[#c83927] transition-colors">How we work</a>
            <Link href="/about"><span className="cursor-pointer text-slate-600 hover:text-[#c83927] transition-colors">About</span></Link>
          </nav>
          <div className="flex items-center gap-4 shrink-0">
            <a href="tel:07966461005" className="hidden xl:block text-sm text-slate-500 hover:text-[#c83927] transition-colors">07966 461005</a>
            <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-10 px-5 text-sm shadow-none" asChild><a href="#assessment">Assess a process</a></Button>
          </div>
        </div>
      </header>

      <main>
        <Hero />

        <section className="border-y border-[#e8e0d8] bg-white/75">
          <div className="container py-7">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">Start with the work</p>
                <p className="text-[#0f172b] text-lg md:text-xl font-semibold tracking-[-0.02em]">A business process you want to improve — not an AI platform you have to find a use for.</p>
              </div>
              <p className="text-sm text-slate-500 md:text-right leading-7">Email&nbsp;&nbsp;·&nbsp;&nbsp;CRM&nbsp;&nbsp;·&nbsp;&nbsp;Spreadsheets&nbsp;&nbsp;·&nbsp;&nbsp;Finance&nbsp;&nbsp;·&nbsp;&nbsp;Websites&nbsp;&nbsp;·&nbsp;&nbsp;APIs</p>
            </div>
          </div>
        </section>

        <ProcessAssessment />

        <section id="services" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-14">
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Things we can fix</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.05] mb-5">Practical AI services built around the work your business already does.</h2>
              <p className="text-slate-600 text-lg leading-relaxed">The animation above shows the pattern: information arrives, AI understands it, systems connect, and a useful next action happens. These services apply that pattern to real business work.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {SERVICE_CARDS.map(({ number, title, description, examples, icon: Icon, href }) => (
                <Link key={title} href={href}>
                  <article className="group h-full min-h-[360px] cursor-pointer rounded-[28px] border border-[#e5ddd5] bg-white p-7 md:p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,43,0.08)]">
                    <div className="flex items-start justify-between gap-6 mb-8">
                      <BrandIconFrame><Icon className="w-6 h-6" /></BrandIconFrame>
                      <span className="text-[#c83927] text-xs font-bold tracking-[0.16em]">{number}</span>
                    </div>
                    <h3 className="text-2xl md:text-[28px] font-semibold tracking-[-0.035em] leading-tight text-[#0f172b] mb-4">{title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
                    <div className="border-t border-[#eee7e0] pt-5 space-y-2.5 mb-7">{examples.map(example => <p key={example} className="text-sm text-slate-600"><span className="text-[#c83927] mr-2">—</span>{example}</p>)}</div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324]">See this service <AimArrow className="w-4 h-4" /></span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-[#fffdf9] border-y border-[#e8e0d8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">What the automation changes</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.05] mb-5">See the hand-off before and after.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">These are demonstrations of the workflows shown on this site, not customer case studies.</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-5">
                {PROOF_EXAMPLES.map(({ eyebrow, title, before, automation, outcome, icon: Icon }) => (
                  <article key={title} className="rounded-[26px] border border-[#e5ddd5] bg-white p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-6"><BrandIconFrame><Icon className="w-6 h-6" /></BrandIconFrame><span className="text-[11px] font-bold tracking-[0.16em] text-[#b43a28]">{eyebrow}</span></div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#0f172b] mb-6">{title}</h3>
                    <div className="space-y-5 text-sm leading-relaxed">
                      <div><p className="text-slate-400 text-[11px] uppercase tracking-[0.14em] mb-1">Before</p><p className="text-slate-600">{before}</p></div>
                      <div><p className="text-[#b43a28] text-[11px] uppercase tracking-[0.14em] mb-1">Automation</p><p className="text-slate-700">{automation}</p></div>
                      <div><p className="text-slate-400 text-[11px] uppercase tracking-[0.14em] mb-1">Outcome</p><p className="text-slate-700">{outcome}</p></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Indicative pricing</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">Enough information to know whether a conversation is worth having.</h2>
              <p className="text-slate-600 text-lg leading-relaxed">We scope the actual process before quoting, but you should not have to guess whether AI Midlands means hundreds, thousands or tens of thousands of pounds.</p>
            </div>
            <div className="grid md:grid-cols-3 border-y border-[#ded6ce] divide-y md:divide-y-0 md:divide-x divide-[#ded6ce]">
              {[
                ["Starter automation", "from £1,250", "One bounded process, normally involving one or two existing tools."],
                ["Connected workflow", "from £2,500", "Multiple business steps or systems, with integration, approvals and testing."],
                ["Bespoke integration", "Scoped", "Complex APIs, legacy systems, sensitive information or wider operational change."],
              ].map(([label, price, copy], index) => (
                <article key={label} className="p-7 md:p-8 min-h-[280px] flex flex-col">
                  <BrandIconFrame>{index === 0 ? <ScopeIcon className="w-6 h-6" /> : index === 1 ? <IntegrationIcon className="w-6 h-6" /> : <ControlIcon className="w-6 h-6" />}</BrandIconFrame>
                  <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#b43a28] mt-6 mb-3">{label}</p>
                  <p className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#0f172b] mb-4">{price}</p>
                  <p className="text-slate-600 leading-relaxed">{copy}</p>
                </article>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-5">Prices are indicative starting points, exclude VAT where applicable, and depend on system access, integration constraints, testing and support requirements.</p>
          </div>
        </section>

        <section id="approach" className="bg-[#0f172b] py-20 md:py-28 text-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em] mb-4">How we work</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] mb-5">A small, controlled intervention rather than a transformation programme.</h2>
                <p className="text-slate-300 text-lg leading-relaxed">Start with one useful process, prove it in your environment and only expand when there is a reason to.</p>
              </div>
              <div className="grid md:grid-cols-5 gap-px bg-slate-700 border border-slate-700 rounded-[26px] overflow-hidden">
                {DELIVERY_STEPS.map(([number, title, text]) => <div key={number} className="bg-[#131d34] p-6 min-h-[260px]"><span className="text-[#f0a08b] text-xs font-bold tracking-[0.16em]">{number}</span><h3 className="font-semibold text-white mt-8 mb-3 leading-snug">{title}</h3><p className="text-sm text-slate-400 leading-relaxed">{text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Founder-led delivery</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">AI integration needs delivery experience as much as it needs AI expertise.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">AI Midlands is founder-led by Kunle Ibidun, bringing more than 20 years of digital delivery, integration, API, cloud and data experience to practical AI implementation.</p>
              <div className="flex flex-wrap gap-3 mb-7">
                <span className="inline-flex items-center gap-2 text-sm text-slate-700"><ApprovalIcon className="w-5 h-5 [--aim-icon-accent:#c83927]" /> Human approval where it matters</span>
                <span className="inline-flex items-center gap-2 text-sm text-slate-700"><ControlIcon className="w-5 h-5 [--aim-icon-accent:#c83927]" /> Clear data flows and controls</span>
              </div>
              <Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">Meet Kunle and see how AI Midlands works <AimArrow className="w-4 h-4" /></span></Link>
            </div>
            <div className="rounded-[30px] overflow-hidden border border-[#e5ddd5] bg-white aspect-[4/3]"><img src={FOUNDER_IMAGE} alt="Kunle Ibidun, founder of AI Midlands" className="w-full h-full object-cover object-top" /></div>
          </div>
        </section>

        <section id="questions" className="bg-white border-y border-[#e8e0d8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
              <div><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Before you buy</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] leading-tight mb-4">The practical questions we expect you to ask.</h2></div>
              <div className="divide-y divide-[#e5ddd5] border-y border-[#e5ddd5]">{FAQS.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[#0f172b]"><span>{question}</span><span className="text-[#c83927] text-xl font-normal group-open:rotate-45 transition-transform">+</span></summary><p className="pt-3 pr-10 text-slate-600 leading-relaxed">{answer}</p></details>)}</div>
            </div>
          </div>
        </section>

        <section className="bg-[#fff4ed] py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl"><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-3">Ready to start?</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b]">Show us one process. We’ll tell you what looks practical.</h2></div>
              <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-12 px-7 text-base shadow-none" asChild><a href="#assessment">Assess a process</a></Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#e8e0d8] py-8">
        <div className="container"><div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5"><div><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[40px] w-auto mb-2" /><p className="text-slate-500 text-xs">Midlands based · UK wide</p></div><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"><Link href="/about"><span className="hover:text-[#c83927] cursor-pointer">About</span></Link><Link href="/privacy"><span className="hover:text-[#c83927] cursor-pointer">Privacy</span></Link><Link href="/terms"><span className="hover:text-[#c83927] cursor-pointer">Terms</span></Link><a href="mailto:hello@ai-midlands.co.uk" className="hover:text-[#c83927]">hello@ai-midlands.co.uk</a><a href="tel:07966461005" className="hover:text-[#c83927]">07966 461005</a></div></div></div>
      </footer>
    </div>
  );
}
