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
    const {status}= req.params;
    let userID = req.params.userID
    const authResponse: IServiceResponse = await profielService.recruiterUpdateStatus({status,userID})
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.collegeUpdateStatus() `, error)
    next(error)
  }
}
  