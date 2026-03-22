# Thesis Battlefield Agent Skill

## Goal
Expose one stable thesis-analysis workflow that an agent can call with a thesis and get back a budget-aware Nansen investigation.

This repo is the product wrapper around the reusable planner engine in `nansen-query-planner`.

## Skill contract

### Canonical flow
Use this sequence for live investigations:

1. Run plan mode first.
2. Explain the inferred asset, chain, budget options, and expected spend.
3. Ask for approval before execute mode spends credits.
4. Run execute mode only after approval.

### Plan command
```bash
bun run battlefield -- --thesis "<user thesis>" --mode plan --budget-profile safe --json
```

### Execute command
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile safe --json
```

### Single API
```ts
import { analyzeThesis } from 'nansen-thesis-battlefield'

const plan = analyzeThesis({
  thesis: 'Smart money is accumulating HYPE and price momentum is confirming the move.',
  token: 'HYPE',
  chain: 'solana',
  mode: 'plan',
  budgetProfile: 'safe',
  format: 'json',
})

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

This package is still repo-local today because `package.json` is marked `private`, so treat this API as a local integration contract until packaging is made explicit.

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
- default to `mode: plan` when the user is brainstorming or has not yet approved a credit-spending run
- if the user asks for live execution without picking a budget, first surface the `safe` vs `expanded` options and the planner's recommendation
- `safe` is roughly `8` calls / `80` credits
- `expanded` is roughly `10` calls / `200` credits
- only default to `safe` automatically when the user clearly wants the cheapest first pass
- escalate to `expanded` when the thesis bundles multiple claims or the first run leaves the thesis genuinely unresolved
- if the plan response is ambiguous on token or chain, call that out before asking for execute approval

## Agent integration checklist
- run `plan` first and show the plan output before any credit-spending action
- include the planner's recommended budget profile in the approval prompt
- store both the human-readable output and the structured JSON report when possible
- treat execute mode as explicitly approval-gated, not as the default entrypoint

## Why this should be a skill
- one stable command for agents
- one stable API for code integrations
- budget-aware by default
- returns both human and machine-readable outputs
