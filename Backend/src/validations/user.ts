import { ErrorMessages } from '../constants/error_constants'
import * as Joi from 'joi'
import log from '../logger'
import { baseQueryListValidation, idValidation, uniqueIdentifiedValidation, validate } from './common'

const TAG = 'validations.user'

export function userValidation (): any {
  return Joi.object().keys({
    userName: Joi.string()
      .required()
      .min(3)
      .max(128)
      .messages({
        'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'firstName'),
        'any.max': ErrorMessages.INVALID_MAX_LENGTH.replace('$field', 'firstName')
          .replace('$length', '128'),
        'any.min': ErrorMessages.INVALID_MIN_LENGTH.replace('$field', 'firstName')
          .replace('$length', '3')

      }),
      userEmail: Joi.string()
      .email()
      .required()
      .max(128)
      .messages({
        'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'email ID'),
        'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'email ID')
          .replace('$length', '128'),
        'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'email ID')
      }),
    role: idValidation('roleId')
      .required()
      .messages({
        'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'role')
      })
  })
}

export async function createUser (req, res, next): Promise<any> {
  log.info(`${TAG}.createUser()`)
  try {
    const schema = userValidation()
    await validate(schema, req, res, next)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.createUser()`, error)
    next(error)
  }
}

