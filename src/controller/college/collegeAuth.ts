import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import * as authService from '../../services/college/college_auth'
import {collegeDataMapping} from "../../helpers/data_mapping/auth";
import { ICollege} from 'src/models/lib/auth'
const TAG = 'services.auth'

export async function signupCollege (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupCollege()`);
      log.debug(`${TAG}.signupCollege() Object = ${JSON.stringify(req.body)}`)
      const user: ICollege = collegeDataMapping(req.body);
      const authResponse: IServiceResponse = await authService.signupUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupCollege() `, error)
      next(error)
    }
  }

  export async function loginCollege(req: any, res: Response, next: NextFunction): Promise<void>{
    try{
      log.info(`${TAG}.loginCollege()`);
      log.debug(`${TAG}.loginCollege() Object = ${JSON.stringify(req.body)}`)
      const user:ICollege = collegeDataMapping(req.body)
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