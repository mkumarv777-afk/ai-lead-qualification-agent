import type { LeadRecord } from "@/lib/types";

type AutomationReadyProps = {
  lead?: LeadRecord;
};

export function AutomationReady({ lead }: AutomationReadyProps) {
  const payload = {
    event: "lead.qualification.completed",
    demo: true,
    source: "portfolio-demo",
    lead: lead
      ? {
          id: lead.id,
          name: lead.name,
          company: lead.company,
          email: lead.email,
          industry: lead.industry,
          budgetRange: lead.budgetRange,
          authority: lead.authority,
          timeline: lead.timeline,
          bant: lead.analysis?.bant ?? null,
          score: lead.analysis?.score ?? null,
          priority: lead.analysis?.priority ?? null,
          nextAction: lead.analysis?.recommendedNextAction ?? null,
          followUpDate: lead.analysis?.suggestedFollowUpDate ?? null,
          workflowStage: lead.status,
        }
      : null,
    destinations: ["n8n webhook", "CRM create/update", "email draft queue", "internal API"],
  };

  return (
    <section className="automation">
      <article className="panel">
        <h2>Automation ready</h2>
        <p className="panel-intro">
          After qualification, the agent emits a structured payload. In production this
          would post to n8n, a CRM, or an email system. Here it is shown as a sample
          contract only.
        </p>
        <div className="integration-grid">
          <div className="integration">
            <h3>n8n workflow</h3>
            <p>Trigger on score threshold, branch Hot/Warm/Cold, then notify an owner.</p>
          </div>
          <div className="integration">
            <h3>API handoff</h3>
            <p>JSON body with lead fields, BANT status, score, next action, and follow-up date.</p>
          </div>
          <div className="integration">
            <h3>Email systems</h3>
            <p>Drop the generated draft into a send-later queue for human review.</p>
          </div>
          <div className="integration">
            <h3>CRM platforms</h3>
            <p>Create or update a fictional opportunity with priority and stage.</p>
          </div>
        </div>
      </article>
      <article className="panel">
        <h2>Sample payload</h2>
        <p className="panel-intro">What an automation node would receive for the selected lead.</p>
        <pre className="payload">{JSON.stringify(payload, null, 2)}</pre>
      </article>
    </section>
  );
}
