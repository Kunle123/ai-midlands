const beats = [
  "Understand enquiries",
  "Automate processes",
  "Assist customers",
  "Personalise outreach",
  "Connect systems",
] as const;

function Sweep() {
  return <span className="ai-sweep" aria-hidden="true" />;
}

function BeatOne() {
  return (
    <div className="hero-beat beat-one">
      <article className="app beat-mail">
        <div className="app-title"><span className="gmail-dot">M</span><strong>Inbox</strong><span className="time">10:24</span></div>
        <div className="mail-from"><span className="mail-avatar">S</span><div><strong>Sarah Mitchell</strong><span>Acme Ltd · to me</span></div></div>
        <h3>Installation enquiry</h3>
        <p>Hi, we're looking for someone to <mark>install</mark> equipment at our Birmingham site. Our budget is around <mark>£12,000</mark>.</p>
        <Sweep />
      </article>
      <span className="motion-arrow" aria-hidden="true">→</span>
      <article className="app sheet animated-sheet">
        <div className="sheet-bar"><span className="sheet-mark">▦</span><strong>Project pipeline</strong></div>
        <div className="mini-grid grid-head"><span>Customer</span><span>Product</span><span>Value</span><span>Status</span></div>
        <div className="mini-grid incoming"><b>Acme Ltd</b><span>Installation</span><span>£12,000</span><em>New</em></div>
        <div className="mini-grid existing r1"><b>Riverside Group</b><span>Support</span><span>£8,000</span><em>In progress</em></div>
        <div className="mini-grid existing r2"><b>Westbridge Co</b><span>Consultancy</span><span>£5,000</span><em>Won</em></div>
      </article>
    </div>
  );
}

function BeatTwo() {
  return (
    <div className="hero-beat beat-two">
      <article className="app system-card">
        <div className="app-title"><span className="cloud">●</span><strong>Customer record</strong></div>
        <h3>Acme Ltd</h3><small>Commercial Client</small>
        <dl className="compact-fields"><div><dt>Status</dt><dd><b className="pill green">Won</b></dd></div><div><dt>Value</dt><dd>£12,000</dd></div><div><dt>Next step</dt><dd className="next-step">Send invoice<span>Invoice INV-1042 created</span></dd></div></dl>
        <Sweep />
      </article>
      <div className="data-bridge"><span className="data-packet"><i/><i/><i/></span><span className="return-packet">INV-1042 ✓</span></div>
      <article className="app invoice build-invoice">
        <div className="app-title"><span className="invoice-mark">▤</span><strong>Invoice</strong><span className="pill green sent">Created</span></div>
        <div className="invoice-row"><div><h3>INV-1042</h3><small>Acme Ltd</small></div><strong className="invoice-amount">£12,000</strong></div>
        <div className="invoice-line"><span>Installation</span><span>£12,000</span></div><Sweep />
      </article>
    </div>
  );
}

function BeatThree() {
  return (
    <div className="hero-beat beat-three">
      <article className="app assistant conversation">
        <div className="app-title"><span className="chat-mark">□</span><strong>Website assistant</strong><span className="online"><span className="led"/>Online</span></div>
        <div className="bubble customer">Do you install in Birmingham?</div><Sweep />
        <div className="bubble answer reveal-answer">Yes. We're Midlands based and cover Birmingham. Would you like to arrange a call?</div>
        <button className="book animated-book" type="button">Book a call</button><div className="call-confirm">✓ Call request received</div>
      </article>
      <div className="data-bridge"><span className="data-packet"><i/><i/><i/></span></div>
      <article className="app crm lead-list">
        <div className="app-title"><span className="cloud">●</span><strong>CRM</strong></div>
        <div className="lead-row"><b>Acme Ltd</b><span>Commercial</span><em>Won</em></div>
        <div className="lead-row new-lead"><b>Birmingham enquiry</b><span>New lead</span><em>Call requested</em></div>
      </article>
    </div>
  );
}

function BeatFour() {
  return (
    <div className="hero-beat beat-four">
      <article className="app prospect">
        <div className="app-title"><span className="cloud">●</span><strong>CRM prospect</strong></div>
        <h3>Brightwell Engineering</h3><small>Manufacturing · Birmingham</small>
        <dl className="compact-fields"><div><dt>Contact</dt><dd>James Taylor</dd></div><div><dt>Interest</dt><dd>Workflow automation</dd></div><div><dt>Status</dt><dd className="outreach-status">Follow up<span>Email sent</span></dd></div></dl><Sweep />
      </article>
      <span className="motion-arrow" aria-hidden="true">→</span>
      <article className="app outreach">
        <div className="app-title"><span className="gmail-dot">M</span><strong>Draft email</strong><span className="draft-state">Draft</span></div>
        <div className="compose-line"><small>To</small><span>James Taylor</span></div><div className="compose-line"><small>Subject</small><b>Reducing repetitive admin at Brightwell</b></div>
        <p>Hi James, we help Midlands businesses connect existing systems and reduce repetitive admin...</p>
        <div className="approval-row"><button type="button">Approve &amp; send</button><small>Human approval</small></div><div className="sent-confirm">✓ Sent</div>
      </article>
    </div>
  );
}

function BeatFive() {
  return (
    <div className="hero-beat beat-five">
      <article className="app api-system">
        <div className="app-title"><span className="system-mark">▦</span><strong>Order system</strong><span className="pill amber">New order</span></div>
        <h3>Order #1847</h3><dl className="compact-fields"><div><dt>Customer</dt><dd>Acme Ltd</dd></div><div><dt>Product</dt><dd>Installation kit</dd></div><div><dt>Qty</dt><dd>4</dd></div></dl>
      </article>
      <div className="api-cable" aria-label="API connection">
        <span className="cable-left"/><span className="api-plug"/><span className="api-socket"/><span className="cable-right"/>
        <span className="api-label">API</span><span className="flow-dot d1"/><span className="flow-dot d2"/><span className="flow-dot d3"/>
      </div>
      <article className="app api-system operations">
        <div className="app-title"><span className="system-mark ops-mark">✓</span><strong>Operations</strong><span className="sync-state">Not connected</span></div>
        <div className="lead-row"><b>J-391</b><span>Riverside</span><em>Scheduled</em></div>
        <div className="lead-row new-job"><b>J-392</b><span>Acme Ltd · Qty 4</span><em>Ready</em></div>
      </article>
    </div>
  );
}


export function BusinessWorkspace() {
  return (
    <div className="workspace animated-workspace all-workflows" aria-label="AI Midlands business automation examples">
      <div className="workflow-grid">
        <div className="workflow-column workflow-column-primary">
          <section className="workflow-tile"><div className="beat-label"><span>01</span>{beats[0]}</div><BeatOne /></section>
          <section className="workflow-tile"><div className="beat-label"><span>03</span>{beats[2]}</div><BeatThree /></section>
        </div>
        <div className="workflow-column workflow-column-secondary">
          <section className="workflow-tile workflow-wide"><div className="beat-label"><span>05</span>{beats[4]}</div><BeatFive /></section>
          <section className="workflow-tile"><div className="beat-label"><span>04</span>{beats[3]}</div><BeatFour /></section>
        </div>
        <section className="workflow-tile workflow-centred"><div className="beat-label"><span>02</span>{beats[1]}</div><BeatTwo /></section>
      </div>
    </div>
  );
}
