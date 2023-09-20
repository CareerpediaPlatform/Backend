import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import nodeUtil from 'util'
import {IServiceResponse,ServiceResponse} from '../../models'
import { HttpStatusCodes } from "src/constants/status_codes";
// import * as startupFilesService from '../services/file'


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
      log.debug(`LOGGED IN USER: ${nodeUtil.inspect(req.userSession)}`)
     // const startupUid = req.params['startupUid']
    //   const userSession = req.userSession
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