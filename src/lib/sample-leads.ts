import type { AiAnalysis, LeadFormInput, LeadRecord } from "./types";

export const SAMPLE_LEADS: LeadRecord[] = [
  {
    id: "lead-1001",
    name: "Priya Nair",
    company: "Northwind Analytics",
    email: "priya.nair@northwind-analytics.example",
    industry: "SaaS",
    requirement:
      "Need an inbound qualification workflow that scores demo requests and drafts SDR follow-ups before they hit the CRM.",
    budgetRange: "$50k – $100k",
    authority: "Decision Maker",
    timeline: "1–3 months",
    notes: "Evaluating two vendors. Prefers a 30-day pilot with sample data.",
    createdAt: "2026-09-16T09:40:00.000Z",
    status: "crm",
    followUpPending: false,
    analysis: {
      score: 88,
      priority: "Hot",
      requirementSummary:
        "Inbound demo qualification plus automated SDR follow-up drafts before CRM handoff.",
      qualificationReasoning:
        "Budget and timeline support a near-term rollout. Authority is strong: Priya is a decision maker, which raises qualification confidence. The buyer has a defined workflow (score → draft → CRM) and is already comparing vendors, which indicates active intent.",
      recommendedNextAction:
        "Book a 30-minute discovery call focused on their current SDR handoff and propose a 30-day pilot using sample leads.",
      suggestedFollowUpDate: "2026-09-19",
      bant: {
        budget: { value: "$50k – $100k", status: "Strong" },
        authority: { value: "Decision Maker", status: "Strong" },
        need: { value: "Clear requirement", status: "Strong" },
        timeline: { value: "1–3 months", status: "Strong" },
      },
      followUpEmail: {
        subject: "Pilot plan for Northwind Analytics lead qualification",
        body: `Hi Priya,

Thank you for walking through Northwind Analytics' inbound demo flow. A 30-day pilot with sample leads is a strong way to prove scoring, SDR drafts, and CRM handoff before a wider rollout.

Suggested next step: book a 30-minute discovery call focused on the current SDR handoff and agree on pilot success metrics.

Decision-making authority on this inquiry: Decision Maker.

This note is generated from sample/demo logic for a portfolio walkthrough.

Best regards,
Manoj Kumar`,
      },
    },
  },
  {
    id: "lead-1002",
    name: "Marcus Hale",
    company: "Cedar & Pine Clinics",
    email: "marcus.hale@cedar-pine.example",
    industry: "Healthcare",
    requirement:
      "Want to qualify patient-referral partnership inquiries and route high-intent contacts to the partnerships team.",
    budgetRange: "$25k – $50k",
    authority: "Key Influencer",
    timeline: "3–6 months",
    notes: "Needs audit-friendly logging. No PHI in this evaluation.",
    createdAt: "2026-09-15T14:12:00.000Z",
    status: "followup",
    followUpPending: true,
    analysis: {
      score: 71,
      priority: "Warm",
      requirementSummary:
        "Qualify partnership inquiries and route high-intent contacts with audit-friendly logging.",
      qualificationReasoning:
        "Clear use case and mid-range budget, but a 3–6 month timeline suggests they are still aligning stakeholders. Authority is moderate: Marcus is a key influencer who can advance the evaluation, though the economic buyer should still be confirmed. Compliance logging is a buying criterion, not a blocker.",
      recommendedNextAction:
        "Share a sample qualification rubric and a redacted workflow diagram, then schedule a working session with partnerships and operations.",
      suggestedFollowUpDate: "2026-09-22",
      bant: {
        budget: { value: "$25k – $50k", status: "Moderate" },
        authority: { value: "Key Influencer", status: "Moderate" },
        need: { value: "Clear requirement", status: "Strong" },
        timeline: { value: "3–6 months", status: "Moderate" },
      },
      followUpEmail: {
        subject: "Qualification rubric for Cedar & Pine partnership inquiries",
        body: `Hi Marcus,

Cedar & Pine Clinics' partnership inquiries are a clear fit for scored routing with audit-friendly logging. No PHI is required for this evaluation.

Suggested next step: review a sample qualification rubric and schedule a working session with partnerships and operations.

Decision-making authority on this inquiry: Key Influencer.

This note is generated from sample/demo logic for a portfolio walkthrough.

Best regards,
Manoj Kumar`,
      },
    },
  },
  {
    id: "lead-1003",
    name: "Elena Voss",
    company: "Harborline Capital",
    email: "elena.voss@harborline.example",
    industry: "Financial Services",
    requirement:
      "Exploring AI-assisted follow-up for wealth-management prospect events. Looking for examples, not a committed project yet.",
    budgetRange: "Not specified",
    authority: "Unknown/Not Identified",
    timeline: "Exploratory",
    notes: "Requested a one-pager. No procurement process started.",
    createdAt: "2026-09-14T11:05:00.000Z",
    status: "qualified",
    followUpPending: true,
    analysis: {
      score: 42,
      priority: "Cold",
      requirementSummary:
        "Early research into AI follow-up after prospect events; no budget or procurement yet.",
      qualificationReasoning:
        "Interest is real but early. Missing budget, timeline, and a named initiative. Authority is unknown/not identified, which reduces qualification confidence until a decision maker is mapped. Best treated as nurture rather than an active opportunity.",
      recommendedNextAction:
        "Send a concise one-pager with a fictional event-follow-up example and add a 45-day nurture reminder. Identify the decision maker before treating the opportunity as commercially qualified.",
      suggestedFollowUpDate: "2026-10-29",
      bant: {
        budget: { value: "Not specified", status: "Weak" },
        authority: { value: "Unknown/Not Identified", status: "Weak" },
        need: { value: "Clear requirement", status: "Strong" },
        timeline: { value: "Exploratory", status: "Weak" },
      },
      followUpEmail: {
        subject: "Example follow-up flow after Harborline prospect events",
        body: `Hi Elena,

Appreciate Harborline Capital exploring AI-assisted follow-up after prospect events. Since this is still exploratory, a one-pager with a fictional example is the lightest useful next step.

Suggested next step: review the attached-style example and reconnect in about 45 days if a project owner is named.

Decision-making authority on this inquiry: Unknown/Not Identified.

This note is generated from sample/demo logic for a portfolio walkthrough.

Best regards,
Manoj Kumar`,
      },
    },
  },
  {
    id: "lead-1004",
    name: "Jonah Park",
    company: "BrightCart Commerce",
    email: "jonah.park@brightcart.example",
    industry: "Retail & Ecommerce",
    requirement:
      "Need faster follow-up on wholesale partnership leads coming from a trade-show landing page.",
    budgetRange: "$10k – $25k",
    authority: "Evaluator/User",
    timeline: "Immediate",
    notes: "Trade show is in two weeks. Wants email drafts same day.",
    createdAt: "2026-09-17T16:28:00.000Z",
    status: "crm",
    followUpPending: false,
    analysis: {
      score: 79,
      priority: "Hot",
      requirementSummary:
        "Same-day qualification and email drafts for wholesale leads from a trade-show landing page.",
      qualificationReasoning:
        "Immediate timeline and a specific channel (landing page → follow-up) raise urgency. Budget is modest, so position a focused workflow rather than a platform overhaul. Authority is limited: Jonah is an evaluator/user who can clarify the requirement, but commercial approval is not established.",
      recommendedNextAction:
        "Propose a two-week landing-page workflow: score, draft, and push qualified wholesale leads into their CRM list. Ask for an introduction to the economic buyer.",
      suggestedFollowUpDate: "2026-09-18",
      bant: {
        budget: { value: "$10k – $25k", status: "Moderate" },
        authority: { value: "Evaluator/User", status: "Moderate" },
        need: { value: "Clear requirement", status: "Strong" },
        timeline: { value: "Immediate", status: "Strong" },
      },
      followUpEmail: {
        subject: "Two-week follow-up workflow for BrightCart wholesale leads",
        body: `Hi Jonah,

BrightCart Commerce needs same-day drafts for wholesale leads from the trade-show landing page. A focused two-week workflow is a better fit than a platform replacement.

Suggested next step: confirm the landing-page fields and the CRM list that should receive qualified wholesale contacts.

Decision-making authority on this inquiry: Evaluator/User.

This note is generated from sample/demo logic for a portfolio walkthrough.

Best regards,
Manoj Kumar`,
      },
    },
  },
  {
    id: "lead-1005",
    name: "Amelia Cho",
    company: "LumenForge Manufacturing",
    email: "amelia.cho@lumenforge.example",
    industry: "Manufacturing",
    requirement:
      "Qualify RFQ emails from distributors and flag opportunities above a custom threshold for account managers.",
    budgetRange: "$100k+",
    authority: "Decision Maker",
    timeline: "1–3 months",
    notes: "Has an existing CRM. Wants API-first integration, not another inbox tool.",
    createdAt: "2026-09-13T08:50:00.000Z",
    status: "analyzed",
    followUpPending: true,
    analysis: {
      score: 91,
      priority: "Hot",
      requirementSummary:
        "API-first RFQ qualification that flags high-value distributor opportunities for account managers.",
      qualificationReasoning:
        "Enterprise budget, near-term timeline, and a clear integration preference (API + existing CRM) make this a strong qualified opportunity. Authority is strong: Amelia is a decision maker, which raises qualification confidence.",
      recommendedNextAction:
        "Confirm RFQ fields and scoring thresholds, then outline an n8n/API handoff into their current CRM.",
      suggestedFollowUpDate: "2026-09-20",
      bant: {
        budget: { value: "$100k+", status: "Strong" },
        authority: { value: "Decision Maker", status: "Strong" },
        need: { value: "Clear requirement", status: "Strong" },
        timeline: { value: "1–3 months", status: "Strong" },
      },
      followUpEmail: {
        subject: "RFQ scoring + CRM handoff outline for LumenForge",
        body: `Hi Amelia,

LumenForge Manufacturing's RFQ qualification need is API-first: score distributor emails, flag high-value opportunities, and update the existing CRM.

Suggested next step: confirm RFQ fields and scoring thresholds, then outline the n8n/API handoff.

Decision-making authority on this inquiry: Decision Maker.

This note is generated from sample/demo logic for a portfolio walkthrough.

Best regards,
Manoj Kumar`,
      },
    },
  },
];

export function createLeadRecord(input: LeadFormInput): LeadRecord {
  return {
    ...input,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "received",
    followUpPending: true,
  };
}

export function withAnalysis(
  lead: LeadRecord,
  analysis: AiAnalysis,
): LeadRecord {
  return {
    ...lead,
    analysis,
    status: "crm",
    followUpPending: true,
  };
}
