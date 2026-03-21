# Nansen Thesis Battlefield

Week 1 product shell for the NansenCLI mini hackathon.

This repo owns the Week 1 surface and consumes the reusable planner foundation from:
- https://github.com/bitfalt/nansen-query-planner

## One-liner
Turn a crypto thesis into a budget-aware Nansen investigation and return a verdict surface that both humans and agents can use.

## What the shell does
- presents the thesis as an investigation, not a raw query dump
- shows the ordered query plan and why each step exists
- surfaces verdict framing, caveats, and next questions in a judge-friendly shell
- preserves the machine-consumable JSON contract for agents / LLMs
- keeps Week 1 offline by default so demo polish does not waste credits

## Why it matters
Thesis Battlefield is meant to be an intelligence layer on top of raw Nansen output.
The point is not just to fetch data, but to show whether current onchain evidence supports, weakens, or fails to confirm a claim.

## Current Week 1 status
- reusable planner package is wired into the shell
- offline demo now renders a product-like terminal surface instead of raw JSON only
- report artifacts can be generated for judges and public sharing
- q1 search and q2 token info have been validated live in bounded runs
- deeper execute-mode expansion is still intentionally limited by the credit budget

## Quick start
```bash
bun install
bun run battlefield -- --thesis "Smart money is accumulating HYPE" --mode plan --budget-profile safe
bun run demo
bun run demo:thesis
bun run demo:budget
bun run demo:expanded
bun run demo:artifacts
bun run typecheck
```

## Demo outputs
- `bun run battlefield -- --thesis "..." --mode execute --budget-profile safe` runs the agent-facing thesis analyzer
- `bun run demo` renders the Week 1 shell surface
- `bun run demo:thesis` shows the thesis-first Starknet-style agent flow with planner inference
- `bun run demo:budget` shows the same thesis under the safe budget profile
- `bun run demo:expanded` shows the expanded budget profile for a fuller plan
- `bun run demo:json` prints the full structured report for agents / LLMs
- `bun run demo:markdown` prints the human-readable report
- `bun run demo:artifacts` refreshes the offline artifact pack in `artifacts/week1-demo`

## Artifact pack
The checked-in artifact pack is meant to help judges and reviewers scan the project quickly:
- `artifacts/week1-demo/shell-output.txt`
- `artifacts/week1-demo/report.md`
- `artifacts/week1-demo/report.json`

## Credit discipline
Use the foundation repo's `docs/credit-budget.md` as the source of truth.
Default posture:
- plan first
- bounded live validation second
- only spend more credits when it answers a real product question

## Repo boundary
This repo focuses on:
- shell behavior
- presentation
- demo flow
- submission packaging
- agent-facing workflow / skill surface

The foundation repo focuses on:
- planning
- execution
- evidence extraction
- verdict logic
- structured reports

## Agent skill shape
Thesis Battlefield now exposes a single agent-friendly command and API:
- command: `bun run battlefield -- --thesis "..." --mode execute --budget-profile safe`
- API: `analyzeThesis({ thesis, token?, chain?, mode?, budgetProfile?, format? })`

See `SKILL.md` for the agent-facing skill instructions and `docs/agent-skill.md` for the exact contract.
