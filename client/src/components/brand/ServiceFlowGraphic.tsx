type ServiceFlowVariant = "enquiry" | "workflow" | "assistant" | "outreach";

type Props = {
  variant: ServiceFlowVariant;
  className?: string;
};

const NAVY = "#0f172b";
const RED = "#c83927";
const INK = "#536176";
const BORDER = "#d8d0c8";
const SOFT = "#f7f3ee";

function Arrow({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x} 34h15`} stroke={RED} strokeWidth="2.4" strokeLinecap="round" />
      <path d={`m${x + 10} 29 6 5-6 5`} fill="none" stroke={RED} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Enquiry() {
  return (
    <svg viewBox="0 0 184 72" className="w-full h-auto overflow-visible" role="img" aria-label="Enquiry received, AI understands it, and a structured CRM record is saved">
      <g>
        <rect x="1" y="17" width="48" height="39" rx="9" fill="#fff" stroke={BORDER} />
        <path d="M8 26h34v24H8z" fill={SOFT} stroke={INK} strokeWidth="1.7" />
        <path d="m8 27 17 13 17-13" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 18h21l7 6H14z" fill="#fff" stroke={BORDER} />
        <path d="M18 21h14M18 24h10" stroke="#8b98a9" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="43" cy="20" r="5" fill={RED} /><circle cx="43" cy="20" r="1.4" fill="#fff" />
      </g>
      <Arrow x={51} />
      <g>
        <rect x="69" y="9" width="49" height="53" rx="11" fill={NAVY} />
        <path d="M85 25c-5-4-3-11 3-11 2-5 10-5 12 0 6 0 8 7 4 11 4 5 0 11-6 10-2 5-10 5-12 0-6 1-10-5-6-10Z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 16v18M84 23h5M96 21h7M87 30h4M98 29h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="79" cy="48" r="3" fill={RED} />
        <path d="M87 45h21M87 51h16" stroke="#8fa0b7" strokeWidth="2" strokeLinecap="round" />
      </g>
      <Arrow x={120} />
      <g>
        <rect x="138" y="15" width="45" height="43" rx="9" fill="#fff" stroke={BORDER} />
        <circle cx="150" cy="29" r="6" fill="#dbe1e8" /><circle cx="150" cy="27" r="2.4" fill={INK} /><path d="M145 34c1-5 9-5 10 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M160 25h15M160 31h11M145 42h18M145 48h12" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="173" cy="44" rx="7" ry="3" fill={NAVY} /><path d="M166 44v8c0 1.8 3.1 3 7 3s7-1.2 7-3v-8" fill={NAVY} /><path d="M166 48c0 1.8 3.1 3 7 3s7-1.2 7-3" stroke="#fff" strokeWidth="1" fill="none" />
        <circle cx="178" cy="55" r="5.5" fill={RED} /><path d="m175.5 55 1.7 1.8 3.1-3.5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Workflow() {
  return (
    <svg viewBox="0 0 184 72" className="w-full h-auto overflow-visible" role="img" aria-label="CRM record updated, automation triggered, invoice created and sent">
      <g>
        <rect x="1" y="15" width="45" height="43" rx="9" fill="#fff" stroke={BORDER} />
        <circle cx="13" cy="28" r="6" fill="#dbe1e8" /><circle cx="13" cy="26" r="2.4" fill={INK} /><path d="M8 33c1-5 9-5 10 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M23 24h15M23 30h11M9 41h27M9 48h18" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
        <text x="23" y="56" textAnchor="middle" fontSize="5.5" fontWeight="700" fill={INK}>CRM</text>
      </g>
      <Arrow x={49} />
      <g>
        <rect x="68" y="9" width="49" height="53" rx="11" fill={NAVY} />
        <circle cx="92.5" cy="35" r="10" fill="#fff" />
        <circle cx="92.5" cy="35" r="4.2" fill={NAVY} />
        <path d="M92.5 20v5M92.5 45v5M77.5 35h5M102.5 35h5M81.8 24.3l3.5 3.5M99.7 42.2l3.5 3.5M103.2 24.3l-3.5 3.5M85.3 42.2l-3.5 3.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="78" cy="50" r="3" fill={RED} /><circle cx="106" cy="50" r="3" fill="#687890" />
      </g>
      <Arrow x={120} />
      <g>
        <path d="M139 12h34l10 10v38h-44Z" fill="#fff" stroke={BORDER} />
        <path d="M173 12v11h10" fill="none" stroke={BORDER} />
        <path d="M148 29h25M148 36h21M148 43h17" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        <text x="153" y="55" fontSize="9" fontWeight="700" fill={NAVY}>£</text>
        <circle cx="178" cy="55" r="6" fill={RED} /><path d="M175 55h5M178 52l3 3-3 3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Assistant() {
  return (
    <svg viewBox="0 0 184 72" className="w-full h-auto overflow-visible" role="img" aria-label="Customer asks a question, AI assistant responds, and a call is booked in the calendar">
      <g>
        <path d="M2 17h42a8 8 0 0 1 8 8v17a8 8 0 0 1-8 8H24l-9 8v-8H10a8 8 0 0 1-8-8Z" fill="#fff" stroke={BORDER} />
        <circle cx="14" cy="30" r="6" fill={INK} /><circle cx="14" cy="28" r="2" fill="#fff" /><path d="M10 35c1-4 7-4 8 0" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M25 27h18M25 34h13" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="17" cy="47" r="1.5" fill="#aaa39c" /><circle cx="23" cy="47" r="1.5" fill="#aaa39c" /><circle cx="29" cy="47" r="1.5" fill="#aaa39c" />
      </g>
      <Arrow x={54} />
      <g>
        <rect x="73" y="8" width="47" height="54" rx="11" fill={NAVY} />
        <path d="M96.5 19v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="96.5" cy="17" r="2.2" fill={RED} />
        <rect x="82" y="26" width="29" height="23" rx="8" fill="#fff" />
        <circle cx="90" cy="36" r="2" fill={NAVY} /><circle cx="103" cy="36" r="2" fill={NAVY} /><path d="M90 42c4 3 9 3 13 0" stroke={NAVY} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M86 26v-5M107 26v-5M87 52h19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>
      <Arrow x={122} />
      <g>
        <rect x="141" y="14" width="42" height="45" rx="9" fill="#fff" stroke={BORDER} />
        <path d="M147 25h30M151 18v10M174 18v10" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M149 32h7v7h-7zM160 32h7v7h-7zM171 32h7v7h-7zM149 43h7v7h-7zM160 43h7v7h-7z" fill="#eee8e2" />
        <rect x="170" y="42" width="9" height="9" rx="2" fill={RED} /><path d="m172 46 2 2 3-4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Outreach() {
  return (
    <svg viewBox="0 0 184 72" className="w-full h-auto overflow-visible" role="img" aria-label="Prospect context from CRM becomes a personalised email draft that is reviewed and sent">
      <g>
        <rect x="1" y="15" width="45" height="43" rx="9" fill="#fff" stroke={BORDER} />
        <circle cx="14" cy="28" r="6" fill="#dbe1e8" /><circle cx="14" cy="26" r="2.4" fill={INK} /><path d="M9 33c1-5 9-5 10 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25 24h14M25 30h10M8 42h29M8 49h19" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
        <rect x="31" y="38" width="8" height="13" rx="1.5" fill="#9aa7b8" /><path d="M33 41h1M36 41h1M33 44h1M36 44h1" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </g>
      <Arrow x={49} />
      <g>
        <rect x="69" y="9" width="49" height="53" rx="11" fill={NAVY} />
        <path d="M79 22h29v18H79z" fill="none" stroke="#fff" strokeWidth="1.8" /><path d="m79 23 14.5 11L108 23" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="79" cy="50" r="3" fill={RED} /><circle cx="87" cy="50" r="3" fill="#6f8097" />
        <path d="M94 48h14M94 53h10" stroke="#8fa0b7" strokeWidth="1.7" strokeLinecap="round" />
      </g>
      <Arrow x={120} />
      <g>
        <circle cx="161" cy="35" r="22" fill="#fff" stroke={BORDER} />
        <path d="m148 36 26-11-9 25-5-10-12-4Z" fill={RED} /><path d="m160 40 6-8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M143 47h7" stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
      </g>
    </svg>
  );
}

export function ServiceFlowGraphic({ variant, className = "" }: Props) {
  return (
    <div className={`w-[184px] max-w-full ${className}`} aria-hidden="true">
      {variant === "enquiry" && <Enquiry />}
      {variant === "workflow" && <Workflow />}
      {variant === "assistant" && <Assistant />}
      {variant === "outreach" && <Outreach />}
    </div>
  );
}
