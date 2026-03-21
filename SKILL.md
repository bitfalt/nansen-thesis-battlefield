# Thesis Battlefield Skill

Use Thesis Battlefield when a user wants to test a crypto thesis against Nansen data with a budget-aware, agent-friendly workflow.

This repo is the skill surface.
The underlying planner/execution engine lives in `@bitfalt/nansen-query-planner`.

## What this skill does
- turns a freeform thesis into a structured Nansen investigation
- chooses a bounded query plan using the planner engine
- returns a verdict framed as `SUPPORTED`, `CONTRADICTED`, `MIXED`, or `INCONCLUSIVE`
- preserves both human-readable and machine-readable outputs

## Prerequisites
The environment must have:
- this repo installed with `bun install`
- a working Nansen CLI session for live runs

Recommended auth setup:
```bash
nansen login --api-key <NANSEN_API_KEY>
```

## Default behavior
- If the user is exploring or did not explicitly ask for live execution, use `mode=plan`.
- If the user wants a real live check, start with `mode=execute` and `budgetProfile=safe`.
- Only use `budgetProfile=expanded` when the safe run leaves the thesis materially unresolved or when the user explicitly wants a fuller read.

## Single command
```bash
bun run battlefield -- --thesis "<user thesis>" --mode plan --budget-profile safe
```

## Useful command variants

### Plan mode, shell output
```bash
bun run battlefield -- --thesis "<user thesis>" --mode plan --budget-profile safe
```

### Execute mode, JSON output
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile safe --json
```

### Execute mode with artifacts
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile safe --write-artifacts
```

## Programmatic API
```ts
import { analyzeThesis } from 'nansen-thesis-battlefield'

const result = analyzeThesis({
  thesis: 'Smart money is accumulating HYPE and medium-term flows remain positive.',
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
- `thesis` required
- `token` optional
- `chain` optional
- `mode`: `plan` or `execute`
- `budgetProfile`: `safe` or `expanded`
- `maxCalls` optional override
- `maxCredits` optional override
- `format`: `shell`, `json`, or `markdown`
- `writeArtifacts` optional
- `artifactDir` optional

## Outputs
- `report`: structured JSON report
- `markdown`: human-readable report
- `shellOutput`: product-style terminal output
- `output`: requested format payload
- `run`: underlying planner run and evidence trace

## Budget guidance
- `safe`: use for first live validation
- `expanded`: use only when a thesis truly needs deeper evidence

If the user is not explicitly asking to spend more credits, prefer `safe`.

## Recommended agent response pattern
1. Restate the thesis briefly.
2. Say whether you are planning or executing.
3. Run Thesis Battlefield.
4. Return:
   - verdict
   - strongest supporting case
   - strongest contradictory case
   - next action / whether more credits are justified

## Failure handling
- If `nansen` is not available, tell the user the CLI is missing from the environment.
- If execute mode fails due to auth, tell the user to run `nansen login --api-key <NANSEN_API_KEY>`.
- If a query family returns empty data, surface that as a caveat instead of pretending certainty.

## Repo roles
- `nansen-thesis-battlefield`: skill surface, shell, agent workflow
- `nansen-query-planner`: planning, execution, parsing, verdict logic
