import { useEffect } from "react";
import { Link } from "wouter";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms | AI Midlands";
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/"><span className="font-semibold text-slate-900 cursor-pointer">AI Midlands</span></Link>
          <Link href="/about"><span className="text-sm text-slate-600 hover:text-orange-700 cursor-pointer">About</span></Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        <article className="max-w-3xl mx-auto prose prose-slate prose-headings:text-slate-900 prose-a:text-orange-700">
          <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest">Website terms</p>
          <h1>Using this website</h1>
          <p>The information on this website is provided to explain AI Midlands’ services and help prospective clients decide whether to start a conversation with us.</p>

          <h2>Indicative assessments and pricing</h2>
          <p>Any automated process assessment, complexity label, delivery timeframe or price shown on the website is indicative only. It is not a quotation, guarantee of feasibility or contractual commitment. A binding proposal is only made after we have reviewed the actual process, systems, access constraints, data requirements and testing needs.</p>

          <h2>Demonstrations</h2>
          <p>Worked examples and animations labelled as demonstrations are illustrative. They show the kinds of workflows AI Midlands can design and build; they are not presented as customer case studies unless explicitly stated otherwise.</p>

          <h2>Third-party services</h2>
          <p>Links to third-party services such as Calendly are provided for convenience. Their availability, security and terms are controlled by those providers.</p>

          <h2>No reliance on website content alone</h2>
          <p>Automation feasibility depends on the particular systems, permissions, data quality, process rules and operational controls involved. Decisions about implementation should be based on an agreed scope and proposal, not solely on general website content.</p>

          <h2>Intellectual property</h2>
          <p>Unless otherwise stated, the website design, copy, demonstrations and AI Midlands branding are owned by or licensed to AI Midlands and may not be reproduced commercially without permission.</p>

          <h2>Contact</h2>
          <p><a href="mailto:hello@ai-midlands.co.uk">hello@ai-midlands.co.uk</a></p>
          <p className="text-sm text-slate-500">These website terms should be reviewed against the final legal entity and contracting model before production launch.</p>
        </article>
      </main>
    </div>
  );
}
