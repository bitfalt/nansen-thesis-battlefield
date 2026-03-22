import { analyzeThesis } from './battlefield'
import { parseDemoArgs } from './cli'

function main() {
  const options = parseDemoArgs(process.argv.slice(2))
  const result = analyzeThesis({ ...options, mode: 'plan' })
  console.log(result.output)
}

main()
