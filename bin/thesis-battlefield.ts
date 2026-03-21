#!/usr/bin/env bun
import { analyzeThesis, demoDefaults, type BattlefieldFormat, type BattlefieldMode, type BudgetProfileName } from '../src/battlefield'

function parseArgs(argv: string[]) {
  const defaults = demoDefaults()
  const options: {
    thesis: string
    token?: string
    chain?: string
    budgetProfile: 'safe' | 'expanded'
    maxCalls: number
    maxCredits?: number
    format: BattlefieldFormat
    writeArtifacts: boolean
    artifactDir: string
    mode: BattlefieldMode
  } = { ...defaults, mode: 'plan' }
  let thesisSet = false
  let tokenSet = false
  let chainSet = false

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    const next = argv[index + 1]

    if (current === '--json') {
      options.format = 'json' as BattlefieldFormat
      continue
    }

    if (current === '--markdown') {
      options.format = 'markdown' as BattlefieldFormat
      continue
    }

    if (current === '--shell') {
      options.format = 'shell' as BattlefieldFormat
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

    if (current === '--mode' && next && (next === 'plan' || next === 'execute')) {
      options.mode = next
      index += 1
      continue
    }

    if (current === '--artifact-dir' && next) {
      options.artifactDir = next
      index += 1
      continue
    }

    if (current === '--budget-profile' && next && (next === 'safe' || next === 'expanded')) {
      options.budgetProfile = next as BudgetProfileName
      index += 1
      continue
    }

    if (current === '--max-calls' && next) {
      const value = Number(next)
      if (Number.isFinite(value) && value > 0) options.maxCalls = value
      index += 1
      continue
    }

    if (current === '--max-credits' && next) {
      const value = Number(next)
      if (Number.isFinite(value) && value > 0) options.maxCredits = value
      index += 1
      continue
    }
  }

  if (thesisSet && !tokenSet) options.token = undefined
  if (thesisSet && !chainSet) options.chain = undefined

  return options
}

function main() {
  const options = parseArgs(process.argv.slice(2))
  const result = analyzeThesis(options)
  console.log(result.output)
}

main()
