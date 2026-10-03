export function EmailCard() {
  return (
    <article className="app mail">
      <div className="app-title">
        <span className="gmail-mark">M</span>
        <strong>New email</strong>
        <span className="time">10:24</span>
      </div>
      <h3>Customer Enquiry</h3>
      <p>
        Please find our requirements
        <br />
        for installation attached...
      </p>
      <div className="attachment">
        <span className="pdf">PDF</span>
        <span>
          <strong>Customer Enquiry.pdf</strong>
          <small>324 KB</small>
        </span>
      </div>
    </article>
  );
}
