export function CustomerRecord() {
  return (
    <article className="app crm">
      <div className="app-title">
        <span className="cloud">☁</span>
        <strong>Customer record</strong>
      </div>
      <div className="crm-grid">
        <div>
          <h3>Acme Ltd</h3>
          <small>Commercial Client</small>
          <div className="ghost" />
          <div className="ghost short" />
        </div>
        <div className="crm-fields">
          <span>Status</span>
          <b className="pill green">Won</b>
          <span>Value</span>
          <strong>£12,000</strong>
          <span>Next step</span>
          <small>Send invoice</small>
        </div>
      </div>
    </article>
  );
}
