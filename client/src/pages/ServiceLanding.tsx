import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, CheckCircle2, Mail } from "lucide-react";
import "@/components/hero/hero-baseline.css";
import "@/components/hero/hero-workflows.css";
import "@/components/hero/hero-booking-fix.css";

type ServiceKey = "business-automation" | "workflow-automation" | "customer-assistants" | "sales-automation";

type ServiceConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  focusLabel: string;
  problem: string;
  outcome: string;
  bullets: string[];
  projects: { title: string; text: string }[];
  systems: string[];
  emailSubject: string;
  metaDescription: string;
  price: string;
  priceNote: string;
  beat: 0 | 1 | 2 | 3;
};

const services: Record<ServiceKey, ServiceConfig> = {
  "business-automation": {
    eyebrow: "EMAIL & ADMIN AUTOMATION",
    title: "Turn incoming enquiries into organised work.",
    intro: "We connect email, forms, spreadsheets and CRM so useful information is captured, understood and moved into the right place without somebody re-keying it.",
    focusLabel: "Understand enquiries",
    problem: "Important customer information arrives in inboxes and forms, then somebody has to read it, interpret it and copy it into another system.",
    outcome: "The enquiry is understood, the right fields are captured and the business record is created automatically.",
    bullets: ["Less manual data entry", "Faster response to enquiries", "Cleaner CRM and pipeline data"],
    projects: [
      { title: "Email → CRM", text: "Read incoming enquiries, identify customer, service, value and intent, then create or update the CRM record." },
      { title: "Forms → workflow", text: "Take website or internal form submissions and route them to the right person, queue or process." },
      { title: "Documents → structured data", text: "Extract useful information from PDFs, attachments and messages and place it into the systems your team already uses." },
    ],
    systems: ["Email", "CRM", "Spreadsheets", "Forms", "Shared inboxes"],
    emailSubject: "Business automation enquiry",
    metaDescription: "AI Midlands connects email, forms, spreadsheets and CRM to automate repetitive admin and turn enquiries into organised work.",
    price: "from £1,250",
    priceNote: "A bounded starter automation involving one or two existing tools.",
    beat: 0,
  },
  "workflow-automation": {
    eyebrow: "WORKFLOW & SYSTEM INTEGRATION",
    title: "Connect systems so work moves without someone copying it.",
    intro: "We automate the hand-offs between the tools your business already uses — CRM, finance, operations, email and internal systems — so the next action happens when it should.",
    focusLabel: "Automate processes",
    problem: "One system says the work is ready, but somebody still has to open another system, copy the details and trigger the next step manually.",
    outcome: "A business event in one system creates the next action in another, with confirmation coming back automatically.",
    bullets: ["Fewer manual hand-offs", "Less duplication and re-keying", "Processes continue without chasing"],
    projects: [
      { title: "CRM → finance", text: "A won opportunity can create the invoice, populate the customer information and return the invoice reference to CRM." },
      { title: "Operations → notifications", text: "Status changes can trigger customer messages, tasks, approvals or internal alerts automatically." },
      { title: "System → system", text: "Connect APIs or existing applications so information moves reliably instead of being copied by staff." },
    ],
    systems: ["CRM", "Finance", "Operations", "APIs", "Email"],
    emailSubject: "Workflow automation enquiry",
    metaDescription: "AI Midlands connects CRM, finance, operations and other systems so business processes move automatically without manual re-keying.",
    price: "from £2,500",
    priceNote: "Connected workflows involving multiple steps, systems, approvals or integration work.",
    beat: 1,
  },
  "customer-assistants": {
    eyebrow: "CUSTOMER ASSISTANTS",
    title: "Give customers an assistant that can actually take action.",
    intro: "We build website and service assistants that answer useful questions, understand intent and complete the next step — such as booking a call or creating a CRM lead.",
    focusLabel: "Assist customers",
    problem: "Many chatbots can answer a question. The customer still has to find the next form, call somebody or wait for a person to complete the action.",
    outcome: "The assistant answers the question, offers the next action, completes it and records the result in your business systems.",
    bullets: ["Useful answers at the point of enquiry", "Bookings and lead capture inside the conversation", "CRM updated automatically"],
    projects: [
      { title: "Website assistant", text: "Answer common customer questions using your services, policies and business information." },
      { title: "Booking assistant", text: "Move from question to call or appointment booking without sending the customer away to another journey." },
      { title: "Lead qualification", text: "Capture intent and useful details, then create a structured lead in your CRM for follow-up." },
    ],
    systems: ["Website", "CRM", "Calendar", "Knowledge base", "Email"],
    emailSubject: "Customer assistant enquiry",
    metaDescription: "AI Midlands builds customer assistants that answer questions, book calls and create CRM leads instead of stopping at chatbot responses.",
    price: "from £2,500",
    priceNote: "A useful assistant connected to a real next action such as booking or lead creation.",
    beat: 2,
  },
  "sales-automation": {
    eyebrow: "SALES & OUTREACH AUTOMATION",
    title: "Turn CRM context into personalised follow-up — with human approval.",
    intro: "We use the information already held in CRM and other business systems to prepare relevant outreach, while keeping people in control of what is actually sent.",
    focusLabel: "Personalise outreach",
    problem: "Sales teams have the context they need, but turning it into timely, relevant follow-up still means opening records, checking history and drafting messages manually.",
    outcome: "The system prepares a personalised draft from real account context, a person reviews it, and the CRM records the outcome when it is sent.",
    bullets: ["Faster, more relevant follow-up", "Human approval before sending", "Activity recorded back in CRM"],
    projects: [
      { title: "CRM → personalised draft", text: "Use contact, sector, interest and prior activity to prepare a relevant message instead of a generic sequence." },
      { title: "Follow-up prompts", text: "Trigger the right draft when an opportunity, enquiry or account reaches the right point." },
      { title: "Human-in-the-loop outreach", text: "Keep approval with your team while automating the research, drafting and CRM update around it." },
    ],
    systems: ["CRM", "Email", "Account data", "Sales pipeline", "Approvals"],
    emailSubject: "Sales automation enquiry",
    metaDescription: "AI Midlands uses CRM context to prepare personalised sales follow-up with human approval and automatic CRM updates.",
    price: "from £1,250",
    priceNote: "A bounded sales workflow can start small; deeper CRM integration is scoped separately.",
    beat: 3,
  },
};

