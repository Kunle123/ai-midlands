export function InvoiceCard() {
  return (
    <article className="app invoice">
      <div className="app-title">
        <span className="invoice-mark" aria-hidden="true">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M2.2 1.2h6.2L12 4.8v9.8H2.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8.2 1.4V5h3.6M4 8.2h6M4 10.6h4.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </span>
        <strong>Invoice</strong>
        <span className="pill green sent">Sent</span>
      </div>
      <div className="invoice-row">
        <div>
          <h3>INV-1042</h3>
          <small>Acme Ltd</small>
        </div>
        <strong className="invoice-amount">£12,000</strong>
      </div>
      <div className="invoice-line">
        <span>Installation</span>
        <span>£12,000</span>
      </div>
    </article>
  );
}
