# HANDOFF

This public repo is the product shell and agent skill surface for Thesis Battlefield.

Start here:
- `README.md`
- `SKILL.md`
- `docs/agent-skill.md`

Core commands:
```bash
bun install
bun run typecheck
bun run battlefield -- --thesis "Smart money is accumulating HYPE" --mode plan --budget-profile safe
```

Boundary:
- keep planning, execution, parsing, and verdict logic in `nansen-query-planner`
- keep this repo focused on shell behavior, presentation, and the agent-facing workflow
