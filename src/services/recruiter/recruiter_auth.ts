import { RecruiterAuth } from "src/Database/mysql";
import { checkEmailExist} from "src/Database/mysql/lib/recruiter/recruiter_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken,verifyAccessToken } from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";
import { IRecruiter } from "src/models/lib/auth";
import { sendRegistrationNotification } from "../../utils/nodemail";
import { getTransaction } from "src/Database/mysql/helpers/sql.query.util";

const TAG = 'services.auth'

export async function signupUser(user: IRecruiter) {
    log.info(`${TAG}.signupUser() ==> `, user);
    let transaction = null
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedUser = await checkEmailExist(user.email);
      if(existedUser) {
   
        serviceResponse.message = 'Email  is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      transaction = await getTransaction()
      const recruiter = await RecruiterAuth.signUp(user,transaction);
      await transaction.commit() 
      sendRegistrationNotification(user)
      const uid = recruiter.uid
      const email = recruiter.email
      const accessToken = await generateAccessToken({ uid,email});  
      const data = {

        accessToken

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
          const uid = existedUser.uid;
            const email = existedUser.email
            const accessToken = await generateAccessToken({ uid,email})
            const data = {

                accessToken

            };

            serviceResponse.data = data;
        }         
    } catch (error) {
        log.error(`ERROR occurred in ${TAG}.loginUser`, error);
        serviceResponse.addServerError('Failed to perform login due to technical difficulties');
    }
    
    return serviceResponse;
}

export async function changePassword(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{

    // finde recruiter is valid or not
    const uid=await verifyAccessToken(user.headerValue)
    const recruiter=await RecruiterAuth.getRecruiterUid({uid:uid.uid})
    if(recruiter){
      const IsValid=await comparePasswords(recruiter.password,user.oldPassword)

      if(IsValid){
    const response=await RecruiterAuth.changePassword({password:user.newPassword,uid:uid.uid})
    serviceResponse.message="password changed successfully"
    // serviceResponse.data=response
      }
      else{
        serviceResponse.message = 'old password is wrong';
        serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
      }
    }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.changePassword`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return await serviceResponse
}
