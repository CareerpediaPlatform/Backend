import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser, UserSession} from '../../models'
import * as profileService from '../../services/student/profile'
const TAG="controler.student.profile"
import { uploadCompanyLogoFile } from 'src/services/imageUpload'

export async function studentProfilePost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.studentProfilePost()`);
    log.debug(`${TAG}.studentProfilePost() Object = ${JSON.stringify(req.body)}`)
    const response:IServiceResponse= await uploadCompanyLogoFile(
      req.files
    ) 
    console.log("333333333333333333333333333333333333333333")
    console.log(req.files)
    // const headerValue = req.headers.authorization.split(' ')[1];
    // const user = req.body;
    // const authResponse: IServiceResponse = await profileService.studentProfilePost({...user,headerValue})
    responseBuilder(response, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.studentProfilePost() `, error)
    next(error)
  }
}


export async function getStudentProfile(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.getStudentProfile()`);
    log.debug(`${TAG}.getStudentProfile() Object = ${JSON.stringify(req.body)}`)
    const headerValue = req.headers.authorization.split(' ')[1];
    const authResponse= await profileService.getStudentProfile(headerValue)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getStudentProfile() `, error)
    next(error)
  }
}


export async function getSingleStudentProfile(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.getSingleStudentProfile()`);
    log.debug(`${TAG}.getSingleStudentProfile() Object = ${JSON.stringify(req.body)}`)
    let uid = req.params.uid
    const authResponse= await profileService.getSingleStudentProfile(uid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getSingleStudentProfile() `, error)
    next(error)
  }
}


export async function updateEducationDetails(req: any, res: Response, next: NextFunction):Promise<void>{
    try {
      log.info(`${TAG}.updateEducationDetails()`);
      log.debug(`${TAG}.updateEducationDetails() Object = ${JSON.stringify(req.body)}`)
      const data:any=req.body;
      const headerValue = req.headers.authorization.split(' ')[1];
const Response: IServiceResponse = await profileService.updateEducationDetails({data,headerValue})
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
      const headerValue = req.headers.authorization.split(' ')[1];
      const Response: IServiceResponse = await profileService.updateWorkExperience({data,headerValue})
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
      const headerValue = req.headers.authorization.split(' ')[1];
      const Response: IServiceResponse = await profileService.studentProfileEducationDelete({...info,headerValue})
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
      const headerValue = req.headers.authorization.split(' ')[1];
      const Response: IServiceResponse = await profileService.studentProfileExperienceDelete({...info,headerValue})
      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentProfileExperienceDelete() `, error)
      next(error)
    }
  }
  
  // export async function uploadCompanyLogoFile (req: any, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     log.info(`${TAG}.uploadCompanyLogoFile()`)
  //     log.debug(`LOGGED IN USER: ${nodeUtil.inspect(req.userSession)}`)
  //    // const startupUid = req.params['startupUid']
  //   //   const userSession = req.userSession
  //     log.debug(`${TAG}.uploadCompanyLogoFile() req file:` + nodeUtil.inspect(req.file))
  
  //     const serviceResponse: IServiceResponse = await recruiterProfileServices.uploadCompanyLogoFile(
  //       req.file
  //     )
  
  //     responseBuilder(serviceResponse, res, next, req)
  //   } catch (error) {
  //     log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile() `, error)
  //     next(error)
  //   }
  // }