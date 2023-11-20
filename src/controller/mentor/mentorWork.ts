import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser} from '../../models'
import * as workService from '../../services/mentor/mentorWork'

const TAG = 'services.profile_work'



export async function updateWorkExperience(req: any, res: Response, next: NextFunction):Promise<void>{

  try {
    log.info(`${TAG}.updateWorkExperience()`);
    log.debug(`${TAG}.updateWorkExperience() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1]
    const data:any=req.body;
    // const {id}=req.params
    const otpResponse: IServiceResponse = await workService.updateWorkExperience({data,headerValue})
    responseBuilder(otpResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateWorkExperience() `, error)
    next(error)
  }
}

export async function mentorWorkExperiencePost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorWorkExperiencePost()`);
    log.debug(`${TAG}.mentorWorkExperiencePost() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await workService.postWorkExperience({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorWorkExperiencePost() `, error)
    next(error)
  }
}

// export async function mentorWorkExperienceUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
//   try {
//     log.info(`${TAG}.mentorWorkExperienceUpdate()`);
//     log.debug(`${TAG}.mentorWorkExperienceUpdate() Object = ${JSON.stringify(req.body)}`)
//     const headerValue = req.headers.authorization.split(' ')[1];
//     const user = req.body;
//     console.log(user)
//     const authResponse: IServiceResponse = await educationService.postEducationDetails({...user,headerValue})
//     responseBuilder(authResponse, res, next, req)
//   } catch (error) {
//     log.error(`ERROR occurred in ${TAG}.mentorWorkExperienceUpdate() `, error)
//     next(error)
//   }
// }
export async function mentorWorkExperienceUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}mentorWorkExperienceUpdate()`);
    log.debug(`${TAG}.mentorWorkExperienceUpdate() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await workService.updateWorkexperience({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorWorkExperienceUpdate() `, error)
    next(error)
  }
}

export async function mentorWorkExperienceDelete(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorWorkExperienceDelete()`);
    log.debug(`${TAG}.mentorWorkExperienceDelete() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await workService.deleteWorkExperience({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorWorkExperienceDelete() `, error)
    next(error)
  }
}


 

