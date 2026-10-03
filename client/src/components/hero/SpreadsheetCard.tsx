const rows = [
  ["Acme Ltd", "Installation", "£12,000", "New", "blue"],
  ["Riverside Group", "Support", "£8,000", "In progress", "amber"],
  ["Westbridge Co", "Consultancy", "£5,000", "Won", "green"],
] as const;

export function SpreadsheetCard() {
  return (
    <article className="app sheet">
      <div className="sheet-bar">
        <span className="sheet-mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 5h12M1 9h12M5 1v12M9 1v12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <strong>Project pipeline</strong>
      </div>
      <table>
        <colgroup>
          <col className="row-gutter" />
          <col className="col-customer" />
          <col className="col-product" />
          <col className="col-value" />
          <col className="col-status" />
        </colgroup>
        <thead>
          <tr className="sheet-letters">
            <th className="row-gutter" />
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
          </tr>
          <tr>
            <th className="row-gutter">1</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className="sheet-row" key={row[0]}>
              <td className="row-gutter">{index + 2}</td>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td className="num">{row[2]}</td>
              <td>
                <span className={`pill ${row[4]}`}>{row[3]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
