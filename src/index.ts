import { buildWeekOnePlan, buildMarkdownReport, type PlannerRun } from '@bitfalt/nansen-query-planner'

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

const report = buildMarkdownReport(run)
console.log(report)
