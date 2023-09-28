import * as Joi from 'joi'
import { validate } from './common'
import { HttpStatusCodes } from '../constants/status_codes'

export async function emptyCheck(req: any, res: any, next): Promise<any> {
  if (req.file == null) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: 'INVALID File' })
  } else {
    next()
  }
}
export async function emptyChecks(req: any, res: any, next): Promise<any> {
 
  if (!req.files || req.files.length === 0) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: 'No video files uploaded.' });
  } else {
    // req.files.forEach((file) => {
    //   console.log('File uploaded:', file.path);
    // });
    next();
  }
}
