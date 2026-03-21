# Thesis Battlefield Report

## Thesis
Smart money is accumulating HYPE

## Token
HYPE on solana

## Mode
plan

## Executed
no

## Verdict
- Decision: INCONCLUSIVE
- Confidence: low
- Explanation: The query plan exists, but there is not enough executed evidence yet to support a real directional verdict.
- Bull signal: 0
- Bear signal: 0

## Planner Summary
- Total queries: 10
- Executed queries: 0
- Categories: search, token

## LLM/Agent Summary
- One sentence: INCONCLUSIVE (low) on thesis: Smart money is accumulating HYPE
- Analyst take: The query plan exists, but there is not enough executed evidence yet to support a real directional verdict.
- Next action: Run a bounded execute-mode validation.

## Strongest Bull Evidence
- None yet

## Strongest Bear Evidence
- None yet

## Agent Summary
- Strongest bull case: No strong bull-side evidence yet.
- Strongest bear case: No strong bear-side evidence yet.

## Caveats
- The report is based on planning mode only; live evidence has not been collected yet.
- Only a small subset of the planned investigation has been executed so far.

## Planned Queries
1. Resolve entity and search context
   - nansen research search --query "HYPE" --limit 5
   - Why: Confirm the entity and collect the first contextual anchors.
2. Get token info
   - nansen research token info --chain solana --token HYPE
   - Why: Establish the token identity, contract, and basic metadata.
3. Inspect token indicators
   - nansen research token indicators --chain solana --token HYPE
   - Why: Pull high-level market and risk indicators that could support or weaken the thesis.
4. 7-day token flows
   - nansen research token flows --chain solana --token HYPE --days 7
   - Why: Check short-term net flow pressure and direction.
5. 30-day token flows
   - nansen research token flows --chain solana --token HYPE --days 30
   - Why: Compare short-term thesis to medium-term capital movement.
6. Flow intelligence
   - nansen research token flow-intelligence --chain solana --token HYPE --days 7
   - Why: Identify the quality and character of capital flows.
7. Holder distribution
   - nansen research token holders --chain solana --token HYPE
   - Why: Check concentration and holder quality risk.
8. Who bought and sold recently
   - nansen research token who-bought-sold --chain solana --token HYPE --days 7
   - Why: Identify directional participants and opposing evidence.
9. PnL snapshot
   - nansen research token pnl --chain solana --token HYPE --days 30
   - Why: See whether current positioning looks healthy or crowded.
10. OHLCV context
   - nansen research token ohlcv --chain solana --token HYPE --timeframe 1h
   - Why: Add price-action context to the evidence set.

## Evidence Items
- No evidence collected yet

## Query Trace
- nansen research search --query "HYPE" --limit 5
- nansen research token info --chain solana --token HYPE
- nansen research token indicators --chain solana --token HYPE
- nansen research token flows --chain solana --token HYPE --days 7
- nansen research token flows --chain solana --token HYPE --days 30
- nansen research token flow-intelligence --chain solana --token HYPE --days 7
- nansen research token holders --chain solana --token HYPE
- nansen research token who-bought-sold --chain solana --token HYPE --days 7
- nansen research token pnl --chain solana --token HYPE --days 30
- nansen research token ohlcv --chain solana --token HYPE --timeframe 1h

## Next Questions
- Which executed query produced the strongest contradictory signal?
- Should we spend more credits on profiler follow-ups or stop here?
- What additional evidence would change the verdict materially?
