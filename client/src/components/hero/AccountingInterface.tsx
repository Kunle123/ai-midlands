import { SoftCard, StatusMark } from "./workspace";

export function AccountingInterface() {
  return (
    <SoftCard className="px-3.5 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#efe8ff] text-[#7c5cbf]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3.2 1.6 H8.2 L10.8 4.2 V12.4 H3.2 Z" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
              <path d="M8 1.8 V4.3 H10.5 M5 7 H9 M5 9.2 H8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </span>
          <p className="font-sans text-[13px] font-semibold text-[#1c2434]">Invoice</p>
        </div>
        <StatusMark tone="sent">Sent</StatusMark>
      </div>
      <div className="mt-2.5 flex items-end justify-between gap-3">
        <div>
          <p className="font-sans text-[13px] font-semibold text-[#1c2434]">INV-1042</p>
          <p className="mt-0.5 font-sans text-[12px] text-slate-500">Acme Ltd</p>
        </div>
        <p className="font-sans text-[15px] font-semibold tabular-nums text-[#1c2434]">£12,000</p>
      </div>
    </SoftCard>
  );
}
