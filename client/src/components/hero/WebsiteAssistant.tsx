import { SoftCard } from "./workspace";

export function WebsiteAssistant() {
  return (
    <SoftCard className="px-3.5 py-3">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f4f1ec] text-slate-500">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2.5 H12 V9.2 H7.2 L4.2 11.4 V9.2 H2 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-sans text-[13px] font-semibold text-[#1c2434]">Website assistant</p>
        <span className="ml-auto inline-flex items-center gap-1 font-sans text-[11px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22a35a]" aria-hidden="true" />
          Online
        </span>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eceae6] text-slate-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.1" />
            <path d="M2.2 10.2 C2.6 7.8 4 6.8 6 6.8 C8 6.8 9.4 7.8 9.8 10.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </span>
        <div className="rounded-xl rounded-tl-sm bg-[#f4f1ec] px-2.5 py-1.5 font-sans text-[12px] leading-snug text-[#1c2434]">
          Do you install in Birmingham?
        </div>
      </div>

      <div className="mt-2.5 flex items-start gap-2">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e85d2a] font-sans text-[8px] font-bold text-white">
          AM
        </span>
        <div className="rounded-xl rounded-tl-sm border border-[#f3ece6] bg-white px-2.5 py-1.5 font-sans text-[12px] leading-snug text-[#1c2434]">
          Yes. We're Midlands based and cover Birmingham. Would you like to arrange a call?
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c2434] px-3 py-1.5 font-sans text-[12px] font-medium text-white">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.2" width="9" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1.5 4.4 H10.5 M3.4 1.4 V3 M8.6 1.4 V3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Book a call
        </span>
      </div>
    </SoftCard>
  );
}
