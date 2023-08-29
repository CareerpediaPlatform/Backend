import { NextFunction, Response } from 'express'
import { responseBuilder } from '../helpers/response_builder'
import log from '../logger'
import {IServiceResponse, IUser} from '../models'
import * as authService from '../services/mentor_auth'
import {userDataMapping} from "../helpers/data_mapping/user";
const TAG = 'services.auth'

export async function signupUser (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupUser()`);
      log.debug(`${TAG}.signupUser() Object = ${JSON.stringify(req.body)}`)
      const user: IUser = userDataMapping(req.body);
      const authResponse: IServiceResponse = await authService.signupUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser() `, error)
      next(error)
    }
  }