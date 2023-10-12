import { Request, Response, NextFunction } from 'express';
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import * as profielService from '../../services/admin/adminProfile'

const TAG = 'services.profile.admin'


export async function recruiterUpdateStatus(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.recruiterUpdateStatus()`);
    log.debug(`${TAG}.recruiterUpdateStatus() Object = ${JSON.stringify(req.body)}`)
    const {status,uid}= req.params;
    const headerValue =req.headers.authorization.split(' ')[1]
    const authResponse: IServiceResponse = await profielService.recruiterUpdateStatus({status,uid,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.collegeUpdateStatus() `, error)
    next(error)
  }
}

export async function mentorUpdateStatus(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.mentorUpdateStatus()`);
    log.debug(`${TAG}.mentorUpdateStatus() Object = ${JSON.stringify(req.body)}`)
    const {status,uid}= req.params;
    const headerValue =req.headers.authorization.split(' ')[1]
    const authResponse: IServiceResponse = await profielService.mentorUpdateStatus({status,uid,headerValue})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorUpdateStatus() `, error)
    next(error)
  }
}