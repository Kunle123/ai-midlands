import { SoftCard, StatusMark } from "./workspace";

export function CRMInterface() {
  return (
    <SoftCard className="px-3.5 py-3">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[#7eb6e6]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M5.2 12.2 H11.2 C13 12.2 14.2 11 14.2 9.4 C14.2 7.9 13.1 6.8 11.6 6.6 C11.2 4.8 9.7 3.6 7.8 3.6 C5.6 3.6 3.9 5.2 3.8 7.3 C2.4 7.5 1.4 8.6 1.4 10 C1.4 11.3 2.4 12.2 3.8 12.2 H5.2 Z" />
          </svg>
        </span>
        <p className="font-sans text-[13px] font-semibold text-[#1c2434]">Customer record</p>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f1ec] text-slate-400">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12 V6.2 L7 2.4 L12 6.2 V12 H8.6 V8.6 H5.4 V12 Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-semibold leading-tight text-[#1c2434]">Acme Ltd</p>
            <p className="font-sans text-[11px] text-slate-400">Commercial Client</p>
          </div>
        </div>
        <dl className="shrink-0 space-y-1 text-right font-sans">
          <div className="flex items-center justify-end gap-2">
            <dt className="text-[11px] text-slate-400">Status</dt>
            <dd>
              <StatusMark tone="won">Won</StatusMark>
            </dd>
          </div>
          <div className="flex items-center justify-end gap-2">
            <dt className="text-[11px] text-slate-400">Value</dt>
            <dd className="text-[12px] font-medium tabular-nums text-[#1c2434]">£12,000</dd>
          </div>
          <div className="flex items-center justify-end gap-2">
            <dt className="text-[11px] text-slate-400">Next step</dt>
            <dd className="text-[12px] text-slate-600">Send invoice</dd>
          </div>
        </dl>
      </div>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 w-[72%] rounded-full bg-[#f1ece7]" />
        <div className="h-1.5 w-[48%] rounded-full bg-[#f1ece7]" />
      </div>
    </SoftCard>
  );
}
