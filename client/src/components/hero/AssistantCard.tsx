export function AssistantCard() {
  return (
    <article className="app assistant">
      <div className="app-title">
        <span className="chat-mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2.2h10v7.2H7.2L4.4 12V9.4H2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </span>
        <strong>Website assistant</strong>
        <span className="online">
          <span className="led" aria-hidden="true" />
          Online
        </span>
      </div>
      <div className="bubble customer">Do you install in Birmingham?</div>
      <div className="answer-row">
        <span className="mini-am">AM</span>
        <div className="bubble answer">
          Yes. We&apos;re Midlands based
          <br />
          and cover Birmingham.
          <br />
          Would you like to arrange a call?
        </div>
      </div>
      <button className="book" type="button">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <rect x="1.4" y="2.2" width="10.2" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
          <path d="M1.4 5h10.2M4 1.2v2.2M9 1.2v2.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        Book a call
      </button>
    </article>
  );
}
