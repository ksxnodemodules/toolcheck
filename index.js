'use strict'
const { lookpath } = require('lookpath')

/**
 * Check required executables
 * @param config Configuration loaded by cosmiconfig
 * @param config.names Names of required executables
 * @returns A promise that resolves when requirement is met, rejects for otherwise
 */
async function main (config = {}) {
  if (typeof config !== 'object' || !config) {
    throw new TypeError('config must be an object')
  }

  const {
    names = []
  } = config

  if (!(names instanceof Array)) {
    throw new TypeError('config.names must be an array')
  }

  const programDict = {}
  const notFoundList = []

  for (const executable of names) {
    if (typeof executable !== 'string') {
      throw new TypeError(`config.names contains non-string member: ${JSON.stringify(executable)}`)
    }

    const realPath = await lookpath(executable)
    if (realPath) {
      programDict[executable] = realPath
    } else {
      notFoundList.push(executable)
    }
  }

  if (notFoundList.length) throw new NotFoundError(notFoundList)

  return programDict
}

class NotFoundError extends Error {
  constructor (list) {
    super(`One or more executables is not found: ${list.join(', ')}`)
    this.list = list
  }
}

module.exports = Object.assign(main, { NotFoundError })
