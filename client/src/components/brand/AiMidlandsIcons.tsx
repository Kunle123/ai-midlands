import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconShell({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

const ink = "currentColor";
const accent = "var(--aim-icon-accent, #c83927)";
const line = { stroke: ink, strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Node({ x, y, w = 5.5, h = 4.5, dark = false }: { x: number; y: number; w?: number; h?: number; dark?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx="1.2" fill={dark ? ink : "none"} stroke={ink} strokeWidth="1.35" />;
}

/** Incoming information → extraction → structured record. */
export function EnquiryIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.8} y={4.4} w={6.4} h={5.2} />
      <path d="M3.1 6.1 5 7.5l1.9-1.4" {...line} />
      <path d="M8.7 7h4.6" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11.2" cy="7" r="1.6" fill={accent} />
      <path d="M11.2 8.7v6.1" stroke={accent} strokeWidth="1.4" strokeDasharray="1.8 1.8" />
      <Node x={8.4} y={15.3} w={5.6} h={4.5} dark />
      <path d="M15.1 17.55h6.4" {...line} />
      <circle cx="20.6" cy="17.55" r="1.55" fill={accent} />
    </IconShell>
  );
}

/** Trigger → connected system → confirmed next action. */
export function WorkflowIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.8} y={4} w={5.8} h={5} />
      <Node x={16.4} y={15} w={5.8} h={5} dark />
      <path d="M7.6 6.5h4.1c2.9 0 5.2 2.3 5.2 5.2V15" {...line} />
      <circle cx="11.7" cy="6.5" r="1.75" fill={accent} />
      <path d="m14.7 12.6 2.2 2.4 2.2-2.4" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.7 12.2v5.2h7" stroke={ink} strokeWidth="1.15" strokeDasharray="2 2" strokeLinecap="round" />
    </IconShell>
  );
}

/** Question → useful answer → booked/recorded action. */
export function AssistantIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect x="1.8" y="3.7" width="7" height="6.1" rx="1.5" stroke={ink} strokeWidth="1.35" />
      <path d="M3.7 6.7h3.2" {...line} />
      <path d="M8.8 6.7h4.4" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11.2" cy="6.7" r="1.6" fill={accent} />
      <rect x="9.9" y="12" width="5.9" height="4.8" rx="1.2" fill={ink} />
      <path d="M15.8 14.4h3.8v4.2" {...line} />
      <path d="m18.1 17.1 1.5 1.5 2.6-3" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </IconShell>
  );
}

/** CRM context → approval gate → personalised send. */
export function OutreachIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.7} y={5} w={6} h={5} />
      <path d="M7.7 7.5h4.5" {...line} />
      <circle cx="11.4" cy="7.5" r="1.65" fill={accent} />
      <path d="M11.4 9.2v5.2" stroke={accent} strokeWidth="1.3" strokeDasharray="1.8 1.8" />
      <rect x="8.5" y="14.4" width="5.8" height="4.4" rx="1.2" stroke={ink} strokeWidth="1.35" />
      <path d="m9.7 15.8 1.7 1.3 1.7-1.3" {...line} />
      <path d="M14.3 16.6h4.5" {...line} />
      <path d="m17.1 14.9 1.7 1.7-1.7 1.7" stroke={accent} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="16.6" r="1.45" fill={accent} />
    </IconShell>
  );
}

/** Current process → assessment → recommended next step. */
export function AssessmentIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.8} y={4.4} w={5.8} h={5} />
      <path d="M7.6 6.9h4" {...line} />
      <circle cx="11.2" cy="6.9" r="1.7" fill={accent} />
      <path d="M11.2 8.7v5" stroke={accent} strokeWidth="1.3" strokeDasharray="1.7 1.7" />
      <rect x="8.3" y="14.1" width="5.8" height="5" rx="1.2" fill={ink} />
      <path d="M14.1 16.6h7" {...line} />
      <path d="m19.2 14.8 1.9 1.8-1.9 1.8" stroke={accent} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </IconShell>
  );
}

/** Automation flow with a deliberate human decision gate. */
export function ApprovalIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.7} y={7.2} w={5.4} h={4.5} />
      <path d="M7.1 9.45h4.2" {...line} />
      <rect x="10.8" y="6.2" width="5.5" height="6.5" rx="1.4" stroke={accent} strokeWidth="1.55" />
      <path d="m12.1 9.5 1.3 1.3 1.9-2.3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.3 9.45h4.1" {...line} />
      <circle cx="21.6" cy="9.45" r="1.55" fill={accent} />
      <path d="M13.55 12.7v5.4" stroke={ink} strokeWidth="1.1" strokeDasharray="1.8 1.8" />
    </IconShell>
  );
}

/** Visible data path with an explicit control point. */
export function ControlIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.8} y={4} w={5.4} h={4.5} />
      <path d="M7.2 6.25h9.5" {...line} />
      <circle cx="12" cy="6.25" r="1.65" fill={accent} />
      <Node x={16.8} y={4} w={5.4} h={4.5} />
      <path d="M12 7.9v5.1" stroke={accent} strokeWidth="1.25" strokeDasharray="1.8 1.8" />
      <rect x="8.6" y="13.2" width="6.8" height="6.3" rx="1.4" stroke={ink} strokeWidth="1.35" />
      <path d="M10.7 16.3h2.6" {...line} />
      <circle cx="13.8" cy="16.3" r="1.1" fill={accent} />
    </IconShell>
  );
}

/** Requested action → booked slot → confirmation. */
export function BookingIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.7} y={6.2} w={5.3} h={4.5} />
      <path d="M7 8.45h4.4" {...line} />
      <circle cx="10.8" cy="8.45" r="1.55" fill={accent} />
      <rect x="10" y="12.2" width="7.2" height="6.6" rx="1.3" stroke={ink} strokeWidth="1.35" />
      <path d="M11.4 14h4.4M12 11v2M15.2 11v2" {...line} />
      <path d="m13 16.1 1.1 1.1 1.8-2" stroke={accent} strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.2 15.5h4" {...line} />
    </IconShell>
  );
}

/** Two existing systems connected by a visible data path. */
export function IntegrationIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <Node x={1.6} y={5} w={6} h={5} />
      <Node x={16.4} y={14} w={6} h={5} dark />
      <path d="M7.6 7.5h4c3 0 5.4 2.4 5.4 5.4V14" {...line} />
      <circle cx="11.6" cy="7.5" r="1.7" fill={accent} />
      <circle cx="17" cy="12.9" r="1.55" fill={accent} />
      <path d="M7.8 17.3h5.4" stroke={ink} strokeWidth="1.15" strokeDasharray="2 2" strokeLinecap="round" />
    </IconShell>
  );
}

/** A bounded piece of work with a clear commercial edge. */
export function ScopeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M3.2 6.1h5.5M3.2 9.4h4" {...line} />
      <path d="M9.6 4.6h5.8v6.2H9.6z" stroke={ink} strokeWidth="1.35" />
      <circle cx="12.5" cy="7.7" r="1.55" fill={accent} />
      <path d="M12.5 10.8v4.1" stroke={accent} strokeWidth="1.25" strokeDasharray="1.7 1.7" />
      <path d="M7.4 15.2h10.2v4.6H7.4z" stroke={ink} strokeWidth="1.35" />
      <path d="M9.2 17.5h5.5" {...line} />
      <circle cx="17.8" cy="17.5" r="1.45" fill={accent} />
    </IconShell>
  );
}

export function AimArrow(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M4 12h13" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <path d="m13.5 7.5 4.5 4.5-4.5 4.5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
