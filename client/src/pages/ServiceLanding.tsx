import { useEffect } from "react";
import { Link } from "wouter";
import { BusinessWorkspace } from "@/components/hero/BusinessWorkspace";
import {
  AimArrow,
  ApprovalIcon,
  AssistantIcon,
  BookingIcon,
  ControlIcon,
  EnquiryIcon,
  IntegrationIcon,
  OutreachIcon,
  WorkflowIcon,
} from "@/components/brand/AiMidlandsIcons";
import "@/components/hero/hero-baseline.css";
import "@/components/hero/hero-workflows.css";
import "@/components/hero/hero-premium.css";

type ServiceKey = "business-automation" | "workflow-automation" | "customer-assistants" | "sales-automation";

type ServiceConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  problem: string;
  outcome: string;
  bullets: string[];
  projects: { title: string; text: string }[];
  systems: string[];
  emailSubject: string;
  metaDescription: string;
  price: string;
  priceNote: string;
  icon: typeof EnquiryIcon;
};

const services: Record<ServiceKey, ServiceConfig> = {
  "business-automation": {
    eyebrow: "EMAIL & ADMIN AUTOMATION",
    title: "Turn incoming enquiries into organised work.",
    intro: "We connect email, forms, spreadsheets and CRM so useful information is captured, understood and moved into the right place without somebody re-keying it.",
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
    icon: EnquiryIcon,
  },
  "workflow-automation": {
    eyebrow: "WORKFLOW & SYSTEM INTEGRATION",
    title: "Connect systems so work moves without someone copying it.",
    intro: "We automate the hand-offs between the tools your business already uses — CRM, finance, operations, email and internal systems — so the next action happens when it should.",
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
    icon: WorkflowIcon,
  },
  "customer-assistants": {
    eyebrow: "CUSTOMER ASSISTANTS",
    title: "Give customers an assistant that can actually take action.",
    intro: "We build website and service assistants that answer useful questions, understand intent and complete the next step — such as booking a call or creating a CRM lead.",
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
    icon: AssistantIcon,
  },
  "sales-automation": {
    eyebrow: "SALES & OUTREACH AUTOMATION",
    title: "Turn CRM context into personalised follow-up — with human approval.",
    intro: "We use the information already held in CRM and other business systems to prepare relevant outreach, while keeping people in control of what is actually sent.",
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
    icon: OutreachIcon,
  },
};

