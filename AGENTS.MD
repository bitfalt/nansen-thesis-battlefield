# AGENTS.MD

This repository is the product shell and agent skill surface for Thesis Battlefield.

## Repository role
This repo is the user-facing/app-shell surface for Week 1.
It should consume the shared planner foundation from:
- https://github.com/bitfalt/nansen-query-planner

Do not duplicate planner logic here unless there is a very strong app-shell-only reason.

## Product mission
Thesis Battlefield is meant to be an intelligence layer on top of raw Nansen output.

It should help:
- humans understand whether a thesis is supported by current onchain evidence
- agents/LLMs consume the report as structured evidence and verdict context

## Non-negotiable rules
- Commits must be atomic.
- Commits must be in English.
- Commits must follow Conventional Commits.
- Do not commit secrets.
- Do not hardcode local personal secret paths.

## What already works
- package consumption from the foundation repo
- plan-mode demo output
- structured JSON report shape
- markdown report shape in the foundation repo
- strongest bull/bear evidence slots
- caveats and next questions in the report

## What still needs work
- sharper execute-mode presentation for live runs
- continued polish of the agent-facing workflow
- optional future packaging beyond the local CLI/skill flow

## Credit discipline
Use the planner foundation repo's `docs/credit-budget.md` as the source of truth.
Do not trigger unnecessary live runs from this repo.

## If OpenCode or another agent picks this up
Read in this order:
1. `README.md`
2. `SKILL.md`
3. `docs/agent-skill.md`
4. `artifacts/week1-demo/README.md`

## Main boundary
This repo should focus on:
- presentation
- shell behavior
- user/demo flow
- agent-facing workflow

The foundation repo should focus on:
- planning
- execution
- evidence extraction
- verdict logic
- structured reports
