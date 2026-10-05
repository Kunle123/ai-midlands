import { Link } from "wouter";
import { Hero } from "@/components/hero/Hero";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  Calendar,
  Lock,
  Server,
  Users,
  Database,
  Briefcase,
  Radio,
  Building2,
} from "lucide-react";

const SERVICE_CARDS = [
  {
    number: "01",
    title: "Automate enquiries and admin",
    description:
      "Turn incoming emails, forms and documents into structured records, tasks and updates without re-keying information by hand.",
    examples: ["Email → spreadsheet or CRM", "Document data extraction", "Automatic triage and routing"],
    icon: Mail,
  },
  {
    number: "02",
    title: "Automate business processes",
    description:
      "Connect the steps your team already performs so one business event can trigger the next action automatically.",
    examples: ["CRM win → invoice", "Approval → follow-up task", "Status change → customer update"],
    icon: Database,
  },
  {
    number: "03",
    title: "Build useful customer assistants",
    description:
      "Give customers fast, useful answers and let the assistant carry the conversation through to a real business outcome.",
    examples: ["Answer common questions", "Book calls or appointments", "Create and update CRM leads"],
    icon: Users,
  },
  {
    number: "04",
    title: "Improve sales follow-up",
    description:
      "Use the information already in your CRM and systems to prepare relevant outreach, while keeping people in control of what gets sent.",
    examples: ["Personalised email drafts", "Human approval before send", "CRM status updated automatically"],
    icon: Briefcase,
  },
];

const EXAMPLES = [
  {
    eyebrow: "Understand enquiries",
    title: "From an email to a usable business record",
    input: "A customer emails about an installation in Birmingham with a £12,000 budget.",
    action: "AI identifies the customer, service, location and value.",
    result: "A clean new record is added to the pipeline automatically.",
  },
  {
    eyebrow: "Automate processes",
    title: "From a won deal to an invoice",
    input: "A CRM opportunity moves to Won.",
    action: "The workflow creates the invoice using the customer and deal details already held in the system.",
    result: "The invoice is created and the CRM next step updates without duplicate admin.",
  },
  {
    eyebrow: "Assist customers",
    title: "From a website question to a booked follow-up",
    input: "A visitor asks whether you cover Birmingham.",
    action: "The assistant answers, offers to arrange a call and captures the request.",
    result: "A new lead is created in the CRM with the call request attached.",
  },
  {
    eyebrow: "Personalise outreach",
    title: "From CRM context to a reviewed email",
    input: "A prospect is ready for follow-up.",
    action: "AI prepares a relevant email using the account and opportunity context.",
    result: "A person reviews it, sends it and the CRM is updated automatically.",
  },
];

