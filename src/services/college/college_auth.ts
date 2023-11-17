import { CollegeAuth } from "src/Database/mysql";
import { checkEmailExist,checkUidExist } from "src/Database/mysql/lib/college/college_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {generateAccessToken, verifyAccessToken} from '../../helpers/authentication'
import { comparePasswords ,comparehashPasswords} from "src/helpers/encryption";;
import { ICollege } from "src/models/lib/auth";
import { getTransaction } from "src/Database/mysql/helpers/sql.query.util";
import { sendRegistrationNotifications } from "../../utils/nodemail";
import { generatePasswordWithPrefixAndLength } from "src/helpers/encryption";
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
      const generatePassword = await generatePasswordWithPrefixAndLength(15, "Careerpedia");
      transaction = await getTransaction()
      const college_admin = await CollegeAuth.signUp(user,generatePassword,transaction);
      await transaction.commit() 
      sendRegistrationNotifications(user,generatePassword)
      const uid = college_admin.uid
      const email = college_admin.email
      const accessToken = await generateAccessToken({uid,email  });
      const data = {
        accessToken,type:"college-signup"
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

        //if email does not exist 
        if(!existedUser) {
          serviceResponse.message = 'Email  is not exist please register';
          serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
          serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
          return serviceResponse;
        }
        if(existedUser.status!="ACTIVE"){
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
          const uid = existedUser.uid;
          const email = existedUser.uid;
          const accessToken = await generateAccessToken({ uid,email});
            const data = {
                accessToken,type:"college-signin",role:"college" 
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
    // finde student is valid or not
    const uid=await verifyAccessToken(user.headerValue)
    const mentor=await CollegeAuth.getCollegeAdminUid({uid:uid.uid})
    if(mentor){
      const IsValid=await comparePasswords(mentor.password,user.oldPassword)
      if(IsValid){
    const response=await CollegeAuth.changePassword({password:user.newPassword,uid:uid.uid})
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

 // give access remove accerss of a college_admin by admin
 export async function collegeUpdateStatus(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
    // finde admin is valid or not
    const decoded=await verifyAccessToken(user.headerValue)

    if(decoded &&(user.status=="ACTIVE" ||user.status=="DEACTIVE")){
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
