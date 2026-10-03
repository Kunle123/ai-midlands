import { SoftCard, StatusMark } from "./workspace";

const rows = [
  { customer: "Acme Ltd", product: "Installation", value: "£12,000", status: "New", tone: "new" },
  { customer: "Riverside Group", product: "Support", value: "£8,000", status: "In progress", tone: "progress" },
  { customer: "Westbridge Co", product: "Consultancy", value: "£5,000", status: "Won", tone: "won" },
] as const;

export function SpreadsheetInterface() {
  return (
    <SoftCard className="px-3.5 py-3">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1f9d55] text-white">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <rect x="1.2" y="1.2" width="10.6" height="10.6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1.2 4.6 H11.8 M1.2 8.2 H11.8 M4.8 1.2 V11.8 M8.4 1.2 V11.8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <p className="font-sans text-[13px] font-semibold text-[#1c2434]">Project pipeline</p>
      </div>
      <div className="overflow-hidden font-sans text-[11px]">
        <div className="grid grid-cols-[1.15fr_0.95fr_0.75fr_0.85fr] border-b border-[#f1ece7] pb-1.5 text-slate-400">
          <span>Customer</span>
          <span>Product</span>
          <span>Value</span>
          <span>Status</span>
        </div>
        {rows.map(row => (
          <div
            key={row.customer}
            className="grid grid-cols-[1.15fr_0.95fr_0.75fr_0.85fr] items-center border-b border-[#f6f2ee] py-1.5 text-[#1c2434] last:border-b-0"
          >
            <span className="truncate pr-1">{row.customer}</span>
            <span className="truncate pr-1 text-slate-600">{row.product}</span>
            <span className="tabular-nums text-slate-700">{row.value}</span>
            <span>
              <StatusMark tone={row.tone}>{row.status}</StatusMark>
            </span>
          </div>
        ))}
      </div>
    </SoftCard>
  );
}
