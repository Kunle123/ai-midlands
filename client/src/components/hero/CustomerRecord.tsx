export function CustomerRecord() {
  return (
    <article className="app crm">
      <div className="app-title">
        <span className="cloud" aria-hidden="true">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M5.2 11.2h6.2c1.8 0 3.2-1.3 3.2-3 0-1.5-1.1-2.8-2.6-3.1C11.6 2.6 9.8 1.2 7.6 1.2 5.2 1.2 3.3 3 3.2 5.3 1.6 5.5.6 6.8.6 8.4c0 1.5 1.2 2.8 2.8 2.8h1.8Z" />
          </svg>
        </span>
        <strong>Customer record</strong>
      </div>
      <div className="record-head">
        <span className="record-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.2 14V6.4L8 2.4l5.8 4V14H9.4V9.2H6.6V14Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h3>Acme Ltd</h3>
          <small>Commercial Client</small>
        </div>
      </div>
      <dl className="crm-fields">
        <div>
          <dt>Status</dt>
          <dd>
            <b className="pill green">Won</b>
          </dd>
        </div>
        <div>
          <dt>Value</dt>
          <dd>
            <strong>£12,000</strong>
          </dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>Send invoice</dd>
        </div>
      </dl>
    </article>
  );
}
