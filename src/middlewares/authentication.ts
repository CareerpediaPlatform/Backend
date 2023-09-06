import { AUTHENTICATION } from '../constants/app_defaults'
import { ErrorCodes, ErrorMessages } from '../constants/error_constants'
import { HttpStatusCodes } from '../constants/status_codes'
import { NextFunction, Response } from 'express'
import { verifyAccessToken } from '../helpers/authentication'
import { responseBuilder } from '../helpers/response_builder'
import logger from '../logger'
import { APIError, ServiceResponse, UserSession } from '../models'
import * as nodeUtil from 'util'

const TAG = 'authentication'

export function isAuthenticated (req: any, res: Response, next: NextFunction): void {
  if (AUTHENTICATION.enabled) {
    logger.info(`${TAG}.isAuthenticated()`)
    let token = null
    if (req.headers.authorization != null && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.query?.token != null) {
      token = req.query.token
    }
    try {
      if (token === null) {
        logger.debug('TOKEN is missing!')
        const response = new ServiceResponse(HttpStatusCodes.UNAUTHORIZED, 'Token Required.', null, true,
          [new APIError('Token required.', ErrorCodes.UNAUTHORIZED, 'jwtToken')])
        return responseBuilder(response, res, next, req)
      }
      const decode: any = verifyAccessToken(token)
      req.userSession = new UserSession(decode.userId, decode.role, decode.userName)
      logger.debug('LOGGED IN USER:' + nodeUtil.inspect(req.userSession))
      next()
    } catch (error) {
      logger.error('ERROR occurred in isAuthenticated() ', error)
      let response = new ServiceResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR,
        ErrorMessages.INTERNAL_SERVER_ERROR, true,
        [new APIError('Token required.', ErrorCodes.UNAUTHORIZED, 'jwtToken')])
      if (error?.message === 'jwt expired') {
        response = new ServiceResponse(HttpStatusCodes.UNAUTHORIZED,
          ErrorMessages.SESSION_EXPIRED, true,
          [new APIError('Token expired.', ErrorCodes.UNAUTHORIZED, 'jwtToken')])
      } else if (error?.message === 'invalid signature') {
        response = new ServiceResponse(HttpStatusCodes.UNAUTHORIZED,
          ErrorMessages.INVALID_FIELD.replace('$field', 'Token'), true,
          [new APIError('Invalid token.', ErrorCodes.UNAUTHORIZED, 'jwtToken')])
      }
      responseBuilder(response, res, next, req)
    }
  } else {
    next()
  }
}
