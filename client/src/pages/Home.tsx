import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { ProcessAssessment } from "@/components/ProcessAssessment";
import { CraftIllustration } from "@/components/brand/CraftIllustration";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SERVICE_CARDS = [
  {
    number: "01",
    title: "Automate enquiries and admin",
    description:
      "Turn incoming emails, forms and documents into structured records, tasks and updates without re-keying information by hand.",
    examples: ["Email → spreadsheet or CRM", "Document data extraction", "Automatic triage and routing"],
    variant: "move" as const,
    href: "/business-automation",
  },
  {
    number: "02",
    title: "Automate business processes",
    description:
      "Connect the steps your team already performs so one business event can trigger the next action automatically.",
    examples: ["CRM win → invoice", "Approval → follow-up task", "Status change → customer update"],
    variant: "connect" as const,
    href: "/workflow-automation",
  },
  {
    number: "03",
    title: "Build useful customer assistants",
    description:
      "Give customers fast, useful answers and let the assistant carry the conversation through to a real business outcome.",
    examples: ["Answer common questions", "Book calls or appointments", "Create and update CRM leads"],
    variant: "inspect" as const,
    href: "/customer-assistants",
  },
  {
    number: "04",
    title: "Improve sales follow-up",
    description:
      "Use the information already in your CRM and systems to prepare relevant outreach, while keeping people in control of what gets sent.",
    examples: ["Personalised email drafts", "Human approval before send", "CRM status updated automatically"],
    variant: "paint" as const,
    href: "/sales-automation",
  },
];

const PROOF_EXAMPLES = [
  {
    eyebrow: "DEMONSTRATION · ENQUIRY HANDLING",
    title: "From an email to a usable business record",
    before: "A person reads a customer email, identifies the service and value, then copies the information into a spreadsheet or CRM.",
    automation: "The enquiry is read once. Customer, service, location and value are identified and structured automatically.",
    control: "The team can review unusual enquiries or incomplete information before anything is progressed.",
    outcome: "A clean new record is created without repetitive re-keying.",
  },
  {
    eyebrow: "DEMONSTRATION · CONNECTED WORKFLOW",
    title: "From a won deal to an invoice",
    before: "A salesperson marks an opportunity Won, then somebody re-enters the same customer and deal information into finance.",
    automation: "The CRM event creates the invoice using information already held in the business systems.",
    control: "Approval can remain in the flow for values, exceptions or financial rules that need a person to check them.",
    outcome: "The invoice is created and its reference is returned to CRM automatically.",
  },
  {
    eyebrow: "DEMONSTRATION · CUSTOMER ASSISTANT",
    title: "From a website question to a booked follow-up",
    before: "A visitor gets an answer, then has to find another form or wait for somebody to pick up the enquiry.",
    automation: "The assistant answers the question, offers the next action and records a call request in CRM.",
    control: "Unclear or sensitive conversations can be handed to a person rather than forcing an automated answer.",
    outcome: "The customer gets a useful response and the team receives a structured lead with the next action attached.",
  },
];

const DELIVERY_STEPS = [
  ["1", "Show us the problem", "Describe one repetitive, slow or awkward process. You do not need an AI strategy or a technical specification."],
  ["2", "We find the simplest useful solution", "We map the trigger, systems, hand-offs, exceptions and business outcome before recommending technology."],
  ["3", "We build it", "We start with one bounded workflow and connect only the systems needed to make that process work better."],
  ["4", "You test and approve it", "The workflow is demonstrated and tested with you. Human approval remains wherever judgement, risk or customer impact requires it."],
  ["5", "We support and improve it", "Once the first workflow is working reliably, we can support it and extend the same approach to the next bottleneck."],
];

