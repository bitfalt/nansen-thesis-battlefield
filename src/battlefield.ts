import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

import {
  buildMarkdownReport,
  buildStructuredReport,
  buildWeekOnePlan,
  executePlan,
  resolveBudgetProfile,
  type PlannerRun,
  type StructuredReport,
} from '@bitfalt/nansen-query-planner'

import { renderShell, writeArtifacts, type ShellRenderOptions } from './render'

export type BattlefieldMode = 'plan' | 'execute'
export type BattlefieldFormat = 'shell' | 'json' | 'markdown'
export type BudgetProfileName = 'safe' | 'expanded'

export type AnalyzeThesisOptions = {
  thesis: string
  token?: string
  chain?: string
  mode?: BattlefieldMode
  budgetProfile?: BudgetProfileName
  maxCalls?: number
  maxCredits?: number
  format?: BattlefieldFormat
  writeArtifacts?: boolean
  artifactDir?: string
  runId?: string
}

export type AnalyzeThesisResult = {
  run: PlannerRun
  report: StructuredReport
  markdown: string
  shellOutput: string
  output: string
  artifactDir: string
}

export type CliOptions = AnalyzeThesisOptions & {
  format: BattlefieldFormat
}

const SAFE_BUDGET = resolveBudgetProfile('safe')

function createRunId() {
  return `battlefield_${new Date().toISOString().replace(/[:.]/g, '-')}`
}

export function normalizeOptions(options: AnalyzeThesisOptions): Required<Omit<CliOptions, 'token' | 'chain'>> & {
  token?: string
  chain?: string
} {
  const profile = resolveBudgetProfile(options.budgetProfile ?? 'safe')

  return {
    thesis: options.thesis,
    token: options.token,
    chain: options.chain,
    mode: options.mode ?? 'plan',
    budgetProfile: profile.name,
    maxCalls: options.maxCalls ?? profile.maxCalls,
    maxCredits: options.maxCredits ?? profile.maxCredits,
    format: options.format ?? 'shell',
    writeArtifacts: options.writeArtifacts ?? false,
    artifactDir: options.artifactDir ?? 'artifacts/week1-demo',
    runId: options.runId ?? createRunId(),
  }
}

function buildRun(options: ReturnType<typeof normalizeOptions>): PlannerRun {
  return {
    runId: options.runId,
    input: {
      thesis: options.thesis,
      token: options.token,
      chain: options.chain,
      mode: options.mode,
      maxCalls: options.maxCalls,
      maxCredits: options.maxCredits,
    },
    steps: buildWeekOnePlan({
      thesis: options.thesis,
      token: options.token,
      chain: options.chain,
      mode: options.mode,
      maxCalls: options.maxCalls,
      maxCredits: options.maxCredits,
    }),
    evidence: [],
    executed: false,
  }
}

function resolveShellOptions(options: ReturnType<typeof normalizeOptions>): ShellRenderOptions {
  return {
    thesis: options.thesis,
    budgetProfile: options.budgetProfile,
    maxCalls: options.maxCalls,
    maxCredits: options.maxCredits,
    artifactDir: options.artifactDir,
  }
}

export function analyzeThesis(options: AnalyzeThesisOptions): AnalyzeThesisResult {
  const normalized = normalizeOptions(options)
  const initialRun = buildRun(normalized)
  const artifactRunDir = join(normalized.artifactDir, 'runs', normalized.runId)

  const run =
    normalized.mode === 'execute'
      ? executePlan(initialRun, artifactRunDir)
      : initialRun

  if (normalized.writeArtifacts && normalized.mode === 'execute') {
    mkdirSync(artifactRunDir, { recursive: true })
  }

  const report = buildStructuredReport(run)
  const markdown = buildMarkdownReport(run)
  const shellOutput = renderShell(report, resolveShellOptions(normalized))

  if (normalized.writeArtifacts) {
    writeArtifacts(report, markdown, shellOutput, normalized.artifactDir)
  }

  const output =
    normalized.format === 'json'
      ? JSON.stringify(report, null, 2)
      : normalized.format === 'markdown'
        ? markdown
        : shellOutput

  return {
    run,
    report,
    markdown,
    shellOutput,
    output,
    artifactDir: normalized.artifactDir,
  }
}

export function demoDefaults() {
  return {
    thesis: 'Smart money is accumulating HYPE',
    token: 'HYPE',
    chain: 'solana',
    budgetProfile: 'safe' as const,
    maxCalls: SAFE_BUDGET.maxCalls,
    maxCredits: SAFE_BUDGET.maxCredits,
    format: 'shell' as const,
    writeArtifacts: false,
    artifactDir: 'artifacts/week1-demo',
  }
}
