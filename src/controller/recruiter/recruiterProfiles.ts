import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import nodeUtil from 'util'
import {IServiceResponse,ServiceResponse} from '../../models'
import { HttpStatusCodes } from "src/constants/status_codes";
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
    
      const authResponse= await recruiterProfileServices.deleteRecruiterProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleterecruiterProfile() `, error)
      next(error)
    }
  }

  //***************companylog************** */

  export async function uploadCompanyLogo(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadCompanyLogo()`)
      const response: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'File uploaded Successfully.', false)
      response.data = {
        fileLocation: req.files[0].location
      }
      responseBuilder(response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogo() `, error)
      next(error)
    }
  }
  export async function uploadCompanyLogoFile (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadCompanyLogoFile()`)
      

      log.debug(`${TAG}.uploadCompanyLogoFile() req file:` + nodeUtil.inspect(req.file))
  
      const serviceResponse: IServiceResponse = await recruiterProfileServices.uploadCompanyLogoFile(
       
        req.file
      )
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile() `, error)
      next(error)
    }
  }



  export async function getrecruiterCompanyLogo(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getrecruiterCompanyLogo()`);
      log.debug(`${TAG}.getrecruiterCompanyLogo() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await recruiterProfileServices.getRecruiterFile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getrecruiterCompanyLogo() `, error)
      next(error)
    }
  }
export async function updateCompanylogo(req: any, res: Response, next: NextFunction): Promise<void>{
  try{
    log.info(`${TAG}.updateCompanylogo()`)
    let userID = req.params.userID
 
    const serviceResponse: IServiceResponse = await recruiterProfileServices.updateCompanylogo(
       
      req.file,userID
    )

    responseBuilder(serviceResponse, res, next, req)
  }catch(error){
    log.error(`ERROR occurred in ${TAG}.updateCompanylogo() `, error)
    next(error)
  }
}
/***************************uploadvideo*******************/
export async function uploadVideoFile(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.uploadVideoFile()`)
    log.debug(`${TAG}.uploadVideoFile() Object = ${JSON.stringify(req.body)}`)
    const {firstName} = req.body
    console.log(firstName)

    log.debug(`${TAG}.uploadVideoFile() req file:` + nodeUtil.inspect(req.file))

    const serviceResponse: IServiceResponse = await recruiterProfileServices.uploadVideoFile(
     
      req.file
    )

    responseBuilder(serviceResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.uploadVideoFile() `, error)
    next(error)
  }
}

  export async function getRecruiterSingleList(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getRecruiterSingleList()`);
      log.debug(`${TAG}.getRecruiterSingleList() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await recruiterProfileServices.getRecruiterList(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterSingleList() `, error)
      next(error)
    }
  }

