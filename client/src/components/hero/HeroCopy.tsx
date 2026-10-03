export function HeroCopy() {
  return (
    <div className="max-w-[26rem] xl:pt-2">
      <p className="mb-5 max-w-[22rem] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-slate-500">
        AI integration · Automation · Assistants · Private AI
      </p>
      <h1 className="mb-5 text-[2.45rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#172033] sm:text-5xl xl:text-[3.15rem]">
        Put AI to work in your business.
      </h1>
      <p className="mb-7 max-w-[25rem] font-sans text-[15px] leading-relaxed text-slate-600">
        We connect AI to your systems, automate repetitive work, build useful assistants and keep your information private when it needs to be.
      </p>
      <a
        href="mailto:hello@ai-midlands.co.uk?subject=What%20we%20want%20to%20achieve"
        className="inline-flex items-center gap-2 rounded-lg bg-[#e85d2a] px-4 py-2.5 font-sans text-[14px] font-medium text-white transition-colors hover:bg-[#d14e1e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d2a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
      >
        Tell us what you want to achieve
        <span aria-hidden="true">→</span>
      </a>
      <p className="mt-7 font-sans text-sm text-slate-500">
        Midlands based
        <span className="mx-1.5 text-slate-300" aria-hidden="true">
          ·
        </span>
        UK wide
      </p>
    </div>
  );
}
