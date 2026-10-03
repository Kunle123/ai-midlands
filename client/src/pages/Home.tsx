// AI Midlands — Rebuilt with unified "Skills" proposition
// Design: Warm consultancy aesthetic, Fraunces headings, Inter body
// Proposition: "Secure ChatGPT for your business + a growing library of business skills"
// Story: Install secure AI → Teach it to do useful work (Skills are upgrades, not a separate product)
// Workman motif: illustrated figures interact directly with page elements

import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Search, ArrowRight, CheckCircle2, FileText, Download,
  Mail, Calendar, Lock, Server, Shield, Building2, Users,
  ChevronDown, ChevronUp, ExternalLink, Cpu, Eye, EyeOff,
  Database, FileSearch, BookOpen, Briefcase, AlertTriangle, Radio, Quote
} from "lucide-react";

// ─── CDN illustration URLs ────────────────────────────────────────────────────
const ILLUS = {
  hero:        "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/illus_hero-9iPxXdR4LnbBvu8meVqHWV.webp",
  problem:     "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/illus_problem-QZdRy5pLGyxPgfUSPkPYHn.webp",
  vault:       "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/illus_vault-UuNoxgj4wtqiUHrtnSKvkS.webp",
  permissions: "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/illus_permissions-3rFnGe6UsYoCQHDi2p9WBo.webp",
  sprints:     "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/illus_sprints-kkGWukjUHfuGiG3Sou67KM.webp",
};

// ─── Workman motif illustrations (transparent bg, interact with page) ─────────
const WORKMAN = {
  painter:   "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/workman_painter-Dc6oee6VjvKEmnjRGwpUaV.webp",
  sign:      "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/workman_sign-ff2QkuKk7jiskPh67L4EEz.webp",
  mechanic:  "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/workman_mechanic-TE2LwhnFh6yYPf9mWjTYtJ.webp",
  builder:   "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/workman_builder-dzAvgYzy6Z7xowF8yYwKyG.webp",
  inspector: "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/workman_inspector-DAdgQibBBzzdsDgXHzHdGJ.webp",
};

// ─── Worksheet data ───────────────────────────────────────────────────────────
interface Worksheet {
  sector: string;
  title: string;
  subtitle: string;
  projects: { title: string; problem: string; solution: string; roi: string }[];
  pdfUrl: string;
}

const WORKSHEETS_DATABASE: Worksheet[] = [
  {
    sector: "Estate Agents",
    title: "The Listing Machine",
    subtitle: "3 AI Skills to Capture Listings & Beat Competitors to the Instruction",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/AI_Midlands_Estate_Agents_Worksheet-4Sg8R6m3pDq9zWkL.pdf",
    projects: [
      {
        title: "The 'Sellers & Landlords' Valuation Chaser",
        problem: "Homeowners request instant online valuations on your site, but go cold because no one follows up for hours.",
        solution: "A secure AI assistant that monitors valuation submissions 24/7 and sends a personalised, warm SMS within 90 seconds.",
        roi: "Winning just one extra listing a month pays back your £3,000 investment in 30 days."
      },
      {
        title: "Portal Lead Auto-Responder & Triage",
        problem: "Rightmove and Zoopla leads sit in your inbox out-of-hours, losing hot buyers and tenants.",
        solution: "An automated inbox assistant that parses portal leads 24/7, qualifies budget and timeline, and offers direct viewing booking links.",
        roi: "Responds in 5 minutes instead of 12+ hours. Saves negotiators 10+ hours a week."
      },
      {
        title: "Automated Tenant & Buyer Document Chaser",
        problem: "Negotiators spend hours chasing references, IDs, bank statements, and utility bills.",
        solution: "A polite, automated SMS/email pipeline that handles the entire chase and securely compiles documents.",
        roi: "Saves up to 12 hours of administrative back-and-forth per week."
      }
    ]
  },
  {
    sector: "Solicitors & Law Firms",
    title: "The Frictionless Practice",
    subtitle: "3 AI Skills to Complete Case Work Faster & Secure Competitive Advantage",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/AI_Midlands_Solicitors_Worksheet-9mX3R7f6pDq8zWkL.pdf",
    projects: [
      {
        title: "Secure Case Document Data Extractor",
        problem: "Paralegals spend hours manually copying client details and contract terms from PDFs into case management systems.",
        solution: "A secure extraction pipeline that reads any client intake PDF and instantly extracts key data with 99.9% accuracy.",
        roi: "Cuts document data entry from 45 minutes to 15 seconds. Saves up to 2 days of paralegal time every week."
      },
      {
        title: "Automated AML & KYC Intake Pipeline",
        problem: "Onboarding new clients is slow. Chasing compliance documents drags out case start times by 7–14 days.",
        solution: "A structured, secure portal that guides clients to upload compliance documents and validates them automatically.",
        roi: "Reduces client onboarding from 10 days to under 24 hours."
      },
      {
        title: "The Billing & Timesheet Assistant",
        problem: "Fee earners miss small emails, quick calls, and document reviews, leading to significant billing leaks.",
        solution: "An AI assistant that scans sent emails and calendar appointments to draft a clean daily timesheet for one-click approval.",
        roi: "Recovering 1 hour of missed billable time per week at £300/hour is worth £15,000/year."
      }
    ]
  },
  {
    sector: "B2B Agencies & Consultants",
    title: "The Scalable Agency",
    subtitle: "3 AI Skills to Onboard Clients Instantly & Automate Monthly Reporting",
    pdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/103623629/g3uJTK4M5N34fhqeNUfPfT/AI_Midlands_B2B_Agencies_Worksheet-2sW8P4m5pDq1zTkL.pdf",
    projects: [
      {
        title: "Instant Custom Proposal Builder",
        problem: "Writing detailed proposals takes 3–5 hours per prospect, allowing competitors to swoop in.",
        solution: "An automated pipeline that converts raw bullet points or call transcripts into a polished PDF proposal in under 10 minutes.",
        roi: "Reduces proposal turnaround from 4 hours to 10 minutes. Boosts close rates significantly."
      },
      {
        title: "Client Welcome & Portal Provisioner",
        problem: "Onboarding a new client requires manual setup: Google Drive folders, Slack channels, ClickUp boards, welcome emails.",
        solution: "An automated workflow that triggers the millisecond a client signs or pays, creating all their resources instantly.",
        roi: "Saves 2–3 hours of manual setup per client. Delivers a world-class onboarding experience."
      },
      {
        title: "Automated Client Reporting Pipeline",
        problem: "Account managers spend the first 3 days of every month manually copying metrics into client reports.",
        solution: "An automated pipeline that connects to ad platforms and GA4, extracts metrics, and drafts a polished PDF report.",
        roi: "Saves 30 hours of account manager time every month for an agency with 15 clients."
      }
    ]
  }
];