function Sweep() {
  return <span className="ai-sweep" aria-hidden="true" />;
}

function WorkflowPreview({ beat }: { beat: 0 | 1 | 2 | 3 }) {
  const views = [
    <div className="hero-beat beat-one" key="one">
      <article className="app beat-mail">
        <div className="app-title"><span className="gmail-dot">M</span><strong>Inbox</strong><span className="time">10:24</span></div>
        <div className="mail-from"><span className="mail-avatar">S</span><div><strong>Sarah Mitchell</strong><span>Acme Ltd · to me</span></div></div>
        <h3>Installation enquiry</h3>
        <p>Hi, we're looking for someone to <mark>install</mark> equipment at our Birmingham site. Our budget is around <mark>£12,000</mark>.</p>
        <Sweep />
      </article>
      <span className="motion-arrow" aria-hidden="true">→</span>
      <article className="app sheet animated-sheet">
        <div className="sheet-bar"><span className="sheet-mark">▦</span><strong>Project pipeline</strong></div>
        <div className="mini-grid grid-head"><span>Customer</span><span>Product</span><span>Value</span><span>Status</span></div>
        <div className="mini-grid incoming"><b>Acme Ltd</b><span>Installation</span><span>£12,000</span><em>New</em></div>
        <div className="mini-grid existing r1"><b>Riverside Group</b><span>Support</span><span>£8,000</span><em>In progress</em></div>
        <div className="mini-grid existing r2"><b>Westbridge Co</b><span>Consultancy</span><span>£5,000</span><em>Won</em></div>
      </article>
    </div>,
    <div className="hero-beat beat-two" key="two">
      <article className="app system-card">
        <div className="app-title"><span className="cloud">●</span><strong>Customer record</strong></div>
        <h3>Acme Ltd</h3><small>Commercial Client</small>
        <dl className="compact-fields"><div><dt>Status</dt><dd><b className="pill green">Won</b></dd></div><div><dt>Value</dt><dd>£12,000</dd></div><div><dt>Next step</dt><dd className="next-step">Send invoice<span>Invoice INV-1042 created</span></dd></div></dl>
        <Sweep />
      </article>
      <div className="data-bridge"><span className="data-packet"><i/><i/><i/></span><span className="return-packet">INV-1042 ✓</span></div>
      <article className="app invoice build-invoice">
        <div className="app-title"><span className="invoice-mark">▤</span><strong>Invoice</strong><span className="pill green sent">Created</span></div>
        <div className="invoice-row"><div><h3>INV-1042</h3><small>Acme Ltd</small></div><strong className="invoice-amount">£12,000</strong></div>
        <div className="invoice-line"><span>Installation</span><span>£12,000</span></div><Sweep />
      </article>
    </div>,
    <div className="hero-beat beat-three" key="three">
      <article className="app assistant conversation">
        <div className="app-title"><span className="chat-mark">□</span><strong>Website assistant</strong><span className="online"><span className="led"/>Online</span></div>
        <div className="bubble customer">Do you install in Birmingham?</div><Sweep />
        <div className="bubble answer reveal-answer">Yes. We're Midlands based and cover Birmingham. Would you like to arrange a call?</div>
        <div className="booking-action">
          <button className="book animated-book" type="button">Book a call</button>
          <span className="booking-pointer" aria-hidden="true" />
          <span className="booking-progress">Requesting call…</span>
        </div>
        <div className="call-confirm">✓ Call request received</div>
      </article>
      <div className="data-bridge booking-bridge"><span className="data-packet"><i/><i/><i/></span><span className="return-packet">Lead created ✓</span></div>
      <article className="app crm lead-list booking-crm">
        <div className="app-title"><span className="cloud">●</span><strong>CRM</strong></div>
        <div className="lead-row"><b>Acme Ltd</b><span>Commercial</span><em>Won</em></div>
        <div className="lead-row new-lead"><b>Birmingham enquiry</b><span>New lead</span><em>Call requested</em></div>
        <Sweep />
      </article>
    </div>,
    <div className="hero-beat beat-four" key="four">
      <article className="app prospect">
        <div className="app-title"><span className="cloud">●</span><strong>CRM prospect</strong></div>
        <h3>Brightwell Engineering</h3><small>Manufacturing · Birmingham</small>
        <dl className="compact-fields"><div><dt>Contact</dt><dd>James Taylor</dd></div><div><dt>Interest</dt><dd>Workflow automation</dd></div><div><dt>Status</dt><dd className="outreach-status">Follow up<span>Email sent</span></dd></div></dl><Sweep />
      </article>
      <span className="motion-arrow" aria-hidden="true">→</span>
      <article className="app outreach">
        <div className="app-title"><span className="gmail-dot">M</span><strong>Draft email</strong><span className="draft-state">Draft</span></div>
        <div className="compose-line"><small>To</small><span>James Taylor</span></div><div className="compose-line"><small>Subject</small><b>Reducing repetitive admin at Brightwell</b></div>
        <p>Hi James, we help Midlands businesses connect existing systems and reduce repetitive admin...</p>
        <div className="approval-row"><button type="button">Approve &amp; send</button><small>Human approval</small></div><div className="sent-confirm">✓ Sent</div>
      </article>
    </div>,
  ];

  return (
    <div className="aim-hero" style={{ display: "block", minHeight: 0, padding: 0, overflow: "visible" }}>
      <div className="workspace animated-workspace" style={{ maxWidth: "none", minHeight: 0, margin: 0 }}>{views[beat]}</div>
    </div>
  );
}

