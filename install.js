'use strict'
const process = require('process')
const { cosmiconfig } = require('cosmiconfig')
const check = require('./index')
const { name } = require('./package.json')

async function main () {
  const result = await cosmiconfig(name).search()
  if (!result) return null
  return check(result.config)
}

main().then(
  () => process.exit(0),
  error => {
    if (error instanceof check.NotFoundError) {
      console.error('[ERROR] One or more required programs is missing:')
      error.list.forEach(name => console.error(`  - ${name}`))
      process.exit(1)
    } else {
      console.error(error)
      process.exit(-1)
    }
  }
)
