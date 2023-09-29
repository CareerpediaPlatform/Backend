import { PathParams } from '../constants/api_param_constants'
// import { USER_ACTIONS } from '../constants/api_action_constants'
import { ErrorCodes, ErrorMessages } from '../constants/error_constants'
// import { USER_ROLES } from '../constants/master_data_constants'
import { HttpStatusCodes } from '../constants/status_codes'
import { NextFunction, Response } from 'express'
import { responseBuilder } from '../helpers/response_builder'
import logger from '../logger'
import { APIError, ServiceResponse } from '../models'
import * as nodeUtil from 'util'

export function isAdmin (req: any, res: Response, next: NextFunction): void {
  const response = new ServiceResponse(HttpStatusCodes.FORBIDDEN,
      ErrorMessages.FORBIDDEN, true)
  try {
    logger.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession))
    if (USER_ROLES['3'].name === req?.userSession?.role) {
      next()
    } else {
      response.message = 'You are not authorized to perform this action.'
      response.statusCode = HttpStatusCodes.FORBIDDEN
      response.addError(new APIError('You are not authorized to perform this action.', ErrorCodes.UNAUTHORIZED, 'role'))
      responseBuilder(response, res, next, req)
    }
  } catch (error) {
    logger.error('ERROR occurred in middlewares.permission.isAdmin()', error)
    response.addServerError('Failed to validate permission due to technical issues.')
    return responseBuilder(response, res, next, req)
  }
}

export function isFounder (req: any, res: Response, next: NextFunction): void {
  const response = new ServiceResponse(HttpStatusCodes.FORBIDDEN,
    ErrorMessages.FORBIDDEN, true)
  try {
    logger.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession))
    if (USER_ROLES['2'].name === req?.userSession?.role) {
      next()
    } else {
      response.message = 'You are not authorized to perform this action.'
      response.statusCode = HttpStatusCodes.FORBIDDEN
      response.addError(new APIError('You are not authorized to perform this action.', ErrorCodes.UNAUTHORIZED, 'role'))
      responseBuilder(response, res, next, req)
    }
  } catch (error) {
    logger.error('ERROR occurred in middlewares.permission.isFounder()', error)
    response.addServerError('Failed to validate permission due to technical issues.')
    return responseBuilder(response, res, next, req)
  }
}

export function isInvestor (req: any, res: Response, next: NextFunction): void {
  const response = new ServiceResponse(HttpStatusCodes.FORBIDDEN,
      ErrorMessages.FORBIDDEN, true)
  try {
    logger.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession))
    if (USER_ROLES['3'].name === req?.userSession?.role) {
      next()
    } else {
      response.message = 'You are not authorized to perform this action.'
      response.statusCode = HttpStatusCodes.FORBIDDEN
      response.addError(new APIError('You are not authorized to perform this action.', ErrorCodes.UNAUTHORIZED, 'role'))
      responseBuilder(response, res, next, req)
    }
  } catch (error) {
    logger.error('ERROR occurred in middlewares.permission.isTechnician()', error)
    response.addServerError('Failed to validate permission due to technical issues.')
    return responseBuilder(response, res, next, req)
  }
}


export function userActionsPermission (req: any, res: Response, next: NextFunction): any {
  const response = new ServiceResponse(HttpStatusCodes.FORBIDDEN,
    ErrorMessages.FORBIDDEN, true)
  try {
    const actions = Object.keys(USER_ACTIONS)
    const action = req.params[PathParams.ACTION]
    switch (action) {
      case actions[0]:
        isAdmin(req, res, next)
        break
      case actions[1]:
        isFounder(req, res, next)
        break
      case actions[2]:
        isInvestor(req, res, next)
        break
      default:
        next()
        break
    }
  } catch (error) {
    logger.error('ERROR occurred in middlewares.permission.userActionsPermission()', error)
    response.addServerError('Failed to validate permission due to technical issues.')
    return responseBuilder(response, res, next, req)
  }
}