function ServiceLanding({ service }: { service: ServiceKey }) {
  const config = services[service];

  useEffect(() => {
    document.title = `${config.title} | AI Midlands`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", config.metaDescription);
  }, [config]);

  const mailHref = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent(config.emailSubject)}&body=${encodeURIComponent("Hi Kunle,\n\nI would like to discuss this area of automation for our business.\n\nThe process I want to improve is:\n\n")}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-orange-200 selection:text-orange-900">
      <header className="border-b border-orange-100/80 bg-[#faf8f5]/95 backdrop-blur-md">
        <div className="container py-4 flex items-center justify-between gap-4">
          <Link href="/"><div className="flex items-center gap-3 cursor-pointer"><div className="w-8 h-8 rounded-lg bg-[#e85d2a] flex items-center justify-center"><span className="font-bold text-white text-[11px]">AM</span></div><span className="font-semibold tracking-tight text-slate-900 text-[15px]">AI Midlands</span></div></Link>
          <div className="flex items-center gap-3">
            <Link href="/about"><span className="hidden sm:inline text-sm font-semibold text-slate-700 hover:text-[#e85d2a] cursor-pointer transition-colors">About</span></Link>
            <span className="hidden md:inline text-sm text-slate-500">Midlands based · UK wide</span>
            <a href="/#assessment" className="inline-flex items-center gap-2 rounded-full bg-[#e85d2a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d14e1e] transition-colors">Assess a process <ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-14 md:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-[0.18em] mb-4">{config.eyebrow}</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.04] text-slate-900 mb-6">{config.title}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-6">{config.intro}</p>
              <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 mb-7 inline-block"><span className="text-xs font-bold uppercase tracking-wider text-orange-700">Typical starting point</span><p className="font-semibold text-slate-900 mt-1">{config.price}</p></div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/#assessment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e85d2a] px-6 py-3.5 text-white font-semibold hover:bg-[#d14e1e] transition-colors"><ArrowRight className="w-4 h-4" /> Assess your process</a>
                <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-slate-700 font-semibold hover:border-orange-300 hover:bg-orange-50 transition-colors"><Calendar className="w-4 h-4" /> Book a call</a>
              </div>
              <p className="text-sm text-slate-500 mt-5">Describe one process and get an immediate first-pass view of what looks practical, likely complexity and budget band.</p>
              <Link href="/about"><span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-700 hover:text-orange-900 cursor-pointer">Who will deliver it? Meet Kunle <ArrowRight className="w-4 h-4" /></span></Link>
            </div>

            <div className="rounded-3xl border border-orange-100 bg-white p-5 md:p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700"><span className="w-2 h-2 rounded-full bg-orange-500" /> Example: {config.focusLabel}</div>
              <WorkflowPreview beat={config.beat} />
            </div>
          </div>
        </section>

        <section className="border-y border-orange-100 bg-[#fdf6ee] py-14 md:py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl bg-white border border-orange-100 p-7"><p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">The problem</p><p className="text-lg leading-relaxed text-slate-700">{config.problem}</p></div>
              <div className="rounded-2xl bg-slate-900 p-7 text-white"><p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">The outcome</p><p className="text-lg leading-relaxed text-slate-100">{config.outcome}</p></div>
            </div>
            <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 mt-5">{config.bullets.map(item => <div key={item} className="flex items-center gap-3 rounded-xl bg-white border border-orange-100 px-5 py-4 text-sm font-medium text-slate-700"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {item}</div>)}</div>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">What we build</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Practical automation around the systems you already use.</h2>
            <p className="text-lg text-slate-600 max-w-3xl mb-10">The examples are not fixed products. They show the kind of work we implement: understand information, connect systems, complete actions and keep the result visible to your team.</p>
            <div className="grid md:grid-cols-3 gap-5">{config.projects.map((project, index) => <article key={project.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm mb-4">{index + 1}</div><h3 className="font-bold text-slate-900 text-lg mb-2">{project.title}</h3><p className="text-slate-600 leading-relaxed text-sm">{project.text}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-white border-y border-slate-200 py-14">
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div><p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Your systems, not another platform</p><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">We fit the automation around the tools your business already depends on.</h2><p className="text-slate-600 leading-relaxed max-w-3xl">Where APIs are available we use them. Where they are not, we design the simplest reliable route. Private or customer-controlled AI can be used when the information genuinely requires it — it is not a prerequisite for every project.</p></div>
              <div className="flex flex-wrap md:max-w-xs gap-2 md:justify-end">{config.systems.map(system => <span key={system} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">{system}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-18">
          <div className="max-w-5xl mx-auto rounded-3xl border border-orange-100 bg-[#fdf6ee] p-7 md:p-9 grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
            <div><p className="text-orange-700 text-xs font-bold uppercase tracking-widest mb-2">Indicative price</p><p className="text-3xl font-bold text-slate-900 mb-2">{config.price}</p><p className="text-sm text-slate-600">{config.priceNote}</p></div>
            <div><p className="text-slate-700 leading-relaxed mb-4">The exact cost depends on system access, integration constraints, data sensitivity, testing and support. The assessment gives you a more useful first indication before you decide whether to book a call.</p><a href="/#assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900">Assess your process first <ArrowRight className="w-4 h-4" /></a></div>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Why AI Midlands</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Automation with delivery discipline behind it.</h2>
              <p className="text-slate-600 leading-relaxed mb-5">AI Midlands combines AI implementation with more than 20 years of experience delivering integration, digital and data change across complex organisations.</p>
              <div className="space-y-3 mb-5">{["Start with the business outcome, not an AI product", "Design the human hand-offs as carefully as the automation", "Integrate with existing systems rather than creating another silo", "Keep sensitive information private when the use case requires it"].map(item => <div key={item} className="flex items-start gap-3 text-slate-700"><CheckCircle2 className="w-4 h-4 text-orange-600 mt-1 shrink-0" /><span>{item}</span></div>)}</div>
              <Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 cursor-pointer">Read about Kunle and the delivery approach <ArrowRight className="w-4 h-4" /></span></Link>
            </div>
            <div className="rounded-3xl bg-slate-900 p-8 text-white">
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">A sensible first step</p>
              <h3 className="text-2xl font-bold mb-3">Show us one process that wastes time or loses opportunities.</h3>
              <p className="text-slate-300 leading-relaxed mb-6">Use the assessment first if you want a quick indication, or book a short review if you already know you want to talk it through.</p>
              <div className="flex flex-col gap-3">
                <a href="/#assessment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 transition-colors"><ArrowRight className="w-4 h-4" /> Assess the process</a>
                <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800 transition-colors"><Calendar className="w-4 h-4" /> Book a 30-minute review</a>
                <a href={mailHref} className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white"><Mail className="w-4 h-4" /> Email the process instead</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container py-7 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-slate-500">
          <span>© AI Midlands · Midlands based · UK wide</span>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/about"><span className="cursor-pointer hover:text-orange-700">About</span></Link>
            <Link href="/privacy"><span className="cursor-pointer hover:text-orange-700">Privacy</span></Link>
            <Link href="/terms"><span className="cursor-pointer hover:text-orange-700">Terms</span></Link>
            <Link href="/"><span className="cursor-pointer hover:text-orange-700">AI Midlands home</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function BusinessAutomationLanding() { return <ServiceLanding service="business-automation" />; }
export function WorkflowAutomationLanding() { return <ServiceLanding service="workflow-automation" />; }
export function CustomerAssistantsLanding() { return <ServiceLanding service="customer-assistants" />; }
export function SalesAutomationLanding() { return <ServiceLanding service="sales-automation" />; }
