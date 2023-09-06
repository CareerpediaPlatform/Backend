import { RecruiterAuth } from "src/Database/mysql";
import { checkEmailExist ,checkUidExist} from "src/Database/mysql/lib/recruiter/recruiter_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken} from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";
import { IRecruiter } from "src/models/lib/auth";


const TAG = 'services.auth'


export async function signupUser(user: IRecruiter) {
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
      const recruiter = await RecruiterAuth.signUp(user);
      const accessToken = await generateAccessToken({ ...recruiter  });
      const recruiter_uid = recruiter.uid
      const data = {
        accessToken,
        recruiter_uid         
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


  
  export async function loginUser(user: IRecruiter) {
    log.info(`${TAG}.loginUser() ==> `, user);

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    
    try {
        // Check if the user with the given email exists
        const existedUser = await checkEmailExist(user.email);
        console.log(existedUser)

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
          const recruiter_login = await RecruiterAuth.login(user)
            const accessToken = await generateAccessToken({ ...recruiter_login});
            const recruiter_uid = existedUser.uid;
            
            const data = {
                accessToken,
                recruiter_login,
                recruiter_uid
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
        const response = await RecruiterAuth.changePassword({ password: user.newPassword, ...user });
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


