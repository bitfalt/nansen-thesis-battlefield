import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  resolveBudgetProfile,
  buildMarkdownReport,
  buildStructuredReport,
  buildWeekOnePlan,
  type PlannerRun,
} from '@bitfalt/nansen-query-planner'

type OutputFormat = 'shell' | 'json' | 'markdown'

type DemoOptions = {
  thesis: string
  token?: string
  chain?: string
  budgetProfile: 'safe' | 'expanded'
  maxCalls: number
  maxCredits?: number
  format: OutputFormat
  writeArtifacts: boolean
  artifactDir: string
}

type DemoReport = ReturnType<typeof buildStructuredReport>

const SAFE_BUDGET = resolveBudgetProfile('safe')

const DEFAULT_OPTIONS: DemoOptions = {
  thesis: 'Smart money is accumulating HYPE',
  token: 'HYPE',
  chain: 'solana',
  budgetProfile: 'safe',
  maxCalls: SAFE_BUDGET.maxCalls,
  maxCredits: SAFE_BUDGET.maxCredits,
  format: 'shell',
  writeArtifacts: false,
  artifactDir: 'artifacts/week1-demo',
}

const VALIDATED_LIVE_STATUS = {
  confirmed: [
    'q1 search smoke test resolves the thesis target safely.',
    'q1 -> q2 bounded execute-mode validation works and returns usable token context.',
  ],
  constrained: [
    'A deeper 4-call attempt reached CREDITS_EXHAUSTED after the first two successful queries.',
    'Premium and label-heavy families still need intentionally bounded follow-up validation.',
  ],
  policy: 'Default low-cost path is q1 search -> q2 token info -> stop and inspect before spending more credits.',
}

function parseArgs(argv: string[]): DemoOptions {
  const options = { ...DEFAULT_OPTIONS }
  let thesisSet = false
  let tokenSet = false
  let chainSet = false

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    const next = argv[index + 1]

    if (current === '--json') {
      options.format = 'json'
      continue
    }

    if (current === '--markdown') {
      options.format = 'markdown'
      continue
    }

    if (current === '--write-artifacts') {
      options.writeArtifacts = true
      continue
    }

    if (current === '--thesis' && next) {
      options.thesis = next
      thesisSet = true
      index += 1
      continue
    }

    if (current === '--token' && next) {
      options.token = next
      tokenSet = true
      index += 1
      continue
    }

    if (current === '--chain' && next) {
      options.chain = next
      chainSet = true
      index += 1
      continue
    }

    if (current === '--artifact-dir' && next) {
      options.artifactDir = next
      index += 1
      continue
    }

    if (current === '--budget-profile' && next) {
      const profile = resolveBudgetProfile(next)
      options.budgetProfile = profile.name
      options.maxCalls = profile.maxCalls
      options.maxCredits = profile.maxCredits
      index += 1
      continue
    }

    if (current === '--max-calls' && next) {
      const value = Number(next)
      if (Number.isFinite(value) && value > 0) {
        options.maxCalls = value
      }
      index += 1
      continue
    }

    if (current === '--max-credits' && next) {
      const value = Number(next)
      if (Number.isFinite(value) && value > 0) {
        options.maxCredits = value
      } else {
        options.maxCredits = undefined
      }
      index += 1
    }
  }

  if (thesisSet && !tokenSet) {
    options.token = undefined
  }

  if (thesisSet && !chainSet) {
    options.chain = undefined
  }

  return options
}

function section(title: string) {
  return `\n${'='.repeat(88)}\n${title}\n${'='.repeat(88)}`
}

function bullet(lines: string[]) {
  return lines.map((line) => `- ${line}`).join('\n')
}

function renderPlan(report: DemoReport) {
  return report.plannedQueries
    .map((step, index) => {
      return [
        `[${index + 1}] ${step.label}`,
        `  id: ${step.id} | family: ${step.queryFamily} | category: ${step.category} | expected signal: ${step.expectedSignal}`,
        `  estimated cost: ${step.estimatedCostCredits} credits`,
        `  why: ${step.rationale}`,
        `  cmd: ${step.command}`,
      ].join('\n')
    })
    .join('\n\n')
}

function buildAgentPreview(report: DemoReport) {
  return {
    reportType: report.reportType,
    runId: report.runId,
    thesis: report.thesis,
    token: report.token,
    chain: report.chain,
    verdict: report.verdict,
    plannerSummary: report.plannerSummary,
    llmSummary: report.llmSummary,
    caveats: report.caveats,
    nextQuestions: report.nextQuestions,
    agentSummary: report.agentSummary,
    thesisProfile: report.thesisProfile,
    plannedQueryCount: report.plannedQueries.length,
    queryTracePreview: report.queryTrace.slice(0, 3),
  }
}

