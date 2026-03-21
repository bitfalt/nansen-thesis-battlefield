# Thesis Battlefield Report

## Thesis
Smart money is accumulating HYPE

## Token
HYPE on solana

## Thesis Profile
- Search query: HYPE
- Token hint: HYPE
- Chain hint: solana
- Lenses: smart-money, flows
- Inference confidence: high

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
   - Why: Confirm the entity, resolve the best token candidate, and collect the first contextual anchors.
2. Get token info
   - nansen research token info --chain solana --token HYPE
   - Why: Establish the token identity, contract, market structure, and baseline metadata.
3. 7-day token flows
   - nansen research token flows --chain solana --token HYPE --days 7
   - Why: Check short-term net flow pressure, recent capital direction, and whether the move is accelerating.
4. Flow intelligence
   - nansen research token flow-intelligence --chain solana --token HYPE --days 7
   - Why: Identify the quality, source, and character of the capital flows behind the thesis.
5. 30-day token flows
   - nansen research token flows --chain solana --token HYPE --days 30
   - Why: Compare the short-term claim to medium-term capital movement and persistence.
6. Who bought and sold recently
   - nansen research token who-bought-sold --chain solana --token HYPE --days 7
   - Why: Identify directional participants, smart-money behavior, and opposing evidence.
7. Inspect token indicators
   - nansen research token indicators --chain solana --token HYPE
   - Why: Pull high-level market, momentum, and risk indicators that could support or weaken the thesis.
8. Holder distribution
   - nansen research token holders --chain solana --token HYPE
   - Why: Check concentration, holder quality, and whether the ownership base contradicts the thesis.
9. PnL snapshot
   - nansen research token pnl --chain solana --token HYPE --days 30
   - Why: See whether current positioning looks healthy, crowded, or vulnerable to reversal.
10. OHLCV context
   - nansen research token ohlcv --chain solana --token HYPE --timeframe 1h
   - Why: Add price-action context to the evidence set and test whether momentum confirms the thesis.

## Evidence Items
- No evidence collected yet

## Query Trace
- nansen research search --query "HYPE" --limit 5
- nansen research token info --chain solana --token HYPE
- nansen research token flows --chain solana --token HYPE --days 7
- nansen research token flow-intelligence --chain solana --token HYPE --days 7
- nansen research token flows --chain solana --token HYPE --days 30
- nansen research token who-bought-sold --chain solana --token HYPE --days 7
- nansen research token indicators --chain solana --token HYPE
- nansen research token holders --chain solana --token HYPE
- nansen research token pnl --chain solana --token HYPE --days 30
- nansen research token ohlcv --chain solana --token HYPE --timeframe 1h

## Next Questions
- Which executed query produced the strongest contradictory signal?
- Should we spend more credits on profiler follow-ups or stop here?
- What additional evidence would change the verdict materially?
