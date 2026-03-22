#!/usr/bin/env bun
import { analyzeThesis } from '../src/battlefield'
import { parseBattlefieldArgs } from '../src/cli'

function main() {
  const options = parseBattlefieldArgs(process.argv.slice(2))
  const result = analyzeThesis(options)
  console.log(result.output)
}

main()
