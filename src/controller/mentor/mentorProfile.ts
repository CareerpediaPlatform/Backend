import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser} from '../../models'
import * as profileService from '../../services/mentor/mentorPersonal'

const TAG = 'services.profile_personal'


export async function PersonalAndDetails (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.PersonalAndDetails()`);
      log.debug(`${TAG}.PersonalAndDetails() Object = ${JSON.stringify(req.body)}`)
      const mentorPersonalData = req.body;
      const {mentorUid}= req.params
      const authResponse: IServiceResponse = await profileService.savePersonalAndContactDetails(mentorPersonalData, mentorUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.PersonalAndDetails() `, error)
      next(error)
    }
  }


export async function getrecruiterProfile(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getrecruiterProfile()`);
      log.debug(`${TAG}.getrecruiterProfile() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userId
      const authResponse= await profileService.getMentorProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getrecruiterProfile() `, error)
      next(error)
    }
  }


export async function deleterecruiterProfile(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("aaaaaaaaaaaaaaaaa")
      log.info(`${TAG}.deleterecruiterProfile()`);
      log.debug(`${TAG}.deleterecruiterProfile() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userId
      console.log("controller****************")
      console.log(userID)
      const authResponse= await profileService.deleteRecruiterProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleterecruiterProfile() `, error)
      next(error)
    }
  } 

export async function getMentorSingleList(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getMentorSingleList()`);
      log.debug(`${TAG}.getMentorSingleList() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userId
      const authResponse= await profileService.getMentorList(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getMentorSingleList() `, error)
      next(error)
    }
  }
 