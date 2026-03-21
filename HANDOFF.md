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
- `bun run demo:artifacts` writes a shareable offline artifact pack
- it consumes the shared planner package
- the planner emits a structured JSON report suitable for agents / LLMs
- the planner also emits a markdown report for humans
- the default shell output is now a product-like terminal surface instead of raw JSON only

What is still not fully finished:
- richer execute-mode evidence display from deeper live runs
- final screenshots / polished public assets
- final Week 1 packaging choices are mostly narrowed to screenshots + final post timing

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
1. Capture 1-2 canonical screenshots from the refreshed shell/artifact pack.
2. If credits are available, do one intentionally bounded live follow-up only if it improves the public demo materially.
3. Publish the selected X post from `docs/x-posts.md`.
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
