import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser} from '../../models'
import * as authService from '../../services/mentor/mentor_auth'
import {mentorDataMapping} from "../../helpers/data_mapping/auth";
import { IMentor } from 'src/models/lib/auth'

const TAG = 'services.auth'

export async function signupMentor (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupMentor()`);
      log.debug(`${TAG}.signupMentor() Object = ${JSON.stringify(req.body)}`)
      const user: IMentor = mentorDataMapping(req.body);
      const authResponse: IServiceResponse = await authService.signupUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupMentor() `, error)
      next(error)
    }
  }

  export async function loginMentor(req: any, res: Response, next: NextFunction): Promise<void>{
    try{
      log.info(`${TAG}.loginMentor()`);
      log.debug(`${TAG}.loginMentor() Object = ${JSON.stringify(req.body)}`)
      const user:IMentor = mentorDataMapping(req.body)
      const authResponse:IServiceResponse = await authService.loginUser(user)
      responseBuilder(authResponse,res,next,req)
    }catch(error){
      log.error(`ERROR occurred in ${TAG}.loginMentor() `, error)
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


