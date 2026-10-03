export function SpreadsheetCard() {
  return (
    <article className="app sheet">
      <div className="app-title">
        <span className="sheet-mark">▦</span>
        <strong>Project pipeline</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Acme Ltd</td>
            <td>Installation</td>
            <td>£12,000</td>
            <td>
              <span className="pill blue">New</span>
            </td>
          </tr>
          <tr>
            <td>Riverside Group</td>
            <td>Support</td>
            <td>£8,000</td>
            <td>
              <span className="pill amber">In progress</span>
            </td>
          </tr>
          <tr>
            <td>Westbridge Co</td>
            <td>Consultancy</td>
            <td>£5,000</td>
            <td>
              <span className="pill green">Won</span>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
