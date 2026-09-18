import type {
  AiAnalysis,
  Authority,
  BantStatus,
  BantSummary,
  BudgetRange,
  LeadFormInput,
  Timeline,
} from "./types";

const BUDGET_SCORE: Record<BudgetRange, number> = {
  "Under $10k": 12,
  "$10k – $25k": 22,
  "$25k – $50k": 32,
  "$50k – $100k": 40,
  "$100k+": 46,
  "Not specified": 8,
};

const AUTHORITY_SCORE: Record<Authority, number> = {
  "Decision Maker": 16,
  "Key Influencer": 9,
  "Evaluator/User": 3,
  "Unknown/Not Identified": -10,
};

const TIMELINE_SCORE: Record<Timeline, number> = {
  Immediate: 32,
  "1–3 months": 28,
  "3–6 months": 18,
  "6–12 months": 10,
  Exploratory: 4,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function hashSignal(input: string) {
  return input.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % 7;
}

export function buildBantSummary(input: LeadFormInput): BantSummary {
  const needLength = input.requirement.trim().length;
  const needValue =
    needLength > 80 ? "Clear requirement" : needLength > 40 ? "Directional need" : "High-level need";
  const needStatus: BantStatus = needLength > 80 ? "Strong" : needLength > 40 ? "Moderate" : "Weak";

  const budgetStatus: BantStatus =
    input.budgetRange === "Not specified" || input.budgetRange === "Under $10k"
      ? "Weak"
      : input.budgetRange === "$10k – $25k" || input.budgetRange === "$25k – $50k"
        ? "Moderate"
        : "Strong";

  const authorityStatus: BantStatus =
    input.authority === "Decision Maker"
      ? "Strong"
      : input.authority === "Unknown/Not Identified"
        ? "Weak"
        : "Moderate";

  const timelineStatus: BantStatus =
    input.timeline === "Immediate" || input.timeline === "1–3 months"
      ? "Strong"
      : input.timeline === "3–6 months"
        ? "Moderate"
        : "Weak";

  return {
    budget: { value: input.budgetRange, status: budgetStatus },
    authority: { value: input.authority, status: authorityStatus },
    need: { value: needValue, status: needStatus },
    timeline: { value: input.timeline, status: timelineStatus },
  };
}

export function analyzeLead(input: LeadFormInput): AiAnalysis {
  const requirementLength = input.requirement.trim().length;
  const notesLength = input.notes.trim().length;
  const detailScore = clamp(Math.round(requirementLength / 18) + Math.round(notesLength / 40), 0, 16);
  const industryBoost = ["SaaS", "Healthcare", "Financial Services", "Manufacturing"].includes(
    input.industry,
  )
    ? 6
    : 2;

  const raw =
    BUDGET_SCORE[input.budgetRange] +
    AUTHORITY_SCORE[input.authority] +
    TIMELINE_SCORE[input.timeline] +
    detailScore +
    industryBoost +
    hashSignal(input.company);

  const score = clamp(raw, 18, 97);
  const priority = score >= 75 ? "Hot" : score >= 50 ? "Warm" : "Cold";

  const followUpDays =
    priority === "Hot" ? 1 : priority === "Warm" ? 4 : 14;

  const requirementSummary = summarizeRequirement(input);
  const qualificationReasoning = buildReasoning(input, score, priority);
  const recommendedNextAction = buildNextAction(input, priority);
  const followUpEmail = buildEmail(input, priority, recommendedNextAction);

  return {
    score,
    priority,
    requirementSummary,
    qualificationReasoning,
    recommendedNextAction,
    suggestedFollowUpDate: addDays(followUpDays),
    bant: buildBantSummary(input),
    followUpEmail,
  };
}

function summarizeRequirement(input: LeadFormInput) {
  const trimmed = input.requirement.trim().replace(/\s+/g, " ");
  const snippet = trimmed.length <= 180 ? trimmed : `${trimmed.slice(0, 170).trim()}…`;
  return `${input.company} — ${snippet}`;
}

function authorityAssessment(authority: Authority) {
  switch (authority) {
    case "Decision Maker":
      return "Authority is strong: the contact is a decision maker, which raises qualification confidence and shortens the path to a yes/no.";
    case "Key Influencer":
      return "Authority is moderate: a key influencer can advance the evaluation, but the economic buyer still needs to be confirmed.";
    case "Evaluator/User":
      return "Authority is limited: an evaluator/user can clarify the requirement, but commercial approval is not established.";
    case "Unknown/Not Identified":
      return "Authority is unknown/not identified, which reduces qualification confidence until a decision maker is mapped.";
  }
}

function buildReasoning(input: LeadFormInput, score: number, priority: string) {
  const budgetLine =
    input.budgetRange === "Not specified"
      ? "Budget is unspecified, which lowers immediate commercial confidence."
      : `Stated budget (${input.budgetRange}) ${score >= 70 ? "supports a serious evaluation." : "is modest relative to a full rollout."}`;

  const timelineLine =
    input.timeline === "Immediate" || input.timeline === "1–3 months"
      ? `Timeline (${input.timeline}) indicates active buying pressure.`
      : `Timeline (${input.timeline}) suggests this is still in planning or research.`;

  const detailLine = input.requirement.trim().length > 80
    ? "Need is specific enough to qualify against a defined workflow."
    : "Need is still high-level; discovery should tighten use case and success criteria.";

  return `Score ${score}/100 → ${priority}. ${budgetLine} ${authorityAssessment(input.authority)} ${detailLine} ${timelineLine} Industry context: ${input.industry}.`;
}

function buildNextAction(input: LeadFormInput, priority: string) {
  const authorityFollowUp =
    input.authority === "Unknown/Not Identified"
      ? " Identify the decision maker before treating the opportunity as commercially qualified."
      : input.authority === "Evaluator/User"
        ? " Ask for an introduction to the economic buyer."
        : "";

  if (priority === "Hot") {
    return `Schedule a discovery call with ${input.name} within 24–48 hours. Confirm stakeholders, success metrics, and a pilot using sample ${input.industry.toLowerCase()} leads.${authorityFollowUp}`;
  }
  if (priority === "Warm") {
    return `Send a tailored workflow outline for ${input.company} and propose a working session to map qualification rules before CRM handoff.${authorityFollowUp}`;
  }
  return `Nurture with a short case-style example (fictional data only) and a lightweight one-pager. Recheck intent in two weeks.${authorityFollowUp}`;
}

function buildEmail(input: LeadFormInput, priority: string, nextAction: string) {
  const firstName = input.name.split(" ")[0] ?? input.name;
  const subject =
    priority === "Hot"
      ? `Next step for ${input.company}: qualify inbound leads and follow up faster`
      : priority === "Warm"
        ? `A practical qualification workflow for ${input.company}`
        : `Sharing a sample follow-up approach for ${input.company}`;

  const body = `Hi ${firstName},

Thank you for sharing ${input.company}'s interest in improving how inbound opportunities are qualified and followed up.

From what you described — ${input.requirement.trim()} — the useful first move is not a full CRM overhaul. It is a repeatable BANT pass that:

1. Scores the lead against budget, authority, need/requirement, and timeline
2. Recommends a next action your team can take this week
3. Drafts a personalized follow-up so nothing sits in the inbox
4. Hands a structured payload to automation (n8n / API / CRM)

Decision-making authority on this inquiry: ${input.authority}.
Suggested next step: ${nextAction}

This note is generated from sample/demo logic for a portfolio walkthrough. No production systems or real customer records are involved.

If helpful, I can walk through a 20-minute demo using fictional leads that match a ${input.industry.toLowerCase()} motion.

Best regards,
Manoj Kumar
`;

  return { subject, body: body.trim() };
}

export async function analyzeLeadWithDelay(input: LeadFormInput): Promise<AiAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return analyzeLead(input);
}
