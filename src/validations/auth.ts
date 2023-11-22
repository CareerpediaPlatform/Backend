import * as Joi from 'joi'
import log from '../logger'
import { validate } from './common'
import { ErrorMessages } from 'src/constants/error_constants'
import rateLimit , {Options} from 'express-rate-limit';

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
    terms_and_condition:Joi.boolean().required()
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
    terms_and_condition:Joi.boolean().required()

  });
  await validate(schema, req, res, next);
};

export const adminSignIn= async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(25).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
        .replace('$length', '8'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'password')
    }),

  });
  await validate(schema, req, res, next);
};

export const SignIn= async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(25).messages({
      'any.required': ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
      'any.max': ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
        .replace('$length', '8'),
      'string.pattern': ErrorMessages.INVALID_FIELD.replace('$field', 'password')
    }),

  });
  await validate(schema, req, res, next);
};

export const mentorSignup= async (req, res, next) => {
  const schema = Joi.object().keys({
   
    email: Joi.string().email().required(),
    type: Joi.string().required(),
    course:Joi.string().required()

  });
  await validate(schema, req, res, next);
};

export const changePassword = async (req, res, next) => {
  
  const schema = Joi.object().keys({
    newPassword: Joi.string().min(8).required().messages({
        'string.empty': ErrorMessages.IS_REQUIRED.replace('$field', 'newPassword'),
        'string.min': ErrorMessages.INVALID_LENGTH.replace('$field', 'newPassword')
      }),
    
  });

 await validate(schema, req, res, next);
};
// .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+|\-=\\{}\[\]:";'<>?,./]).{8,25}$/)

// Throttling login attempts
  
 export const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      status: 429,
      message,
    },
  });
};

 export const studentLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many student login attempts, please try again later.');
 export const mentorLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many mentor login attempts, please try again later.');
 export const recruiterLimiter = createRateLimiter(15 * 60 * 1000, 5,  'Too many recruiter login attempts, please try again later.');
 export const adminLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many admin login attempts, please try again later.');
 export const collegeLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many college-admin login attempts, please try again later.');