// ─── Demo questions ───────────────────────────────────────────────────────────
const DEMO_QUESTIONS = [
  {
    question: "What are our termination rights with Acme Ltd?",
    searching: ["Contracts", "Supplier correspondence", "Legal policies"],
    answer: "Acme may be terminated with 90 days' written notice after the initial term expires, provided written notice is served to the registered address.",
    source: "Supplier Agreement 2025",
    clause: "Clause 14.2"
  },
  {
    question: "Which of our previous tenders contained ISO 27001 responses?",
    searching: ["Tender archive", "Bid submissions", "Compliance documents"],
    answer: "Found 7 tenders referencing ISO 27001 compliance: NHS Digital (2023), HMRC Framework (2022), Midlands Council Procurement (2024), and 4 others.",
    source: "Bid Library — Compliance Folder",
    clause: "7 documents matched"
  },
  {
    question: "Summarise the risks across our current supplier contracts.",
    searching: ["Active contracts", "Risk registers", "Supplier correspondence"],
    answer: "3 contracts expire within 90 days without renewal clauses. 2 suppliers have force majeure terms that exclude pandemic events. 1 contract lacks a data processing agreement.",
    source: "Contract Register Q3 2025",
    clause: "6 contracts reviewed"
  },
  {
    question: "Find projects where we've solved a problem similar to this one.",
    searching: ["Project archive", "Case studies", "Delivery notes"],
    answer: "Found 4 similar projects: Warehouse Automation (2023), NHS Document Processing (2022), Legal Intake Pipeline (2024), and Logistics API Integration (2023).",
    source: "Project Knowledge Base",
    clause: "4 matches found"
  }
];

// ─── Skills data (Input → Output) ────────────────────────────────────────────
const SKILLS_EXAMPLES = [
  {
    name: "PMO Skill",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-700 bg-orange-100",
    inputs: ["Meeting transcript", "Project plan", "RAID log"],
    output: "Weekly Project Report",
    description: "The AI knows what a RAID log is, how you format it, where to find the data, and how to present it."
  },
  {
    name: "Finance Skill",
    color: "bg-slate-50 border-slate-200",
    iconColor: "text-slate-700 bg-slate-100",
    inputs: ["Management accounts", "Previous month", "Budget"],
    output: "Board Finance Summary",
    description: "Produces your monthly board commentary automatically from raw management accounts."
  },
  {
    name: "Sales Skill",
    color: "bg-stone-50 border-stone-300",
    iconColor: "text-stone-700 bg-stone-200",
    inputs: ["CRM data", "Proposal", "Email threads"],
    output: "Customer Account Briefing",
    description: "Creates a complete account briefing before every client meeting — no manual prep."
  },
];