const FAQS = [
  ["Can you work with the systems we already use?", "Usually, yes. We start by checking how your existing tools exchange information — through APIs, exports, email, files or other supported routes — and choose the simplest reliable option."],
  ["Do we need an AI strategy first?", "No. A specific process that wastes time, creates duplicate work or slows a customer down is enough to start."],
  ["How long does a small automation take?", "A bounded starter workflow can often be delivered in around one to two weeks once access, rules and test examples are available. Connected integrations take longer and are scoped before work starts."],
  ["What happens to our data?", "We agree what information the workflow needs, minimise access to what is necessary and choose deployment and model options appropriate to the sensitivity of the data."],
  ["Can a person approve actions before they happen?", "Yes. Human approval can sit immediately before emails are sent, records are committed, financial actions are taken or any other step where judgement matters."],
  ["What if our systems do not have APIs?", "That does not automatically stop the project. We assess supported exports, files, email-driven workflows or other integration options before deciding whether the process is practical to automate."],
];

const CONTROL_POINTS = [
  ["01", "Agreed access", "We agree which systems and information the workflow needs before implementation."],
  ["02", "Human approval", "Approval gates stay in the flow for decisions or actions where judgement matters."],
  ["03", "Clear data flows", "The systems, hand-offs and destinations are made explicit rather than hidden behind a black box."],
  ["04", "Private when needed", "Sensitive use cases can use private or customer-controlled deployment approaches where appropriate."],
];

