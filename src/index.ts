import { buildWeekOnePlan, buildStructuredReport, type PlannerRun } from '@bitfalt/nansen-query-planner'

const thesis = 'Smart money is accumulating HYPE'
const token = 'HYPE'
const chain = 'solana'

const run: PlannerRun = {
  runId: 'demo-week-1',
  input: { thesis, token, chain, mode: 'plan', maxCalls: 10 },
  steps: buildWeekOnePlan({ thesis, token, chain, mode: 'plan', maxCalls: 10 }),
  evidence: [],
  executed: false,
}

const report = buildStructuredReport(run)
console.log(JSON.stringify(report, null, 2))
