/**
 * Check required executables
 * @param config Configration loaded by cosmiconfig
 * @param config.names Names of required executables
 * @returns A promise that resolves when requirement is met, rejects for otherwise
 */
declare function main (config: main.Configuration): Promise<main.Return>

declare namespace main {
  interface Configuration {
    readonly programs: Configuration.ProgramNames
  }

  namespace Configuration {
    type ProgramNames = ReadonlyArray<string>
  }

  interface Return {
    readonly programs: Return.ProgramDict
  }

  namespace Return {
    interface ProgramDict {
      readonly [name: string]: string
    }
  }

  class NotFoundError extends Error {
    readonly list: NotFoundError.List
    constructor (list: NotFoundError.List)
  }

  namespace NotFoundError {
    export type List = Configuration.ProgramNames
  }

  class ExternalError extends Error {
    report: ExternalError.Report
    constructor (list: ExternalError.Report)
  }

  namespace ExternalError {
    interface Report {
      readonly [name: string]: Error
    }
  }
}

export = main
