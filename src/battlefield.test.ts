import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { afterEach, describe, expect, test } from 'bun:test'

import { analyzeThesis } from './battlefield'

const tempDirs: string[] = []

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

describe('analyzeThesis', () => {
  test('returns markdown output when requested in plan mode', () => {
    const result = analyzeThesis({
      thesis: 'Smart money is accumulating HYPE',
      mode: 'plan',
      format: 'markdown',
    })

    expect(result.output).toBe(result.markdown)
    expect(result.report.mode).toBe('plan')
  })

  test('writes artifact files when enabled', () => {
    const artifactDir = mkdtempSync(join(tmpdir(), 'battlefield-artifacts-'))
    tempDirs.push(artifactDir)

    analyzeThesis({
      thesis: 'Smart money is accumulating HYPE',
      mode: 'plan',
      writeArtifacts: true,
      artifactDir,
    })

    expect(existsSync(join(artifactDir, 'report.json'))).toBe(true)
    expect(existsSync(join(artifactDir, 'report.md'))).toBe(true)
    expect(existsSync(join(artifactDir, 'shell-output.txt'))).toBe(true)
    expect(readFileSync(join(artifactDir, 'shell-output.txt'), 'utf8')).toContain('THESIS BATTLEFIELD')
  })
})
