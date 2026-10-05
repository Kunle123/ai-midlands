import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Mail,
  Radio,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

const FOUNDER_IMAGE = "https://arokin.org/media/kunle-ibidun-founder.jpg";

const services = [
  {
    title: "Business automation",
    text: "Turn emails, forms and documents into organised records and actions without repetitive re-keying.",
    href: "/business-automation",
  },
  {
    title: "Workflow automation",
    text: "Connect CRM, finance, operations and other systems so the next step happens automatically.",
    href: "/workflow-automation",
  },
  {
    title: "Customer assistants",
    text: "Build assistants that answer useful questions and can complete actions such as booking calls and creating leads.",
    href: "/customer-assistants",
  },
  {
    title: "Sales automation",
    text: "Use the context already in your systems to prepare relevant follow-up while keeping human approval where it matters.",
    href: "/sales-automation",
  },
];

const deliveryPrinciples = [
  {
    icon: BriefcaseBusiness,
    title: "Business outcome first",
    text: "We start with the process, the wasted effort or the missed opportunity — not with an AI product looking for somewhere to fit.",
  },
  {
    icon: Workflow,
    title: "Work with what you already use",
    text: "The aim is to connect the systems your team depends on, not create another disconnected platform for people to maintain.",
  },
  {
    icon: Users,
    title: "Keep people in control",
    text: "Approvals, exceptions and judgement stay with people when they should. Automation handles the repeatable work around them.",
  },
  {
    icon: ShieldCheck,
    title: "Security in proportion to the job",
    text: "Sensitive information can use private or customer-controlled AI when the use case requires it. It is a design choice, not a sales prerequisite.",
  },
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
    meta.setAttribute(
      "content",
      "Meet Kunle Ibidun, founder of AI Midlands. More than two decades delivering complex digital, integration and technology change, now focused on practical AI automation for businesses.",
    );
  }, []);

  const mailHref = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent("AI Midlands automation enquiry")}&body=${encodeURIComponent("Hi Kunle,\n\nI would like to discuss a process in our business that we may be able to automate.\n\nThe process is:\n\n")}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <header className="sticky top-0 z-30 border-b border-orange-100/80 bg-[#faf8f5]/95 backdrop-blur-md">
        <div className="container py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center">
                <span className="font-bold text-white text-[11px]">AM</span>
              </div>
              <span className="font-semibold tracking-tight text-slate-900 text-[15px]">AI Midlands</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="/business-automation"><span className="cursor-pointer text-slate-600 hover:text-[#e85d2a]">Automation</span></Link>
            <Link href="/customer-assistants"><span className="cursor-pointer text-slate-600 hover:text-[#e85d2a]">Customer assistants</span></Link>
            <span className="font-semibold text-slate-900">About</span>
          </nav>

          <a
            href="https://calendly.com/kunle2000/30min"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#e85d2a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14e1e] transition-colors"
          >
            Book a call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="container py-14 md:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-[0.18em] mb-4">About AI Midlands</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.04] text-slate-900 mb-6">
                Practical AI, delivered with enterprise discipline.
              </h1>
              <p className="text-xl leading-relaxed text-slate-700 mb-5">
                I’m Kunle Ibidun, founder of AI Midlands. I’ve spent more than two decades delivering complex digital, integration and technology change.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mb-8">
                AI Midlands applies that delivery experience to a practical question: where can AI remove repetitive work, connect the systems you already use, or help a customer complete an action more quickly?
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://calendly.com/kunle2000/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e85d2a] px-6 py-3.5 text-white font-semibold hover:bg-[#d14e1e] transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Book an automation review
                </a>
                <a
                  href={mailHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-slate-700 font-semibold hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Tell me the process
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Founder-led delivery</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Midlands based</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> UK wide</span>
              </div>
            </div>

            <figure className="relative max-w-[500px] lg:ml-auto">
              <div className="absolute -inset-5 rounded-[2rem] bg-orange-100/55 -rotate-2" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.14)]">
                <img
                  src={FOUNDER_IMAGE}
                  alt="Kunle Ibidun, founder of AI Midlands"
                  className="aspect-[3/4] w-full object-cover object-top"
                  width="768"
                  height="1024"
                />
                <figcaption className="border-t border-slate-100 bg-white px-5 py-4">
                  <p className="font-semibold text-slate-900">Kunle Ibidun</p>
                  <p className="text-sm text-slate-500">Founder · AI Midlands</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-8">
          <div className="container">
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                ["20+ years", "delivering complex change"],
                ["Public services", "delivery in demanding environments"],
                ["Transport & energy", "integration and digital change"],
                ["Financial services", "systems, governance and delivery"],
              ].map(([value, label]) => (
                <div key={value} className="border-l-2 border-orange-200 pl-4 py-1">
                  <p className="text-lg font-bold text-slate-900">{value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[0.88fr_1.12fr] gap-10 md:gap-14 items-start">
            <div>
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Why AI Midlands exists</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                AI should improve a process, not become another technology project.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Much of my career has been spent where information has to move reliably between teams, suppliers and systems. The technology changes; the delivery problem is often the same: somebody has to understand what should happen next and make the hand-off work.
              </p>
              <p>
                That is how I approach AI. We look for a repeatable piece of work with a clear outcome, understand the systems and people around it, then automate only what genuinely helps.
              </p>
              <p className="font-semibold text-slate-800">
                The goal is not to make your business look more “AI”. It is to make the work easier, faster or more reliable.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">What buying from AI Midlands means</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 max-w-3xl">
                A small engagement should still be designed and delivered properly.
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {deliveryPrinciples.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-orange-700" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 leading-relaxed">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">What we build</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 max-w-3xl">Four practical ways to put AI to work.</h2>
              </div>
              <p className="text-slate-500 max-w-sm">Each can start as one bounded process rather than a large transformation programme.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {services.map((service, index) => (
                <Link key={service.href} href={service.href}>
                  <article className="group h-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-slate-900/5">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-2">0{index + 1}</p>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{service.text}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-slate-200 py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Builder as well as delivery lead</p>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">I also build products, not just recommendations.</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  I’m also the founder of Arokin, a companion app for projects and programmes. Building and operating a product keeps the work grounded in the practical details that matter: data, integrations, user experience, testing and deployment.
                </p>
                <a
                  href="https://arokin.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900"
                >
                  See Arokin <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Delivery perspective</p>
                <div className="space-y-3">
                  {["Complex multi-team and multi-supplier delivery", "Integration and digital delivery", "Governance, dependencies and risk", "Executive reporting and decision support"].map(item => (
                    <div key={item} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-14">
          <Link href="/bbc-article">
            <div className="group max-w-5xl mx-auto cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-5 md:flex md:items-center md:gap-7 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 shrink-0 mb-4 md:mb-0">
                <Radio className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-slate-900">BBC Radio West Midlands</span>
              </div>
              <p className="text-slate-600 flex-1">Commentary on AI and the future of customer service — including where automation helps and where people remain essential.</p>
              <span className="mt-3 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 group-hover:gap-3 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </section>

        <section className="bg-slate-900 py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">A sensible first step</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                Show me one process that wastes time or loses opportunities.
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                We can map what starts it, where the information moves, what people currently do and what a useful automated outcome would look like.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://calendly.com/kunle2000/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-white font-semibold hover:bg-orange-700"
                >
                  <Calendar className="w-4 h-4" /> Book a 30-minute review
                </a>
                <a
                  href={mailHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3.5 text-slate-200 font-semibold hover:bg-slate-800"
                >
                  <Mail className="w-4 h-4" /> Email the process instead
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container py-7 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-slate-500">
          <span>© AI Midlands · Midlands based · UK wide</span>
          <div className="flex gap-5">
            <Link href="/"><span className="cursor-pointer hover:text-orange-700">Home</span></Link>
            <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-orange-700">hello@ai-midlands.co.uk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
