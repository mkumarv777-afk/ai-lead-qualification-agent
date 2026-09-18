# AI Lead Qualification & Follow-Up Agent

Capstone / portfolio project that demonstrates how an **AI-style sales agent** can take an inbound lead, apply **BANT qualification**, score and prioritize the opportunity, explain the reasoning, recommend a next action, draft a follow-up email, and package a structured payload for workflow or CRM automation.

This is a **standalone demonstration**. Qualification and follow-up text are produced by **in-app mock agent logic** (deterministic scoring and templates in the repository). It does **not** call a live LLM, CRM, mailbox, or n8n instance, and it does not require API keys or paid services.

**Live demo:** [https://ai-lead-agent-demo.vercel.app](https://ai-lead-agent-demo.vercel.app)

---

## Live Demo

Open the deployed application:

**[https://ai-lead-agent-demo.vercel.app](https://ai-lead-agent-demo.vercel.app)**

Submit a sample lead, run **Analyze with AI**, and inspect score, BANT status, follow-up copy, workflow stages, and the sample automation payload.

---

## Overview

Inbound sales teams often spend time on incomplete or low-intent inquiries before they know whether budget, authority, need, and timeline are in place. This project shows a **repeatable agent workflow** on a modern web dashboard:

1. Capture a lead  
2. Score it with BANT (Budget, Authority, Need, Timeline)  
3. Assign Hot / Warm / Cold priority  
4. Generate qualification reasoning and a next action  
5. Draft a personalized follow-up  
6. Emit a JSON payload shaped for n8n, APIs, email queues, and CRM handoff  

The UI is a B2B SaaS-style dashboard with metrics, a new-lead form, analysis results, a recent-leads table, and an automation-ready panel.

---

## Business problem

Without a consistent qualification pass, SDRs treat every inbound the same: high-intent buyers wait, and exploratory contacts consume discovery time. A useful first automation is not a full CRM replacement. It is a **structured pass** that answers:

- Is there commercial signal (budget and timeline)?  
- Can this person move a decision (authority)?  
- Is the requirement specific enough to act on (need)?  
- What should a human do next, and what should they send?

This demo illustrates that pattern with fictional data so the workflow is easy to walk through in a portfolio review.

---

## How the agent works

All analysis runs **locally in the browser** via TypeScript functions in `src/lib/mock-ai.ts`. There is no external model API.

When you click **Analyze with AI**, the app:

1. **Lead received** — Stores the form fields (name, company, email, industry, requirement, budget, authority, timeline, notes).  
2. **AI analysis** — Applies weighted scoring for budget, authority, need/requirement detail, and timeline (plus small industry and company signals).  
3. **Qualification** — Maps the numeric score to **Hot** (75+), **Warm** (50–74), or **Cold** (below 50), and builds a BANT summary (Strong / Moderate / Weak per dimension).  
4. **Follow-up generated** — Drafts an email (subject + body) from those fields, including the authority line and recommended next step.  
5. **CRM / automation ready** — Shows a sample JSON event (`lead.qualification.completed`) that a workflow tool could consume.

Sample leads in `src/lib/sample-leads.ts` are pre-scored so the dashboard is populated on first load. New submissions are kept in **client state only** (no database).

---

## BANT qualification

The fourth BANT dimension, **Authority**, is a first-class field: **Decision Maker**, **Key Influencer**, **Evaluator/User**, or **Unknown/Not Identified**.

| Dimension | How this demo uses it |
| --- | --- |
| **Budget** | Stated range from Under $10k through $100k+, or not specified. Higher ranges increase the score; unspecified or very low budget lowers commercial confidence. |
| **Authority** | Decision makers raise the score. Unknown/not identified **reduces** qualification confidence until a buyer is mapped. |
| **Need** | Derived from requirement (and notes) length/specificity: clear vs directional vs high-level. |
| **Timeline** | Immediate and 1–3 months count as active pressure; exploratory or long-range timelines weaken urgency. |

The **AI Analysis** panel shows a compact BANT grid and **qualification reasoning** that explicitly includes the authority assessment.

---

## Prioritization (Hot / Warm / Cold)

| Priority | Score | Typical treatment in this demo |
| --- | --- | --- |
| **Hot** | 75–100 | Near-term discovery; follow-up date is soon. |
| **Warm** | 50–74 | Working session / outline; confirm stakeholders. |
| **Cold** | 18–49 | Nurture / one-pager; map a decision maker before treating it as commercial. |

These thresholds live in the mock scoring function. They are **demo rules**, not a trained model.

---

## Reasoning, next actions, and follow-up

- **Qualification reasoning** — Explains budget, authority, need, timeline, and industry in one paragraph.  
- **Recommended next action** — Changes with Hot / Warm / Cold and may add “identify the economic buyer” when authority is weak or unknown.  
- **Personalized follow-up** — Template email the user can **Copy**. Sign-off is the portfolio author name. Copy states that the note is generated from sample/demo logic.

---

## Workflow and CRM integration architecture

The product **represents** an automation handoff; it does not connect to live systems.

```text
Lead form  →  Mock agent (BANT + score + copy)
                 ↓
         Workflow stages (UI)
                 ↓
     Sample JSON payload (client)
                 ↓
   Intended destinations (illustrated only):
   n8n webhook · CRM create/update · email draft queue · internal API
```

The **Automation ready** section documents those destinations and prints the payload for the selected lead (`authority`, `bant`, score, priority, next action, follow-up date, workflow stage). In a production build you would POST that contract to n8n or a CRM; **this repository does not perform that POST**.

---

## Technology stack

What is actually in this repository:

| Layer | Technology |
| --- | --- |
| App | [Next.js](https://nextjs.org/) 15 (App Router) |
| UI | React 19, CSS in `src/app/globals.css` |
| Language | TypeScript |
| Agent logic | In-repo mock functions (`src/lib/mock-ai.ts`) — not a hosted LLM API |
| Data | In-memory / sample arrays — no database |
| Lint | ESLint with `eslint-config-next` |
| Concepts shown in the UI | Generative-style copy, agent workflow, n8n-ready payload shape, API/CRM field contract |

---

## Simple workflow

```text
Lead Received
    → AI Analysis
        → Qualification (BANT + Hot/Warm/Cold)
            → Follow-Up Generated
                → CRM / Automation Ready
```

Use the dashboard: fill **New lead** (or keep the sample), click **Analyze with AI**, then review analysis, email, workflow chips, recent leads, and the sample payload.

---

## Setup and run

Requires **Node.js 18+**.

```bash
git clone https://github.com/mkumarv777-afk/ai-lead-qualification-agent.git
cd ai-lead-qualification-agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm start`, `npm run lint`.

No `.env` file, API keys, or database are required.

---

## Fictional demonstration data

**Portfolio Demo — Fictional Data.** Every company, contact, email (`*.example`), requirement, and note in the sample set is **invented**. This project does not use real client, employer, or confidential information. It is a **capstone portfolio piece** for sales-automation and AI-agent concepts, not a production CRM or live AI service.