export default function Home() {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [demoAnimating, setDemoAnimating] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState<Record<string, boolean>>({});
  const [sprintQuery, setSprintQuery] = useState("");
  const leadCaptureRef = useRef<HTMLDivElement>(null);

  const currentDemo = DEMO_QUESTIONS[activeDemoIndex];

  const switchDemo = (index: number) => {
    if (index === activeDemoIndex || demoAnimating) return;
    setDemoAnimating(true);
    setTimeout(() => {
      setActiveDemoIndex(index);
      setDemoAnimating(false);
    }, 250);
  };

  const handleEmailCTA = (subject: string, body: string) => {
    window.location.href = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !activeWorksheet) return;
    setIsSubmittingLead(true);
    setTimeout(() => {
      setIsSubmittingLead(false);
      setHasDownloaded(prev => ({ ...prev, [activeWorksheet.sector]: true }));
      const link = document.createElement("a");
      link.href = activeWorksheet.pdfUrl;
      link.target = "_blank";
      link.download = `${activeWorksheet.sector.replace(/\s+/g, "_")}_AI_Worksheet.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        handleEmailCTA(
          `AI Midlands Skills Blueprint Download: ${activeWorksheet.sector}`,
          `Hi Kunle,\n\nI just downloaded your AI Skills Blueprint for ${activeWorksheet.sector}.\n\nI would love to grab 15 minutes to chat about the "${activeWorksheet.projects[0].title}" or discuss our specific bottlenecks.\n\nBest regards,\n${leadName}\n${leadCompany || "Our Business"}`
        );
      }, 1000);
    }, 1000);
  };

  const selectWorksheet = (sheet: Worksheet) => {
    setActiveWorksheet(sheet);
    setTimeout(() => {
      leadCaptureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col selection:bg-orange-200 selection:text-orange-900">

      {/* Subtle background gradients */}
      <div className="fixed top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-orange-100/25 via-amber-50/10 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-100/40 to-transparent blur-3xl pointer-events-none" />

      {/* ── BBC TRUST STRIP ──────────────────────────────────────────────────── */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center">
        <Link href="/bbc-article">
          <span className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Radio className="w-3 h-3 text-orange-400 shrink-0" />
            <span>Trusted commentary featured on <span className="font-semibold text-white">BBC Radio West Midlands</span> — Kunle Ibidun on AI and the future of customer service</span>
            <ArrowRight className="w-3 h-3 text-orange-400 shrink-0" />
          </span>
        </Link>
      </div>

      {/* ── HEADER ───────────────────────────────────────────────────────────── */}
      <header className="relative z-20 border-b border-orange-100/80 bg-[#faf8f5]/90 backdrop-blur-md sticky top-0">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-orange-700 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/10">
              <span className="font-mono font-bold text-white text-sm tracking-tighter">AM</span>
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-base">AI Midlands</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#private-ai" className="text-sm text-slate-600 hover:text-orange-700 font-medium transition-colors">Private AI</a>
            <a href="#skills" className="text-sm text-slate-600 hover:text-orange-700 transition-colors">Business Skills</a>
            <a href="#deployment" className="text-sm text-slate-600 hover:text-orange-700 transition-colors">Deployment</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:07966461005" className="hidden md:flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-700 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
              07966 461005
            </a>
            <Button
              variant="default"
              className="rounded-full bg-orange-700 hover:bg-orange-800 text-white text-sm h-9 px-5 shadow-sm"
              asChild
            >
              <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">
                Book Discovery Call
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">

        {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
        <section id="private-ai" className="container pt-16 pb-0 md:pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: headline + CTAs */}
            <div className="pb-12 md:pb-16 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-orange-400 text-xs font-semibold mb-6">
                <Lock className="w-3 h-3" />
                On-Premise · Private Cloud · Air-Gapped · Offline
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                Use AI with the information{" "}
                <span className="relative text-orange-700">
                  you can't put into ChatGPT.
                  <svg className="absolute left-0 -bottom-2 w-full h-3 text-orange-300/70" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path d="M0,8 Q75,2 150,8 Q225,14 300,8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-8">
                AI Midlands installs a secure AI that knows your business — then teaches it to produce the documents your team creates every week, without sending confidential information to public AI services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="rounded-full bg-orange-700 hover:bg-orange-800 text-white h-12 px-8 text-base font-semibold shadow-lg shadow-orange-700/20"
                  asChild
                >
                  <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">
                    Book a Private AI Discovery Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-12 px-8 text-base"
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See what it does
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Trust strip */}
              <div className="mt-10 pt-8 border-t border-slate-200">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">20+ years delivering for</p>
                <div className="flex flex-wrap gap-2">
                  {["Transport for London", "RBS", "National Grid", "UK Government"].map(org => (
                    <span key={org} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                      {org}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workman painter — positioned to look like he's painting the orange underline */}
              <img
                src={WORKMAN.painter}
                alt=""
                aria-hidden="true"
                className="absolute -right-4 -top-4 w-24 h-24 object-contain pointer-events-none hidden lg:block opacity-90"
              />
            </div>

            {/* Right: hero illustration */}
            <div className="hidden md:flex items-end justify-center pb-0">
              <img
                src={ILLUS.hero}
                alt="Professional using a secure private AI system at his desk"
                className="w-full max-w-lg object-contain drop-shadow-sm"
                loading="eager"
              />
            </div>

          </div>
        </section>

        {/* ── BBC MEDIA CREDENTIAL ─────────────────────────────────────── */}
        <section className="border-b border-slate-200 bg-white py-0">
          <div className="container">
            <Link href="/bbc-article">
              <div className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-8 cursor-pointer">

                {/* BBC wordmark block */}
                <div className="shrink-0 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {/* BBC-style three-box wordmark */}
                    {["B", "B", "C"].map((letter) => (
                      <div key={letter} className="w-10 h-10 bg-slate-900 flex items-center justify-center">
                        <span className="text-white font-black text-lg leading-none tracking-tight">{letter}</span>
                      </div>
                    ))}
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-slate-200" />
                  <div className="hidden sm:block">
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Radio</p>
                    <p className="text-slate-700 text-sm font-semibold">West Midlands</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-slate-200 shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">As featured on</p>
                  <p className="text-slate-900 font-semibold text-base leading-snug">
                    AI and the Future of Customer Service — Kunle Ibidun on where AI helps and where people remain essential
                  </p>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 text-orange-700 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read the article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

              </div>
            </Link>
          </div>
        </section>

        {/* ── SECTION 2: THE PROBLEM ───────────────────────────────────────── */}
        <section className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left: illustration */}
                <div className="flex items-center justify-center order-2 md:order-1">
                  <img
                    src={ILLUS.problem}
                    alt="Office worker unable to use ChatGPT with confidential documents"
                    className="w-full max-w-md object-contain drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                {/* Right: copy */}
                <div className="order-1 md:order-2">
                  <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">The problem</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                    Your employees want to use AI with your most valuable information. Your security requirements won't let them.
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    Confidential information is where AI could be most valuable to your business. But sending client contracts, financial records, HR files, or proprietary case studies to a public AI service is not acceptable.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "Client contracts & supplier agreements",
                      "Financial forecasts & management accounts",
                      "HR policies, employee records & payroll",
                      "Proprietary case studies & project archives",
                      "Tender responses & bid documentation",
                    ].map(label => (
                      <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-orange-100 shadow-sm">
                        <span className="text-slate-700 text-sm font-medium flex-1">{label}</span>
                        <span className="flex items-center gap-1 text-xs text-red-600 font-medium bg-red-50 border border-red-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3" />
                          Can't use ChatGPT
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: BUSINESS CHAT DEMO ────────────────────────────────── */}
        <section id="demo" className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">

              {/* Left: heading + question selector */}
              <div className="md:pt-4">
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">See it in action</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Ask your company's AI a confidential question.
                </h2>
                <p className="text-slate-600 text-base mb-8 leading-relaxed">
                  Every answer is sourced from your own documents. Nothing leaves your network.
                </p>

                {/* Vault illustration — visual anchor */}
                <div className="mb-6 rounded-2xl overflow-hidden bg-[#fdf6ee] border border-orange-100 p-4 relative">
                  <img
                    src={ILLUS.vault}
                    alt="Secure document vault with AI query interface"
                    className="w-full object-contain max-h-48"
                    loading="lazy"
                  />
                  <p className="text-center text-slate-500 text-xs mt-2 font-medium">Your documents stay inside your vault — AI queries them without exposing them.</p>
                  {/* Workman inspector — peering at the vault */}
                  <img
                    src={WORKMAN.inspector}
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 w-20 h-20 object-contain pointer-events-none hidden md:block"
                  />
                </div>

                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Try an example</p>
                <div className="space-y-2">
                  {DEMO_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => switchDemo(i)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        activeDemoIndex === i
                          ? "bg-orange-700 border-orange-700 text-white shadow-md shadow-orange-700/15"
                          : "bg-white border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: chat interface */}
              <div className={`transition-opacity duration-250 ${demoAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">

                  {/* App header bar */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-700 to-amber-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-semibold truncate">Company Knowledge Assistant</p>
                      <p className="text-slate-400 text-xs">Your organisation · Private &amp; Secure</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      On-Premise
                    </div>
                  </div>

                  {/* Chat body */}
                  <div className="p-4 space-y-4 bg-slate-50/50 min-h-[320px]">

                    {/* User message bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-orange-700 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-sm">
                        {currentDemo.question}
                      </div>
                    </div>

                    {/* AI is searching */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-slate-600 text-xs font-bold">AI</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-100 px-4 py-3 shadow-sm">
                          <p className="text-slate-400 text-xs font-medium mb-2">Searching your documents…</p>
                          <div className="space-y-1.5">
                            {currentDemo.searching.map((s, i) => (
                              <div key={i} className="flex items-center gap-2 text-slate-500 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI answer bubble */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-slate-600 text-xs font-bold">AI</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-100 px-4 py-3 shadow-sm">
                          <p className="text-slate-800 text-sm leading-relaxed">{currentDemo.answer}</p>
                        </div>

                        {/* Source citation card */}
                        <div className="bg-white rounded-xl border border-orange-100 px-4 py-3 shadow-sm flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-slate-400 text-xs font-medium mb-0.5">Source document</p>
                              <p className="text-slate-800 text-sm font-semibold">{currentDemo.source}</p>
                              <p className="text-slate-400 text-xs mt-0.5">{currentDemo.clause}</p>
                            </div>
                          </div>
                          <button className="shrink-0 flex items-center gap-1 text-xs text-orange-700 hover:text-orange-900 transition-colors font-medium">
                            <ExternalLink className="w-3 h-3" />
                            View
                          </button>
                        </div>

                        {/* Privacy assurance */}
                        <div className="flex items-center gap-2 text-green-700 text-xs bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                          This document has not left your network.
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Input bar (decorative) */}
                  <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center gap-3">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-400">
                      Ask a question about your company's documents…
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-orange-700 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: BUSINESS SKILLS (Input → Output) ─────────────────── */}
        <section id="skills" className="bg-[#fdf6ee] border-y border-orange-100 py-16 md:py-20 relative overflow-hidden">
          <div className="container">
            <div className="max-w-5xl mx-auto">

              {/* Section header with workman sign-hanger */}
              <div className="relative mb-12">
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Then we teach it to do useful work</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">
                  Your Private AI comes with a growing library of business skills.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                  Not just search. Your AI produces the documents your team already creates every week — no prompting, no copy-paste, no formatting. Just say what you need.
                </p>
                {/* Workman sign — climbing ladder to hang the section title */}
                <img
                  src={WORKMAN.sign}
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-2 -top-8 w-32 h-32 object-contain pointer-events-none hidden lg:block opacity-85"
                />
              </div>

              {/* User says → AI produces */}
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 md:p-8 mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-700" />
                  </div>
                  <p className="text-slate-700 text-sm font-medium">Your team simply says:</p>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-4 mb-6">
                  <p className="text-slate-800 text-lg font-semibold italic">"Create this week's PMO report."</p>
                  <p className="text-slate-500 text-sm mt-1">No prompting. No copy/paste. No formatting.</p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                  </div>
                  <p className="text-slate-700 text-sm font-medium">The AI knows what to do because it has a <span className="font-bold text-orange-700">Skill</span> installed:</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-11">
                  It knows what a RAID log is, how you format it, where to find the data, and how to present it. Each Skill is a pre-built workflow that produces a specific business output.
                </p>
              </div>

              {/* Skills cards — Input → Output */}
              <div className="grid md:grid-cols-3 gap-5 mb-10">
                {SKILLS_EXAMPLES.map(skill => (
                  <div key={skill.name} className={`rounded-2xl border p-6 ${skill.color} transition-shadow hover:shadow-md`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${skill.iconColor}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">{skill.name}</h3>

                    {/* Input */}
                    <div className="mb-4">
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Input</p>
                      <div className="space-y-1.5">
                        {skill.inputs.map(input => (
                          <div key={input} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            {input}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 my-3">
                      <div className="flex-1 h-px bg-slate-200" />
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Output */}
                    <div>
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Output</p>
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-2.5 shadow-sm">
                        <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                        <span className="text-sm font-semibold text-slate-800">{skill.output}</span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs mt-4 leading-relaxed">{skill.description}</p>
                  </div>
                ))}
              </div>

              {/* Workman builder — carrying folders, positioned at bottom-right of skills grid */}
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm max-w-lg">
                  Every new Skill we build becomes reusable across future customers. A PMO Skill developed once can be deployed to dozens of organisations with only light customisation.
                </p>
                <img
                  src={WORKMAN.builder}
                  alt=""
                  aria-hidden="true"
                  className="w-24 h-24 object-contain hidden md:block opacity-85"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: PERMISSIONS VISUAL ───────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left: copy */}
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Your strongest differentiator</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                  Not everyone should see everything. Private AI respects that.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Role-based access controls mean your Private AI only shows each person the information they are authorised to see. Finance sees finance. HR sees HR. Sales sees sales.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  This turns Private AI from a "local ChatGPT" into a genuine enterprise information system — one that enforces your existing permissions at the point of every query.
                </p>

                {/* Access examples */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="text-emerald-700 text-xs font-bold">S</span>
                      </div>
                      <p className="text-slate-700 text-sm"><span className="font-semibold">Sarah</span> · Sales Manager asks: "What does James earn?"</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-100 border border-red-200 px-2.5 py-1 rounded-full">
                      <EyeOff className="w-3 h-3" />
                      Not authorised to view HR records
                    </span>
                  </div>

                  <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="text-emerald-700 text-xs font-bold">S</span>
                      </div>
                      <p className="text-slate-700 text-sm"><span className="font-semibold">Sarah</span> asks: "Find our strongest logistics case study."</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full">
                      <Eye className="w-3 h-3" />
                      Answer returned from Sales documents
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: permissions illustration */}
              <div className="flex items-center justify-center">
                <div className="rounded-2xl overflow-hidden bg-[#fdf6ee] border border-orange-100 p-6 w-full">
                  <img
                    src={ILLUS.permissions}
                    alt="Three office workers at separate desks with department-specific document access"
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {[
                      { dept: "Finance", color: "bg-blue-100 text-blue-700 border-blue-200" },
                      { dept: "Sales", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                      { dept: "HR", color: "bg-violet-100 text-violet-700 border-violet-200" },
                    ].map(({ dept, color }) => (
                      <span key={dept} className={`text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>
                        {dept}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-slate-500 text-xs mt-2">Each department sees only what they're authorised to see.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: DEPLOYMENT CHOICES ───────────────────────────────── */}
        <section id="deployment" className="bg-slate-900 py-16 md:py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">Deployment choices</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Your data. Your boundary. Your choice.
              </h2>
              <p className="text-slate-400 text-lg mb-10">
                We install and manage Private AI within the security boundary that your organisation requires.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { name: "Private Cloud", icon: Server, desc: "Dedicated cloud infrastructure. No shared tenancy. Data stays within your cloud account.", badge: "Most popular" },
                  { name: "On-Premise", icon: Building2, desc: "Hardware installed in your building. Data never leaves your physical premises.", badge: "" },
                  { name: "Offline", icon: Shield, desc: "No internet connection required. Fully isolated from external networks.", badge: "" },
                  { name: "Air-Gapped", icon: Lock, desc: "Physically isolated. No network connection of any kind. Maximum security.", badge: "Highest security" },
                ].map(({ name, icon: Icon, desc, badge }) => (
                  <div key={name} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 relative">
                    {badge && (
                      <span className="absolute -top-2.5 left-4 bg-orange-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Technical details accordion */}
              <div className="rounded-2xl border border-slate-700 overflow-hidden">
                <button
                  onClick={() => setShowTechDetails(!showTechDetails)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-slate-400" />
                    <span className="text-white font-medium">Technical architecture & security details</span>
                    <span className="text-slate-500 text-sm hidden sm:inline">— for IT directors and technical reviewers</span>
                  </div>
                  {showTechDetails ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {showTechDetails && (
                  <div className="border-t border-slate-700 p-5 grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-orange-400 font-semibold text-sm mb-3">Model & Infrastructure</h4>
                      <ul className="space-y-2 text-slate-400 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Open-weight models (Llama, Mistral, Phi) — no proprietary dependencies</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Hardware sized to model requirements, document volume, and concurrent usage</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />RAG (Retrieval-Augmented Generation) architecture with source citations</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Vector database for semantic document search</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-semibold text-sm mb-3">Security & Access Controls</h4>
                      <ul className="space-y-2 text-slate-400 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Role-based access controls — documents visible only to authorised roles</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Active Directory / LDAP integration available</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Full audit log of all queries and document access</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />Document ingestion pipeline with version control</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: PROOF ─────────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* Trust strip */}
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Why trust AI Midlands</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                  20+ years delivering enterprise systems for organisations that cannot afford to get it wrong.
                </h2>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Experience across</p>
                  <div className="flex flex-wrap gap-2">
                    {["Transport for London", "RBS", "National Grid", "UK Government"].map(org => (
                      <span key={org} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                        {org}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm mt-3">Integration · APIs · Cloud · Data · Security-conscious delivery</p>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  AI Midlands was founded to bring the same rigour applied to critical national infrastructure to the private AI systems that growing organisations need today.
                </p>
              </div>

              {/* Demonstrator stats */}
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">Private AI demonstrator</p>
                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 mb-5">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {[
                      { value: "2,400", label: "Confidential documents indexed" },
                      { value: "14,000", label: "Pages searchable by AI" },
                      { value: "< 3s", label: "Average answer time" },
                      { value: "100%", label: "Data stays on-premise" },
                    ].map(({ value, label }) => (
                      <div key={label} className="text-center">
                        <p className="text-3xl font-extrabold text-orange-700 mb-1">{value}</p>
                        <p className="text-slate-600 text-xs leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      "Answers returned with source citations",
                      "Role-based access controls enforced",
                      "No document content sent to any public AI service",
                      "Runs entirely on customer-controlled hardware"
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white h-11"
                  onClick={() => handleEmailCTA(
                    "Private AI Demonstration Request",
                    "Hi Kunle,\n\nI would like to arrange a demonstration of your Private AI system.\n\nBest regards,"
                  )}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request a Demonstration
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: UNIFIED PRICING ──────────────────────────────────── */}
        <section className="bg-slate-900 py-16 md:py-20 relative overflow-hidden">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3 text-center">Getting started</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-center">
                One product. One progression.
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed text-center max-w-2xl mx-auto">
                We give your organisation a secure AI that knows your business. Then we teach it to do useful work.
              </p>

              {/* Pricing progression — 3 steps */}
              <div className="grid md:grid-cols-3 gap-5 mb-10">
                {/* Step 1: Setup */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 relative">
                  <div className="absolute -top-3 left-5 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">Step 1</div>
                  <h3 className="font-bold text-white text-lg mt-2 mb-2">Install Your Secure AI</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">We install a private AI system, ingest your documents, and configure role-based access controls.</p>
                  <p className="text-orange-400 font-bold text-2xl mb-1">From £5,000</p>
                  <p className="text-slate-500 text-xs">+ managed service from £750/month</p>
                  <ul className="mt-4 space-y-1.5">
                    {["Secure installation", "Document ingestion", "Role-based access", "Source citations"].map(item => (
                      <li key={item} className="flex items-start gap-2 text-slate-400 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step 2: Skills */}
                <div className="rounded-2xl border border-orange-500 bg-orange-950/30 p-6 relative">
                  <div className="absolute -top-3 left-5 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">Step 2</div>
                  <span className="inline-block bg-orange-600/20 text-orange-300 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 mt-2">Most value</span>
                  <h3 className="font-bold text-white text-lg mb-2">Add Business Skills</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">Each Skill is a 10-day build that teaches your AI to produce a specific business output. Then it runs forever.</p>
                  <p className="text-orange-400 font-bold text-2xl mb-1">From £3,000 per Skill</p>
                  <p className="text-slate-500 text-xs">10-day fixed-fee build</p>
                  <ul className="mt-4 space-y-1.5">
                    {["PMO reports", "Board summaries", "Client briefings", "Proposal drafts"].map(item => (
                      <li key={item} className="flex items-start gap-2 text-slate-400 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step 3: Managed */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 relative">
                  <div className="absolute -top-3 left-5 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">Step 3</div>
                  <h3 className="font-bold text-white text-lg mt-2 mb-2">Managed Service</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">We keep it running, add new Skills quarterly, and ensure your AI stays current as your business changes.</p>
                  <p className="text-orange-400 font-bold text-2xl mb-1">From £750/month</p>
                  <p className="text-slate-500 text-xs">Ongoing support & evolution</p>
                  <ul className="mt-4 space-y-1.5">
                    {["Monitoring & updates", "New Skills quarterly", "Document refresh", "Priority support"].map(item => (
                      <li key={item} className="flex items-start gap-2 text-slate-400 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Workman mechanic — inspecting the system under the bonnet */}
              <div className="flex items-center justify-center mb-8">
                <img
                  src={WORKMAN.mechanic}
                  alt=""
                  aria-hidden="true"
                  className="w-28 h-28 object-contain opacity-85"
                />
              </div>

              <p className="text-slate-500 text-sm mb-8 italic text-center">
                Final architecture depends on document volume, concurrent usage, and security requirements. We scope this together before any commitment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white h-12 px-8 text-base font-semibold shadow-lg shadow-orange-600/20"
                  asChild
                >
                  <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Private AI Discovery Call
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-slate-600 bg-transparent hover:bg-slate-800 text-slate-300 h-12 px-8 text-base"
                  onClick={() => handleEmailCTA(
                    "Private AI Enquiry",
                    "Hi Kunle,\n\nI am interested in discussing a Private AI installation for our organisation.\n\nBest regards,"
                  )}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send an Enquiry
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 9: SECTOR BLUEPRINTS ────────────────────────────────── */}
        <section id="blueprints" className="container py-16 md:py-20">
          <div className="max-w-5xl mx-auto">

            {/* Section header with sprints illustration */}
            <div className="rounded-3xl bg-[#fdf6ee] border border-orange-100 overflow-hidden mb-10">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className="p-8 md:p-10">
                  <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest mb-3">See what's possible in your sector</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    Download a free AI Skills blueprint for your industry.
                  </h2>
                  <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                    Each blueprint shows exactly which Skills save the most time and money — with ROI calculations and implementation timelines.
                  </p>

                  {/* Sprint/skill enquiry */}
                  <div className="relative max-w-xl">
                    <div className="flex items-center gap-2 bg-white border border-orange-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-orange-500 transition-colors">
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={sprintQuery}
                        onChange={e => setSprintQuery(e.target.value)}
                        placeholder="Describe a task your team does every week..."
                        className="flex-1 bg-transparent border-0 outline-none text-sm text-slate-800 placeholder:text-slate-400"
                      />
                      <Button
                        size="sm"
                        className="rounded-lg bg-orange-700 hover:bg-orange-800 text-white text-xs h-8 px-4 shrink-0"
                        onClick={() => handleEmailCTA(
                          `AI Midlands Skill Enquiry: ${sprintQuery || "Business Skill"}`,
                          `Hi Kunle,\n\nI am interested in a Business Skill for the following task:\n\n${sprintQuery || "[Please describe your recurring task here]"}\n\nBest regards,`
                        )}
                      >
                        Enquire
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-end justify-center px-6 pb-0">
                  <img
                    src={ILLUS.sprints}
                    alt="Engineer fixing a leaking pipe — representing time saved through automation"
                    className="w-full max-w-sm object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Sector worksheets */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {WORKSHEETS_DATABASE.map(sheet => (
                <div key={sheet.sector} className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-orange-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{sheet.title}</h3>
                  <p className="text-slate-500 text-xs mb-3">{sheet.subtitle}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full rounded-lg border-orange-200 text-orange-800 hover:bg-orange-50 text-xs h-8"
                    onClick={() => selectWorksheet(sheet)}
                  >
                    <Download className="w-3 h-3 mr-1.5" />
                    Download free blueprint
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-slate-500 text-sm text-center">
              Free sector-specific blueprints showing exactly which AI Skills save the most time and money.
            </p>
          </div>
        </section>

        {/* ── LEAD CAPTURE MODAL (worksheet download) ─────────────────────── */}
        {activeWorksheet && (
          <section ref={leadCaptureRef} className="container pb-16">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-3xl border border-orange-200 bg-white shadow-xl p-8">
                {!hasDownloaded[activeWorksheet.sector] ? (
                  <>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-orange-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{activeWorksheet.title}</h3>
                        <p className="text-slate-500 text-sm">{activeWorksheet.subtitle}</p>
                      </div>
                    </div>
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Your name</label>
                          <input
                            type="text"
                            required
                            value={leadName}
                            onChange={e => setLeadName(e.target.value)}
                            placeholder="Jane Smith"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Work email</label>
                          <input
                            type="email"
                            required
                            value={leadEmail}
                            onChange={e => setLeadEmail(e.target.value)}
                            placeholder="jane@company.co.uk"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Company name <span className="text-slate-400 font-normal">(optional)</span></label>
                        <input
                          type="text"
                          value={leadCompany}
                          onChange={e => setLeadCompany(e.target.value)}
                          placeholder="Your business name"
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="w-full rounded-xl bg-orange-700 hover:bg-orange-800 text-white h-11 font-semibold"
                      >
                        {isSubmittingLead ? "Preparing download..." : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download Free Blueprint
                          </>
                        )}
                      </Button>
                      <p className="text-slate-400 text-xs text-center">No spam. We will only use your details to follow up on your download.</p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Your blueprint is downloading.</h3>
                    <p className="text-slate-600 mb-6">We have also opened a draft email so you can ask Kunle any questions directly.</p>
                    <Button
                      variant="outline"
                      className="rounded-xl border-orange-200 text-orange-800 hover:bg-orange-50"
                      onClick={() => setActiveWorksheet(null)}
                    >
                      View another sector
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-700 to-amber-500 flex items-center justify-center">
                  <span className="font-mono font-bold text-white text-xs">AM</span>
                </div>
                <span className="font-bold text-white">AI Midlands</span>
              </div>
              <p className="text-sm leading-relaxed">
                Secure ChatGPT for your business, plus a growing library of business skills that produce the documents your team already creates every day.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Services</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#private-ai" className="hover:text-white transition-colors">Private AI Systems</a></li>
                <li><a href="#skills" className="hover:text-white transition-colors">Business Skills</a></li>
                <li><a href="#deployment" className="hover:text-white transition-colors">Deployment Options</a></li>
                <li><a href="#blueprints" className="hover:text-white transition-colors">Sector Blueprints</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Get in touch</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    hello@ai-midlands.co.uk
                  </a>
                </li>
                <li>
                  <a href="tel:07966461005" className="hover:text-white transition-colors">
                    07966 461005
                  </a>
                </li>
                <li>
                  <a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Book a discovery call
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© 2025 AI Midlands. All rights reserved.</p>
            <p>Registered in England & Wales</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
