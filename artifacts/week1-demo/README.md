# Week 1 Demo Artifact Pack

This folder contains the offline artifact pack for the Week 1 Thesis Battlefield shell.

Files:
- `shell-output.txt`: the product-like terminal surface shown by `bun run demo`
- `report.md`: the human-readable report generated from the shared planner contract
- `report.json`: the machine-consumable report for agents / LLMs

Why this pack exists:
- lets judges scan the project quickly without running live queries
- keeps the Week 1 demo useful even when credits are being preserved
- shows the exact handoff surfaces for both humans and downstream agents

Refresh it with:
```bash
bun run demo:artifacts
```
