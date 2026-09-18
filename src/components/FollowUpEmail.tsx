type FollowUpEmailProps = {
  email?: { subject: string; body: string };
  copied: boolean;
  disabled: boolean;
  onCopy: () => void;
};

export function FollowUpEmail({
  email,
  copied,
  disabled,
  onCopy,
}: FollowUpEmailProps) {
  return (
    <section className="panel">
      <h2>Personalized follow-up</h2>
      <p className="panel-intro">
        Mock-generated email the SDR can copy into an outbound tool. Content is
        produced from the lead fields on this page.
      </p>
      {email ? (
        <div className="email-box">
          <div className="email-meta">
            <div>
              <span className="stat-label">Subject</span>
              <strong>{email.subject}</strong>
            </div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onCopy}
              disabled={disabled}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="email-body">{email.body}</pre>
        </div>
      ) : (
        <p className="empty-state">No follow-up yet. Analyze a lead to generate one.</p>
      )}
    </section>
  );
}
