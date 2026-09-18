export type Priority = "Hot" | "Warm" | "Cold";

export type WorkflowStage =
  | "received"
  | "analyzed"
  | "qualified"
  | "followup"
  | "crm";

export type BudgetRange =
  | "Under $10k"
  | "$10k – $25k"
  | "$25k – $50k"
  | "$50k – $100k"
  | "$100k+"
  | "Not specified";

export type Timeline =
  | "Immediate"
  | "1–3 months"
  | "3–6 months"
  | "6–12 months"
  | "Exploratory";

export type Authority =
  | "Decision Maker"
  | "Key Influencer"
  | "Evaluator/User"
  | "Unknown/Not Identified";

export type BantStatus = "Strong" | "Moderate" | "Weak";

export interface BantDimension {
  value: string;
  status: BantStatus;
}

export interface BantSummary {
  budget: BantDimension;
  authority: BantDimension;
  need: BantDimension;
  timeline: BantDimension;
}

export type Industry =
  | "SaaS"
  | "Healthcare"
  | "Financial Services"
  | "Manufacturing"
  | "Retail & Ecommerce"
  | "Professional Services"
  | "Education"
  | "Logistics";

export interface LeadFormInput {
  name: string;
  company: string;
  email: string;
  industry: Industry;
  requirement: string;
  budgetRange: BudgetRange;
  authority: Authority;
  timeline: Timeline;
  notes: string;
}

export interface AiAnalysis {
  score: number;
  priority: Priority;
  requirementSummary: string;
  qualificationReasoning: string;
  recommendedNextAction: string;
  suggestedFollowUpDate: string;
  bant: BantSummary;
  followUpEmail: {
    subject: string;
    body: string;
  };
}

export interface LeadRecord extends LeadFormInput {
  id: string;
  createdAt: string;
  status: WorkflowStage;
  analysis?: AiAnalysis;
  followUpPending: boolean;
}

export const WORKFLOW_STEPS: { id: WorkflowStage; label: string }[] = [
  { id: "received", label: "Lead Received" },
  { id: "analyzed", label: "AI Analysis" },
  { id: "qualified", label: "Qualification" },
  { id: "followup", label: "Follow-Up Generated" },
  { id: "crm", label: "CRM / Automation Ready" },
];

export const INDUSTRIES: Industry[] = [
  "SaaS",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail & Ecommerce",
  "Professional Services",
  "Education",
  "Logistics",
];

export const BUDGET_RANGES: BudgetRange[] = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not specified",
];

export const TIMELINES: Timeline[] = [
  "Immediate",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Exploratory",
];

export const AUTHORITIES: Authority[] = [
  "Decision Maker",
  "Key Influencer",
  "Evaluator/User",
  "Unknown/Not Identified",
];
