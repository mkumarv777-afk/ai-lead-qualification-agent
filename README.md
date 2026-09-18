# AI Lead Qualification & Follow-Up Agent

Portfolio demonstration of an AI sales agent that receives a lead, scores the opportunity, explains qualification, recommends a next action, drafts a follow-up email, and prepares a structured payload for workflow automation.

**Portfolio Demo — Fictional Data.** All names, companies, emails, and requirements are invented sample records. This app does not use real client, employer, or confidential information.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included

- Dashboard metrics: total, hot, qualified, follow-ups pending
- New lead form and **Analyze with AI** (mock scoring, no API keys)
- Analysis panel: score, priority, summary, reasoning, next action, follow-up date
- Personalized follow-up email with copy
- Workflow stages through CRM/automation ready
- Recent leads table with sample companies
- Automation-ready payload representing n8n, APIs, email, and CRM handoff

No database and no paid services are required.
