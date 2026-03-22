import { demoDefaults, type BattlefieldFormat, type BattlefieldMode, type BudgetProfileName } from './battlefield'

type SharedOptions = {
  thesis: string
  token?: string
  chain?: string
  budgetProfile: BudgetProfileName
  maxCalls: number
  maxCredits?: number
  format: BattlefieldFormat
  writeArtifacts: boolean
  artifactDir: string
}

function parseSharedArgs(argv: string[], defaults: SharedOptions) {
  const options: SharedOptions = { ...defaults }
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

    if (current === '--shell') {
      options.format = 'shell'
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

    if (current === '--budget-profile' && next && (next === 'safe' || next === 'expanded')) {
      options.budgetProfile = next
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
    }
  }

  if (thesisSet && !tokenSet) options.token = undefined
  if (thesisSet && !chainSet) options.chain = undefined

  return options
}

export function parseBattlefieldArgs(argv: string[]) {
  const shared = parseSharedArgs(argv, demoDefaults())
  let mode: BattlefieldMode = 'plan'

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    const next = argv[index + 1]

    if (current === '--mode' && next && (next === 'plan' || next === 'execute')) {
      mode = next
      index += 1
    }
  }

  return { ...shared, mode }
}

export function parseDemoArgs(argv: string[]) {
  return parseSharedArgs(argv, demoDefaults())
}
