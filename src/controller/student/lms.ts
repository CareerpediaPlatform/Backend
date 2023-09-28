import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IAdmin} from '../../models'
import * as lmsServices from '../../services/student/lms'

const TAG = 'controller.lms.student'

export async function getCourseOverview(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getCourseOverview()`);
      log.debug(`${TAG}.getCourseOverview() Object = ${JSON.stringify(req.body)}`)
      const courseId=req.params.courseId
      const response: IServiceResponse = await lmsServices.getCourseOverview(courseId)
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview() `, error)
      next(error)
    }
  }

export async function getCourses(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getCourses()`);
      log.debug(`${TAG}.getCourses()`)
      const courseType = req.query.type;
      const response: IServiceResponse = await lmsServices.getCourses(courseType)
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourses() `, error)
      next(error)
    }
  }

export async function getMyCourses(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getMyCourses()`);
      log.debug(`${TAG}.getMyCourses()`)
      const {array} = req.body;
      const response: IServiceResponse = await lmsServices.getMyCourses([...array])
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getMyCourses() `, error)
      next(error)
    }
  }

export async function getPartDetail(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getPartDetail()`);
      log.debug(`${TAG}.getPartDetail()`)
      const courseType = req.query.type;
      const response: IServiceResponse = await lmsServices.getPartDetail()
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getPartDetail() `, error)
      next(error)
    }
  }