function renderShell(report: DemoReport, options: DemoOptions) {
  const agentPreview = JSON.stringify(buildAgentPreview(report), null, 2)

  return [
    'THESIS BATTLEFIELD',
    'Week 1 shell for turning a token thesis into a budget-aware Nansen investigation.',
    '',
    bullet([
      `thesis: ${options.thesis}`,
      `token: ${report.token}`,
      `chain: ${report.chain}`,
      `planner profile: ${options.budgetProfile}`,
      `planner caps: ${options.maxCalls} calls${options.maxCredits ? ` / ${options.maxCredits} credits` : ''}`,
      'mode: offline shell preview backed by the reusable planner package',
    ]),
    section('Judge Scan'),
    bullet([
      'This repo is the product shell, not the planner engine.',
      'The shell surfaces the investigation path, verdict framing, caveats, and agent handoff in one place.',
      'The default demo stays offline and credit-safe while still showing the real report contract.',
      `This thesis was profiled as: ${report.thesisProfile?.lenses.join(', ') ?? 'general research'}.`,
      'Use bounded live runs only when a concrete product question is worth the spend.',
    ]),
    section('Thesis Profile'),
    bullet([
      `search query: ${report.thesisProfile?.searchQuery ?? report.token}`,
      `token hint: ${report.thesisProfile?.tokenHint ?? report.token}`,
      `chain hint: ${report.thesisProfile?.chainHint ?? report.chain}`,
      `lenses: ${report.thesisProfile?.lenses.join(', ') ?? 'none'}`,
      `claim polarity: ${report.thesisProfile?.claimPolarity ?? 'positive'}`,
      `inference confidence: ${report.thesisProfile?.confidence ?? 'low'}`,
      ...((report.thesisProfile?.reasoning ?? []).map((reason) => `inference: ${reason}`)),
    ]),
    section('Planner Summary'),
    bullet([
      `planned queries: ${report.plannerSummary.totalQueries}`,
      `executed queries in this preview: ${report.plannerSummary.executedQueries}`,
      `categories: ${report.plannerSummary.categories.join(', ')}`,
      `estimated credits for this plan: ${report.plannerSummary.estimatedTotalCredits}`,
      `verdict now: ${report.verdict.decision} (${report.verdict.confidence})`,
      `next action: ${report.llmSummary.nextAction}`,
    ]),
    section('Investigation Plan'),
    renderPlan(report),
    section('Human Readout'),
    bullet([
      `one-line take: ${report.llmSummary.oneSentence}`,
      `analyst take: ${report.llmSummary.analystTake}`,
      `strongest supporting case: ${report.agentSummary.strongestBullCase}`,
      `strongest contradictory case: ${report.agentSummary.strongestBearCase}`,
      ...report.caveats.map((caveat) => `caveat: ${caveat}`),
    ]),
    section('Validated Live Status'),
    bullet([
      ...VALIDATED_LIVE_STATUS.confirmed.map((item) => `confirmed: ${item}`),
      ...VALIDATED_LIVE_STATUS.constrained.map((item) => `constraint: ${item}`),
      `policy: ${VALIDATED_LIVE_STATUS.policy}`,
    ]),
    section('Agent Handoff Preview'),
    agentPreview,
    section('Artifacts'),
    bullet([
      `markdown artifact: ${join(options.artifactDir, 'report.md')}`,
      `json artifact: ${join(options.artifactDir, 'report.json')}`,
      `terminal artifact: ${join(options.artifactDir, 'shell-output.txt')}`,
      'run `bun run demo -- --write-artifacts` to refresh the offline artifact pack.',
    ]),
  ].join('\n')
}

function writeArtifacts(report: DemoReport, markdown: string, shellOutput: string, artifactDir: string) {
  mkdirSync(artifactDir, { recursive: true })
  writeFileSync(join(artifactDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
  writeFileSync(join(artifactDir, 'report.md'), `${markdown.trimEnd()}\n`)
  writeFileSync(join(artifactDir, 'shell-output.txt'), `${shellOutput.trimEnd()}\n`)
}

function main() {
  const options = parseArgs(process.argv.slice(2))
  const run: PlannerRun = {
    runId: 'demo-week-1',
    input: {
      thesis: options.thesis,
      token: options.token,
      chain: options.chain,
      mode: 'plan',
      maxCalls: options.maxCalls,
      maxCredits: options.maxCredits,
    },
    steps: buildWeekOnePlan({
      thesis: options.thesis,
      token: options.token,
      chain: options.chain,
      mode: 'plan',
      maxCalls: options.maxCalls,
      maxCredits: options.maxCredits,
    }),
    evidence: [],
    executed: false,
  }

  const report = buildStructuredReport(run)
  const markdown = buildMarkdownReport(run)
  const shellOutput = renderShell(report, options)

  if (options.writeArtifacts) {
    writeArtifacts(report, markdown, shellOutput, options.artifactDir)
  }

  if (options.format === 'json') {
    console.log(JSON.stringify(report, null, 2))
    return
  }

  if (options.format === 'markdown') {
    console.log(markdown)
    return
  }

  console.log(shellOutput)
}

main()
