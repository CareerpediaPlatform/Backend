import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'

import * as recruiterProfileServices from '../../services/recruiter/recruiter_profiles'
const TAG = 'controler.recruiterProfile'

export async function recruiterProfilePostAndUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.recruiterProfilePostAndUpdate()`);
      log.debug(`${TAG}.recruiterProfilePostAndUpdate() Object = ${JSON.stringify(req.body)}`)
      const user = req.body;
      let userID = req.params.userID
      const authResponse: IServiceResponse = await recruiterProfileServices.recruiterProfile({...user,userID})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.recruiterProfilePostAndUpdate() `, error)
      next(error)
    }
  }

export async function getrecruiterProfile(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getrecruiterProfile()`);
      log.debug(`${TAG}.getrecruiterProfile() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await recruiterProfileServices.getRecruiterProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getrecruiterProfile() `, error)
      next(error)
    }
  }
  export async function deleterecruiterProfile(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleterecruiterProfile()`);
      log.debug(`${TAG}.deleterecruiterProfile() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      console.log("controller****************")
      console.log(userID)
      const authResponse= await recruiterProfileServices.deleteRecruiterProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleterecruiterProfile() `, error)
      next(error)
    }
  }