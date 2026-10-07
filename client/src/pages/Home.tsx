import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { ProcessAssessment } from "@/components/ProcessAssessment";
import { EditorialIllustration } from "@/components/brand/EditorialIllustration";
import { ServiceFlowGraphic } from "@/components/brand/ServiceFlowGraphic";
import { AimArrow } from "@/components/brand/AiMidlandsIcons";

const FOUNDER_IMAGE = "/brand/kunle-founder.jpg";
const BOOK_CALL_URL = "https://calendly.com/kunle2000/30min";

type FlowVariant = "enquiry" | "workflow" | "assistant" | "outreach";

const SERVICES: Array<{ number: string; title: string; description: string; examples: string[]; flow: FlowVariant; href: string }> = [
  {
    number: "01",
    title: "Automate enquiries and admin",
    description: "Simplify how incoming emails, forms and documents are handled, then move useful information into the right records, tasks and updates without re-keying it by hand.",
    examples: ["Email → CRM or spreadsheet", "Document → structured data", "New enquiry → routed task"],
    flow: "enquiry",
    href: "/business-automation",
  },
  {
    number: "02",
    title: "Automate business processes",
    description: "Map the hand-offs first, remove avoidable steps, then connect the systems your team already uses so one business event can trigger the next action automatically.",
    examples: ["CRM win → invoice", "Approval → follow-up task", "Status change → customer update"],
    flow: "workflow",
    href: "/workflow-automation",
  },
  {
    number: "03",
    title: "Build useful customer assistants",
    description: "Design the customer journey around the outcome, then let the assistant answer useful questions and carry the conversation through to a booking, lead or other real business action.",
    examples: ["Question → useful answer", "Answer → appointment", "Conversation → CRM lead"],
    flow: "assistant",
    href: "/customer-assistants",
  },
  {
    number: "04",
    title: "Improve sales follow-up",
    description: "Remove repetitive preparation from follow-up and use the information already in your CRM and systems to prepare relevant outreach, while keeping people in control of what gets sent.",
    examples: ["CRM context → draft", "Draft → human approval", "Send → CRM update"],
    flow: "outreach",
    href: "/sales-automation",
  },
];

const PROOF_EXAMPLES: Array<{ eyebrow: string; title: string; before: string; automation: string; outcome: string; flow: FlowVariant }> = [
  {
    eyebrow: "Enquiry handling",
    title: "From an email to a usable business record",
    before: "A person reads a customer email, identifies the service and value, then copies the information into a spreadsheet or CRM.",
    automation: "The enquiry is read once. Customer, service, location and value are identified and structured automatically.",
    outcome: "A clean new record is created without repetitive re-keying.",
    flow: "enquiry",
  },
  {
    eyebrow: "Connected workflow",
    title: "From a won deal to an invoice",
    before: "A salesperson marks an opportunity Won, then somebody re-enters the same customer and deal information into finance.",
    automation: "The CRM event creates the invoice using information already held in the business systems.",
    outcome: "The invoice is created and its reference is returned to CRM automatically.",
    flow: "workflow",
  },
  {
    eyebrow: "Customer assistant",
    title: "From a website question to a booked follow-up",
    before: "A visitor gets an answer, then has to find another form or wait for somebody to pick up the enquiry.",
    automation: "The assistant answers the question, offers the next action and records a call request in CRM.",
    outcome: "The customer gets a useful response and the team receives a structured lead with the next action attached.",
    flow: "assistant",
  },
];

const DELIVERY_STEPS = [
  ["01", "Listen", "We start with the people doing the work and what feels repetitive, slow or awkward."],
  ["02", "Map", "We make the trigger, systems, hand-offs, decisions, exceptions and outcome visible."],
  ["03", "Simplify", "We remove avoidable steps, duplicate entry and unnecessary tools before adding technology."],
  ["04", "Propose", "We decide where AI, automation or integration genuinely helps and make the commercial shape clear."],
  ["05", "Implement", "We build around the tools you already use, test the whole process and improve it with you."],
];

const FAQS = [
  ["Can you work with the systems we already use?", "Usually, yes. We check how your existing tools exchange information — through APIs, exports, email, files or other supported routes — and choose the simplest reliable option."],
  ["Will this mean another system for the team to use?", "Not by default. A core design principle is to fit the technology around the work and the systems your team already uses. We only introduce another application when it clearly makes the overall process better."],
  ["Do we need an AI strategy first?", "No. A specific process that wastes time, creates duplicate work or slows a customer down is enough to start."],
  ["How long does a small automation take?", "A bounded starter workflow can often be delivered in around one to two weeks once access, rules and test examples are available."],
  ["Can a person approve actions before they happen?", "Yes. Human approval can sit immediately before emails are sent, records are committed, financial actions are taken or any other step where judgement matters."],
];

