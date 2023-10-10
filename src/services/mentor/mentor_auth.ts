import { MentorAuth } from "src/Database/mysql";
import { checkEmailExist,getMentorUid } from "src/Database/mysql/lib/mentor/mentorAuth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken,verifyAccessToken } from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";
import { IMentor} from "src/models/lib/auth";
import { getTransaction } from "src/Database/mysql/helpers/sql.query.util";
import { sendRegistrationNotification } from "../../utils/nodemail";

const TAG = 'services.auth'

export async function signupUser(user: IMentor) {
    log.info(`${TAG}.signupUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let transaction = null
      const existedUser = await checkEmailExist(user.email);
      if(existedUser) {
        serviceResponse.message = 'Email  is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      transaction = await getTransaction()
      const mentor = await MentorAuth.signUp(user,transaction);
      await transaction.commit() 
      sendRegistrationNotification(user)

const accessToken = await generateAccessToken({ ...mentor });
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


  
export async function loginUser(user: IMentor) {
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
          const mentor_login = await MentorAuth.login(user)
          const mentor_uid = existedUser.uid;
          const role = "mentor"
    
            const accessToken = await generateAccessToken({ mentor_uid,role});
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



// export async function changeUserPassword(user: any) {
//   const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
//   try {
//     const uid=await verifyAccessToken(user.headerValue)
//     console.log(uid)
//     const existedUser = await getMentorUid({uid:uid.uid});
//     console.log(existedUser)
//     console.log(existedUser.password)
//     if (!existedUser) {
//       serviceResponse.message = 'User not found'; 
//       serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
//       serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
//     } else {
//       const isValid = await comparehashPasswords(existedUser.password, user.oldPassword);
//       if (isValid) {
//         const response = await MentorAuth.changePassword({ password: user.newPassword, ...user });
//         serviceResponse.message = "Password changed successfully";
//         serviceResponse.data = response;
//       } else {
//         serviceResponse.message = 'Old password is wrong';
//         serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
//         serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
//       }
//     }
//   } catch (error) {
//     log.error(`ERROR occurred in ${TAG}.changeUserPassword`, error);
//     serviceResponse.addServerError('Failed to change password due to technical difficulties');
//   }

//   return serviceResponse;
// }

export async function changePassword(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
    // finde student is valid or not
    const uid=await verifyAccessToken(user.headerValue)
    const mentor=await MentorAuth.getMentorUid({uid:uid.uid})
    if(mentor){
      const IsValid=await comparePasswords(mentor.password,user.oldPassword)
      if(IsValid){
    const response=await MentorAuth.changePassword({password:user.newPassword,uid:uid.uid})
    console.log("response")
    console.log(response)
    serviceResponse.message="password changed successfully"
    serviceResponse.data=response
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
