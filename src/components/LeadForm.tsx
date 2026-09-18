"use client";

import { FormEvent, useState } from "react";
import {
  AUTHORITIES,
  BUDGET_RANGES,
  INDUSTRIES,
  TIMELINES,
  type Authority,
  type BudgetRange,
  type Industry,
  type LeadFormInput,
  type Timeline,
} from "@/lib/types";

const EMPTY_FORM: LeadFormInput = {
  name: "Sofia Mendes",
  company: "Atlas Harbor Logistics",
  email: "sofia.mendes@atlas-harbor.example",
  industry: "Logistics",
  requirement:
    "We receive partner onboarding requests from regional carriers and need them scored, summarized, and followed up within one business day.",
  budgetRange: "$25k – $50k",
  authority: "Key Influencer",
  timeline: "1–3 months",
  notes: "Wants a webhook into an existing operations board. Prefers a 4-week pilot.",
};

type LeadFormProps = {
  analyzing: boolean;
  error: string | null;
  onAnalyze: (input: LeadFormInput) => Promise<void>;
};

export function LeadForm({ analyzing, error, onAnalyze }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormInput>(EMPTY_FORM);

  function update<K extends keyof LeadFormInput>(key: K, value: LeadFormInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onAnalyze(form);
  }

  return (
    <section className="panel">
      <h2>New lead</h2>
      <p className="panel-intro">
        Submit a fictional inquiry, then run mock AI analysis. Prefill values are
        sample data so the demo is ready to click.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              value={form.industry}
              onChange={(event) => update("industry", event.target.value as Industry)}
            >
              {INDUSTRIES.map((industry) => (
                <option key={industry}>{industry}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="requirement">Requirement</label>
            <textarea
              id="requirement"
              value={form.requirement}
              onChange={(event) => update("requirement", event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="budget">Budget range</label>
            <select
              id="budget"
              value={form.budgetRange}
              onChange={(event) =>
                update("budgetRange", event.target.value as BudgetRange)
              }
            >
              {BUDGET_RANGES.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="authority">Decision-making authority</label>
            <select
              id="authority"
              value={form.authority}
              onChange={(event) =>
                update("authority", event.target.value as Authority)
              }
            >
              {AUTHORITIES.map((authority) => (
                <option key={authority}>{authority}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="timeline">Timeline</label>
            <select
              id="timeline"
              value={form.timeline}
              onChange={(event) => update("timeline", event.target.value as Timeline)}
            >
              {TIMELINES.map((timeline) => (
                <option key={timeline}>{timeline}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={analyzing}>
            {analyzing ? "Analyzing…" : "Analyze with AI"}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setForm(EMPTY_FORM)}
            disabled={analyzing}
          >
            Reset sample lead
          </button>
        </div>
        {error ? (
          <p className="panel-intro" style={{ color: "#b4233a", marginTop: 12 }}>
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
