import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import type { StructuredReport } from '@bitfalt/nansen-query-planner'

export type ShellRenderOptions = {
  thesis: string
  budgetProfile: 'safe' | 'expanded'
  maxCalls: number
  maxCredits?: number
  artifactDir: string
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

function section(title: string) {
  return `\n${'='.repeat(88)}\n${title}\n${'='.repeat(88)}`
}

function bullet(lines: string[]) {
  return lines.map((line) => `- ${line}`).join('\n')
}

function renderPlan(report: StructuredReport) {
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

function buildAgentPreview(report: StructuredReport) {
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

export function renderShell(report: StructuredReport, options: ShellRenderOptions) {
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
      `mode: ${report.mode} shell surface backed by the reusable planner package`,
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
      `claim focus: ${report.thesisProfile?.claimFocus ?? 'general'}`,
      `inference confidence: ${report.thesisProfile?.confidence ?? 'low'}`,
      ...((report.thesisProfile?.reasoning ?? []).map((reason) => `inference: ${reason}`)),
    ]),
    section('Planner Summary'),
    bullet([
      `planned queries: ${report.plannerSummary.totalQueries}`,
      `executed queries: ${report.plannerSummary.executedQueries}`,
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

export function writeArtifacts(report: StructuredReport, markdown: string, shellOutput: string, artifactDir: string) {
  mkdirSync(artifactDir, { recursive: true })
  writeFileSync(join(artifactDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
  writeFileSync(join(artifactDir, 'report.md'), `${markdown.trimEnd()}\n`)
  writeFileSync(join(artifactDir, 'shell-output.txt'), `${shellOutput.trimEnd()}\n`)
}
