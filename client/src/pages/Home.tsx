import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { ProcessAssessment } from "@/components/ProcessAssessment";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Database,
  Lock,
  Mail,
  Radio,
  Server,
  Users,
} from "lucide-react";

const SERVICE_CARDS = [
  {
    number: "01",
    title: "Automate enquiries and admin",
    description:
      "Turn incoming emails, forms and documents into structured records, tasks and updates without re-keying information by hand.",
    examples: ["Email → spreadsheet or CRM", "Document data extraction", "Automatic triage and routing"],
    icon: Mail,
    href: "/business-automation",
  },
  {
    number: "02",
    title: "Automate business processes",
    description:
      "Connect the steps your team already performs so one business event can trigger the next action automatically.",
    examples: ["CRM win → invoice", "Approval → follow-up task", "Status change → customer update"],
    icon: Database,
    href: "/workflow-automation",
  },
  {
    number: "03",
    title: "Build useful customer assistants",
    description:
      "Give customers fast, useful answers and let the assistant carry the conversation through to a real business outcome.",
    examples: ["Answer common questions", "Book calls or appointments", "Create and update CRM leads"],
    icon: Users,
    href: "/customer-assistants",
  },
  {
    number: "04",
    title: "Improve sales follow-up",
    description:
      "Use the information already in your CRM and systems to prepare relevant outreach, while keeping people in control of what gets sent.",
    examples: ["Personalised email drafts", "Human approval before send", "CRM status updated automatically"],
    icon: Briefcase,
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
  {
    number: "1",
    title: "Show us the problem",
    text: "Describe one repetitive, slow or awkward process. You do not need an AI strategy or a technical specification.",
  },
  {
    number: "2",
    title: "We find the simplest useful solution",
    text: "We map the trigger, systems, hand-offs, exceptions and business outcome before recommending technology.",
  },
  {
    number: "3",
    title: "We build it",
    text: "We start with one bounded workflow and connect only the systems needed to make that process work better.",
  },
  {
    number: "4",
    title: "You test and approve it",
    text: "The workflow is demonstrated and tested with you. Human approval remains wherever judgement, risk or customer impact requires it.",
  },
  {
    number: "5",
    title: "We support and improve it",
    text: "Once the first workflow is working reliably, we can support it and extend the same approach to the next bottleneck.",
  },
];

const FAQS = [
  ["Can you work with the systems we already use?", "Usually, yes. We start by checking how your existing tools exchange information — through APIs, exports, email, files or other supported routes — and choose the simplest reliable option."],
  ["Do we need an AI strategy first?", "No. A specific process that wastes time, creates duplicate work or slows a customer down is enough to start."],
  ["How long does a small automation take?", "A bounded starter workflow can often be delivered in around one to two weeks once access, rules and test examples are available. Connected integrations take longer and are scoped before work starts."],
  ["What happens to our data?", "We agree what information the workflow needs, minimise access to what is necessary and choose deployment and model options appropriate to the sensitivity of the data."],
  ["Can a person approve actions before they happen?", "Yes. Human approval can sit immediately before emails are sent, records are committed, financial actions are taken or any other step where judgement matters."],
  ["What if our systems do not have APIs?", "That does not automatically stop the project. We assess supported exports, files, email-driven workflows or other integration options before deciding whether the process is practical to automate."],
];

export default function Home() {
  const handleEmailCTA = (subject: string, body: string) => {
    window.location.href = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col selection:bg-orange-200 selection:text-orange-900">
      <div className="fixed top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-orange-100/25 via-amber-50/10 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-100/40 to-transparent blur-3xl pointer-events-none" />

      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center">
        <Link href="/bbc-article">
          <span className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Radio className="w-3 h-3 text-orange-400 shrink-0" />
            <span>
              Trusted commentary featured on <span className="font-semibold text-white">BBC Radio West Midlands</span> — Kunle Ibidun on AI and the future of customer service
            </span>
            <ArrowRight className="w-3 h-3 text-orange-400 shrink-0" />
          </span>
        </Link>
      </div>

      <header className="relative z-20 border-b border-orange-100/80 bg-[#faf8f5]/90 backdrop-blur-md sticky top-0">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/"><div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center"><span className="font-sans font-bold text-white text-[11px] tracking-tight">AM</span></div>
            <span className="font-semibold tracking-tight text-slate-900 text-[15px]">AI Midlands</span>
          </div></Link>

          <nav className="hidden lg:flex items-center gap-7">
            <a href="#assessment" className="text-sm font-semibold text-slate-800 hover:text-[#e85d2a] transition-colors">Assess a process</a>
            <a href="#services" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Services</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Pricing</a>
            <a href="#proof" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Examples</a>
            <a href="#approach" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">How we work</a>
            <Link href="/about"><span className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors cursor-pointer">About</span></Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:07966461005" className="hidden md:flex items-center gap-2 text-sm text-slate-600 hover:text-[#e85d2a] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[#e85d2a]" />07966 461005</a>
            <Button className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white text-sm h-9 px-4 shadow-none" asChild><a href="#assessment">Assess a process</a></Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <Hero />

        <section className="border-y border-slate-200 bg-white">
          <div className="container py-7">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">The starting point</p>
                <p className="text-slate-900 text-lg font-semibold">A business process you want to improve — not an AI platform you have to find a use for.</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">{["Email", "CRM", "Spreadsheets", "Finance", "Websites", "APIs"].map(item => <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{item}</span>)}</div>
            </div>
          </div>
        </section>

        <ProcessAssessment />

        <section id="services" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Things we can fix</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">Practical AI services built around the work your business already does.</h2>
              <p className="text-slate-600 text-lg leading-relaxed">We use AI where it helps, connect it to the systems around it, and automate the repetitive steps before and after. The result should be less admin, faster response and cleaner information — not another isolated chatbot.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {SERVICE_CARDS.map(({ number, title, description, examples, icon: Icon, href }) => (
                <Link key={title} href={href}>
                  <article className="group h-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center"><Icon className="w-5 h-5 text-orange-700" /></div>
                      <span className="text-orange-700 text-xs font-bold tracking-widest">{number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-5">{description}</p>
                    <ul className="space-y-2 mb-5">{examples.map(example => <li key={example} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />{example}</li>)}</ul>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700">See this service <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white border-y border-slate-200 py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-10">
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Indicative pricing</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Enough information to know whether a conversation is worth having.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">We scope the actual process before quoting, but you should not have to guess whether AI Midlands means hundreds, thousands or tens of thousands of pounds.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <article className="rounded-2xl border border-slate-200 bg-[#faf8f5] p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">Starter automation</p><p className="text-3xl font-bold text-slate-900 mb-2">from £1,250</p><p className="text-slate-600 text-sm leading-relaxed mb-5">One bounded process, normally involving one or two existing tools.</p><p className="text-sm text-slate-700">Good for: email/admin automation, spreadsheet consolidation, simple lead capture or a focused internal workflow.</p></article>
                <article className="rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">Connected workflow</p><p className="text-3xl font-bold text-slate-900 mb-2">from £2,500</p><p className="text-slate-600 text-sm leading-relaxed mb-5">Multiple business steps or systems, with integration, approvals and testing.</p><p className="text-sm text-slate-700">Good for: CRM → finance, customer assistant → CRM, system-to-system hand-offs and controlled multi-step workflows.</p></article>
                <article className="rounded-2xl border border-slate-200 bg-[#faf8f5] p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">Bespoke integration</p><p className="text-3xl font-bold text-slate-900 mb-2">Scoped</p><p className="text-slate-600 text-sm leading-relaxed mb-5">Complex APIs, legacy systems, sensitive information or wider operational change.</p><p className="text-sm text-slate-700">We confirm feasibility, delivery approach and a fixed or staged estimate before you commit.</p></article>
              </div>
              <p className="text-xs text-slate-500 mt-5">Prices are indicative starting points, exclude VAT where applicable, and depend on system access, integration constraints, testing and support requirements.</p>
            </div>
          </div>
        </section>

        <section id="proof" className="bg-[#fdf6ee] border-b border-orange-100 py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Proof of the approach</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">See what changes before and after the automation.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">These are demonstrations of the workflows shown on this site, not customer case studies. They make the delivery pattern concrete while we build a library of real client outcomes.</p>
              </div>

              <div className="space-y-5">
                {PROOF_EXAMPLES.map(example => (
                  <article key={example.title} className="rounded-2xl bg-white border border-orange-100 p-6 md:p-7 shadow-sm">
                    <p className="text-orange-700 text-xs font-semibold uppercase tracking-wider mb-2">{example.eyebrow}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">{example.title}</h3>
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4"><p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Before</p><p className="text-slate-700 text-sm leading-relaxed">{example.before}</p></div>
                      <div className="rounded-xl bg-orange-50 border border-orange-100 p-4"><p className="text-orange-700 text-xs font-semibold uppercase tracking-wider mb-2">Automation</p><p className="text-slate-700 text-sm leading-relaxed">{example.automation}</p></div>
                      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4"><p className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">Human control</p><p className="text-slate-700 text-sm leading-relaxed">{example.control}</p></div>
                      <div className="rounded-xl bg-green-50 border border-green-100 p-4"><p className="text-green-700 text-xs font-semibold uppercase tracking-wider mb-2">Outcome</p><p className="text-slate-700 text-sm leading-relaxed">{example.outcome}</p></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 items-start">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">How we work</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">Small, controlled interventions rather than a transformation programme.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-7">We start with one useful process, prove it in your environment and only expand when there is a reason to.</p>
                <Button className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white h-11 px-6" asChild><a href="#assessment">Assess a process <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
              </div>
              <div className="space-y-3">{DELIVERY_STEPS.map(step => <div key={step.number} className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4"><div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0">{step.number}</div><div><h3 className="font-bold text-slate-900 mb-1">{step.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{step.text}</p></div></div>)}</div>
            </div>
          </div>
        </section>

        <section id="why" className="bg-white border-y border-slate-200 py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Who is behind AI Midlands</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">AI integration needs delivery experience as much as it needs AI expertise.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">AI Midlands is founder-led by Kunle Ibidun, bringing more than 20 years of digital delivery, integration, API, cloud and data experience to practical AI implementation.</p>
                <Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 cursor-pointer">Meet Kunle and see how AI Midlands works <ArrowRight className="w-4 h-4" /></span></Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#faf8f5] p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">Experience across</p>
                <div className="flex flex-wrap gap-2 mb-6">{["Transport", "Banking", "Energy", "UK Government", "Digital products", "Integration programmes"].map(item => <span key={item} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">{item}</span>)}</div>
                <div className="border-t border-slate-200 pt-5 space-y-3">{["Complex system integration", "Multi-supplier delivery", "APIs and cloud platforms", "Security-conscious implementation"].map(item => <div key={item} className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />{item}</div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="bg-slate-900 py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1fr] gap-10 items-start">
              <div>
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">Security & control</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your business stays in control.</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-5">We design automation around the systems you already use, minimise access to the information required, and keep human approval where judgement matters.</p>
                <p className="text-slate-400 leading-relaxed">Where information is sensitive, we can design private or customer-controlled deployment options. Private AI is available when the use case requires it; it is not the starting point for every project.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5"><Lock className="w-5 h-5 text-orange-400 mb-3" /><h3 className="font-semibold text-white mb-2">Agreed access</h3><p className="text-sm text-slate-400">We agree which systems and information the workflow needs before implementation.</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5"><CheckCircle2 className="w-5 h-5 text-orange-400 mb-3" /><h3 className="font-semibold text-white mb-2">Human approval</h3><p className="text-sm text-slate-400">Approval gates stay in the flow for decisions or actions where judgement matters.</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5"><Server className="w-5 h-5 text-orange-400 mb-3" /><h3 className="font-semibold text-white mb-2">Clear data flows</h3><p className="text-sm text-slate-400">The systems, hand-offs and destinations are made explicit rather than hidden behind a black box.</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5"><Building2 className="w-5 h-5 text-orange-400 mb-3" /><h3 className="font-semibold text-white mb-2">Private when needed</h3><p className="text-sm text-slate-400">Sensitive use cases can use private or customer-controlled deployment approaches where appropriate.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
            <div><p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Before you buy</p><h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">The practical questions we expect you to ask.</h2><p className="text-slate-600 leading-relaxed">If the answer depends on your particular systems or data, we will say so rather than pretending every automation is straightforward.</p></div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">{FAQS.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-slate-900"><span>{question}</span><span className="text-orange-600 text-xl font-normal group-open:rotate-45 transition-transform">+</span></summary><p className="pt-3 pr-10 text-slate-600 leading-relaxed">{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Tell us what is wasting your time</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Show us one process. We’ll tell you what looks practical and what it is likely to cost.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">You do not need an AI strategy before speaking to us. A recurring task, awkward hand-off or slow customer process is enough.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white h-12 px-7 text-base" asChild><a href="#assessment">Assess a process <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
                <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-12 px-7 text-base" onClick={() => handleEmailCTA("AI Midlands enquiry", "Hi Kunle,\n\nI would like to discuss where automation could help our business.\n\nThe process is:\n\nBest regards,")}><Mail className="w-4 h-4 mr-2" />Send an Enquiry</Button>
              </div>
              <div className="mt-6"><Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-700 cursor-pointer">Want to know who you would be working with? About AI Midlands <ArrowRight className="w-4 h-4" /></span></Link></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center"><span className="font-sans font-bold text-white text-[11px]">AM</span></div><div><p className="font-semibold text-slate-900 text-sm">AI Midlands</p><p className="text-slate-500 text-xs">Midlands based · UK wide</p></div></div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <Link href="/about"><span className="hover:text-orange-700 cursor-pointer">About</span></Link>
              <Link href="/privacy"><span className="hover:text-orange-700 cursor-pointer">Privacy</span></Link>
              <Link href="/terms"><span className="hover:text-orange-700 cursor-pointer">Terms</span></Link>
              <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-orange-700">hello@ai-midlands.co.uk</a>
              <a href="tel:07966461005" className="hover:text-orange-700">07966 461005</a>
              <Link href="/bbc-article"><span className="hover:text-orange-700 cursor-pointer">BBC commentary</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
