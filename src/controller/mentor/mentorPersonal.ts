import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'

import * as mentorPersonalServices from '../../services/mentor/mentorPersonal'
const TAG = 'controler.mentorProfile'

export async function mentorProfilePostAndUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.mentorProfilePostAndUpdate()`);
      log.debug(`${TAG}.mentorProfilePostAndUpdate() Object = ${JSON.stringify(req.body)}`)
      const user = req.body;
      let userID = req.params.userID
      const authResponse: IServiceResponse = await mentorPersonalServices.mentorProfile({...user,userID})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.mentorProfilePostAndUpdate() `, error)
      next(error)
    }
  }