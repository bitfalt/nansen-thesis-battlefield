# Thesis Battlefield — Demo Runbook

## Goal
Show Thesis Battlefield as a practical intelligence layer on top of raw Nansen output.

The demo should make it obvious that the product is not just a query wrapper. It should feel like an agentic research system that:
- understands a thesis
- plans the investigation
- gathers evidence under a budget
- produces a usable verdict for both humans and agents

Default demo posture for Week 1:
- stay offline unless a live run answers a real question
- show the shell surface first
- use the validated q1/q2 live status as credibility, not as a reason to overspend credits

## Recommended demo format

### Demo title
Thesis Battlefield — can onchain reality support this claim?

### Canonical thesis for the demo
"Smart money is accumulating HYPE."

### Canonical token
- HYPE
- chain: solana

## Demo sequence

### 1. Open with the problem
Say:
"Crypto research is noisy. People post strong claims constantly, but raw data alone does not tell you whether the thesis actually holds. Thesis Battlefield uses the Nansen Query Planner to turn a thesis into a structured investigation."

### 2. State the thesis clearly
Use one sentence:
"The thesis is: smart money is accumulating HYPE."

### 3. Show the planner mindset
Say:
"The planner does not blindly spam queries. It chooses an ordered path under a constrained budget and turns each result into structured evidence."

### 4. Show the planned query sequence
Use plan mode output or the report’s plannedQueries section.

Important line:
"The query trace is part of the product. It shows why each query was chosen and keeps the investigation explainable."

### 4.5 Show the Week 1 shell surface
Use the shell output to show:
- thesis card
- planner summary
- ordered investigation plan
- human readout
- agent handoff preview
- validated live status / budget policy

Important line:
"Week 1 is already opinionated about presentation: a human can scan it quickly, and an agent can still consume the underlying structured report."

### 5. Show execute-mode evidence from the bounded live run
Explain honestly:
- q1 resolved the correct Solana token reference
- q2 resolved token info and extracted meaningful metrics
- later queries hit credit exhaustion, which proves budget-awareness matters in this product

This is not a weakness if framed correctly.
Say:
"A real research agent should know when to stop. Running out of credits is not just an inconvenience — it is exactly why the planner exists."

### 6. Show the structured report
Highlight:
- verdict
- confidence
- strongest bear evidence
- caveats
- next questions

### 7. Show the machine-consumable JSON report
Say:
"This output is not only for a human analyst. Another agent can consume the JSON report directly and use it as a second-layer intelligence artifact."

### 8. Close with the product arc
Say:
"Week 1 establishes the reusable engine: entity resolution, budget-aware planning, evidence normalization, verdicting, and reporting. Later weeks can reuse the same core for different shells."

## Commands to run

### Planner demo
```bash
bun run planner:demo
```

### Week 1 app shell demo
```bash
bun run demo
```

### Refresh the offline artifact pack
```bash
bun run demo:artifacts
```

### Bounded execute-mode example (only if credits are available)
```bash
NANSEN_API_KEY=... bun run bin/nansen-query-planner.ts --token HYPE --thesis "Smart money is accumulating HYPE" --mode execute --max-calls 2
```

## Key judge-friendly claims that are true
- one reusable engine, not a one-off script
- budget-aware planning matters because credits are limited
- the system is agent-native, not dashboard-native
- output is consumable by both humans and agents
- the query trace is visible and inspectable
- Week 1 now has a cleaner product surface and shareable artifact pack

## What not to claim
- do not claim full live end-to-end validation of all query families
- do not claim a mature final verdict engine yet
- do not claim broad production readiness

## Best current honest framing
"We built the reusable Week 1 intelligence core and validated the first live evidence path. The remaining work is expanding deeper live evidence extraction and polishing the final demo/submission package."
