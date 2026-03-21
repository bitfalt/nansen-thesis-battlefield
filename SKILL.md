# Thesis Battlefield Skill

Use Thesis Battlefield when a user wants to test a crypto thesis against Nansen data with a budget-aware, agent-friendly workflow.

This repo is the skill surface.
The underlying planner/execution engine lives in `@bitfalt/nansen-query-planner`.

## Core rule
Always use a `plan -> explain -> ask -> execute` workflow for live investigations.

- Run `plan` first.
- Explain the inferred asset, chain, budget options, and expected spend.
- Ask the user for approval before any live `execute` run that spends credits.
- Only run `execute` after approval or if the user explicitly asked for live execution and clearly accepted the spend.

Never silently spend credits just because a thesis sounds interesting.

## What this skill does
- turns a freeform thesis into a structured Nansen investigation
- chooses a bounded query plan using the planner engine
- returns a verdict framed as `SUPPORTED`, `CONTRADICTED`, `MIXED`, or `INCONCLUSIVE`
- preserves both human-readable and machine-readable outputs

## Prerequisites
The environment must have:
- this repo installed with `bun install`
- a working Nansen CLI session for live runs

## Install / activate this skill
1. Clone the repo:
```bash
git clone https://github.com/bitfalt/nansen-thesis-battlefield.git
cd nansen-thesis-battlefield
```
2. Install dependencies:
```bash
bun install
```
3. Authenticate the Nansen CLI:
```bash
nansen login --api-key <NANSEN_API_KEY>
```
4. Smoke test the skill in plan mode:
```bash
bun run battlefield -- --thesis "Smart money is accumulating HYPE" --mode plan --budget-profile safe
```

If an agent runtime supports loading a skill file, point it at this repo's `SKILL.md` and make sure the runtime can execute local shell commands in this repository.

## Default behavior

### If the user is brainstorming
- Run `plan` only.
- Do not run `execute`.

### If the user wants a live check
- Still run `plan` first.
- Then present the plan result before running `execute`.

### Budget options to explain
- `safe`: roughly `8` calls / `80` credits
- `expanded`: roughly `10` calls / `200` credits

### Budget selection rule
- If the user did not specify a budget, tell them:
  - what `safe` will approximately spend
  - what `expanded` will approximately spend
  - which budget the planner recommends for this thesis
- Only default straight into `safe` when the user explicitly wants the cheapest first pass.
- Use `expanded` when the thesis bundles multiple claims like flows + momentum + crowding + holder health, or when the planner recommends it.

## Mandatory agent flow

### Step 1: Restate the thesis
Briefly restate what the user is asking.

### Step 2: Run plan mode automatically
Use Thesis Battlefield in `plan` mode first.

Recommended command:
```bash
bun run battlefield -- --thesis "<user thesis>" --mode plan --json
```

### Step 3: Explain the plan before spending credits
Summarize:
- inferred token and chain
- ambiguity warning, if any
- recommended budget profile
- estimated credit spend
- why the planner wants that budget
- what evidence families it plans to check

### Step 4: Ask for approval before execute mode
If the user has not already explicitly approved spending credits, ask a direct approval question such as:

`I can run the safe budget (~80 credits) or the expanded budget (~200 credits). The planner recommends expanded for this thesis. Do you want me to execute it?`

### Step 5: Run execute mode only after approval

Safe execute:
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile safe --json
```

Expanded execute:
```bash
bun run battlefield -- --thesis "<user thesis>" --mode execute --budget-profile expanded --json
```

### Step 6: Explain the result
Return:
- verdict
- strongest supporting case
- strongest contradictory case
- caveats
- whether more credits are justified

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
  mode: 'plan',
  budgetProfile: 'safe',
  format: 'json',
})
```

For live app flows, call the API in `plan` mode first, show the budget recommendation, then call it again in `execute` mode only after approval.

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

## Failure handling
- If `nansen` is not available, tell the user the CLI is missing from the environment.
- If execute mode fails due to auth, tell the user to run `nansen login --api-key <NANSEN_API_KEY>`.
- If a query family returns empty data, surface that as a caveat instead of pretending certainty.
- If the thesis is asset-ambiguous, call that out explicitly before execution.

## Repo roles
- `nansen-thesis-battlefield`: skill surface, shell, agent workflow
- `nansen-query-planner`: planning, execution, parsing, verdict logic
