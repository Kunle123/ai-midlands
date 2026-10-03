function MailMark() {
  return (
    <svg className="gmail-mark" width="20" height="15" viewBox="0 0 24 18" aria-hidden="true">
      <path fill="#4285F4" d="M22 5.2v9.1c0 .9-.7 1.6-1.6 1.6h-2.3V8.6L12 12.6 5.9 8.6v7.3H3.6C2.7 15.9 2 15.2 2 14.3V5.2l10 6.8z" />
      <path fill="#34A853" d="M2 5.2 5.9 8.6V3.1L3.7 2.4C2.7 2 2 2.8 2 3.9v1.3z" />
      <path fill="#FBBC05" d="M22 5.2V3.9c0-1.1-.7-1.9-1.7-1.5L18.1 3.1v5.5L22 5.2z" />
      <path fill="#EA4335" d="M18.1 3.1v5.5L12 12.6 5.9 8.6V3.1L12 7.6z" />
    </svg>
  );
}

function PdfMark() {
  return (
    <svg className="pdf" width="28" height="32" viewBox="0 0 28 32" aria-hidden="true">
      <path d="M4 1.5h12.2L24 9.2V30.5H4Z" fill="#fff" stroke="#e24b3c" strokeWidth="1.2" />
      <path d="M16 1.8V9.2H23.4" fill="#fdeceb" stroke="#e24b3c" strokeWidth="1.2" />
      <text x="14" y="22" textAnchor="middle" fontSize="7" fontWeight="700" fill="#d93025" fontFamily="Inter, sans-serif">
        PDF
      </text>
    </svg>
  );
}

export function EmailCard() {
  return (
    <article className="app mail">
      <div className="app-title">
        <MailMark />
        <strong>Inbox</strong>
        <span className="time">10:24</span>
      </div>
      <div className="mail-from">
        <span className="mail-avatar" aria-hidden="true">
          A
        </span>
        <div>
          <strong>Acme Ltd</strong>
          <span>to me</span>
        </div>
      </div>
      <h3>Customer Enquiry</h3>
      <p>
        Please find our requirements
        <br />
        for installation attached...
      </p>
      <div className="attachment">
        <PdfMark />
        <span>
          <strong>Customer Enquiry.pdf</strong>
          <small>324 KB</small>
        </span>
      </div>
    </article>
  );
}
