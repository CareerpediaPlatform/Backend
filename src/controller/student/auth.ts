import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser, UserSession} from '../../models'
import * as authService from '../../services/student/auth'
import {PathParams} from "../../constants/api_param_constants";
// import {userDataMapping} from "../../helpers/data_mapping/user";
import { ISingin } from 'src/models/lib/auth'
const TAG = 'controler-student.auth'

export async function signupUser (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupUser()`);
      log.debug(`${TAG}.signupUser() Object = ${JSON.stringify(req.body)}`)
      // const user: IUser = userDataMapping(req.body);
      const user: IUser =req.body;
      console.log(user)
      if(user.password){
        const authResponse: IServiceResponse = await authService.signupUser(user)
        responseBuilder(authResponse, res, next, req)
      }else if(user.uuid){
        const authResponse: IServiceResponse = await authService.signupWithSocialAccount(user)
        responseBuilder(authResponse, res, next, req)
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser() `, error)
      next(error)
    }
  }

export async function signupPhonenumber (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signupPhonenumber()`);
      log.debug(`${TAG}.signupPhonenumber() Object = ${JSON.stringify(req.body)}`)
      const user: IUser =req.body;
      console.log("first")
      console.log(user)
      const headerValue=req.headers.authorization.split(' ')[1]
        const authResponse: IServiceResponse = await authService.signupPhonenumber({...user,headerValue})
        responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser() `, error)
      next(error)
    }
  }

export async function getAllStudentList(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getAllStudentList()`);
      log.debug(`${TAG}.getAllStudentList() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const authResponse: IServiceResponse = await authService.getAllStudentList({headerValue})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllStudentList() `, error)
      next(error)
    }
  }

export async function studentUpdateStatus(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.studentUpdateStatus()`);
      log.debug(`${TAG}.studentUpdateStatus() Object = ${JSON.stringify(req.body)}`)
      
      const {status,uid}= req.params;
      const headerValue =req.headers.authorization.split(' ')[1]
      const authResponse: IServiceResponse = await authService.studentUpdateStatus({status,uid,headerValue})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentUpdateStatus() `, error)
      next(error)
    }
  }

export async function signinUser (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.signinUser()`);
      log.debug(`${TAG}.signinUser() Object = ${JSON.stringify(req.body)}`)
      const user: ISingin = req.body;
      const authResponse: IServiceResponse = await authService.signinUser(user)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signinUser() `, error)
      next(error)
    }
  }
  
export async function verifyOTP(req: any, res: Response, next: NextFunction):Promise<void>{
    try {
      log.info(`${TAG}.verifyOTP()`);
      log.debug(`${TAG}.verifyOTP() Object = ${JSON.stringify(req.body)}`)
      const headerValue = req.headers.authorization.split(' ')[1]
      const otp:any=req.body;
      const otpResponse: IServiceResponse = await authService.verifyOTP({...otp,headerValue})
      responseBuilder(otpResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.verifyOTP() `, error)
      next(error)
    }
  }

export async function resendOTP(req: any, res: Response, next: NextFunction):Promise<void>{
  try{
    log.info(`${TAG}.resendOTP()`);
    log.debug(`${TAG}.resendOTP() Object = ${JSON.stringify(req.body)}`)
    const headerValue =req.headers.authorization.split(' ')[1]
    const response: IServiceResponse = await authService.resendOTP(headerValue)
    
    responseBuilder(response, res, next, req)
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.resendOTP() `, error)
    next(error)
  }
}
export async function changePassword(req: any, res: Response, next: NextFunction):Promise<void>{
  try{
    log.info(`${TAG}.changePassword()`);
    log.debug(`${TAG}.changePassword() Object = ${JSON.stringify(req.body)}`)
    const passwords:any=req.body;
    const headerValue = req.headers.authorization.split(' ')[1];
    const response: IServiceResponse = await authService.changePassword({...passwords,headerValue})
    responseBuilder(response, res, next, req)
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.changePassword() `, error)
    next(error)
  }
}

// forget password
export async function forgetPassword(req: any, res: Response, next: NextFunction):Promise<void>{
  try{
    log.info(`${TAG}.forgetPassword()`);
    log.debug(`${TAG}.forgetPassword() Object = ${JSON.stringify(req.body)}`)
    const {email}:any=req.body;
    const headerValue = req.headers.authorization;
    const response: IServiceResponse = await authService.forgetPassword({email})
    responseBuilder(response, res, next, req)
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.forgetPassword() `, error)
    next(error)
  }
}

export async function setForgetPassword(req: any, res: Response, next: NextFunction):Promise<void>{
  try{
    log.info(`${TAG}.setForgetPassword()`);
    log.debug(`${TAG}.setForgetPassword() Object = ${JSON.stringify(req.body)}`)
    const {newPassword}:any=req.body;
    console.log("headerValue")
    const headerValue = req.headers.authorization.split(' ')[1];
    
    const response: IServiceResponse = await authService.setForgetPassword({newPassword,headerValue})
    responseBuilder(response, res, next, req)
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.setForgetPassword() `, error)
    next(error)
  }
}

