import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import * as authService from '../../services/recruiter/recruiter_auth'
import {recruiterDataMapping} from "../../helpers/data_mapping/auth";
import { IRecruiter} from 'src/models/lib/auth'
const TAG = 'services.auth'

export async function signupRecruiter (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupRecruiter()`);
      log.debug(`${TAG}.signupRecruiter() Object = ${JSON.stringify(req.body)}`)
      const user: IRecruiter = recruiterDataMapping(req.body);
      const authResponse: IServiceResponse = await authService.signupUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupRecruiter() `, error)
      next(error)
    }
  }

  export async function loginRecruiter(req: any, res: Response, next: NextFunction): Promise<void>{
    try{
      log.info(`${TAG}.loginRecruiter()`);
      log.debug(`${TAG}.loginRecruiter() Object = ${JSON.stringify(req.body)}`)
      const user:IRecruiter = recruiterDataMapping(req.body)
      const authResponse:IServiceResponse = await authService.loginUser(user)
      responseBuilder(authResponse,res,next,req)
    }catch(error){
      log.error(`ERROR occurred in ${TAG}.loginRecruiter()`, error)
      next(error)
    } 
  }

  export async function changePasswordController(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.changePasswordController()`);
      log.debug(`${TAG}.changePasswordController() Object = ${JSON.stringify(req.body)}`);
      const passwords: any = req.body;
      const response: IServiceResponse = await authService.changeUserPassword({ ...passwords });
      responseBuilder(response, res, next, req);
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.changePasswordController()`, error);
      next(error);
    }
  }