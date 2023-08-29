import JoiDate from '@joi/date'
import { MIN_SEARCH_TEXT_LENGTH } from '../constants/app_defaults'
import { ErrorMessages } from '../constants/error_constants'
import { HttpStatusCodes } from '../constants/status_codes'
import * as JoiBase from 'joi'
import log from '../logger'
import { APIError, IAPIError, IServiceResponse, ServiceResponse } from '../models'

const Joi = JoiBase.extend(JoiDate)

export function isoDate (): any {
  return Joi.date().format('YYYY-MM-DD')
}

export function numericValidation (): any {
  return Joi.string().pattern(/^[0-9]+$/)
}

export function searchTextValidation (): any {
  return Joi.string().min(MIN_SEARCH_TEXT_LENGTH)
    .messages({
      'any.min': `Minimum ${MIN_SEARCH_TEXT_LENGTH} characters are required to search.`
    })
}

export function uniqueIdentifiedValidation (): any {
  return Joi.any()
}

export function baseQueryListValidation (): any {
  return Joi.object().keys({
    searchText: searchTextValidation(),
    queryId: Joi.string(),
    offset: Joi.number(),
    limit: Joi.number(),
    sortBy: Joi.string(),
    sortOrder: Joi.string().valid('asc', 'desc')
  })
}

export function idValidation (field?: string): any {
  return Joi.object().keys({
    id: uniqueIdentifiedValidation()
      .required()
      .messages({
        'any.required': ErrorMessages.IS_REQUIRED.replace('$field', field ?? 'id'),
        'string.pattern.base': ErrorMessages.INVALID_NUMBER_STRING.replace('$field', field ?? 'id')
      })
  })
}


const buildUsefulErrorObject = (errors: any): IServiceResponse => {
  const usefulErrors: IAPIError[] = []
  for (const error of errors.error.details) {
    if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
      usefulErrors.push(new APIError(error.message, error.type, error.path.join('_')))
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      log.debug('missed error:' + error)
    }
  }
  return new ServiceResponse(HttpStatusCodes.BAD_REQUEST, 'Please fill all Mandatory fields with valid values!.',
    null, true, usefulErrors)
}

export async function validate (schema, req, res, next): Promise<any> {
  try {
    log.info('START of common.validator.validate()')
    schema = schema.append({
      token: Joi.string().allow('')
    })
    let body = Object.assign({}, req.params, req.query)
    if (req.method === 'POST' || req.method === 'PUT') {
      body = Object.assign(body, req.body)
    }
    const result = await schema.validate(body, { abortEarly: false })
    if (result.error != null) {
      log.debug(JSON.stringify(result))
      const errorResponse: IServiceResponse = buildUsefulErrorObject(result)
      res.status(errorResponse.statusCode ?? HttpStatusCodes.BAD_REQUEST).send({ errors: errorResponse.errors })
    } else {
      next()
    }
  } catch (error) {
    log.error('ERROR occurred in validation.common.validate()')
    next(error)
  }
}
