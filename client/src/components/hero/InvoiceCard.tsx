export function InvoiceCard() {
  return (
    <article className="app invoice">
      <div className="app-title">
        <span className="invoice-mark">▤</span>
        <strong>Invoice</strong>
        <span className="pill green sent">Sent</span>
      </div>
      <div className="invoice-row">
        <div>
          <h3>INV-1042</h3>
          <small>Acme Ltd</small>
        </div>
        <strong>£12,000</strong>
      </div>
    </article>
  );
}
