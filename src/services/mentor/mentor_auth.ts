import { MentorAuth } from "src/Database/mysql";
import { checkEmailExist,checkUidExist } from "src/Database/mysql/lib/mentor/mentor_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken ,verifyAccessToken} from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";
import { IMentor} from "src/models/lib/auth";



const TAG = 'services.auth'


export async function signupUser(user: IMentor) {
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
      const mentor = await MentorAuth.signUp(user);
      const accessToken = await generateAccessToken({ ...mentor  });
      const mentor_uid = mentor.uid
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


  
  export async function loginUser(user: IMentor) {
    log.info(`${TAG}.loginUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
        // Check if the user with the given email exists
        const existedUser = await checkEmailExist(user.email);

        //if email does not exist 
        if(!existedUser) {
          serviceResponse.message = 'Email  is not exist please register';
          serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
          serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
          return serviceResponse;
        }

        const isPasswordValid = await comparePasswords(existedUser.password,user.password );
            
        if (!isPasswordValid) {
            serviceResponse.message = 'Invalid password';
            serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
            serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        } else {
          const mentor_login = await MentorAuth.login(user)
            const accessToken = await generateAccessToken({ ...mentor_login});
            const mentor_uid = existedUser.uid;
            
            const data = {
                accessToken,
                mentor_login,
                mentor_uid
            };

            serviceResponse.data = data;
        }         
    } catch (error) {
        log.error(`ERROR occurred in ${TAG}.loginUser`, error);
        serviceResponse.addServerError('Failed to perform login due to technical difficulties');
    }
    
    return serviceResponse;
}



export async function changeUserPassword(user: any) {
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    const existedUser = await checkUidExist(user.uid);
    console.log(existedUser)
    console.log(existedUser.password)
    
    if (!existedUser) {
      serviceResponse.message = 'User not found'; 
      serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
      serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
    } else {
      const isValid = await comparehashPasswords(existedUser.password, user.oldPassword);

      if (isValid) {
        const response = await MentorAuth.changePassword({ password: user.newPassword, ...user });
        serviceResponse.message = "Password changed successfully";
        serviceResponse.data = response;
      } else {
        serviceResponse.message = 'Old password is wrong';
        serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
      }
    }
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.changeUserPassword`, error);
    serviceResponse.addServerError('Failed to change password due to technical difficulties');
  }

  return serviceResponse;
}







