import { FlowMark, MiniWindow, ScenarioLabel } from "./workspace";

function EnquiryMail() {
  return (
    <MiniWindow title="Inbox" className="min-w-0 flex-1">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f6f1eb] text-[#c2410c]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="2.5" width="12" height="9" rx="1.25" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1.5 3.5 L7 7.5 L12.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[13px] font-medium leading-tight text-slate-900">New email</p>
          <p className="mt-1 flex items-center gap-1.5 font-sans text-[12px] leading-tight text-slate-600">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-slate-400">
              <path d="M3 1.5 H7.2 L9.5 3.8 V10.5 H3 Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M7 1.6 V4 H9.3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            Customer Enquiry.pdf
          </p>
          <p className="mt-1.5 font-sans text-[11px] leading-tight text-slate-400">Acme Ltd</p>
        </div>
      </div>
    </MiniWindow>
  );
}

function ExtractedFields() {
  const rows = [
    ["Customer", "Acme Ltd"],
    ["Product", "Installation"],
    ["Value", "£12,000"],
  ];

  return (
    <MiniWindow title="Enquiry" className="min-w-0 flex-1">
      <dl className="space-y-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <dt className="font-sans text-[11px] text-slate-400">{label}</dt>
            <dd className="font-sans text-[12px] font-medium text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
    </MiniWindow>
  );
}

function EnquirySheet() {
  return (
    <MiniWindow title="Spreadsheet" className="min-w-0 flex-1">
      <div className="overflow-hidden rounded-md border border-[#ece7e0] font-sans text-[11px]">
        <div className="grid grid-cols-[16px_1.15fr_1.05fr_0.85fr] bg-[#faf8f5] text-slate-400">
          <span className="border-b border-r border-[#ece7e0]" />
          <span className="border-b border-r border-[#ece7e0] px-1.5 py-1">A</span>
          <span className="border-b border-r border-[#ece7e0] px-1.5 py-1">B</span>
          <span className="border-b border-[#ece7e0] px-1.5 py-1">C</span>
        </div>
        <div className="grid grid-cols-[16px_1.15fr_1.05fr_0.85fr] text-slate-500">
          <span className="border-b border-r border-[#ece7e0] px-1 py-1 text-center text-[10px]">1</span>
          <span className="whitespace-nowrap border-b border-r border-[#ece7e0] px-1.5 py-1">Customer</span>
          <span className="whitespace-nowrap border-b border-r border-[#ece7e0] px-1.5 py-1">Product</span>
          <span className="whitespace-nowrap border-b border-[#ece7e0] px-1.5 py-1">Value</span>
        </div>
        <div className="grid grid-cols-[16px_1.15fr_1.05fr_0.85fr] bg-[#fff6f1] font-medium text-slate-800">
          <span className="border-r border-[#f3ddd2] px-0.5 py-1 text-center text-[10px] font-normal text-[#c2410c]">2</span>
          <span className="whitespace-nowrap border-r border-[#f3ddd2] px-1.5 py-1">Acme Ltd</span>
          <span className="whitespace-nowrap border-r border-[#f3ddd2] px-1.5 py-1">Installation</span>
          <span className="whitespace-nowrap px-1.5 py-1 tabular-nums">£12,000</span>
        </div>
      </div>
    </MiniWindow>
  );
}

export function SpreadsheetScenario() {
  return (
    <div>
      <div className="flex flex-col gap-1 @min-[720px]:grid @min-[720px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] @min-[720px]:items-center @min-[720px]:gap-x-1">
        <EnquiryMail />
        <div className="flex justify-center @min-[720px]:items-center">
          <span className="@min-[720px]:hidden">
            <FlowMark direction="down" />
          </span>
          <span className="hidden @min-[720px]:block">
            <FlowMark />
          </span>
        </div>
        <ExtractedFields />
        <div className="flex justify-center @min-[720px]:items-center">
          <span className="@min-[720px]:hidden">
            <FlowMark direction="down" />
          </span>
          <span className="hidden @min-[720px]:block">
            <FlowMark />
          </span>
        </div>
        <EnquirySheet />
      </div>
      <ScenarioLabel>Automate spreadsheets and admin</ScenarioLabel>
    </div>
  );
}
