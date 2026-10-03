import { SoftCard } from "./workspace";

function MailMark() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
      <path d="M1 2.2 L6.2 7.2 L1 11.2 Z" fill="#34a853" />
      <path d="M17 2.2 L11.8 7.2 L17 11.2 Z" fill="#4285f4" />
      <path d="M1.4 1.4 H6.4 L9 4.6 L6.8 7.2 L1.4 2.6 Z" fill="#ea4335" />
      <path d="M16.6 1.4 H11.6 L9 4.6 L11.2 7.2 L16.6 2.6 Z" fill="#c5221f" />
      <path d="M6.8 7.6 L9 5.2 L11.2 7.6 L9 12.2 Z" fill="#fbbc04" />
    </svg>
  );
}

function PdfMark() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" className="shrink-0">
      <path d="M3 1.5 H13.2 L19.5 7.8 V24.5 H3 Z" fill="#fff5f4" stroke="#e4584a" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M13 1.8 V8 H19.2" fill="none" stroke="#e4584a" strokeWidth="1.2" strokeLinejoin="round" />
      <text x="11" y="18" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#d93025" fontFamily="Inter, sans-serif">
        PDF
      </text>
    </svg>
  );
}

export function MailInterface() {
  return (
    <SoftCard className="px-3.5 py-3">
      <div className="flex items-center gap-2">
        <MailMark />
        <p className="font-sans text-[13px] font-semibold text-[#1c2434]">New email</p>
        <p className="ml-auto font-sans text-[11px] text-slate-400">10:24</p>
      </div>
      <p className="mt-3 font-sans text-[13px] font-semibold leading-tight text-[#1c2434]">Customer Enquiry</p>
      <p className="mt-1 font-sans text-[12px] leading-snug text-slate-500">
        Please find our requirements
        <br />
        for installation attached...
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f7f5f2] px-2 py-1.5">
        <PdfMark />
        <div className="min-w-0">
          <p className="truncate font-sans text-[12px] font-medium text-[#1c2434]">Customer Enquiry.pdf</p>
          <p className="font-sans text-[10px] text-slate-400">324 KB</p>
        </div>
      </div>
    </SoftCard>
  );
}
