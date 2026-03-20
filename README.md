# Nansen Thesis Battlefield

Week 1 NansenCLI mini hackathon product shell.

This repo is the Week 1 app surface.
It consumes the shared planner foundation from:
- https://github.com/bitfalt/nansen-query-planner

## One-liner
Paste a thesis or token claim and let the system determine whether onchain reality supports or contradicts it.

## Current state
- package consumption exists
- planner-backed report flow works in plan mode
- output is now machine-consumable for agents / LLMs via structured JSON
- next step is stronger live execute-mode evidence handling and final submission packaging

## Development
```bash
bun install
bun run demo
bun run typecheck
```
