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
  //   const headerValue = req.headers.authorization.split(' ')[1]
    const data:any=req.body;
    const {id}=req.params
    const otpResponse: IServiceResponse = await workService.updateWorkExperience({data,id})
    responseBuilder(otpResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateWorkExperience() `, error)
    next(error)
  }
}


 

