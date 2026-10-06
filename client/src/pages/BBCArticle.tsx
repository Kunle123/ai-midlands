// AI Midlands — BBC Radio WM Article Page

import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

export default function BBCArticle() {
  const handleEmailCTA = (subject: string, body: string) => {
    window.location.href = `mailto:hello@ai-midlands.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col selection:bg-orange-200 selection:text-orange-900">
      <header className="border-b border-[#e8e0d8] bg-[#faf8f5]/92 backdrop-blur-md sticky top-0 z-20">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[40px] w-auto cursor-pointer" />
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-9 px-4 text-sm gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to site
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="bg-[#fdf6ee] border-b border-orange-100">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 border-y border-[#d9d1ca] py-3 mb-6">
                <img src="/brand/bbc-logo.svg" alt="BBC" className="w-[76px] h-auto shrink-0" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a5a4f]">As heard on</div>
                  <div className="text-sm font-semibold text-[#0f172b]">BBC Radio West Midlands</div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5">What BBC Radio WM got right about AI and customer service</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">The question isn't whether AI should replace people. It's where AI frees people to do the work that actually matters.</p>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-1.5"><div className="w-7 h-7 rounded-full bg-[#c83927] flex items-center justify-center shrink-0"><span className="text-white text-xs font-bold">K</span></div><span className="font-medium text-slate-700">Kunle Ibidun</span><span className="text-slate-400">·</span><span>Founder, AI Midlands</span></div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> July 2025</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 4 min read</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12 md:py-16">
          <div className="max-w-2xl">
            <blockquote className="border-l-4 border-[#c83927] pl-6 py-2 mb-10 bg-orange-50 rounded-r-xl pr-6">
              <p className="text-slate-700 text-lg italic leading-relaxed">"When a human says 'I understand,' it carries a different meaning — because they embody that experience that you have."</p>
              <footer className="mt-2 text-slate-500 text-sm not-italic">— Kunle Ibidun, BBC Radio West Midlands</footer>
            </blockquote>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-base leading-relaxed">
              <p>Yesterday I joined Ed James on BBC Radio West Midlands to discuss whether AI chatbots should replace people in customer service.</p>
              <p>One of the callers made a point that perfectly captured the challenge. She preferred speaking to a person because she felt understood. That conversation highlighted an important distinction: <strong>AI can answer questions remarkably well, but understanding information isn't the same as understanding people.</strong></p>
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The question most organisations get wrong</h2>
              <p>Businesses sometimes ask the wrong question: <em>"How can we replace people with AI?"</em></p>
              <p>A better question is: <em>"Where can AI free our people to spend more time on the conversations that matter?"</em></p>
              <p>These sound similar. They lead to completely different outcomes.</p>
              <p>The first framing treats people as a cost to be reduced. The second treats AI as a tool that makes people more effective. Organisations that adopt the first framing often find that customer satisfaction drops, staff morale suffers, and the AI system becomes a source of complaints rather than a competitive advantage.</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Where AI genuinely adds value</h2>
              <p>During the interview, I made the point that AI is excellent for answering straightforward questions quickly. That's not a modest claim — it's a significant one. The volume of routine queries that organisations handle every day is enormous, and most of those queries have clear, factual answers.</p>
              <p>A customer asking "What are your opening hours?" or "Where is my order?" doesn't need a human. They need an accurate answer, delivered immediately. AI handles this better than most humans — it's faster, it's consistent, and it's available at 3am on a Sunday.</p>
              <p>But the caller on the programme — Vera, calling from the bus — wasn't asking about opening hours. She was describing a feeling: the feeling of not being understood. That's a different category of interaction entirely.</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Where people remain irreplaceable</h2>
              <p>Human empathy isn't just a nice-to-have. In certain situations, it's the product. When a customer is distressed, confused, or vulnerable, the quality of the human interaction <em>is</em> the service. No AI system, however sophisticated, can replicate the meaning that a person carries when they say "I understand what you're going through."</p>
              <p>This isn't a criticism of AI. It's a description of what AI is for. The organisations that use AI most effectively are the ones that have thought carefully about this distinction — and designed their systems accordingly.</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The practical implication</h2>
              <p>At AI Midlands, the first conversation we have with any client isn't about technology. It's about their work. Which tasks consume the most time? Which interactions require genuine human judgement? Where are the bottlenecks that frustrate both staff and customers?</p>
              <p>The answers to those questions determine where AI belongs in their organisation — and, just as importantly, where it doesn't.</p>
              <p>The result isn't replacing people with technology. It's using technology to make people more effective. Staff spend less time on repetitive queries and more time on the conversations where their experience, empathy, and judgement genuinely matter.</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">A note on the pace of change</h2>
              <p>Ed asked me how good AI is at the moment. My honest answer was: better than most people realise, and improving faster than most people expect. Accent recognition, nuance detection, contextual understanding — all of these are advancing week by week.</p>
              <p>That pace of change is exactly why the strategic question matters so much right now. Organisations that wait until AI is "good enough" to start thinking about where it fits will find themselves behind. Organisations that start with the right question — where does AI help, and where do people remain essential — will be better positioned regardless of how the technology develops.</p>
              <p className="font-semibold text-slate-900">Pragmatic beats ideological. Every time.</p>
            </div>

            <div className="mt-14 border-y border-[#ddd5ce] py-8">
              <p className="text-[#b43a28] text-sm font-semibold mb-3">Thinking about AI for your organisation?</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Start with the right question.</h3>
              <p className="text-slate-600 leading-relaxed mb-6">We help organisations identify exactly where AI adds value and where people remain essential — then build the systems that reflect that distinction. No hype. No ideology. Just practical AI that works.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-11 px-7 font-semibold shadow-sm" asChild><a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">Book a consultation <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
                <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-11 px-7" onClick={() => handleEmailCTA("AI Midlands — Consultation Request", "Hi Kunle,\n\nI read your article about AI and customer service and I'd like to discuss how AI could benefit our organisation.\n\nBest regards,")}><Mail className="w-4 h-4 mr-2" /> Send an email</Button>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200"><Link href="/"><button className="flex items-center gap-2 text-slate-500 hover:text-[#c83927] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to AI Midlands</button></Link></div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0f172b] text-slate-400 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[32px] w-auto brightness-0 invert" />
          <p>© 2026 AI Midlands. Midlands based · UK wide.</p>
          <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-white transition-colors">hello@ai-midlands.co.uk</a>
        </div>
      </footer>
    </div>
  );
}
