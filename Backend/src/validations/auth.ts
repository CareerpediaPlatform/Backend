import * as Joi from 'joi'
import log from '../logger'
import { validate } from './common'

const TAG = 'validations.auth'

export const login = async (req, res, next) => {
  const schema = Joi.object().keys({
    //User ID - user email or phone number
    userLoginId: Joi.string().required(),
    password: Joi.string().required(),
  });
  await validate(schema, req, res, next);
};

export async function signupUser (req, res, next): Promise<any> {
  log.info(`${TAG}.getAccessToken()`)
  try {
    const schema = Joi.object().keys({
      refreshToken: Joi.string().required().messages({
        'string.required': 'Refresh Token required.'
      })
    })
    await validate(schema, req, res, next)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getUserDetails()`, error)
    next(error)
  }
}
