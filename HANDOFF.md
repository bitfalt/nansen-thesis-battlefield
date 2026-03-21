# HANDOFF

Last updated: 2026-03-21

## What this repo is
This is the Week 1 app shell for Thesis Battlefield.

Shared planner foundation:
- https://github.com/bitfalt/nansen-query-planner

## Current status
What works now:
- the app-shell repo installs
- typecheck passes
- `bun run demo` works
- it consumes the shared planner package
- the planner emits a structured JSON report suitable for agents / LLMs
- the planner also emits a markdown report for humans

What is still not fully finished:
- richer live evidence display in the shell
- final screenshots / polished public assets
- final Week 1 packaging choices

## Core story to preserve
Thesis Battlefield is not just a query wrapper.
It is an intelligence layer that:
- accepts a thesis
- uses a budget-aware planner
- gathers evidence
- emits a structured verdict with caveats and next questions

## Most important docs
- `README.md`
- `docs/demo-runbook.md`
- `docs/submission-copy.md`
- `docs/submission-asset-checklist.md`
- `docs/x-posts.md`

## Recommended next work
1. Improve how the shell presents execute-mode evidence.
2. Select the best screenshot/report artifact for public submission.
3. Finalize the exact X submission post.
4. Keep the shell thin and let the foundation repo handle deeper intelligence logic.

## Commands
```bash
bun install
bun run typecheck
bun run demo
```

## OpenCode note
If using OpenCode, keep this repo focused on the shell/presentation layer.
Do not start reimplementing planner logic here.
