export function HeroCopy() {
  return (
    <section className="copy">
      <div className="eyebrow">AI that fits the work.</div>
      <h1>Remove the manual hand-offs slowing your team down.</h1>
      <p>
        For Midlands and UK teams working across email, CRM, spreadsheets and finance systems. We map the process, simplify the bottleneck, then build a fixed-scope automation around the tools you already use — with people in control where judgement matters.
      </p>
      <p className="font-semibold text-[#0f172b]">
        Fixed-scope automation from £2,000. Agree the outcome up front. Pay when you see the agreed solution working.
      </p>
      <div className="flex flex-wrap items-center gap-5 mt-1">
        <a
          href="#assessment"
          className="inline-flex items-center gap-3 rounded-full bg-[#c83927] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(200,57,39,0.16)] transition-colors hover:bg-[#a92f21]"
        >
          Get a first-pass process assessment <span>→</span>
        </a>
        <a
          href="https://calendly.com/kunle2000/30min"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 border-b-2 border-[#c83927] pb-1 text-base font-semibold text-[#0f172b] transition-colors hover:text-[#c83927]"
        >
          Book a 30-minute process review <span>→</span>
        </a>
      </div>
      <div className="mt-1 text-sm text-slate-600">Founder-led · 20+ years in digital and integration delivery · Human approval where it matters</div>
      <a className="bbc-proof" href="/bbc-article" aria-label="Read about Kunle Ibidun on BBC Radio West Midlands">
        <img className="bbc-proof-logo" src="/brand/bbc-logo.svg" alt="BBC" />
        <span className="bbc-proof-copy">
          <span className="bbc-proof-kicker">As heard on BBC Radio West Midlands</span>
          <span className="bbc-proof-name">Kunle on AI, customer service, and where people matter</span>
        </span>
      </a>
      <div className="location">Midlands-based. Working across the UK.</div>
    </section>
  );
}
