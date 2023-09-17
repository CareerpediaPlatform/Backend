import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser, UserSession} from '../../models'
import * as profileService from '../../services/student/profile'
const TAG="controler.student.profile"

export async function updateEducationDetails(req: any, res: Response, next: NextFunction):Promise<void>{
    try {
      log.info(`${TAG}.updateEducationDetails()`);
      log.debug(`${TAG}.updateEducationDetails() Object = ${JSON.stringify(req.body)}`)
      const data:any=req.body;
      const {id}=req.params
const Response: IServiceResponse = await profileService.updateEducationDetails({data,id})
      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateEducationDetails() `, error)
      next(error)
    }
  }
export async function updateWorkExperience(req: any, res: Response, next: NextFunction):Promise<void>{
    try {
      log.info(`${TAG}.updateWorkExperience()`);
      log.debug(`${TAG}.updateWorkExperience() Object = ${JSON.stringify(req.body)}`)
      const data:any=req.body;
      const {id}=req.params
      const Response: IServiceResponse = await profileService.updateWorkExperience({data,id})
      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateWorkExperience() `, error)
      next(error)
    }
  }

  export async function studentProfileEducationDelete(req: any, res: Response, next: NextFunction):Promise<void>{``
    try {
      log.info(`${TAG}.studentProfileEducationDelete()`);
      log.debug(`${TAG}.studentProfileEducationDelete() Object = ${JSON.stringify(req.body)}`)
      const info:any=req.body;
      const {id}=req.params
      const Response: IServiceResponse = await profileService.studentProfileEducationDelete({info,id})
      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentProfileEducationDelete() `, error)
      next(error)
    }
  }

  export async function studentProfileExperienceDelete(req: any, res: Response, next: NextFunction):Promise<void>{
    try {
      log.info(`${TAG}.studentProfileExperienceDelete()`);
      log.debug(`${TAG}.studentProfileExperienceDelete() Object = ${JSON.stringify(req.body)}`)
      const info:any=req.body;
      const {id}=req.params
      const Response: IServiceResponse = await profileService.studentProfileExperienceDelete({info,id})
      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentProfileExperienceDelete() `, error)
      next(error)
    }
  }
  