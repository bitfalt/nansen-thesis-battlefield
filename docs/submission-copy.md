# Week 1 Submission Copy — Thesis Battlefield

## One-liner
Thesis Battlefield turns a crypto thesis into a budget-aware Nansen investigation and returns a structured verdict that both humans and agents can use.

## Short description
Paste a thesis or token claim, let the system plan the best Nansen queries under a limited budget, and receive a verdict with confidence, evidence summaries, query trace, caveats, and next questions.

## Longer description
Crypto research is full of strong claims, weak evidence, and noisy narratives.

Thesis Battlefield is our Week 1 shell built on top of the reusable Nansen Query Planner. Instead of dumping raw analytics, it treats research like an agentic investigation:
- parse the thesis
- choose the best next Nansen queries
- preserve cost awareness
- normalize evidence
- produce a verdict with a traceable reasoning surface

The output is intentionally dual-purpose:
- a human-readable markdown report
- a machine-consumable JSON report for agents / LLMs

That makes Thesis Battlefield more than a query wrapper. It acts as an intelligence layer that helps another system — or a human researcher — decide what the current onchain evidence actually says.

## Why it is interesting
- not a dashboard
- not a whale-bot clone
- not just a CLI wrapper
- one reusable engine with visible query planning and evidence logic
- built to compound into future Nansen week submissions

## Honest current limitation statement
The current version validates the first live execute-mode path and already produces structured reports, but deeper evidence extraction across more Nansen query families is still being expanded.
