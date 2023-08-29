import { MentorAuth } from "src/Database/mysql";
import { checkEmailExist } from "src/Database/mysql/lib/mentor_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IUser } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken} from '../helpers/authentication'

const TAG = 'services.auth'


export async function signupUser(user: IUser) {
    log.info(`${TAG}.signupUser() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedUser = await checkEmailExist(user.email);
      if(existedUser) {
        serviceResponse.message = 'Email  is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      const student = await MentorAuth.signUp(user);
      const accessToken = await generateAccessToken({ ...student  });
      const mentor_uid = student.uid
      const data = {
        accessToken,
        mentor_uid
        
      }
     
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


