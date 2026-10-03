export function AssistantCard() {
  return (
    <article className="app assistant">
      <div className="app-title">
        <span className="chat-mark">▣</span>
        <strong>Website assistant</strong>
        <span className="online">
          Online&nbsp; <span className="led">●</span>
        </span>
      </div>
      <div className="bubble customer">Do you install in Birmingham?</div>
      <div className="answer-row">
        <span className="mini-am">AM</span>
        <div className="bubble answer">
          Yes. We're Midlands based
          <br />
          and cover Birmingham.
          <br />
          Would you like to arrange a call?
        </div>
      </div>
      <button className="book" type="button">
        ▣ &nbsp; Book a call
      </button>
    </article>
  );
}
