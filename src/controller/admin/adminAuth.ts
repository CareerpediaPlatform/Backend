import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IAdmin} from '../../models'
import * as authService from '../../services/admin/admin_auth'
import { AdminDataMapping } from 'src/helpers/data_mapping/auth'



const TAG = 'services.auth'

export async function signupUser (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupUser()`);
      log.debug(`${TAG}.signupUser() Object = ${JSON.stringify(req.body)}`)
    //   const admin={
    //     email:req.body.email,
    //     password:req.body.password
    // }
    const user : IAdmin = AdminDataMapping(req.body)
      const authResponse: IServiceResponse = await authService.signupUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser() `, error)
      next(error)
    }
  }

  export async function adminLogin (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.adminLogin()`);
      log.debug(`${TAG}.adminLogin() Object = ${JSON.stringify(req.body)}`)
    //   const admin={
    //     email:req.body.email,
    //     password:req.body.password
    // }
    const user : IAdmin = AdminDataMapping(req.body)
    const authResponse: IServiceResponse = await authService.loginAdmin(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser() `, error)
      next(error)
    }
  }