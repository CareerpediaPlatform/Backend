import { Request, Response, NextFunction } from 'express';
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import * as profielService from '../../services/admin/adminProfile'

const TAG = 'services.profile.admin'


export async function updateStatusRecruiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateStatusRecruiter()`);
    log.debug(`${TAG}.updateStatusRecruiter() Object = ${JSON.stringify(req.body)}`);
    const { userId } = req.params; 
    const statusResponse: IServiceResponse = await profielService.updateRemoveAccessRecruiter(userId);
    responseBuilder(statusResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
    next(error);
  }
}

  