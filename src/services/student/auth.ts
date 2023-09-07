import { StudentAuth} from "src/Database/mysql";
import { checkEmailOrPhoneExist, saveOTP } from "src/Database/mysql/lib/student/auth";
import { HttpStatusCodes } from "src/constants/status_codes";
// import { changePassword } from "src/controller/auth";
import { generateAccessToken, generateOTPToken, verifyAccessToken, verifyOTPJWT } from "src/helpers/authentication";
import { comparePasswords } from "src/helpers/encryption";
import log from "src/logger";
import { IUser } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { ISingin } from "src/models/lib/auth";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

const TAG = 'services.auth'
export async function signupUser(user: IUser) {
    log.info(`${TAG}.signupUser() ==> `, user);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let email=user.email
      let phoneNumber=user.phoneNumber
      const existedUser = await StudentAuth.checkEmailOrPhoneExist({email,phoneNumber});
      console.log("existedUsermmmm")
      if(existedUser) {
        serviceResponse.message = 'Email or Mobile is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      
      //TODO send OTP to mobile/ email
      const accessToken = await generateOTPToken({ ...user });
      const student = await StudentAuth.signUp({...user,accessToken});
      const findUser = await StudentAuth.checkEmailOrPhoneExist({email})     
      const saveOTP = await StudentAuth.saveOTP({...findUser,accessToken:accessToken,type:"signup"});
      const uid=student.uid
      const data = {
        accessToken,
        saveOTP
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  // signup with google and linked in
  export async function signupWithSocialAccount(user: IUser) {
    log.info(`${TAG}.signupUser() ==> `, user);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let email=user.email
      let phoneNumber=user.phoneNumber
      const existedUser = await StudentAuth.checkEmailOrPhoneExist({email,phoneNumber});
      if(existedUser) {
        serviceResponse.message = 'Email or Mobile is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      
      //TODO send OTP to mobile/ email
      const accessToken = await generateOTPToken({ ...user });
      const student = await StudentAuth.signupWithSocialAccount({...user});
      const findUser = await StudentAuth.checkEmailOrPhoneExist({email,phoneNumber})      
      const saveOTP = await StudentAuth.saveOTP({...findUser,accessToken:accessToken,type:"signup"});
      const uid=student.uid
      const data = {
        accessToken,
        saveOTP
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse;
  }

  // sign in
  export const signinUser=async(user: ISingin)=>{
    log.info(`${TAG}.signinUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    let email=user.email
    let phoneNumber=user.phoneNumber
    // let uniqID=user.uniqID
    const existedUser = await StudentAuth.checkEmailOrPhoneExist({email,phoneNumber});
    console.log("existing")
    console.log(existedUser)
    try{
      if(existedUser){
        if(user.password || user.uuid){
            if(user.password){
              let compare=await comparePasswords(existedUser.password,user.password)
              // let compare2=await comparePasswords(existedUser.uniqId,user.uuid)
              if(compare){
                const uid=existedUser.uid
                const accessToken=await generateAccessToken(existedUser)
                console.log(accessToken)
                const data = {
                  accessToken,
                  uid
                }
                serviceResponse.data = data
              }
              else{
                serviceResponse.message = 'wrong password';
                serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
              }
            }
            else{
              let compare=await comparePasswords(existedUser.uniqId,user.uuid)
              console.log("first")
              console.log("compare")
              if(compare){
                const uid=existedUser.uid
                const accessToken=await generateAccessToken(existedUser)
                // console.log(accessToken)
                const data = {
                  accessToken,
                  uid
                }
                serviceResponse.data = data
              }
              else{
                serviceResponse.message = 'invalid user';
                serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
              }
            }
         
        }
        // else if(user.uniqID){
        //   let compare=await comparePasswords(existedUser.uniqId,user.uniqID)
        //   console.log("first")
        //   // console.log(compare)
        //   if(compare){
        //     const uid=existedUser.uid
        //     const accessToken=await generateAccessToken(existedUser)
        //     console.log(accessToken)
        //     const data = {
        //       accessToken,
        //       uid
        //     }
        //     serviceResponse.data = data
        //   }
        //   else{
        //     serviceResponse.message = 'invalid user';
        //     serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        //     serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        //   }
        // }
        if(user.phoneNumber){
          const accessToken = await generateOTPToken({ ...existedUser });
          const otpsave=await saveOTP({...existedUser,accessToken,type:"signin"})
          const data = {
            accessToken,
            otpsave
          }
          serviceResponse.data = data
        }
      }
      else{
        serviceResponse.message = 'wrong or invalid email/mobile';
        serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
      }
      return await serviceResponse;
    }
catch (error) {
      log.error(`ERROR occurred in ${TAG}.signinUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  // verifying otp
  export async function verifyOTP(otpInfo:any){
    log.info(`${TAG}.verifyOTP() ==> `, otpInfo);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const IsAutharaized=await verifyOTPJWT(otpInfo.headerValue)
      if(IsAutharaized){
        const student = await StudentAuth.verifyOTP(otpInfo);
        const type=student.type
         if(student.type){
          const user=await StudentAuth.checkEmailOrPhoneExist({phoneNumber:student.phoneNumber})
        const token=await generateAccessToken({uid:user.uid,type:type})
          const data = {
            token,
            type
          }
          serviceResponse.message = "otp validated"
          serviceResponse.data = data
        }
        else{
          serviceResponse.message = 'invalid otp or wrong otp';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
        }
      }
      else{
        serviceResponse.message = 'unAutharized user';
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
      return serviceResponse;
      }
     
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.verifyOTP`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse;
  }

  export async function changePassword(user){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      // finde student is valid or not
      const uid=await verifyAccessToken(user.headerValue)
      const student=await StudentAuth.checkEmailOrPhoneExist({uid:uid.uid})
      if(student){
        const IsValid=await comparePasswords(student.password,user.oldPassword)
        if(IsValid){
      
      const response=await StudentAuth.changePassword({password:user.newPassword,uid:uid.uid})
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

  // forgetpassword
  export async function forgetPassword(email){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      // checking user is valid or not 
      const isValid=await StudentAuth.checkEmailOrPhoneExist(email)
      if(isValid){
        const accessToken = await generateOTPToken({ ...isValid });    
        const saveOTP = await StudentAuth.saveOTP({...isValid,accessToken:accessToken,type:"forget-password"}); 
        serviceResponse.data=saveOTP
      }
    }catch(error){
      log.error(`ERROR occurred in ${TAG}.forgetPassword`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse
  }

  export async function setForgetPassword({newPassword,headerValue}){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      console.log(headerValue)
      // finde student is valid or not
      const uid=await verifyAccessToken(headerValue)
      
      const student=await StudentAuth.checkEmailOrPhoneExist({uid:uid.uid})
      if(student){
      const response=await StudentAuth.changePassword({password:newPassword,uid:uid.uid})
      console.log("response")
      console.log(response)
      serviceResponse.message="password changed successfully"
      serviceResponse.data=response
      }
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.changePassword`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse
  }
  