import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { ProcessAssessment } from "@/components/ProcessAssessment";
import { EditorialIllustration } from "@/components/brand/EditorialIllustration";
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

const SERVICES = [
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
    eyebrow: "Enquiry handling",
    title: "From an email to a usable business record",
    before: "A person reads a customer email, identifies the service and value, then copies the information into a spreadsheet or CRM.",
    automation: "The enquiry is read once. Customer, service, location and value are identified and structured automatically.",
    outcome: "A clean new record is created without repetitive re-keying.",
    icon: EnquiryIcon,
  },
  {
    eyebrow: "Connected workflow",
    title: "From a won deal to an invoice",
    before: "A salesperson marks an opportunity Won, then somebody re-enters the same customer and deal information into finance.",
    automation: "The CRM event creates the invoice using information already held in the business systems.",
    outcome: "The invoice is created and its reference is returned to CRM automatically.",
    icon: WorkflowIcon,
  },
  {
    eyebrow: "Customer assistant",
    title: "From a website question to a booked follow-up",
    before: "A visitor gets an answer, then has to find another form or wait for somebody to pick up the enquiry.",
    automation: "The assistant answers the question, offers the next action and records a call request in CRM.",
    outcome: "The customer gets a useful response and the team receives a structured lead with the next action attached.",
    icon: AssistantIcon,
  },
];

const DELIVERY_STEPS = [
  ["01", "Listen", "Show us one repetitive, slow or awkward process."],
  ["02", "Map", "We make the trigger, systems, hand-offs, exceptions and outcome visible."],
  ["03", "Propose", "We recommend the smallest useful intervention and make the commercial shape clear."],
  ["04", "Implement", "We build it around the tools you already use and test it with you."],
  ["05", "Improve", "Once it works reliably, we support it and extend only where there is value."],
];

const FAQS = [
  ["Can you work with the systems we already use?", "Usually, yes. We check how your existing tools exchange information — through APIs, exports, email, files or other supported routes — and choose the simplest reliable option."],
  ["Do we need an AI strategy first?", "No. A specific process that wastes time, creates duplicate work or slows a customer down is enough to start."],
  ["How long does a small automation take?", "A bounded starter workflow can often be delivered in around one to two weeks once access, rules and test examples are available."],
  ["Can a person approve actions before they happen?", "Yes. Human approval can sit immediately before emails are sent, records are committed, financial actions are taken or any other step where judgement matters."],
];