function ServiceLanding({ service }: { service: ServiceKey }) {
  const config = services[service];
  const Icon = config.icon;

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
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-[#eadfd6] bg-[#faf8f5]/95 backdrop-blur-xl">
        <div className="container min-h-[76px] flex items-center justify-between gap-6">
          <Link href="/"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[42px] w-auto cursor-pointer" /></Link>
          <div className="flex items-center gap-4"><Link href="/about"><span className="hidden sm:inline text-sm text-slate-600 hover:text-[#c83927] cursor-pointer">About</span></Link><a href="/#assessment" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]">Assess a process <AimArrow className="w-4 h-4" /></a></div>
        </div>
      </header>

      <main>
        <section className="container py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl border border-[#eadfd6] bg-[#fffaf6] text-[#0f172b] grid place-items-center [--aim-icon-accent:#c83927] mb-6"><Icon className="w-7 h-7" /></div>
              <p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">{config.eyebrow}</p>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.03] text-[#0f172b] mb-6">{config.title}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-7">{config.intro}</p>
              <div className="flex flex-wrap gap-3 mb-5"><a href="/#assessment" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-6 py-3 text-white font-semibold hover:bg-[#a92f21] [--aim-icon-accent:#fff]">Assess your process <AimArrow className="w-4 h-4" /></a><a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d9cfc6] bg-white px-6 py-3 font-semibold text-slate-700 hover:border-[#c83927] [--aim-icon-accent:#c83927]"><BookingIcon className="w-5 h-5" /> Book a call</a></div>
              <p className="text-sm text-slate-500">Typical starting point: <span className="font-semibold text-[#0f172b]">{config.price}</span></p>
            </div>

            <div className="rounded-[30px] border border-[#e5ddd5] bg-white p-5 md:p-7 shadow-[0_24px_60px_rgba(15,23,43,0.08)] overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-[#eee7e0] pb-4 mb-3"><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Live automation examples</span><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28]">4 workflows</span></div>
              <div className="aim-hero" style={{ display: "block", minHeight: 0, padding: 0, overflow: "visible" }}><BusinessWorkspace /></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#eadfd6] bg-[#fff4ed] py-16"><div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"><article className="rounded-[26px] border border-[#eadfd6] bg-white p-7"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28] mb-3">The problem</p><p className="text-lg leading-relaxed text-slate-700">{config.problem}</p></article><article className="rounded-[26px] bg-[#0f172b] p-7 text-white"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a08b] mb-3">The outcome</p><p className="text-lg leading-relaxed text-slate-100">{config.outcome}</p></article></div><div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4 mt-5">{config.bullets.map(item => <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-[#eadfd6] px-5 py-4 text-sm font-medium text-slate-700"><span className="h-2 w-2 rounded-full bg-[#c83927] mt-1.5 shrink-0" />{item}</div>)}</div></div></section>

        <section className="container py-20 md:py-24"><div className="max-w-6xl mx-auto"><div className="max-w-3xl mb-10"><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">What we build</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] mb-4">Practical automation around the systems you already use.</h2><p className="text-lg text-slate-600">The examples are not fixed products. They show the kind of work we implement: understand information, connect systems, complete actions and keep the result visible to your team.</p></div><div className="grid md:grid-cols-3 gap-5">{config.projects.map((project,index) => <article key={project.title} className="rounded-[24px] border border-[#e5ddd5] bg-white p-6"><span className="text-[#b43a28] text-xs font-bold tracking-[0.16em]">0{index + 1}</span><h3 className="font-semibold text-[#0f172b] text-lg mt-6 mb-2">{project.title}</h3><p className="text-slate-600 leading-relaxed text-sm">{project.text}</p></article>)}</div></div></section>

        <section className="bg-white border-y border-[#e8e0d8] py-16"><div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><div className="flex items-center gap-3 mb-3 text-[#0f172b] [--aim-icon-accent:#c83927]"><IntegrationIcon className="w-6 h-6" /><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Your systems, not another platform</p></div><h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-3">We fit the automation around the tools your business already depends on.</h2><p className="text-slate-600 leading-relaxed max-w-3xl">Where APIs are available we use them. Where they are not, we design the simplest reliable route. Private or customer-controlled AI can be used when the information genuinely requires it.</p></div><div className="flex flex-wrap md:max-w-xs gap-2 md:justify-end">{config.systems.map(system => <span key={system} className="rounded-full border border-[#ddd4cc] bg-[#faf8f5] px-3 py-1.5 text-sm font-medium text-slate-700">{system}</span>)}</div></div></div></section>

        <section className="container py-20 md:py-24"><div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start"><div className="rounded-[26px] border border-[#eadfd6] bg-[#fff4ed] p-7"><p className="text-[#b43a28] text-xs font-bold uppercase tracking-[0.16em] mb-3">Indicative price</p><p className="text-4xl font-semibold tracking-[-0.04em] text-[#0f172b] mb-3">{config.price}</p><p className="text-slate-600">{config.priceNote}</p></div><div><div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]"><ApprovalIcon className="w-6 h-6" /><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Why AI Midlands</p></div><h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-4">Automation with delivery discipline behind it.</h2><p className="text-slate-600 leading-relaxed mb-5">AI Midlands combines AI implementation with more than 20 years of experience delivering integration, digital and data change across complex organisations.</p><Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">Read about Kunle and the delivery approach <AimArrow className="w-4 h-4" /></span></Link></div></div></section>

        <section className="bg-[#0f172b] py-16 text-white"><div className="container"><div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><div className="flex items-center gap-3 mb-3 [--aim-icon-accent:#f0a08b]"><ControlIcon className="w-6 h-6" /><p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em]">A sensible first step</p></div><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em]">Show us one process that wastes time or loses opportunities.</h2></div><div className="flex flex-col sm:flex-row gap-3"><a href="/#assessment" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c83927] px-6 py-3 font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]">Assess the process <AimArrow className="w-4 h-4" /></a><a href={mailHref} className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">Email the process</a></div></div></div></section>
      </main>

      <footer className="border-t border-[#e8e0d8] bg-white"><div className="container py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-slate-500"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[36px] w-auto" /><div className="flex flex-wrap items-center gap-5"><Link href="/about"><span className="cursor-pointer hover:text-[#c83927]">About</span></Link><Link href="/privacy"><span className="cursor-pointer hover:text-[#c83927]">Privacy</span></Link><Link href="/terms"><span className="cursor-pointer hover:text-[#c83927]">Terms</span></Link><Link href="/"><span className="cursor-pointer hover:text-[#c83927]">Home</span></Link></div></div></footer>
    </div>
  );
}

export function BusinessAutomationLanding() { return <ServiceLanding service="business-automation" />; }
export function WorkflowAutomationLanding() { return <ServiceLanding service="workflow-automation" />; }
export function CustomerAssistantsLanding() { return <ServiceLanding service="customer-assistants" />; }
export function SalesAutomationLanding() { return <ServiceLanding service="sales-automation" />; }