const DELIVERY_STEPS = [
  {
    number: "1",
    title: "Choose one useful process",
    text: "We start with a specific task that is repetitive, slow or easy to get wrong — not with a generic AI platform.",
  },
  {
    number: "2",
    title: "Connect the systems involved",
    text: "We work with the tools you already use: email, spreadsheets, CRM, finance systems, websites, APIs and document stores.",
  },
  {
    number: "3",
    title: "Put people in control",
    text: "Where judgement matters, the workflow stops for review or approval. Automation removes admin; it does not remove accountability.",
  },
  {
    number: "4",
    title: "Prove the value, then expand",
    text: "Once the first workflow is working, we use the same approach to automate the next bottleneck rather than starting again from scratch.",
  },
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center">
              <span className="font-sans font-bold text-white text-[11px] tracking-tight">AM</span>
            </div>
            <span className="font-semibold tracking-tight text-slate-900 text-[15px]">AI Midlands</span>
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            <a href="#services" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Services</a>
            <a href="#examples" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Examples</a>
            <a href="#approach" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">How we work</a>
            <a href="#private-ai" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Private AI</a>
            <a href="#why" className="text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">Why AI Midlands</a>
            <Link href="/about"><span className="text-sm font-semibold text-slate-800 hover:text-[#e85d2a] transition-colors cursor-pointer">About</span></Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:07966461005" className="hidden md:flex items-center gap-2 text-sm text-slate-600 hover:text-[#e85d2a] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e85d2a]" />
              07966 461005
            </a>
            <Button className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white text-sm h-9 px-4 shadow-none" asChild>
              <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">Book Discovery Call</a>
            </Button>
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
              <div className="flex flex-wrap gap-2 md:justify-end">
                {["Email", "CRM", "Spreadsheets", "Finance", "Websites", "APIs"].map(item => (
                  <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">What we do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                Practical AI services built around the work your business already does.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We use AI where it helps, connect it to the systems around it, and automate the repetitive steps before and after. The result should be less admin, faster response and cleaner information — not another isolated chatbot.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {SERVICE_CARDS.map(({ number, title, description, examples, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange-700" />
                    </div>
                    <span className="text-orange-700 text-xs font-bold tracking-widest">{number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2">
                    {examples.map(example => (
                      <li key={example} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">The examples in the hero, in plain English</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">Small workflows that remove real work.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  These are the kinds of projects we want to talk about: clear inputs, useful automation and a measurable business outcome.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                {EXAMPLES.map((example, index) => (
                  <article key={example.title} className="rounded-2xl bg-white border border-orange-100 p-6 md:p-7 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                      <p className="text-orange-700 text-xs font-semibold uppercase tracking-wider">{example.eyebrow}</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-5">{example.title}</h3>
                    <div className="space-y-3">
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Starts with</p>
                        <p className="text-slate-700 text-sm leading-relaxed">{example.input}</p>
                      </div>
                      <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-orange-500 rotate-90" /></div>
                      <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
                        <p className="text-orange-700 text-xs font-semibold uppercase tracking-wider mb-1">Automation</p>
                        <p className="text-slate-700 text-sm leading-relaxed">{example.action}</p>
                      </div>
                      <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-orange-500 rotate-90" /></div>
                      <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                        <p className="text-green-700 text-xs font-semibold uppercase tracking-wider mb-1">Business outcome</p>
                        <p className="text-slate-700 text-sm leading-relaxed">{example.result}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">How we work</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">Start with one bottleneck. Make it work. Build from there.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-7">
                  AI projects become expensive when they begin with technology rather than a business problem. We deliberately work the other way around.
                </p>
                <Button
                  className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white h-11 px-6"
                  onClick={() => handleEmailCTA(
                    "AI automation idea",
                    "Hi Kunle,\n\nThere is a process in our business that I think could be automated:\n\n[Describe the process]\n\nThe systems involved are:\n\n[Email / CRM / spreadsheet / finance / website / other]\n\nBest regards,"
                  )}
                >
                  Tell us about a process <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-3">
                {DELIVERY_STEPS.map(step => (
                  <div key={step.number} className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0">{step.number}</div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="private-ai" className="bg-slate-900 py-14 md:py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1.25fr_.75fr] gap-10 items-center">
              <div>
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">When privacy really matters</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Private AI is available when the use case requires it.</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                  Some work involves sensitive documents, regulated information or data that cannot be sent to a public AI service. In those cases we can design the same useful workflows around a private deployment. It is an option, not the starting point for every project.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><Lock className="w-4 h-4 text-orange-400 mt-0.5" /><p className="text-slate-300 text-sm">Private or customer-controlled deployment where required</p></div>
                  <div className="flex items-start gap-3"><Server className="w-4 h-4 text-orange-400 mt-0.5" /><p className="text-slate-300 text-sm">On-premise or private-cloud options</p></div>
                  <div className="flex items-start gap-3"><Building2 className="w-4 h-4 text-orange-400 mt-0.5" /><p className="text-slate-300 text-sm">Security and access designed around the organisation</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="container py-16 md:py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Why AI Midlands</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">AI integration needs delivery experience as much as it needs AI expertise.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                The difficult part is usually not generating text. It is understanding the process, connecting the systems, handling exceptions and making the change reliable enough for people to use every day.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                AI Midlands brings more than 20 years of digital delivery, integration, API, cloud and data experience to that problem.
              </p>
              <Link href="/about">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 cursor-pointer">
                  Meet Kunle and see how AI Midlands works <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">Experience across</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Transport", "Banking", "Energy", "UK Government", "Digital products", "Integration programmes"].map(item => (
                  <span key={item} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">{item}</span>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-5 space-y-3">
                {["Complex system integration", "Multi-supplier delivery", "APIs and cloud platforms", "Security-conscious implementation"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Have a process in mind?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Show us the repetitive work. We will show you what can be automated.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                You do not need an AI strategy before speaking to us. A recurring task, awkward hand-off or slow customer process is enough to start the conversation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button className="rounded-full bg-[#e85d2a] hover:bg-[#d14e1e] text-white h-12 px-7 text-base" asChild>
                  <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Discovery Call
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-12 px-7 text-base"
                  onClick={() => handleEmailCTA(
                    "AI Midlands enquiry",
                    "Hi Kunle,\n\nI would like to discuss where AI automation could help our business.\n\nBest regards,"
                  )}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send an Enquiry
                </Button>
              </div>
              <div className="mt-6">
                <Link href="/about">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-700 cursor-pointer">
                    Want to know who you would be working with? About AI Midlands <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center">
                <span className="font-sans font-bold text-white text-[11px]">AM</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">AI Midlands</p>
                <p className="text-slate-500 text-xs">Midlands based · UK wide</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <Link href="/about"><span className="hover:text-orange-700 cursor-pointer">About</span></Link>
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