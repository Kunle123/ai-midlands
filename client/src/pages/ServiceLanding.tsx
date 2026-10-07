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

const BOOK_CALL_URL = "https://calendly.com/kunle2000/30min";

type ServiceKey = "business-automation" | "workflow-automation" | "customer-assistants" | "sales-automation";

type ServiceConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  demoLine: string;
  problem: string;
  outcome: string;
  bullets: string[];
  processTitle: string;
  processCopy: string[];
  buildTitle: string;
  buildIntro: string;
  projects: { title: string; text: string }[];
  systemsTitle: string;
  systemsCopy: string;
  systems: string[];
  emailSubject: string;
  emailCta: string;
  metaDescription: string;
  price: string;
  priceNote: string;
  whyTitle: string;
  whyCopy: string;
  finalTitle: string;
  finalCopy: string;
  icon: typeof EnquiryIcon;
};

const services: Record<ServiceKey, ServiceConfig> = {
  "business-automation": {
    eyebrow: "Email and admin automation",
    title: "Stop re-keying enquiries. Start acting on them.",
    intro: "A useful enquiry can arrive in an inbox, a web form, or an attachment. Your team should not have to read it, interpret it, and type the same details into another system before they can respond. We help turn incoming information into a clean, usable next step in your CRM, spreadsheet, or workflow.",
    primaryCta: "Discuss your enquiry process",
    secondaryCta: "Describe the admin task",
    demoLine: "See how an incoming enquiry can become a record your team can act on.",
    problem: "An enquiry arrives with enough detail to be useful, but the information is trapped in an inbox or form. Someone has to decide what matters, copy it into the right place, and hope nothing is missed.",
    outcome: "The key details are captured, the right record is created or updated, and the team can focus on responding rather than re-entering data.",
    bullets: ["Less manual data entry", "Faster response to enquiries", "Cleaner CRM and pipeline data"],
    processTitle: "We do not automate a messy hand-off and call it progress.",
    processCopy: [
      "Before building anything, we look at the point where the work gets stuck. That could be the information that has to be copied, the person who has to chase, or the decision that needs checking.",
      "Once that is clear, we simplify the process and design the most reliable next step. The goal is to remove admin from the team, not give them another system to manage.",
    ],
    buildTitle: "Turn incoming information into the next useful action.",
    buildIntro: "These are examples of the work we can build once we understand the process. The exact solution is shaped around your systems, rules, and team.",
    projects: [
      { title: "Email to CRM", text: "Read incoming enquiries, identify the customer, service, value, and intent, then create or update the right CRM record." },
      { title: "Forms to workflow", text: "Take website or internal form submissions and route them to the right person, queue, or process without manual triage." },
      { title: "Documents to structured data", text: "Extract the useful details from PDFs, attachments, and messages, then put them into the systems your team already uses." },
    ],
    systemsTitle: "Automation should remove work, not create another place to work.",
    systemsCopy: "We fit the solution around the tools your business already depends on wherever possible. Where APIs are available, we use them. Where they are not, we design the simplest reliable route. A new application is only useful if it makes the whole process better.",
    systems: ["Email", "CRM", "Spreadsheets", "Forms", "Shared inboxes"],
    emailSubject: "Business automation enquiry",
    emailCta: "Email us the outline",
    metaDescription: "AI Midlands redesigns repetitive admin processes and connects email, forms, spreadsheets and CRM so enquiries become organised work without extra re-keying.",
    price: "from £2,000",
    priceNote: "Includes a review of the current workflow, design of a simpler process, implementation of a contained automation across one or two existing tools, testing, and handover.",
    whyTitle: "Make the first response easier for your team and better for your customer.",
    whyCopy: "You will not be handed a generic AI demo. We define what should be captured, where it needs to go, who needs to review it, and what happens when the enquiry does not fit the usual pattern. The result should be a hand-off your team can trust.",
    finalTitle: "Have an inbox or form that creates more admin than it should?",
    finalCopy: "Let’s look at the hand-off and see what could be removed from the middle.",
    icon: EnquiryIcon,
  },
  "workflow-automation": {
    eyebrow: "Workflow and system integration",
    title: "Make the systems you already use work together.",
    intro: "When a deal is won, an order changes status, or an approval is given, the next action should not depend on someone copying details from screen to screen. We connect the systems behind the work so information moves reliably and your team can see what happened next.",
    primaryCta: "Talk through a system hand-off",
    secondaryCta: "Assess this workflow",
    demoLine: "See how information can move from one business system to the next without repeated manual entry.",
    problem: "One system knows the work is ready. Another system needs the same information. Until someone moves it across, the process waits.",
    outcome: "The trigger in one system creates the right next action in another, with a visible confirmation for your team.",
    bullets: ["Fewer manual hand-offs", "Less duplication and re-keying", "Processes continue without chasing"],
    processTitle: "A connection is only useful if the whole process works better.",
    processCopy: [
      "We start by mapping the trigger, information, decision, exception, and outcome. That shows us where work is being repeated, where responsibility is unclear, and where a hand-off needs a person to check it.",
      "Then we build the simplest reliable connection between the systems involved. The aim is not more technology. It is a process that keeps moving without extra effort from your team.",
    ],
    buildTitle: "Keep the work moving across the systems behind your business.",
    buildIntro: "These are examples of the kinds of connected workflows we build after understanding your process, systems, and approval points.",
    projects: [
      { title: "CRM to finance", text: "A won opportunity can create an invoice, populate customer information, and return the invoice reference to the CRM." },
      { title: "Operations to notifications", text: "A status change can trigger the right customer message, task, approval, or internal alert at the right point in the process." },
      { title: "System to system", text: "Connect APIs or existing applications so information moves reliably instead of being copied by staff." },
    ],
    systemsTitle: "Make better use of the tools you already pay for.",
    systemsCopy: "We fit the solution around the systems your business already depends on wherever possible. Where APIs are available, we use them. Where they are not, we design the simplest reliable route. A new application is only useful if it improves the whole workflow.",
    systems: ["CRM", "Finance", "Operations", "APIs", "Email"],
    emailSubject: "Workflow automation enquiry",
    emailCta: "Email the process outline",
    metaDescription: "AI Midlands maps and simplifies business hand-offs, then connects CRM, finance, operations and other systems so work moves without manual re-keying.",
    price: "from £3,500",
    priceNote: "Includes mapping the workflow, redesigning the hand-offs, connecting multiple systems, defining approval points, testing end to end, and handing over a process your team understands.",
    whyTitle: "The connection is only one part of the job.",
    whyCopy: "Reliable workflow automation needs more than a technical link. We define the rules, the ownership, the exceptions, and the confirmation your team needs to trust it. That is where delivery experience matters.",
    finalTitle: "If a hand-off depends on someone remembering to copy and paste, it is worth a review.",
    finalCopy: "Bring us one workflow and we will help you see what could move automatically, what needs approval, and where the process could be simpler first.",
    icon: WorkflowIcon,
  },
  "customer-assistants": {
    eyebrow: "Customer assistants",
    title: "Help customers get an answer and move forward.",
    intro: "A customer should not have to leave a chat, hunt for a form, and wait for someone to pick up the thread. We design customer assistants around a useful outcome, whether that is finding the right information, booking a call, or creating a well-qualified lead for your team.",
    primaryCta: "Discuss your customer journey",
    secondaryCta: "Assess the next step",
    demoLine: "See how a customer question can become a useful next action for both the visitor and your team.",
    problem: "Many chat tools answer the first question, then leave the customer to work out what to do next.",
    outcome: "The customer gets a helpful answer, can take the right next step in the same conversation, and your team receives the context they need to follow up well.",
    bullets: ["Useful answers at the point of enquiry", "Bookings and lead capture within the conversation", "CRM records updated automatically"],
    processTitle: "A customer assistant should improve the journey, not become a dead end.",
    processCopy: [
      "Before choosing a tool, we look at what the customer is trying to achieve. That may be finding the right answer, choosing a service, booking a call, or getting help with a problem.",
      "Then we design the conversation, hand-off, and next action around that outcome. The aim is to make it easier for customers to move forward and easier for your team to pick up the right context.",
    ],
    buildTitle: "Customer conversations that lead somewhere useful.",
    buildIntro: "These are examples of the kinds of assistants we build once we understand the customer journey, business information, and the next action that matters.",
    projects: [
      { title: "Website assistant", text: "Answer common customer questions using your services, policies, and business information." },
      { title: "Booking assistant", text: "Move from a question to a call or appointment without sending the customer away to another journey." },
      { title: "Lead qualification", text: "Capture intent and the useful details, then create a structured lead in your CRM for better follow-up." },
    ],
    systemsTitle: "Make the conversation part of the way your business already works.",
    systemsCopy: "We connect the assistant to the tools behind the next step wherever that makes sense. The customer should not have to repeat themselves, and your team should not have to start from scratch when they take over.",
    systems: ["Website", "CRM", "Calendar", "Knowledge base", "Email"],
    emailSubject: "Customer assistant enquiry",
    emailCta: "Email the customer journey outline",
    metaDescription: "AI Midlands designs customer journeys and builds assistants that answer questions, book calls and create CRM leads instead of stopping at chatbot responses.",
    price: "from £3,500",
    priceNote: "Includes mapping the customer journey, designing the improved hand-off, connecting a real next action such as booking or CRM lead creation, testing, and handover.",
    whyTitle: "Better customer service is about the hand-off as well as the answer.",
    whyCopy: "We define what the assistant can help with, when it should offer a next step, and when a person needs to take over. The goal is a useful experience for the customer and a clearer, better-prepared enquiry for your team.",
    finalTitle: "Want your website to do more than answer FAQs?",
    finalCopy: "Let’s look at the customer journey after the question and decide where an assistant could make the next step easier.",
    icon: AssistantIcon,
  },
  "sales-automation": {
    eyebrow: "Sales and outreach automation",
    title: "Give your sales team a useful head start on follow-up.",
    intro: "Your team already has valuable context in the CRM. The time goes in finding it, checking the history, and drafting a relevant message at the right moment. We can prepare a useful first draft and keep the final decision with your people before anything is sent.",
    primaryCta: "Discuss your sales follow-up",
    secondaryCta: "Assess this sales process",
    demoLine: "See how existing CRM context can help your team prepare timely, relevant follow-up.",
    problem: "Good follow-up gets delayed because the information is there, but it takes time to find, make sense of, and turn into a thoughtful message.",
    outcome: "The right account context is brought together in a draft. Your team checks it, makes it their own, and sends it when it is right.",
    bullets: ["Faster, more relevant follow-up", "Human approval before sending", "Activity recorded back in CRM"],
    processTitle: "Good sales follow-up still needs judgement.",
    processCopy: [
      "We do not set up generic messages and hope for the best. We start with the point where follow-up slows down: the research, the missing context, the timing, or the decision about what should be said.",
      "Then we design a workflow that does the preparation while your team keeps control of the message and the relationship.",
    ],
    buildTitle: "Make it easier to follow up well, at the right time.",
    buildIntro: "These are examples of the work we can build once we understand your CRM, sales process, approval requirements, and the kind of contact your customers expect.",
    projects: [
      { title: "CRM to personalised draft", text: "Use contact, sector, interest, and prior activity to prepare a relevant message instead of a generic sequence." },
      { title: "Follow-up prompts", text: "Trigger the right draft when an opportunity, enquiry, or account reaches the point where a timely follow-up matters." },
      { title: "Human-reviewed outreach", text: "Keep approval with your team while automating the research, drafting, and CRM update around it." },
    ],
    systemsTitle: "Make better use of the customer context you already hold.",
    systemsCopy: "We fit the workflow around the tools your team already uses. The aim is not more automated email. It is to reduce the preparation that gets in the way of thoughtful, timely follow-up.",
    systems: ["CRM", "Email", "Account data", "Sales pipeline", "Approvals"],
    emailSubject: "Sales automation enquiry",
    emailCta: "Email the follow-up outline",
    metaDescription: "AI Midlands redesigns sales follow-up around your existing CRM, then uses AI to prepare personalised outreach with human approval and automatic CRM updates.",
    price: "from £2,000",
    priceNote: "Includes mapping the current sales follow-up, redesigning the workflow, implementing a contained automation, testing, and handover. Deeper CRM integration is scoped separately.",
    whyTitle: "Sales automation should make your team more relevant, not more generic.",
    whyCopy: "We define the context that is useful, the points where a person needs to review it, and the record that should be kept in the CRM. The result should support a better conversation, not simply send more messages.",
    finalTitle: "If follow-up is slipping because preparation takes too long, let’s look at the point where momentum is lost.",
    finalCopy: "Bring us one part of the sales process and we will help you see what could be prepared automatically, what should stay with the team, and what needs simplifying first.",
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
          <div className="flex items-center gap-4"><Link href="/about"><span className="hidden md:inline text-sm text-slate-600 hover:text-[#c83927] cursor-pointer">About</span></Link><a href="/#assessment" className="hidden sm:inline-flex items-center gap-2 border-b-2 border-[#c83927] pb-1 text-sm font-semibold text-[#0f172b] hover:text-[#c83927] transition-colors">Describe a process <AimArrow className="w-4 h-4" /></a><a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]"><BookingIcon className="w-4 h-4" /> Book a 30-minute process review</a></div>
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
              <div className="flex flex-wrap gap-3 mb-5"><a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c83927] px-6 py-3 text-white font-semibold hover:bg-[#a92f21] [--aim-icon-accent:#fff]"><BookingIcon className="w-5 h-5" /> {config.primaryCta}</a><a href="/#assessment" className="inline-flex items-center gap-2 rounded-full border border-[#d9cfc6] bg-white px-6 py-3 font-semibold text-slate-700 hover:border-[#c83927] [--aim-icon-accent:#c83927]">{config.secondaryCta} <AimArrow className="w-4 h-4" /></a></div>
              <p className="text-sm text-slate-500">Typical starting point: <span className="font-semibold text-[#0f172b]">{config.price}</span></p>
            </div>

            <div className="rounded-[30px] border border-[#e5ddd5] bg-white p-5 md:p-7 shadow-[0_24px_60px_rgba(15,23,43,0.08)] overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-[#eee7e0] pb-4 mb-3"><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">A typical automated hand-off</span><span className="text-[11px] font-semibold text-[#b43a28] text-right">{config.demoLine}</span></div>
              <div className="aim-hero" style={{ display: "block", minHeight: 0, padding: 0, overflow: "visible" }}><BusinessWorkspace /></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#eadfd6] bg-[#fff4ed] py-16"><div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"><article className="rounded-[26px] border border-[#eadfd6] bg-white p-7"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b43a28] mb-3">The problem</p><p className="text-lg leading-relaxed text-slate-700">{config.problem}</p></article><article className="rounded-[26px] bg-[#0f172b] p-7 text-white"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a08b] mb-3">The outcome</p><p className="text-lg leading-relaxed text-slate-100">{config.outcome}</p></article></div><div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4 mt-5">{config.bullets.map(item => <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-[#eadfd6] px-5 py-4 text-sm font-medium text-slate-700"><span className="h-2 w-2 rounded-full bg-[#c83927] mt-1.5 shrink-0" />{item}</div>)}</div></div></section>

        <section className="container py-20 md:py-24"><div className="max-w-6xl mx-auto grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-20 items-start"><div><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">Process redesign is part of the work</p><h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0f172b] leading-[1.06]">{config.processTitle}</h2></div><div className="space-y-5 text-lg leading-relaxed text-slate-600">{config.processCopy.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

        <section className="container py-20 md:py-24 border-t border-[#e8e0d8]"><div className="max-w-6xl mx-auto"><div className="max-w-3xl mb-10"><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em] mb-4">What we build</p><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] text-[#0f172b] mb-4">{config.buildTitle}</h2><p className="text-lg text-slate-600">{config.buildIntro}</p></div><div className="grid md:grid-cols-3 gap-5">{config.projects.map((project,index) => <article key={project.title} className="rounded-[24px] border border-[#e5ddd5] bg-white p-6"><span className="text-[#b43a28] text-xs font-bold tracking-[0.16em]">0{index + 1}</span><h3 className="font-semibold text-[#0f172b] text-lg mt-6 mb-2">{project.title}</h3><p className="text-slate-600 leading-relaxed text-sm">{project.text}</p></article>)}</div></div></section>

        <section className="bg-white border-y border-[#e8e0d8] py-16"><div className="container"><div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><div className="flex items-center gap-3 mb-3 text-[#0f172b] [--aim-icon-accent:#c83927]"><IntegrationIcon className="w-6 h-6" /><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Your systems, not another platform</p></div><h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-3">{config.systemsTitle}</h2><p className="text-slate-600 leading-relaxed max-w-3xl">{config.systemsCopy}</p></div><div className="flex flex-wrap md:max-w-xs gap-2 md:justify-end">{config.systems.map(system => <span key={system} className="rounded-full border border-[#ddd4cc] bg-[#faf8f5] px-3 py-1.5 text-sm font-medium text-slate-700">{system}</span>)}</div></div></div></section>

        <section className="container py-20 md:py-24"><div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start"><div className="rounded-[26px] border border-[#eadfd6] bg-[#fff4ed] p-7"><p className="text-[#b43a28] text-xs font-bold uppercase tracking-[0.16em] mb-3">Indicative price</p><p className="text-4xl font-semibold tracking-[-0.04em] text-[#0f172b] mb-3">{config.price}</p><p className="text-slate-600">{config.priceNote}</p></div><div><div className="flex items-center gap-3 mb-4 text-[#0f172b] [--aim-icon-accent:#c83927]"><ApprovalIcon className="w-6 h-6" /><p className="text-[#b43a28] text-xs font-semibold uppercase tracking-[0.18em]">Why AI Midlands</p></div><h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0f172b] mb-4">{config.whyTitle}</h2><p className="text-slate-600 leading-relaxed mb-5">{config.whyCopy}</p><Link href="/about"><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a83324] cursor-pointer">Read about Kunle and the delivery approach <AimArrow className="w-4 h-4" /></span></Link></div></div></section>

        <section className="bg-[#0f172b] py-16 text-white"><div className="container"><div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><div className="flex items-center gap-3 mb-3 [--aim-icon-accent:#f0a08b]"><ControlIcon className="w-6 h-6" /><p className="text-[#f0a08b] text-xs font-semibold uppercase tracking-[0.18em]">A sensible first step</p></div><h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em]">{config.finalTitle}</h2><p className="text-slate-300 mt-3 max-w-2xl">{config.finalCopy}</p></div><div className="flex flex-col sm:flex-row gap-3"><a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c83927] px-6 py-3 font-semibold text-white hover:bg-[#a92f21] [--aim-icon-accent:#fff]"><BookingIcon className="w-5 h-5" /> {config.primaryCta}</a><a href="/#assessment" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">{config.secondaryCta} <AimArrow className="w-4 h-4" /></a><a href={mailHref} className="inline-flex items-center justify-center text-sm font-semibold text-slate-400 hover:text-white">{config.emailCta}</a></div></div></div></section>
      </main>

      <footer className="border-t border-[#e8e0d8] bg-white"><div className="container py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-slate-500"><img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[36px] w-auto" /><div className="flex flex-wrap items-center gap-5"><Link href="/about"><span className="cursor-pointer hover:text-[#c83927]">About</span></Link><Link href="/privacy"><span className="cursor-pointer hover:text-[#c83927]">Privacy</span></Link><Link href="/terms"><span className="cursor-pointer hover:text-[#c83927]">Terms</span></Link><Link href="/"><span className="cursor-pointer hover:text-[#c83927]">Home</span></Link></div></div></footer>
    </div>
  );
}

export function BusinessAutomationLanding() { return <ServiceLanding service="business-automation" />; }
export function WorkflowAutomationLanding() { return <ServiceLanding service="workflow-automation" />; }
export function CustomerAssistantsLanding() { return <ServiceLanding service="customer-assistants" />; }
export function SalesAutomationLanding() { return <ServiceLanding service="sales-automation" />; }
