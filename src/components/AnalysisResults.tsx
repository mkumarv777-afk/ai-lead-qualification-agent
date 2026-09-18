import type { LeadRecord } from "@/lib/types";

type AnalysisResultsProps = {
  lead?: LeadRecord;
  analyzing: boolean;
};

export function AnalysisResults({ lead, analyzing }: AnalysisResultsProps) {
  const analysis = lead?.analysis;

  return (
    <section className="panel analysis-panel">
      <div className="analysis-head">
        <div>
          <div className="kicker">Qualification output</div>
          <h2>AI analysis</h2>
          <p className="panel-intro">
            {analyzing
              ? "Scoring the opportunity and drafting a follow-up…"
              : analysis
                ? `${lead?.name} · ${lead?.company}`
                : "Submit a lead to generate a score, priority, and next action."}
          </p>
        </div>
      </div>

      {analyzing && !analysis ? (
        <p className="empty-state">Running mock qualification model…</p>
      ) : null}

      {analysis ? (
        <>
          <div className="analysis-spotlight">
            <div
              className="score-ring"
              style={{ ["--score" as string]: analysis.score }}
              aria-label={`Lead score ${analysis.score} of 100`}
            >
              <div className="score-ring-inner">
                <strong>{analysis.score}</strong>
                <span>of 100</span>
              </div>
            </div>
            <div className="analysis-meta">
              <div>
                <div className="stat-label">Priority</div>
                <span className={`badge badge-lg badge-${analysis.priority.toLowerCase()}`}>
                  {analysis.priority}
                </span>
              </div>
              <div>
                <div className="stat-label">Suggested follow-up</div>
                <p className="analysis-date">{analysis.suggestedFollowUpDate}</p>
              </div>
              <div className="score-track" aria-hidden="true">
                <span style={{ width: `${analysis.score}%` }} />
              </div>
            </div>
          </div>

          <div className="result-block result-block-action">
            <h3>Recommended next action</h3>
            <p>{analysis.recommendedNextAction}</p>
          </div>

          {analysis.bant ? (
            <div className="bant-summary" aria-label="BANT qualification">
              <div className="stat-label">BANT qualification</div>
              <div className="bant-grid">
                {(
                  [
                    ["Budget", analysis.bant.budget],
                    ["Authority", analysis.bant.authority],
                    ["Need", analysis.bant.need],
                    ["Timeline", analysis.bant.timeline],
                  ] as const
                ).map(([label, dimension]) => (
                  <div
                    className={`bant-item bant-${dimension.status.toLowerCase()}`}
                    key={label}
                  >
                    <span>{label}</span>
                    <strong>{dimension.value}</strong>
                    <em>{dimension.status}</em>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="result-grid result-grid-split">
            <div className="result-block">
              <h3>Requirement summary</h3>
              <p>{analysis.requirementSummary}</p>
            </div>
            <div className="result-block">
              <h3>Qualification reasoning</h3>
              <p>{analysis.qualificationReasoning}</p>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
