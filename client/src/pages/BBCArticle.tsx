// AI Midlands BBC Radio WM Article Page

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
              <ArrowLeft className="w-3.5 h-3.5" /> Back to AI Midlands
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
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a5a4f]">As heard on BBC Radio West Midlands</div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5">AI should make room for better customer conversations.</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">AI is useful when it removes routine work and gets people to the right answer faster. It is not a substitute for empathy, judgement, or a conversation that needs a real person.</p>
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
              <p className="text-slate-700 text-lg italic leading-relaxed">“When a human says ‘I understand,’ it carries a different meaning because they embody that experience that you have.”</p>
              <footer className="mt-2 text-slate-500 text-sm not-italic">Kunle Ibidun, BBC Radio West Midlands</footer>
            </blockquote>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-base leading-relaxed">
              <p>In July 2025, I joined Ed James on BBC Radio WM to discuss whether AI chatbots should replace people in customer service.</p>
              <p>One caller made a point that captured the challenge clearly. She preferred speaking to a person because she felt understood. AI can answer questions very well. Understanding information is not the same as understanding a person.</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The question organisations get wrong</h2>
              <p>Some businesses begin with, “How can we replace people with AI?” That is the wrong starting point.</p>
              <p>A better question is, “Where can AI free people to spend more time on the conversations that matter?” The two questions lead to very different outcomes.</p>
              <p>The first treats people as a cost to remove. The second treats AI as a tool that can make people more effective. Businesses that lose sight of that difference can create a customer experience that feels cheaper, slower to resolve, and harder to trust.</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Where AI adds value</h2>
              <p>AI is good at handling straightforward questions quickly and consistently. That matters when a customer wants an opening time, an order update, or a clear answer to a routine question.</p>
              <p>In those moments, the customer does not need to wait for a person. They need an accurate answer and a simple next step. AI can help with that at any time of day.</p>
              <p>The caller on the programme was describing something different. She was not looking for a fact. She wanted to feel heard. That requires a different kind of response.</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Where people matter most</h2>
              <p>When a customer is distressed, confused, vulnerable, or dealing with a difficult problem, the human interaction can be the service itself. A person can listen, take responsibility, understand the context, and decide what should happen next.</p>
              <p>That does not make AI a failure. It gives AI a useful role. The organisations getting the most value from AI are the ones that decide carefully which questions need a fast answer, which moments need a person, and how the hand-off between the two should work.</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The practical implication</h2>
              <p>At AI Midlands, the first conversation is not about technology. It is about the work. Which tasks take the most time? Which interactions need human judgement? Where do customers and staff get stuck?</p>
              <p>The answers show where AI can help and where people should remain involved. That may mean giving staff less repetitive work, helping customers get an answer more quickly, or making the hand-off to a person clearer when the situation needs one.</p>
              <p>The goal is not to replace people with technology. It is to let technology handle the routine work so people can focus on the conversations where their experience and judgement matter most.</p>

              <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The pace of change makes the question more important</h2>
              <p>During the interview, Ed asked how capable AI is today. My answer was simple: it is better than many people realise, and it is improving quickly.</p>
              <p>That is why it is worth thinking about where AI fits now. The businesses that start with the right questions will be in a better position as the technology changes. They will know which work can be supported by AI and which moments still need a person to take responsibility.</p>
              <p>The sensible approach is neither blind enthusiasm nor resistance for its own sake. It is to use AI where it improves the experience and keep people involved where they add the most value.</p>
            </div>

            <div className="mt-14 border-y border-[#ddd5ce] py-8">
              <p className="text-[#b43a28] text-sm font-semibold mb-3">Considering AI for customer service?</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Start with the journey your customer is trying to complete.</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Decide which questions need a fast answer, which moments need a person, and how the hand-off between the two should work. AI Midlands can help you map that out and build the right next step.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="rounded-full bg-[#c83927] hover:bg-[#a92f21] text-white h-11 px-7 font-semibold shadow-sm" asChild><a href="https://calendly.com/kunle2000/30min" target="_blank" rel="noreferrer">Talk through your customer journey <ArrowRight className="w-4 h-4 ml-2" /></a></Button>
                <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-11 px-7" onClick={() => handleEmailCTA("AI Midlands Consultation Request", "Hi Kunle,\n\nI read your article about AI and customer service and I'd like to discuss our customer journey.\n\nBest regards,")}><Mail className="w-4 h-4 mr-2" /> Send an email</Button>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200"><Link href="/"><button className="flex items-center gap-2 text-slate-500 hover:text-[#c83927] transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to AI Midlands</button></Link></div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0f172b] text-slate-400 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <img src="/brand/ai-midlands-logo.svg" alt="AI Midlands" className="h-[32px] w-auto brightness-0 invert" />
          <p>AI Midlands</p>
          <a href="mailto:hello@ai-midlands.co.uk" className="hover:text-white transition-colors">hello@ai-midlands.co.uk</a>
        </div>
      </footer>
    </div>
  );
}
