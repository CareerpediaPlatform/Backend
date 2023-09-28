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
    })
  });
  await validate(schema, req, res, next);
};

export const passwordValidation= async (req, res, next) => {
  const schema = Joi.object().keys({
    newPassword: Joi.string().min(8).max(15).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
        .replace('$length', '8'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field','password')
    })
  });
  await validate(schema, req, res, next);
};

export const numberLogin= async (req, res, next) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).messages({
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
    role: Joi.string().required()


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
    role: Joi.string().required(),

  });
  await validate(schema, req, res, next);
};


