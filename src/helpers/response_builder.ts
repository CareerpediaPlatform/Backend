import { NextFunction, Request, Response } from 'express'
import { isArray, isEmpty, isObject, transform } from 'lodash'
import log from '../logger'
import { IServiceResponse } from '../models'

export function cleanResponseData (responseData: any): any {
  try {
    function nestedDataClean (nestedObject): void {
      return transform(nestedObject, (result, value, key) => {
        const isCollection: boolean = isObject(value)
        const cleaned = isCollection ? nestedDataClean(value) : value

        if (isCollection && isEmpty(cleaned)) {
          return
        } else if (typeof value === 'undefined' || value === null) {
          return
        }

        if (isArray(result)) {
          result.push(cleaned)
        } else {
          (result[key] = cleaned)
        }
      })
    }

    return isObject(responseData) ? nestedDataClean(responseData) : responseData
  } catch (error) {
    log.error('ERROR occurred in helpers.dto.')
    throw error
  }
}

export function responseBuilder (serviceResponse: IServiceResponse, res: Response, next?: NextFunction, req?: Request): void {
  log.info('helper.response_builder.responseBuilder()')
  try {
    res.set('message', serviceResponse.message)
    if (req.method === 'GET') {
      res.set('showMessage', String(serviceResponse?.showMessage ?? false))
    } else {
      res.set('showMessage', String(serviceResponse.showMessage))
    }
    if (serviceResponse.errors && serviceResponse.errors.length !== 0) {
      res.status(serviceResponse.statusCode ?? 400).send({ errors: serviceResponse.errors })
    } else {
      res.status(serviceResponse.statusCode ?? (req.method === 'POST' ? 201 : 200)).send(
        serviceResponse)
    }
  } catch (error) {
    log.error('ERROR occurred in helper.response_builder.responseBuilder()', error)
    next(error)
  }
}