function SystemRail() {
  const systems = ["Email", "CRM", "Spreadsheets", "Finance", "Websites", "APIs"];
  return (
    <div className="flex flex-wrap items-center gap-y-3 md:justify-end" aria-label="Systems AI Midlands can connect">
      {systems.map((item, index) => (
        <div key={item} className="flex items-center">
          <span className="text-sm text-slate-600">{item}</span>
          {index < systems.length - 1 && <span className="mx-2.5 h-px w-5 bg-[#c83927]/45 relative after:absolute after:right-0 after:-top-[2px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-[#c83927]" />}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <header className="sticky top-0 z-30 border-b border-[#e8e0d8] bg-[#faf8f5]/94 backdrop-blur-xl">
        <div className="container min-h-[74px] flex items-center justify-between gap-6">
          <Link href="/"><div className="cursor-pointer shrink-0" aria-label="AI Midlands home"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[46px] w-auto object-contain" /></div></Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#services" className="text-slate-600 hover:text-[#c83927] transition-colors">Services</a>
            <a href="#proof" className="text-slate-600 hover:text-[#c83927] transition-colors">Examples</a>
            <a href="#pricing" className="text-slate-600 hover:text-[#c83927] transition-colors">Pricing</a>
            <a href="#approach" className="text-slate-600 hover:text-[#c83927] transition-colors">How we work</a>
            <Link href="/about"><span className="cursor-pointer text-slate-600 hover:text-[#c83927] transition-colors">About</span></Link>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#assessment" className="hidden sm:inline-flex items-center gap-2 border-b-2 border-[#c83927] pb-1 text-sm font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">Assess a process <AimArrow className="w-4 h-4" /></a>
            <a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a92f21] transition-colors [--aim-icon-accent:#fff]">Book a call <AimArrow className="w-4 h-4" /></a>
          </div>
        </div>
      </header>

      <main>
        <Hero />

        <section className="border-y border-[#e8e0d8] bg-white/72">
          <div className="container py-8 md:py-9">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1.15fr_1fr] gap-8 items-center">
              <p className="text-[#0f172b] text-lg md:text-xl font-semibold tracking-[-0.02em] max-w-2xl">Start with a business process you want to improve — not an AI platform you have to find a use for.</p>
              <SystemRail />
            </div>
          </div>
        </section>

        <ProcessAssessment />

        <section id="services" className="container py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-20 items-center mb-16 md:mb-24">
              <div className="max-w-xl">
                <p className="text-[#b43a28] text-sm font-semibold mb-4">Things we can fix</p>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.02] mb-6">Practical AI, attached to real work.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">Understand the work, simplify the process, connect the right systems, automate the repeatable steps and keep people in control of the judgement.</p>
              </div>
              <EditorialIllustration variant="process" />
            </div>

            <div>
              {SERVICES.map(({ number, title, description, examples, flow, href }) => (
                <Link key={title} href={href}>
                  <article className="group grid md:grid-cols-[205px_1.15fr_0.95fr_36px] gap-5 md:gap-9 items-center py-9 md:py-11 border-t last:border-b border-[#dcd4cc] cursor-pointer transition-colors hover:bg-white/50 -mx-4 px-4 md:-mx-6 md:px-6">
                    <div className="flex md:block items-center gap-5">
                      <span className="text-[#c83927] text-xs font-bold tracking-[0.12em]">{number}</span>
                      <ServiceFlowGraphic variant={flow} className="mt-0 md:mt-3" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#0f172b] mb-3">{title}</h3>
                      <p className="text-slate-600 leading-relaxed max-w-xl">{description}</p>
                    </div>
                    <div className="space-y-3 pt-1">
                      {examples.map(example => <p key={example} className="text-sm text-slate-600 flex items-center gap-3"><span className="w-5 h-px bg-[#c83927]/65 shrink-0" />{example}</p>)}
                    </div>
                    <AimArrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-white py-24 md:py-36">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-20 items-end mb-16 md:mb-20">
                <div><p className="text-[#b43a28] text-sm font-semibold mb-4">What the automation changes</p><h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.02]">See the hand-off, not the hype.</h2></div>
                <div><p className="text-slate-600 text-lg leading-relaxed max-w-2xl mb-7">These are demonstrations of the workflows shown on this site, not customer case studies. The point is to make the change in work visible.</p><EditorialIllustration variant="handoff" /></div>
              </div>

              <div className="space-y-0">
                {PROOF_EXAMPLES.map(({ eyebrow, title, before, automation, outcome, flow }, index) => (
                  <article key={title} className="grid lg:grid-cols-[205px_1.08fr_0.92fr_0.92fr_0.92fr] gap-5 lg:gap-8 py-10 md:py-12 border-t last:border-b border-[#e4ddd6] items-start">
                    <div><p className="text-[#b43a28] text-xs font-semibold mb-3">0{index + 1}</p><ServiceFlowGraphic variant={flow} /></div>
                    <div><p className="text-[#b43a28] text-xs font-semibold mb-2">{eyebrow}</p><h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[#0f172b]">{title}</h3></div>
                    <div><p className="text-xs text-slate-500 mb-2">Before</p><p className="text-sm text-slate-600 leading-relaxed">{before}</p></div>
                    <div><p className="text-xs text-[#b43a28] mb-2">Automation</p><p className="text-sm text-slate-700 leading-relaxed">{automation}</p></div>
                    <div><p className="text-xs text-slate-500 mb-2">Outcome</p><p className="text-sm text-slate-700 leading-relaxed">{outcome}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-end mb-8">
              <div><p className="text-[#b43a28] text-sm font-semibold mb-4">Indicative pricing</p><h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04]">Enough information to know whether a conversation is worth having.</h2></div>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">We scope the actual process before quoting, but you should not have to guess whether AI Midlands means hundreds, thousands or tens of thousands of pounds.</p>
            </div>
            <p className="text-[#0f172b] text-lg font-semibold leading-relaxed max-w-4xl mb-10">Every engagement includes process mapping and analysis. We understand how the work operates today before deciding what should be simplified, integrated or automated.</p>
            <div className="grid md:grid-cols-3 border-y border-[#d9d1ca] divide-y md:divide-y-0 md:divide-x divide-[#d9d1ca]">
              {[
                ["Starter automation", "from £2,000", "Process mapping and analysis of one bounded workflow, followed by design and implementation of a focused automation, normally involving one or two existing systems. Includes testing and handover."],
                ["Connected workflow", "from £3,500", "Process mapping and analysis across a multi-step workflow, followed by process redesign, integration and automation across multiple systems. Includes approval points, end-to-end testing and handover."],
                ["Bespoke integration", "Scoped", "Deeper process analysis and solution design for complex APIs, legacy systems, sensitive information or wider operational change. Scope and price are agreed following discovery."],
              ].map(([label, price, copy], index) => (
                <article key={label} className="p-7 md:p-9 min-h-[235px] flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-7"><span className="text-[#c83927] font-bold">0{index + 1}</span><span className="h-px w-10 bg-[#c83927]/50" /></div>
                  <p className="text-sm font-semibold text-[#b43a28] mb-2">{label}</p>
                  <p className="text-4xl md:text-5xl font-semibold tracking-[-0.045em] text-[#0f172b] mb-4">{price}</p>
                  <p className="text-slate-600 leading-relaxed">{copy}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-5">Prices are indicative starting points, exclude VAT where applicable, and depend on system access, integration constraints, testing and support requirements.</p>
          </div>
        </section>

        <section className="border-y border-[#e4ddd6] bg-white py-24 md:py-32">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.76fr_1.24fr] gap-12 lg:gap-20 items-start">
              <div>
                <p className="text-[#b43a28] text-sm font-semibold mb-4">Process redesign is standard</p>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.02]">We don’t automate processes blindly.</h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 max-w-3xl">
                <p>Automating one step does not necessarily make work easier. If your team has to open another application, remember another password, copy information somewhere else or change the way they work simply to accommodate the automation, we have probably moved the problem rather than solved it.</p>
                <p>We listen to the people doing the work, map how information and decisions actually move through the business, and look for the simplest way the process could work. Then we decide where AI, automation or integration genuinely helps.</p>
                <p className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] leading-tight">The technology should fit the work. Not the other way around.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[#0f172b] text-white py-24 md:py-36 overflow-hidden">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[#f0a08b] text-sm font-semibold mb-4">How we work</p>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] mb-6 text-white">Listen. Map. Simplify. Then implement.</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">A small, controlled intervention rather than a transformation programme. We understand and simplify the process before recommending technology, then prove the change in your environment.</p>
                <EditorialIllustration variant="review" />
              </div>
              <div className="relative pl-9 md:pl-12">
                <div className="absolute left-[9px] md:left-[13px] top-5 bottom-5 w-px bg-slate-700" aria-hidden="true" />
                {DELIVERY_STEPS.map(([number, title, text], index) => (
                  <div key={number} className="relative grid grid-cols-[50px_1fr] gap-5 py-7 md:py-9 border-b border-slate-700/80 first:border-t">
                    <span className="absolute -left-[39px] md:-left-[44px] top-9 h-3 w-3 rounded-full border-2 border-[#f0a08b] bg-[#0f172b]" />
                    <span className="text-[#f0a08b] text-sm font-bold tracking-[0.1em]">{number}</span>
                    <div><h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3><p className="text-slate-400 leading-relaxed">{text}</p>{index < DELIVERY_STEPS.length - 1 && <span className="sr-only">Next step follows</span>}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-36 overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-20 items-center">
            <figure className="relative max-w-[560px] lg:justify-self-start">
              <div className="absolute -left-7 -top-7 h-28 w-28 border-l border-t border-[#c83927]/40" aria-hidden="true" />
              <div className="absolute -left-5 bottom-[-20px] w-[72%] h-[44%] bg-[#f4dfd5]" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eee6df]">
                <img src={FOUNDER_IMAGE} alt="Kunle Ibidun, founder of AI Midlands" className="absolute inset-0 h-full w-full object-cover object-center" />
              </div>
            </figure>
            <div className="max-w-xl">
              <p className="text-[#b43a28] text-sm font-semibold mb-4">Founder-led delivery</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04] mb-6">AI integration needs delivery experience as much as it needs AI expertise.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-7">AI Midlands is founder-led by Kunle Ibidun, bringing more than 20 years of digital delivery, integration, API, cloud and data experience to process redesign and practical AI implementation.</p>
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                <div className="flex gap-3 items-start"><span className="mt-2 h-px w-7 bg-[#c83927] shrink-0" /><p className="text-sm text-slate-700">Human approval where judgement matters.</p></div>
                <div className="flex gap-3 items-start"><span className="mt-2 h-px w-7 bg-[#c83927] shrink-0" /><p className="text-sm text-slate-700">Clear, visible data flows and controls.</p></div>
              </div>
              <Link href="/bbc-article">
                <div className="group mb-7 border-l-2 border-[#c83927] bg-white/65 px-5 py-4 cursor-pointer hover:bg-white transition-colors">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a5a4f] mb-1">As heard on</p>
                  <p className="text-lg font-bold text-[#0f172b]">BBC Radio West Midlands</p>
                  <p className="text-sm text-slate-600 mt-1 group-hover:text-[#c83927]">Kunle on AI, customer service and where people still matter →</p>
                </div>
              </Link>
              <div><Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">Meet Kunle and see how AI Midlands works <AimArrow className="w-4 h-4" /></span></Link></div>
            </div>
          </div>
        </section>

        <section id="questions" className="bg-white py-20 md:py-28">
          <div className="container"><div className="max-w-6xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
            <div><p className="text-[#b43a28] text-sm font-semibold mb-4">Before you buy</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] leading-tight">The practical questions we expect you to ask.</h2></div>
            <div>{FAQS.map(([question, answer]) => <details key={question} className="group py-6 border-t last:border-b border-[#e5ddd5]"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[#0f172b] text-[17px]"><span>{question}</span><span className="text-[#c83927] text-xl font-normal group-open:rotate-45 transition-transform">+</span></summary><p className="pt-3 pr-10 text-slate-600 leading-relaxed">{answer}</p></details>)}</div>
          </div></div>
        </section>

        <section className="bg-[#fff1e9] py-20 md:py-24">
          <div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <div className="max-w-3xl"><p className="text-[#b43a28] text-sm font-semibold mb-4">A sensible first step</p><h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.04]">Show us one process. We’ll tell you what could be simpler — and what is actually worth automating.</h2></div>
            <div className="flex flex-wrap items-center gap-5 md:justify-end">
              <a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#c83927] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#a92f21] transition-colors [--aim-icon-accent:#fff]">Book a call <AimArrow className="w-5 h-5" /></a>
              <a href="#assessment" className="inline-flex items-center gap-3 border-b-2 border-[#c83927] pb-1 text-base font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">Assess a process <AimArrow className="w-5 h-5" /></a>
            </div>
          </div></div>
        </section>
      </main>

      <footer className="bg-[#0f172b] text-slate-300 py-12 md:py-16">
        <div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
          <div><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[48px] w-auto mb-5 brightness-0 invert" /><p className="text-slate-400 max-w-md">Process redesign, practical AI automation and integration, designed around the work your business already does.</p><p className="text-slate-500 text-sm mt-3">Midlands based · UK wide</p></div>
          <div className="md:text-right"><a href="mailto:hello@ai-midlands.co.uk" className="text-lg text-white hover:text-[#f0a08b]">hello@ai-midlands.co.uk</a><div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-sm text-slate-400 mt-5"><Link href="/about"><span className="hover:text-white cursor-pointer">About</span></Link><Link href="/privacy"><span className="hover:text-white cursor-pointer">Privacy</span></Link><Link href="/terms"><span className="hover:text-white cursor-pointer">Terms</span></Link></div></div>
        </div></div>
      </footer>
    </div>
  );
}
