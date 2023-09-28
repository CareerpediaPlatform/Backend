import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import { IcollegeProfile } from 'src/models/lib/profile'
import * as collegeProfileServices from '../../services/college/college_profile'

const TAG = 'controler.collegeProfile'

export async function collegeProfilePostAndUpdate(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupCollege()`);
      log.debug(`${TAG}.signupCollege() Object = ${JSON.stringify(req.body)}`)
      const user: IcollegeProfile = req.body;
      let userID = req.params.userID
      const authResponse: IServiceResponse = await collegeProfileServices.collegeProfile({...user,userID})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupCollege() `, error)
      next(error)
    }
  }

export async function getCollegeProfile(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getCollegeProfile()`);
      log.debug(`${TAG}.getCollegeProfile() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await collegeProfileServices.getCollegeProfile(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCollegeProfile() `, error)
      next(error)
    }
  }

export async function collegeProfileDelete(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.collegeProfileDelete()`);
      log.debug(`${TAG}.collegeProfileDelete() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await collegeProfileServices.collegeProfileDelete(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.collegeProfileDelete() `, error)
      next(error)
    }
  }

  export async function getCollegeSingleList(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getCollegeSingleList()`);
      log.debug(`${TAG}.getCollegeSingleList() Object = ${JSON.stringify(req.body)}`)
      let userID = req.params.userID
      const authResponse= await collegeProfileServices.getCollegeList(userID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCollegeSingleList() `, error)
      next(error)
    }
  }