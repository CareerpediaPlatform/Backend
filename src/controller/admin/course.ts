import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import nodeUtil from 'util'
import {IServiceResponse,ServiceResponse} from '../../models'
import * as courseService from '../../services/admin/course'
const TAG = 'controller.course'

export async function uploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadCourse()`)
      log.debug(`${TAG}.uploadCourse() Object = ${JSON.stringify(req.body)}`)
      const course = req.body
      const file = req.files
      const type = req.params
     
      log.debug(`${TAG}.uploadCourse() req file:` + nodeUtil.inspect(req.file))
  
      const serviceResponse: IServiceResponse = await courseService.uploadCourse(file,course,type)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse() `, error)
      next(error)
    }
  }

  export async function getuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getuploadCourse()`);
      log.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUID = req.params.uid
      const authResponse= await courseService.getuploadCourse(courseUID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error)
      next(error)
    }
  }

  export async function updateuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.updateuploadCourse()`);
      log.debug(`${TAG}.updateuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUID = req.params.uid
      const file = req.files
      const course = req.body
      const authResponse= await courseService.updateuploadCourse(courseUID,file,course)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateuploadCourse() `, error)
      next(error)
    }
  }
  export async function deleteuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getuploadCourse()`);
      log.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUID = req.params.uid
      const authResponse= await courseService.deleteuploadCourse(courseUID)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error)
      next(error)
    }
  }
