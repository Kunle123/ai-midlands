import { useEffect, useState } from "react";

const zones = ["Sales", "Project Office", "Customer Service", "Finance", "Engineering"] as const;

function Person({ standing = false }: { standing?: boolean }) {
  return (
    <div className={`office-person ${standing ? "is-standing" : ""}`} aria-hidden="true">
      <span className="person-head" />
      <span className="person-body" />
      <span className="person-arm arm-left" />
      <span className="person-arm arm-right" />
    </div>
  );
}

function Monitor({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`office-monitor ${wide ? "is-wide" : ""}`}>
      <div className="monitor-screen">{children}</div>
      <span className="monitor-neck" />
      <span className="monitor-foot" />
    </div>
  );
}

function SalesScreen() {
  return (
    <div className="office-ui sales-ui">
      <div className="ui-bar"><b>Inbox</b><span>10:24</span></div>
      <div className="ui-split">
        <div className="mail-pane">
          <small>Sarah Mitchell · Acme Ltd</small>
          <strong>Installation enquiry</strong>
          <p>Install equipment at our Birmingham site. Budget around <mark>£12,000</mark>.</p>
        </div>
        <div className="pipeline-pane">
          <small>Project pipeline</small>
          <div className="ui-row ui-head"><span>Customer</span><span>Value</span><span>Status</span></div>
          <div className="ui-row result-row"><b>Acme Ltd</b><span>£12,000</span><em>New</em></div>
        </div>
      </div>
      <span className="office-scan" aria-hidden="true" />
    </div>
  );
}

function ProjectScreen() {
  return (
    <div className="office-ui project-ui">
      <div className="ui-bar"><b>Delivery tracker</b><span>Today</span></div>
      <div className="project-title">Acme Ltd · Installation</div>
      <div className="project-line"><span>Owner</span><b>Sarah</b></div>
      <div className="project-line"><span>Start date</span><b>Monday</b></div>
      <div className="project-line project-action"><span>Follow-up</span><b>Created ✓</b></div>
      <span className="office-scan" aria-hidden="true" />
    </div>
  );
}

function SupportScreen() {
  return (
    <div className="office-ui support-ui">
      <div className="ui-bar"><b>Website assistant</b><span className="online-dot">● Online</span></div>
      <div className="chat-bubble customer-bubble">Do you install in Birmingham?</div>
      <div className="chat-bubble answer-bubble">Yes. We’re Midlands based and cover Birmingham. Would you like to arrange a call?</div>
      <button type="button" className="screen-button">Book a call</button>
      <div className="screen-confirm">Call request received ✓</div>
      <span className="office-scan" aria-hidden="true" />
    </div>
  );
}

function FinanceScreen() {
  return (
    <div className="office-ui finance-ui">
      <div className="ui-bar"><b>Acme Ltd</b><span className="won-pill">Won</span></div>
      <div className="finance-grid">
        <div><small>Value</small><strong>£12,000</strong></div>
        <div><small>Next step</small><strong className="finance-next">Send invoice</strong></div>
      </div>
      <div className="invoice-preview">
        <small>Invoice</small>
        <b>INV-1042</b>
        <strong>£12,000</strong>
        <span>Created ✓</span>
      </div>
      <span className="office-scan" aria-hidden="true" />
    </div>
  );
}

function EngineeringScreen() {
  return (
    <div className="office-ui engineering-ui">
      <div className="engineering-panel">
        <small>Order system</small>
        <b>Order #1847</b>
        <span>Acme Ltd</span>
        <span>Installation kit · Qty 4</span>
      </div>
      <div className="system-flow" aria-hidden="true"><i /><i /><i /></div>
      <div className="engineering-panel operations-panel">
        <small>Operations</small>
        <b>J-392</b>
        <span>Acme Ltd · Qty 4</span>
        <em>Ready ✓</em>
      </div>
      <span className="office-scan" aria-hidden="true" />
    </div>
  );
}

function DeskZone({
  index,
  label,
  className,
  active,
  standing = false,
  wideMonitor = false,
  children,
}: {
  index: number;
  label: string;
  className: string;
  active: boolean;
  standing?: boolean;
  wideMonitor?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`desk-zone ${className} ${active ? "is-active" : "is-idle"}`} aria-label={label}>
      <div className="zone-label"><span>{String(index + 1).padStart(2, "0")}</span>{label}</div>
      <div className={`desk-rig ${standing ? "standing-rig" : ""}`}>
        <div className="desk-surface" />
        <div className="desk-leg leg-a" />
        <div className="desk-leg leg-b" />
        <Monitor wide={wideMonitor}>{children}</Monitor>
        <Person standing={standing} />
        {!standing && <div className="office-chair" aria-hidden="true" />}
      </div>
    </section>
  );
}

export function BusinessWorkspace() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % zones.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`office-stage camera-${active}`} aria-label="AI Midlands open-plan office automation demonstration">
      <div className="office-world">
        <div className="office-back-wall" />
        <div className="office-floor" />
        <div className="glass-partition" aria-hidden="true" />
        <div className="office-light light-a" aria-hidden="true" />
        <div className="office-light light-b" aria-hidden="true" />
        <div className="office-plant plant-a" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="office-plant plant-b" aria-hidden="true"><i /><i /><i /></div>

        <DeskZone index={0} label="Sales" className="zone-sales" active={active === 0} wideMonitor>
          <SalesScreen />
        </DeskZone>

        <DeskZone index={1} label="Project Office" className="zone-project" active={active === 1} standing>
          <ProjectScreen />
        </DeskZone>
        <div className="office-whiteboard" aria-hidden="true">
          <span>Plan</span><i>→</i><span>Deliver</span><i>→</i><span>Complete</span>
          <small>Site survey · Installation · Handover</small>
        </div>

        <DeskZone index={2} label="Customer Service" className="zone-support" active={active === 2}>
          <SupportScreen />
        </DeskZone>

        <DeskZone index={3} label="Finance" className="zone-finance" active={active === 3}>
          <FinanceScreen />
        </DeskZone>

        <DeskZone index={4} label="Engineering" className="zone-engineering" active={active === 4} wideMonitor>
          <EngineeringScreen />
        </DeskZone>
      </div>

      <div className="office-progress" aria-hidden="true">
        {zones.map((zone, index) => <span key={zone} className={index === active ? "active" : ""} />)}
      </div>
    </div>
  );
}
