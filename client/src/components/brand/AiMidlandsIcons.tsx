import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconShell({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const ink = {
  stroke: "currentColor",
  strokeWidth: 1.65,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const accent = "var(--aim-icon-accent, #e85d2a)";

/** Incoming information being understood and turned into structured work. */
export function EnquiryIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3" y="5" width="12" height="10" rx="2.5" {...ink} />
      <path d="m4.5 7 4.5 3.7L13.5 7" {...ink} />
      <path d="M16 9.5h4M18 7.5v4" stroke={accent} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M9 18.5h8" {...ink} />
      <circle cx="19" cy="18.5" r="2" fill={accent} />
    </IconShell>
  );
}

/** A business event moving reliably between connected systems. */
export function WorkflowIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="2.5" y="4" width="6" height="5.5" rx="1.8" {...ink} />
      <rect x="15.5" y="14.5" width="6" height="5.5" rx="1.8" {...ink} />
      <path d="M8.5 6.75h4.25c2.1 0 3.8 1.7 3.8 3.8v4" {...ink} />
      <path d="m14.5 12.5 2.05 2.05 2.05-2.05" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.2" cy="6.75" r="1.8" fill={accent} />
    </IconShell>
  );
}

/** A useful assistant that understands a conversation and can take action. */
export function AssistantIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 5.5h11a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-4 3v-3.7a3 3 0 0 1-1-2.3v-4a3 3 0 0 1 3-3Z" {...ink} />
      <path d="M8 10h5" {...ink} />
      <path d="M18.5 4v3M17 5.5h3" stroke={accent} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="14.8" cy="12.5" r="1.5" fill={accent} />
    </IconShell>
  );
}

/** Personalised outreach with a deliberate human approval point. */
export function OutreachIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M3.5 6.5h10v8h-10z" {...ink} />
      <path d="m4.5 8 4 3 4-3" {...ink} />
      <path d="M15.5 9.5h5v8h-5" {...ink} />
      <path d="m16.7 14.7 1.35 1.35 2.6-3" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="18.5" r="1.8" fill={accent} />
      <path d="M7.8 18.5h5.2" {...ink} />
    </IconShell>
  );
}

/** One-process assessment: inspect the current work before designing automation. */
export function AssessmentIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="5" y="3.5" width="12" height="17" rx="2.4" {...ink} />
      <path d="M8 7h6M8 10.5h4.5M8 14h3" {...ink} />
      <circle cx="16.7" cy="15.8" r="3.1" stroke={accent} strokeWidth="1.8" />
      <path d="m19 18.1 2 2" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    </IconShell>
  );
}

/** Human control and approval in the automation flow. */
export function ApprovalIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M5 12.2 9.2 16 19 6.2" {...ink} />
      <path d="M4 4h10a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H9a5 5 0 0 1-5-5Z" {...ink} />
      <circle cx="18.8" cy="5.2" r="2.2" fill={accent} />
    </IconShell>
  );
}

/** Security without black-boxing the flow. */
export function ControlIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M12 2.8 19 5.6v5.6c0 4.4-2.8 7.7-7 10-4.2-2.3-7-5.6-7-10V5.6Z" {...ink} />
      <path d="M9.5 11.5h5v4h-5z" {...ink} />
      <path d="M10.5 11.5V10a1.5 1.5 0 0 1 3 0v1.5" {...ink} />
      <circle cx="17.6" cy="7" r="1.7" fill={accent} />
    </IconShell>
  );
}

/** Calendar / booked next action, tied back into the business process. */
export function BookingIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="3.5" y="5.5" width="14" height="14" rx="2.4" {...ink} />
      <path d="M7 3.5v4M14 3.5v4M3.5 9h14" {...ink} />
      <path d="m8 14 2 2 4-4" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 12h2v5h-2" {...ink} />
    </IconShell>
  );
}

/** Connected systems / API integration. */
export function IntegrationIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="2.5" y="4.5" width="6" height="6" rx="1.8" {...ink} />
      <rect x="15.5" y="13.5" width="6" height="6" rx="1.8" {...ink} />
      <path d="M8.5 7.5h4a4 4 0 0 1 4 4v2" {...ink} />
      <path d="M10 16.5H7.5a4 4 0 0 1-4-4v-2" {...ink} />
      <circle cx="12.5" cy="7.5" r="1.8" fill={accent} />
      <circle cx="10" cy="16.5" r="1.8" fill={accent} />
    </IconShell>
  );
}

/** Pricing / commercial scope, specific to bounded automation work. */
export function ScopeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="4" y="4" width="13" height="16" rx="2.4" {...ink} />
      <path d="M8 8h5M8 11h5M8 15h2.5" {...ink} />
      <circle cx="18.5" cy="15.5" r="3" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M18.5 13.8v3.4M17.4 14.5h1.6c.8 0 1.2.3 1.2.8s-.4.8-1.2.8h-1.1" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
    </IconShell>
  );
}

/** Small functional arrow styled to match the family. */
export function AimArrow(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 12h13" {...ink} />
      <path d="m13.5 7.5 4.5 4.5-4.5 4.5" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </IconShell>
  );
}

export const AiMidlandsIcons = {
  enquiry: EnquiryIcon,
  workflow: WorkflowIcon,
  assistant: AssistantIcon,
  outreach: OutreachIcon,
  assessment: AssessmentIcon,
  approval: ApprovalIcon,
  control: ControlIcon,
  booking: BookingIcon,
  integration: IntegrationIcon,
  scope: ScopeIcon,
};
