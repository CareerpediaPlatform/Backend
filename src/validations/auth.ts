import * as Joi from 'joi'
import log from '../logger'
import { validate } from './common'
import { ErrorMessages } from 'src/constants/error_constants'

const TAG = 'validations.auth'

export const emailLogin= async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(15).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
        .replace('$length', '8'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'password')
    }),
  });
  await validate(schema, req, res, next);
};

export const numberLogin= async (req, res, next) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string().required().min(10).max(10).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'phoneNumber'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneNumber')
        .replace('$length', '10'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'phoneNumber')
    }),
  });
  await validate(schema, req, res, next);
};



export const linkedInLogin= async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    uuid: Joi.string().required(),
  });
  await validate(schema, req, res, next);
};

export const linkedInSignup= async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    uuid: Joi.string().required(),
    phoneNumber: Joi.string().required().min(10).max(10).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'phoneNumber'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneNumber')
        .replace('$length', '10'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'phoneNumber')
    }),
    role: Joi.string().required(),

  });
  await validate(schema, req, res, next);
};

export const formSignup= async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(15).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
        .replace('$length', '8'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'password')
    }),
    phoneNumber: Joi.string().required().min(10).max(10).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'phoneNumber'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneNumber')
        .replace('$length', '10'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'phoneNumber')
    }),
    role: Joi.string().required(),

  });
  await validate(schema, req, res, next);
};

// export async function signupUser (req, res, next): Promise<any> {
//   log.info(`${TAG}.getAccessToken()`)
//   try {
//     const schema = Joi.object().keys({
//       refreshToken: Joi.string().required().messages({
//         'string.required': 'Refresh Token required.'
//       })
//     })
//     await validate(schema, req, res, next)
//   } catch (error) {
//     log.error(`ERROR occurred in ${TAG}.getUserDetails()`, error)
//     next(error)
//   }
// }

// export function userValidation (): any {
//   return Joi.object().keys({
//     userName: Joi.string()
//       .required()
//       .min(3)
//       .max(128)
//       .messages({
//         'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'firstName'),
//         'any.max': ErrorMessages.INVALID_MAX_LENGTH.replace('$field', 'firstName')
//           .replace('$length', '128'),
//         'any.min': ErrorMessages.INVALID_MIN_LENGTH.replace('$field', 'firstName')
//           .replace('$length', '3')

//       }),
//       userEmail: Joi.string()
//       .email()
//       .required()
//       .max(128)
//       .messages({
//         'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'email ID'),
//         'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'email ID')
//           .replace('$length', '128'),
//         'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'email ID')
//       }),
//     role: idValidation('roleId')
//       .required()
//       .messages({
//         'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'role')
//       })
//   })
// }

