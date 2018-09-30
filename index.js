'use strict'
const which = require('which').sync

/**
 * Check required executables
 * @param config Configration loaded by cosmiconfig
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
  const externalErrorReport = {}

  for (const executable of names) {
    if (typeof executable !== 'string') {
      throw new TypeError(`config.names contains non-string member`)
    }

    try {
      programDict[executable] = which(executable)
    } catch (error) {
      if (/not found/i.test(error.message)) {
        notFoundList.push(executable)
      } else {
        externalErrorReport[executable] = error
      }
    }
  }

  if (notFoundList.length) throw new NotFoundError(notFoundList)
  if (Object.keys(externalErrorReport).length) throw new ExternalError(externalErrorReport)

  return programDict
}

class NotFoundError extends Error {
  constructor (list) {
    super(`One or more executables is not found: ${list.join(', ')}`)
    this.list = list
  }
}

class ExternalError extends Error {
  constructor (report) {
    super('Failed to inspect some executables')
    this.report = report
  }
}

module.exports = Object.assign(main, { NotFoundError, ExternalError })
