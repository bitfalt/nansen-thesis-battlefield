# Thesis Battlefield Agent Skill

## Goal
Expose one stable thesis-analysis workflow that an agent can call with a thesis and get back a budget-aware Nansen investigation.

This repo is the product wrapper around the reusable planner engine in `nansen-query-planner`.

## Skill contract

### Single command
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile safe
```

### Single API
```ts
import { analyzeThesis } from 'nansen-thesis-battlefield'

const result = analyzeThesis({
  thesis: 'Smart money is accumulating HYPE and price momentum is confirming the move.',
  token: 'HYPE',
  chain: 'solana',
  mode: 'execute',
  budgetProfile: 'safe',
  format: 'json',
  writeArtifacts: true,
  artifactDir: 'artifacts/runs',
})
```

## Inputs
- `thesis` (required)
- `token` (optional)
- `chain` (optional)
- `mode`: `plan` or `execute`
- `budgetProfile`: `safe` or `expanded`
- `maxCalls` (optional override)
- `maxCredits` (optional override)
- `format`: `shell`, `json`, or `markdown`
- `writeArtifacts` (optional)
- `artifactDir` (optional)

## Outputs
- `report`: structured JSON report
- `markdown`: human-readable markdown report
- `shellOutput`: terminal/product-surface output
- `output`: whichever format was requested
- `run`: underlying planner run with query trace and evidence

## Auth expectations
For live execute mode, the user needs a working Nansen CLI session.

Recommended setup:
```bash
nansen login --api-key <NANSEN_API_KEY>
```

The planner will use the detected `nansen` CLI binary, including the Bun-installed location.

## Recommended agent behavior
- default to `mode: plan` if the user is brainstorming and does not want to spend credits yet
- default to `mode: execute` with `budgetProfile: safe` for first live validation
- escalate to `budgetProfile: expanded` only when the first run leaves the thesis genuinely unresolved

## Why this should be a skill
- one stable command for agents
- one stable API for code integrations
- budget-aware by default
- returns both human and machine-readable outputs