export default function Home() {
  const handleEmailCTA = () => {
    window.location.href = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent("AI Midlands enquiry")}&body=${encodeURIComponent("Hi Kunle,\n\nI would like to discuss where automation could help our business.\n\nThe process is:\n\nBest regards,")}`;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <div className="bg-[#0f172b] text-slate-300 text-[12px] py-2 px-4 text-center">
        <Link href="/bbc-article">
          <span className="inline-flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c83927]" />
            <span>
              Trusted commentary featured on <span className="font-semibold text-white">BBC Radio West Midlands</span> — Kunle Ibidun on AI and the future of customer service
            </span>
            <span className="text-[#d95535]">→</span>
          </span>
        </Link>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#eadfd6] bg-[#faf8f5]/95 backdrop-blur-xl">
        <div className="container min-h-[76px] flex items-center justify-between gap-6">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer shrink-0" aria-label="AI Midlands home">
              <img src="/brand/ai-midlands-mark.svg" alt="" className="w-[58px] h-[38px] object-contain" />
              <span className="font-semibold tracking-[-0.025em] text-[#0f172b] text-[16px] hidden sm:block">AI Midlands</span>
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
            <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-10 px-5 text-sm shadow-none" asChild>
              <a href="#assessment">Assess a process</a>
            </Button>
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
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-end mb-14">
              <div className="max-w-3xl">
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Things we can fix</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.05] mb-5">Practical AI services built around the work your business already does.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">We use AI where it helps, connect it to the systems around it, and automate the repetitive steps before and after. The result should be less admin, faster response and cleaner information — not another isolated chatbot.</p>
              </div>
              <CraftIllustration variant="move" className="hidden lg:block opacity-90" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {SERVICE_CARDS.map(({ number, title, description, examples, variant, href }) => (
                <Link key={title} href={href}>
                  <article className="group h-full min-h-[430px] cursor-pointer rounded-[28px] border border-[#e5ddd5] bg-white px-7 pt-7 pb-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,43,0.08)]">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <span className="text-[#c83927] text-xs font-bold tracking-[0.16em]">{number}</span>
                      <CraftIllustration variant={variant} className="w-[170px] max-w-[42%] opacity-80 -mt-3 -mr-3" />
                    </div>
                    <h3 className="text-2xl md:text-[28px] font-semibold tracking-[-0.035em] leading-tight text-[#0f172b] mb-4 max-w-[420px]">{title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">{description}</p>
                    <div className="border-t border-[#eee7e0] pt-5 space-y-2.5 mb-7">
                      {examples.map(example => <p key={example} className="text-sm text-slate-600"><span className="text-[#c83927] mr-2">—</span>{example}</p>)}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324]">See this service <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white border-y border-[#e8e0d8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Indicative pricing</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">Enough information to know whether a conversation is worth having.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">We scope the actual process before quoting, but you should not have to guess whether AI Midlands means hundreds, thousands or tens of thousands of pounds.</p>
              </div>
              <div className="grid md:grid-cols-3 border-y border-[#ded6ce] divide-y md:divide-y-0 md:divide-x divide-[#ded6ce]">
                {[
                  ["Starter automation", "from £1,250", "One bounded process, normally involving one or two existing tools.", "Email/admin automation, spreadsheet consolidation, simple lead capture or a focused internal workflow."],
                  ["Connected workflow", "from £2,500", "Multiple business steps or systems, with integration, approvals and testing.", "CRM → finance, customer assistant → CRM, system-to-system hand-offs and controlled multi-step workflows."],
                  ["Bespoke integration", "Scoped", "Complex APIs, legacy systems, sensitive information or wider operational change.", "We confirm feasibility, delivery approach and a fixed or staged estimate before you commit."],
                ].map(([label, price, copy, detail]) => (
                  <article key={label} className="p-7 md:p-8 min-h-[310px] flex flex-col">
                    <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#b43a28] mb-6">{label}</p>
                    <p className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#0f172b] mb-4">{price}</p>
                    <p className="text-slate-600 leading-relaxed mb-6">{copy}</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-auto">{detail}</p>
                  </article>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-5">Prices are indicative starting points, exclude VAT where applicable, and depend on system access, integration constraints, testing and support requirements.</p>
            </div>
          </div>
        </section>

        <section id="proof" className="bg-[#f6efe8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-end mb-12">
                <div className="max-w-3xl">
                  <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Proof of the approach</p>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">See what changes before and after the automation.</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">These are demonstrations of the workflows shown on this site, not customer case studies. They make the delivery pattern concrete while we build a library of real client outcomes.</p>
                </div>
                <CraftIllustration variant="connect" className="hidden lg:block opacity-80" />
              </div>

              <div className="space-y-5">
                {PROOF_EXAMPLES.map((example, index) => (
                  <article key={example.title} className="rounded-[26px] bg-white border border-[#e3d8ce] px-6 md:px-8 py-7 md:py-8">
                    <div className="grid lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr] gap-6 lg:gap-0">
                      <div className="lg:pr-7">
                        <p className="text-[#b43a28] text-[10px] font-semibold uppercase tracking-[0.16em] mb-3">{String(index + 1).padStart(2, "0")} · {example.eyebrow.replace("DEMONSTRATION · ", "")}</p>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-[#0f172b] leading-tight">{example.title}</h3>
                      </div>
                      {[
                        ["Before", example.before],
                        ["Automation", example.automation],
                        ["Human control", example.control],
                        ["Outcome", example.outcome],
                      ].map(([label, copy]) => (
                        <div key={label} className="lg:px-5 lg:border-l border-[#ece5de]">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">{label}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{copy}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">How we work</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">Small, controlled interventions rather than a transformation programme.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">We start with one useful process, prove it in your environment and only expand when there is a reason to.</p>
              <CraftIllustration variant="paint" className="max-w-[360px] opacity-90 mb-8" />
              <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-11 px-6" asChild><a href="#assessment">Assess a process <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
            </div>
            <div className="border-t border-[#ddd5cd]">
              {DELIVERY_STEPS.map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[52px_1fr] gap-5 py-7 border-b border-[#ddd5cd]">
                  <span className="text-[#c83927] text-sm font-bold pt-1">{number}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#0f172b] mb-2">{title}</h3>
                    <p className="text-slate-600 leading-relaxed max-w-2xl">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-white border-y border-[#e8e0d8] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.95fr] gap-14 items-center">
              <div>
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Who is behind AI Midlands</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">AI integration needs delivery experience as much as it needs AI expertise.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-7">AI Midlands is founder-led by Kunle Ibidun, bringing more than 20 years of digital delivery, integration, API, cloud and data experience to practical AI implementation.</p>
                <Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] hover:text-[#7f271d] cursor-pointer">Meet Kunle and see how AI Midlands works <ArrowRight className="w-4 h-4" /></span></Link>
              </div>
              <div className="rounded-[30px] bg-[#f6efe8] border border-[#e4dbd3] p-6 md:p-8">
                <CraftIllustration variant="connect" className="mb-4 opacity-90" />
                <div className="border-t border-[#ded3c8] pt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-600">
                  {["Transport", "Banking", "Energy", "UK Government", "Digital products", "Integration programmes", "Complex system integration", "Multi-supplier delivery"].map(item => <p key={item}><span className="text-[#c83927] mr-2">—</span>{item}</p>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="bg-[#0f172b] py-20 md:py-28">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
              <div>
                <p className="text-[#e2785d] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Security & control</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-white leading-[1.06] mb-5">Your business stays in control.</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-5">We design automation around the systems you already use, minimise access to the information required, and keep human approval where judgement matters.</p>
                <p className="text-slate-400 leading-relaxed">Where information is sensitive, we can design private or customer-controlled deployment options. Private AI is available when the use case requires it; it is not the starting point for every project.</p>
                <CraftIllustration variant="inspect" tone="dark" className="mt-8 max-w-[430px] opacity-90" />
              </div>
              <div className="grid sm:grid-cols-2 border-t border-slate-700/80">
                {CONTROL_POINTS.map(([number, title, text]) => (
                  <div key={number} className="py-7 sm:pr-7 sm:odd:border-r border-b border-slate-700/80 sm:even:pl-7">
                    <span className="text-[#e2785d] text-xs font-bold tracking-[0.16em]">{number}</span>
                    <h3 className="font-semibold text-white text-lg mt-4 mb-2">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className="container py-20 md:py-28">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.72fr_1.28fr] gap-14 items-start">
            <div>
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Before you buy</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">The practical questions we expect you to ask.</h2>
              <p className="text-slate-600 leading-relaxed">If the answer depends on your particular systems or data, we will say so rather than pretending every automation is straightforward.</p>
            </div>
            <div className="border-y border-[#ddd5cd]">
              {FAQS.map(([question, answer]) => (
                <details key={question} className="group py-6 border-b last:border-b-0 border-[#ddd5cd]">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-semibold text-[#0f172b] text-lg">
                    <span>{question}</span><span className="text-[#c83927] text-2xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="pt-4 pr-10 text-slate-600 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6efe8] border-y border-[#e3d8ce] py-20 md:py-24 overflow-hidden">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-10 items-center">
              <div className="max-w-3xl">
                <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Tell us what is wasting your time</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06] mb-5">Show us one process. We’ll tell you what looks practical and what it is likely to cost.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl">You do not need an AI strategy before speaking to us. A recurring task, awkward hand-off or slow customer process is enough.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-12 px-7 text-base" asChild><a href="#assessment">Assess a process <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
                  <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-white/80 text-slate-700 h-12 px-7 text-base" onClick={handleEmailCTA}>Send an enquiry</Button>
                </div>
              </div>
              <CraftIllustration variant="move" className="hidden lg:block opacity-95" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#e8e0d8] py-10">
        <div className="container">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-4">
              <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="w-[105px] h-auto" />
              <p className="text-slate-500 text-xs leading-5">Midlands based<br />UK wide</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 md:justify-end">
              <Link href="/about"><span className="hover:text-[#c83927] cursor-pointer">About</span></Link>
              <Link href="/privacy"><span className="hover:text-[#c83927] cursor-pointer">Privacy</span></Link>
              <Link href="/terms"><span className="hover:text-[#c83927] cursor-pointer">Terms</span></Link>
              <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-[#c83927]">hello@ai-midlands.co.uk</a>
              <a href="tel:07966461005" className="hover:text-[#c83927]">07966 461005</a>
              <Link href="/bbc-article"><span className="hover:text-[#c83927] cursor-pointer">BBC commentary</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
