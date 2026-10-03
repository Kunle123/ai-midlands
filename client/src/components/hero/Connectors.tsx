export function Connectors() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-visible text-[#ee8d55]"
        width="220"
        height="200"
        viewBox="-110 -100 220 200"
        aria-hidden="true"
      >
        <path d="M-58 -76 C-52 -42 -36 -18 -23 -5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M60 -80 C52 -44 36 -18 23 -5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M-58 66 C-50 36 -36 16 -23 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M60 62 C50 34 36 16 23 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <div
        className="pointer-events-none absolute left-[calc(50%+1.55rem)] top-[calc(50%-0.15rem)] z-0 h-9 w-6 opacity-80"
        style={{
          backgroundImage: "radial-gradient(#f0a06a 1.15px, transparent 1.25px)",
          backgroundSize: "6px 6px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#e85d2a] shadow-[0_8px_16px_-6px_rgba(232,93,42,0.7)]">
        <span className="font-sans text-[11px] font-bold tracking-tight text-white">AM</span>
      </div>
    </div>
  );
}
