"use client";

import { useMemo, useState } from "react";
import { AutomationReady } from "@/components/AutomationReady";
import { BuiltWith } from "@/components/BuiltWith";
import { DashboardStats } from "@/components/DashboardStats";
import { FollowUpEmail } from "@/components/FollowUpEmail";
import { LeadForm } from "@/components/LeadForm";
import { AnalysisResults } from "@/components/AnalysisResults";
import { RecentLeads } from "@/components/RecentLeads";
import { WorkflowStatus } from "@/components/WorkflowStatus";
import { analyzeLeadWithDelay } from "@/lib/mock-ai";
import { SAMPLE_LEADS, createLeadRecord, withAnalysis } from "@/lib/sample-leads";
import type { LeadFormInput, LeadRecord, WorkflowStage } from "@/lib/types";

export default function HomePage() {
  const [leads, setLeads] = useState<LeadRecord[]>(SAMPLE_LEADS);
  const [selectedId, setSelectedId] = useState<string | null>(SAMPLE_LEADS[0]?.id ?? null);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => leads.find((lead) => lead.id === selectedId) ?? leads[0],
    [leads, selectedId],
  );

  const stats = useMemo(() => {
    return {
      total: leads.length,
      hot: leads.filter((lead) => lead.analysis?.priority === "Hot").length,
      qualified: leads.filter((lead) =>
        ["qualified", "followup", "crm"].includes(lead.status),
      ).length,
      pending: leads.filter((lead) => lead.followUpPending).length,
    };
  }, [leads]);

  async function handleAnalyze(input: LeadFormInput) {
    setError(null);
    setCopied(false);
    setAnalyzing(true);

    const incoming = createLeadRecord(input);
    setLeads((current) => [incoming, ...current]);
    setSelectedId(incoming.id);

    try {
      const analysis = await analyzeLeadWithDelay(input);
      const completed = withAnalysis(incoming, analysis);
      setLeads((current) =>
        current.map((lead) => (lead.id === incoming.id ? completed : lead)),
      );
    } catch {
      setError("The mock analysis could not be completed. Try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function stageFor(lead?: LeadRecord): WorkflowStage {
    if (!lead) return "received";
    if (analyzing && lead.id === selectedId) return "analyzed";
    return lead.status;
  }

  async function copyEmail() {
    const email = selected?.analysis?.followUpEmail;
    if (!email) return;
    const text = `Subject: ${email.subject}\n\n${email.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Clipboard access was blocked. Select the email text and copy it manually.");
    }
  }

  return (
    <main className="app-shell">
      <div className="demo-banner">Portfolio Demo — Fictional Data</div>
      <section className="hero">
        <div>
          <div className="kicker">Sales operations demo</div>
          <h1>AI Lead Qualification & Follow-Up Agent</h1>
          <p className="lede">
            Receive a sales lead, score the opportunity, explain the qualification,
            recommend the next action, and generate a personalized follow-up — then
            package the result for workflow automation. All contacts and companies
            on this page are fictional sample records.
          </p>
        </div>
        <aside className="hero-aside">
          <div className="kicker" style={{ color: "#8ee0d8" }}>
            Demo scenario
          </div>
          <p>
            A B2B team wants inbound inquiries scored before an SDR spends time on
            them. This walkthrough uses mock AI logic so it runs locally with no
            API keys, database, or paid services.
          </p>
        </aside>
      </section>

      <BuiltWith />

      <DashboardStats stats={stats} />

      <div className="layout">
        <LeadForm analyzing={analyzing} onAnalyze={handleAnalyze} error={error} />
        <div style={{ display: "grid", gap: 18 }}>
          <AnalysisResults lead={selected} analyzing={analyzing} />
          <FollowUpEmail
            email={selected?.analysis?.followUpEmail}
            copied={copied}
            onCopy={copyEmail}
            disabled={!selected?.analysis || analyzing}
          />
        </div>
      </div>

      <section className="panel workflow-panel" style={{ marginTop: 18 }}>
        <div className="kicker">Agent pipeline</div>
        <h2>Workflow status</h2>
        <p className="panel-intro">
          Each analyzed lead moves through a five-stage path from intake to
          automation-ready payload.
        </p>
        <WorkflowStatus current={stageFor(selected)} analyzing={analyzing} />
      </section>

      <section className="panel" style={{ marginTop: 18 }}>
        <h2>Recent leads</h2>
        <p className="panel-intro">
          Sample companies and contacts for the portfolio walkthrough. Select a row
          to inspect its analysis.
        </p>
        <RecentLeads
          leads={leads}
          selectedId={selected?.id}
          onSelect={setSelectedId}
        />
      </section>

      <AutomationReady lead={selected} />

      <p className="footer-note">
        Portfolio demonstration only. Names, companies, emails, and requirements are
        invented. This interface does not connect to a live CRM, mailbox, or
        production model.
      </p>
    </main>
  );
}
