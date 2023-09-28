import { CollegeAuth } from "src/Database/mysql";
import { checkEmailExist,checkUidExist } from "src/Database/mysql/lib/college/college_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken, verifyAccessToken} from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";;
import { ICollege } from "src/models/lib/auth";


const TAG = 'services.auth'


export async function signupUser(user: ICollege) {
    log.info(`${TAG}.signupUser() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let transaction = null
      const existedUser = await checkEmailExist(user.email);
      if(existedUser) {
        serviceResponse.message = 'Email is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      const college_admin = await CollegeAuth.signUp(user);
      const accessToken = await generateAccessToken({ ...college_admin   });
      const college_uid = college_admin.uid
      const data = {
        accessToken,
        college_uid        
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


  
  export async function loginUser(user: ICollege) {
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
        if(existedUser.status!="Active"){
          serviceResponse.message = 'your account is freazed by careerpedia please contact careerpedia team !';
          serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
          serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
          return serviceResponse
        }

        const isPasswordValid = await comparePasswords(existedUser.password,user.password );
            
        if (!isPasswordValid) {
            serviceResponse.message = 'Invalid password';
            serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
            serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        } else {
          const college_login = await CollegeAuth.login(user)
            const accessToken = await generateAccessToken({ ...college_login});
            const college_uid = existedUser.uid;
            
            const data = {
                accessToken,
                college_login,
                college_uid
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
        const response = await CollegeAuth.changePassword({ password: user.newPassword, ...user });
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



 // give access remove accerss of a student by admin
 export async function collegeUpdateStatus(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
    // finde student is valid or not
    const decoded=await verifyAccessToken(user.headerValue)

    if(decoded &&(user.status=="Active" ||user.status=="Deactive")){
      if(decoded.role!="admin"){
        serviceResponse.message = `UnAutharized Admin`
        return serviceResponse
      }
      const student=await CollegeAuth.collegeUpdateStatus({...user})
      const data={
        student
      }
      serviceResponse.message = `college status changed to ${user.status} successfully `
      serviceResponse.data = data
      return serviceResponse
    }else{
      serviceResponse.message = `someThing went wrong in url`
          return serviceResponse
    }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.collegeUpdateStatus`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return await serviceResponse
}
