import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser} from '../../models'
import * as educationService from '../../services/mentor/mentorEducation'

const TAG = 'services.profile_work'



export async function updateEducationDetail(req: any, res: Response, next: NextFunction):Promise<void>{

  try {
    log.info(`${TAG}.updateEducationDetail()`);
    log.debug(`${TAG}.updateEducationDetail() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1]
    const data:any=req.body;
    // const {id}=req.params
    const otpResponse: IServiceResponse = await educationService.updateEducation({data,headerValue})
    responseBuilder(otpResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateEducationDetail() `, error)
    next(error)
  }
}


 // single object education detrails
export async function mentorEducationPost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorEducationPost()`);
    log.debug(`${TAG}.mentorEducationPost() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await educationService.postEducationDetails({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.studentEducationPost() `, error)
    next(error)
  }
}
export async function mentorEducationUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorEducationUpdate()`);
    log.debug(`${TAG}.mentorEducationUpdate() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await educationService.updateEducationDetails({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorEducationUpdate() `, error)
    next(error)
  }
}

export async function mentorEducationDelete(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorEducationDelete()`);
    log.debug(`${TAG}.mentorEducationDelete() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const user = req.body;
    console.log(user)
    const authResponse: IServiceResponse = await educationService.deleteEducationDetails({...user,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorEducationUpdate() `, error)
    next(error)
  }
}