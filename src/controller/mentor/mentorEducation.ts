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
  //   const headerValue = req.headers.authorization.split(' ')[1]
    const data:any=req.body;
    const {id}=req.params
    const otpResponse: IServiceResponse = await educationService.updateEducation({data,id})
    responseBuilder(otpResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateEducationDetail() `, error)
    next(error)
  }
}


 
