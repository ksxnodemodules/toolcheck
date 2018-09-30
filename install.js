'use strict'
const process = require('process')
const config = require('cosmiconfig')('toolchain')
const check = require('./index')

check(config).then(
  () => process.exit(0),
  error => {
    if (error instanceof check.NotFoundError) {
      console.error('[ERROR] One or more required programs is missing')
      error.list.forEach(name => console.info(`- Missing ${name}`))
      process.exit(1)
    } else {
      console.error(error)
      process.exit(-1)
    }
  }
)
