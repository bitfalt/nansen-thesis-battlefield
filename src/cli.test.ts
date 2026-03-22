import { describe, expect, test } from 'bun:test'

import { parseBattlefieldArgs, parseDemoArgs } from './cli'

describe('parseBattlefieldArgs', () => {
  test('defaults to plan mode for the agent-facing CLI', () => {
    const options = parseBattlefieldArgs(['--thesis', 'Smart money is accumulating HYPE'])

    expect(options.mode).toBe('plan')
    expect(options.thesis).toBe('Smart money is accumulating HYPE')
    expect(options.token).toBeUndefined()
    expect(options.chain).toBeUndefined()
  })

  test('preserves explicit execute mode and output format', () => {
    const options = parseBattlefieldArgs(['--mode', 'execute', '--json', '--thesis', 'Check HYPE'])

    expect(options.mode).toBe('execute')
    expect(options.format).toBe('json')
  })
})

describe('parseDemoArgs', () => {
  test('inherits demo defaults for demo shell runs', () => {
    const options = parseDemoArgs([])

    expect(options.thesis).toBe('Smart money is accumulating HYPE')
    expect(options.token).toBe('HYPE')
    expect(options.chain).toBe('solana')
    expect(options.format).toBe('shell')
  })
})
