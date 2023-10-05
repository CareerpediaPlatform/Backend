import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import nodeUtil from 'util'
import {IServiceResponse,ServiceResponse} from '../../models'
import * as assignmentService from '../../services/student/assignment'
const TAG = 'controller.studentAttachment'

export async function uploadAssignment(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadAssignment()`)
      log.debug(`${TAG}.uploadAssignment() Object = ${JSON.stringify(req.body)}`)
      log.debug(`${TAG}.uploadAssignment() req file:` + nodeUtil.inspect(req.file))
      const headerValue = req.headers.authorization.split(' ')[1];
      const partId =req.params
      const serviceResponse: IServiceResponse = await assignmentService.uploadAssignment(req.files,headerValue,partId)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse() `, error)
      next(error)
    }
  }
  export async function getAllSAssignment(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getAllSAssignment()`);
      log.debug(`${TAG}.getAllSAssignment() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const partId=req.params
      const authResponse: IServiceResponse = await assignmentService.getAllAssignments(partId,headerValue)

      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error)
      next(error)
    }
  }
  export async function uploadNote(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadNote()`)
      log.debug(`${TAG}.uploadNote() Object = ${JSON.stringify(req.body)}`)
      const headerValue = req.headers.authorization.split(' ')[1];
      const note = req.body
      const serviceResponse: IServiceResponse = await assignmentService.uploadNotes(note,headerValue)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse() `, error)
      next(error)
    }
  }
  
  export async function getAllNotes(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getAllNotes()`);
      log.debug(`${TAG}.getAllNotes() Object = ${JSON.stringify(req.body)}`)
      const headerValue = req.headers.authorization.split(' ')[1];

      const authResponse: IServiceResponse = await assignmentService.getAllNotes(headerValue)

      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error)
      next(error)
    }
  }

  export async function uploadThread(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadThread()`)
      log.debug(`${TAG}.uploadThread() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const thread = req.body
      const partId =req.params
      const serviceResponse: IServiceResponse = await assignmentService.uploadThread(thread,headerValue,partId)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadThread() `, error)
      next(error)
    }
  }

  export async function getSingleThread(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getSingleThread()`);
      log.debug(`${TAG}.getSingleThread() Object = ${JSON.stringify(req.body)}`)
      const headerValue =req.headers.authorization.split(' ')[1]
      const threadId=req.params
      const partId=req.params      
      const authResponse: IServiceResponse = await assignmentService.getSingleThread(partId,threadId,headerValue)

      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error)
      next(error)
    }
  }
  