# Nansen Thesis Battlefield

Week 1 NansenCLI mini hackathon product shell.

This repo is the Week 1 app surface.
It consumes the shared planner foundation from:
- https://github.com/bitfalt/nansen-query-planner

## One-liner
Paste a thesis or token claim and let the system determine whether onchain reality supports or contradicts it.

## Why this matters
Thesis Battlefield is meant to be an intelligence layer on top of raw Nansen output.
It should help both humans and other agents interpret what the onchain evidence is actually saying.

## Current state
- planner package consumption exists
- planner-backed report flow works in plan mode
- output is machine-consumable for agents / LLMs
- strongest bull/bear slots and caveats are part of the report shape
- next step is stronger live execute-mode evidence handling and final submission packaging

## Development
```bash
bun install
bun run demo
bun run typecheck
```
