import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IUser} from '../../models'
import * as lmsService from '../../services/mentor/mentorLms';
const TAG = 'services.mentorLms'

export async function getAllSAssignments(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getAllSAssignments()`);
      log.debug(`${TAG}.getAllSAssignments() Object = ${JSON.stringify(req.body)}`)
      // const headerValue =req.headers.authorization.split(' ')[1]
      const partId=req.params
      const Response: IServiceResponse = await lmsService.getAllAssignments(partId)

      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error)
      next(error)
    }
  }

  export async function giveRemark(req: any, res: Response, next: NextFunction): Promise<void>{
    try{
      log.info(`${TAG}.giveRemark()`);
      log.debug(`${TAG}.giveRemark() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const assignmentId = req.params
      const remark = req.body
      const Response: IServiceResponse = await lmsService.giveRemark(remark,assignmentId,headerValue)
      responseBuilder(Response, res, next, req)
    }
    catch (error) {
      log.error(`ERROR occurred in ${TAG}.giveRemark() `, error)
      next(error)
    }
  }

  export async function postThreadreply(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.postThreadreply()`)
      log.debug(`${TAG}.postThreadreply() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const reply = req.body
      const threadId = req.params
      const partId = req.params
      const serviceResponse: IServiceResponse = await lmsService.postThreadreply(reply,threadId,headerValue,partId)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postThreadreply() `, error)
      next(error)
    }
  }


  export async function getSingleRemark(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getSingleRemark()`);
      log.debug(`${TAG}.getSingleRemark() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const remarkId=req.params
      const Response: IServiceResponse = await lmsService.getSingleRemark(remarkId,headerValue)

      responseBuilder(Response, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getSingleRemark() `, error)
      next(error)
    }
  }
