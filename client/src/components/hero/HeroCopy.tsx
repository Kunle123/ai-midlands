export function HeroCopy() {
  return (
    <div className="max-w-xl lg:pt-2">
      <p className="mb-5 font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-slate-500 sm:text-xs">
        AI integration · Automation · Assistants · Private AI
      </p>
      <h1 className="mb-5 max-w-[14ch] text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.15rem]">
        Put AI to work in your business.
      </h1>
      <p className="mb-8 max-w-md font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
        We connect AI to your systems, automate repetitive work, build useful assistants and keep your information private when it needs to be.
      </p>
      <a
        href="mailto:hello@ai-midlands.co.uk?subject=What%20we%20want%20to%20achieve"
        className="inline-flex items-center gap-2 rounded-md bg-[#c2410c] px-5 py-3 font-sans text-[15px] font-medium text-white transition-colors hover:bg-[#9a3412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
      >
        Tell us what you want to achieve
        <span aria-hidden="true">→</span>
      </a>
      <p className="mt-6 font-sans text-sm text-slate-500">
        Midlands based
        <span className="mx-1.5 text-slate-300" aria-hidden="true">
          ·
        </span>
        UK wide
      </p>
    </div>
  );
}
