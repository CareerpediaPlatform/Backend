import logger from '../logger'

export function getNumber (input): number {
    try {
      if (typeof input !== 'number') {
        input = parseInt(input, 10)
      }
    } catch (e) {
      logger.debug('ERROR in getNumber')
      throw e
    }
    return input
  }

  export function isNull (obj: any): boolean {
    return obj == null || obj === undefined
  }
  