function BrandIconFrame({ children }: { children: React.ReactNode }) {
  return <span className="inline-grid h-10 w-10 place-items-center text-[#0f172b] [--aim-icon-accent:#c83927]">{children}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <header className="sticky top-0 z-30 border-b border-[#e8e0d8] bg-[#faf8f5]/94 backdrop-blur-xl">
        <div className="container min-h-[78px] flex items-center justify-between gap-6">
          <Link href="/">
            <div className="cursor-pointer shrink-0" aria-label="AI Midlands home">
              <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[42px] w-auto object-contain" />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#services" className="text-slate-600 hover:text-[#c83927] transition-colors">Services</a>
            <a href="#proof" className="text-slate-600 hover:text-[#c83927] transition-colors">Examples</a>
            <a href="#pricing" className="text-slate-600 hover:text-[#c83927] transition-colors">Pricing</a>
            <a href="#approach" className="text-slate-600 hover:text-[#c83927] transition-colors">How we work</a>
            <Link href="/about"><span className="cursor-pointer text-slate-600 hover:text-[#c83927] transition-colors">About</span></Link>
          </nav>
          <a href="#assessment" className="inline-flex items-center gap-3 border-b-2 border-[#c83927] pb-1 text-sm font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">
            Assess a process <AimArrow className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main>
        <Hero />

        <section className="border-y border-[#e8e0d8] bg-white/70">
          <div className="container py-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1.25fr_1fr] gap-8 items-center">
              <p className="text-[#0f172b] text-lg md:text-xl font-semibold tracking-[-0.02em]">Start with a business process you want to improve — not an AI platform you have to find a use for.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 md:justify-end">
                {['Email','CRM','Spreadsheets','Finance','Websites','APIs'].map(item => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <ProcessAssessment />

        <section id="services" className="container py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center mb-16 md:mb-24">
              <div className="max-w-xl">
                <p className="text-[#b43a28] text-sm font-semibold mb-4">Things we can fix</p>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.02] mb-6">Practical AI, attached to real work.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">The pattern is simple: understand the work, connect the right systems, automate the repeatable steps and keep people in control of the judgement.</p>
              </div>
              <EditorialIllustration variant="process" />
            </div>

            <div className="border-t border-[#dcd4cc]">
              {SERVICES.map(({ number, title, description, examples, icon: Icon, href }) => (
                <Link key={title} href={href}>
                  <article className="group grid md:grid-cols-[92px_1fr_1fr_44px] gap-5 md:gap-8 items-start py-8 md:py-10 border-b border-[#dcd4cc] cursor-pointer transition-colors hover:bg-white/55 -mx-4 px-4 md:-mx-6 md:px-6">
                    <div className="flex items-center gap-4 md:block">
                      <span className="text-[#c83927] text-xs font-bold tracking-[0.14em]">{number}</span>
                      <div className="mt-0 md:mt-5"><BrandIconFrame><Icon className="w-7 h-7" /></BrandIconFrame></div>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#0f172b] mb-3">{title}</h3>
                      <p className="text-slate-600 leading-relaxed max-w-xl">{description}</p>
                    </div>
                    <div className="space-y-2 pt-1">
                      {examples.map(example => <p key={example} className="text-sm text-slate-600"><span className="text-[#c83927] mr-2">—</span>{example}</p>)}
                    </div>
                    <AimArrow className="w-5 h-5 mt-2 transition-transform group-hover:translate-x-1" />
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-white border-y border-[#e8e0d8] py-24 md:py-36">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-20 items-end mb-16">
                <div>
                  <p className="text-[#b43a28] text-sm font-semibold mb-4">What the automation changes</p>
                  <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.02]">See the hand-off, not the hype.</h2>
                </div>
                <div>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mb-6">These are demonstrations of the workflows shown on this site, not customer case studies. The point is to make the change in work visible.</p>
                  <EditorialIllustration variant="handoff" />
                </div>
              </div>

              <div className="space-y-0 border-y border-[#dcd4cc]">
                {PROOF_EXAMPLES.map(({ eyebrow, title, before, automation, outcome, icon: Icon }, index) => (
                  <article key={title} className="grid lg:grid-cols-[70px_1.2fr_1fr_1fr_1fr] gap-5 lg:gap-8 py-8 md:py-10 border-b last:border-b-0 border-[#e4ddd6] items-start">
                    <div className="pt-1"><BrandIconFrame><Icon className="w-7 h-7" /></BrandIconFrame></div>
                    <div><p className="text-[#b43a28] text-xs font-semibold mb-2">0{index + 1} · {eyebrow}</p><h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[#0f172b]">{title}</h3></div>
                    <div><p className="text-xs text-slate-400 mb-2">Before</p><p className="text-sm text-slate-600 leading-relaxed">{before}</p></div>
                    <div><p className="text-xs text-[#b43a28] mb-2">Automation</p><p className="text-sm text-slate-700 leading-relaxed">{automation}</p></div>
                    <div><p className="text-xs text-slate-400 mb-2">Outcome</p><p className="text-sm text-slate-700 leading-relaxed">{outcome}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-end mb-12">
              <div><p className="text-[#b43a28] text-sm font-semibold mb-4">Indicative pricing</p><h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04]">Enough information to know whether a conversation is worth having.</h2></div>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">We scope the actual process before quoting, but you should not have to guess whether AI Midlands means hundreds, thousands or tens of thousands of pounds.</p>
            </div>
            <div className="grid md:grid-cols-3 border-y border-[#d9d1ca] divide-y md:divide-y-0 md:divide-x divide-[#d9d1ca]">
              {[
                ["Starter automation", "from £1,250", "One bounded process, normally involving one or two existing tools."],
                ["Connected workflow", "from £2,500", "Multiple business steps or systems, with integration, approvals and testing."],
                ["Bespoke integration", "Scoped", "Complex APIs, legacy systems, sensitive information or wider operational change."],
              ].map(([label, price, copy], index) => (
                <article key={label} className="p-7 md:p-9 min-h-[260px] flex flex-col">
                  <div className="mb-7">{index === 0 ? <ScopeIcon className="w-8 h-8 [--aim-icon-accent:#c83927]" /> : index === 1 ? <IntegrationIcon className="w-8 h-8 [--aim-icon-accent:#c83927]" /> : <ControlIcon className="w-8 h-8 [--aim-icon-accent:#c83927]" />}</div>
                  <p className="text-sm font-semibold text-[#b43a28] mb-2">{label}</p>
                  <p className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#0f172b] mb-4">{price}</p>
                  <p className="text-slate-600 leading-relaxed">{copy}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-5">Prices are indicative starting points, exclude VAT where applicable, and depend on system access, integration constraints, testing and support requirements.</p>
          </div>
        </section>

        <section id="approach" className="bg-[#0f172b] text-white py-24 md:py-36 overflow-hidden">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[#f0a08b] text-sm font-semibold mb-4">How we work</p>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] mb-6 text-white">Listen. Map. Propose. Implement.</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">A small, controlled intervention rather than a transformation programme. Start with one useful process and prove it in your environment.</p>
                <EditorialIllustration variant="review" />
              </div>
              <div className="border-t border-slate-700">
                {DELIVERY_STEPS.map(([number, title, text]) => (
                  <div key={number} className="grid grid-cols-[54px_1fr] gap-5 py-7 md:py-9 border-b border-slate-700">
                    <span className="text-[#f0a08b] text-sm font-bold tracking-[0.1em]">{number}</span>
                    <div><h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3><p className="text-slate-400 leading-relaxed">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
            <figure className="relative max-w-[520px]">
              <div className="absolute -left-6 -top-6 h-28 w-28 border-l border-t border-[#c83927]/30" aria-hidden="true" />
              <img src={FOUNDER_IMAGE} alt="Kunle Ibidun, founder of AI Midlands" className="relative w-full aspect-[4/3] object-cover object-top" />
            </figure>
            <div>
              <p className="text-[#b43a28] text-sm font-semibold mb-4">Founder-led delivery</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04] mb-6">AI integration needs delivery experience as much as it needs AI expertise.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">AI Midlands is founder-led by Kunle Ibidun, bringing more than 20 years of digital delivery, integration, API, cloud and data experience to practical AI implementation.</p>
              <div className="grid sm:grid-cols-2 gap-4 py-6 border-y border-[#ddd5ce] mb-7">
                <span className="inline-flex items-start gap-3 text-sm text-slate-700"><ApprovalIcon className="w-5 h-5 mt-0.5 [--aim-icon-accent:#c83927] shrink-0" /> Human approval where it matters</span>
                <span className="inline-flex items-start gap-3 text-sm text-slate-700"><ControlIcon className="w-5 h-5 mt-0.5 [--aim-icon-accent:#c83927] shrink-0" /> Clear data flows and controls</span>
              </div>
              <Link href="/bbc-article"><span className="inline-flex items-center gap-3 text-sm text-slate-600 mb-6 cursor-pointer hover:text-[#c83927]"><span className="font-semibold text-[#0f172b]">BBC Radio West Midlands</span> · commentary on AI and customer service <AimArrow className="w-4 h-4" /></span></Link>
              <div><Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">Meet Kunle and see how AI Midlands works <AimArrow className="w-4 h-4" /></span></Link></div>
            </div>
          </div>
        </section>

        <section id="questions" className="bg-white border-y border-[#e8e0d8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
              <div><p className="text-[#b43a28] text-sm font-semibold mb-4">Before you buy</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] leading-tight">The practical questions we expect you to ask.</h2></div>
              <div className="divide-y divide-[#e5ddd5] border-y border-[#e5ddd5]">{FAQS.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[#0f172b]"><span>{question}</span><span className="text-[#c83927] text-xl font-normal group-open:rotate-45 transition-transform">+</span></summary><p className="pt-3 pr-10 text-slate-600 leading-relaxed">{answer}</p></details>)}</div>
            </div>
          </div>
        </section>

        <section className="bg-[#fff1e9] py-20 md:py-24">
          <div className="container">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="max-w-3xl"><p className="text-[#b43a28] text-sm font-semibold mb-4">A sensible first step</p><h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04]">Show us one process. We’ll tell you what looks practical.</h2></div>
              <a href="#assessment" className="inline-flex items-center gap-3 border-b-2 border-[#c83927] pb-1 text-base font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">Assess a process <AimArrow className="w-5 h-5" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f172b] text-slate-300 py-12 md:py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
            <div><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[46px] w-auto mb-5 brightness-0 invert" /><p className="text-slate-400 max-w-md">Practical AI automation and integration, designed around the work your business already does.</p><p className="text-slate-500 text-sm mt-3">Midlands based · UK wide</p></div>
            <div className="md:text-right"><a href="mailto:hello@ai-midlands.co.uk" className="text-lg text-white hover:text-[#f0a08b]">hello@ai-midlands.co.uk</a><div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-sm text-slate-400 mt-5"><Link href="/about"><span className="hover:text-white cursor-pointer">About</span></Link><Link href="/privacy"><span className="hover:text-white cursor-pointer">Privacy</span></Link><Link href="/terms"><span className="hover:text-white cursor-pointer">Terms</span></Link></div></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
