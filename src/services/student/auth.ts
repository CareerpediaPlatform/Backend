import { any } from "joi";
import { StudentAuth} from "src/Database/mysql";
import { getTransaction } from "src/Database/mysql/helpers/sql.query.util";
import { checkEmailOrPhoneExist } from "src/Database/mysql/lib/student/auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import { OTP, generateAccessToken, generateOTPToken, verifyAccessToken, verifyOTPJWT } from "src/helpers/authentication";
import { comparePasswords } from "src/helpers/encryption";
import log from "src/logger";
import { IUser } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { ISingin, MyObject } from "src/models/lib/auth";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { studentNotification, studentOtpEmail } from "src/utils/nodemail";

const TAG = 'services.auth.student'
export async function signupUser(user: IUser) {
    log.info(`${TAG}.signupUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let email=user.email
      const existedUser = await StudentAuth.checkEmailOrPhoneExist({email});
      if(existedUser) {
        serviceResponse.message = 'Email or Mobile is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      // getting all the students form both tables and sorting the array list
      let list=await StudentAuth.getAllStudentList()
      let listArray=Object.values(list)
          function compareByAge(a, b) {
            return a.id - b.id;
          }
           let sortedList=listArray.sort(compareByAge);
           const lastElementId:MyObject = sortedList[sortedList.length - 1] // last element of sorted array

      const student = await StudentAuth.signUp({...user,id:lastElementId?lastElementId.id+1:1});
      const findUser = await StudentAuth.checkEmailOrPhoneExist({email})    
      const accessToken = await generateAccessToken({uid:findUser.uid,number:true,id:findUser.id,type:"signup"}); 
      const data = {
        accessToken,
        type:"signup"
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  // signup setting phone number
export async function signupPhonenumber(user) {
    log.info(`${TAG}.signupPhonenumber() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
try{
  // let transaction = await getTransaction()
  // let transaction = await getTransaction()
  const decoded=await verifyAccessToken(user.headerValue)
  if(decoded){
    const existedUser = await StudentAuth.checkEmailOrPhoneExist({phoneNumber:user.phoneNumber});
    if(existedUser) {
      serviceResponse.message = 'Mobile Number is already exist';
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
      return serviceResponse;
    }
    let otp=await OTP()
    let otpsave
    const otpAccessToken = await generateOTPToken({ ...existedUser });
    const otpexist=await StudentAuth.verifyOTP({phoneNumber:user.phoneNumber})
    if(otpexist){
      otpsave=await StudentAuth.resendOTP({accessToken:otpAccessToken,newOtp:otp,type:"signup",phoneNumber:user.phoneNumber})
    }else{
      otpsave=await await StudentAuth.saveOTP({...decoded,accessToken:otpAccessToken,phoneNumber:user.phoneNumber,otp})
    }
    const resendOtpToken=await generateAccessToken({uid:decoded.uid,otp:true,type:otpsave.info.type,phoneNumber:user.phoneNumber})
 
    // await transaction.commit()
    // await studentNotification({otp,type:"lllllll",email:existedUser.email})
    const data = {
      accessToken:resendOtpToken,
      otp:otpsave.info.otp,
      type:"otp"
    }
    serviceResponse.data = data
    // await transaction.commit()
    // await studentNotification({otp:otpsave.info.otp,type:otpsave.info.type,email:existedUser.email})
  }

 
return serviceResponse

}catch(error){
  log.error(`ERROR occurred in ${TAG}.signupPhonenumber`, error);
  serviceResponse.addServerError('Failed to create user due to technical difficulties');
}

  }

  // signup with google and linked in
  export async function signupWithSocialAccount(user: IUser) {
    log.info(`${TAG}.signupWithSocialAccount() ==> `, user);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let email=user.email
      const existedUser = await StudentAuth.checkEmailOrPhoneExist({email});
      if(existedUser) {
        serviceResponse.message = 'Email or Mobile is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
            // getting all the students form both tables and sorting the array list
            let list=await StudentAuth.getAllStudentList()
            let listArray=Object.values(list)
                function compareByAge(a, b) {
                  return a.id - b.id;
                }
                 let sortedList=listArray.sort(compareByAge);
                 const lastElementId:MyObject = sortedList[sortedList.length - 1] // last element of sorted array
      //TODO send OTP to mobile/ email
      const student = await StudentAuth.signupWithSocialAccount({...user,id:lastElementId?lastElementId.id+1:1});
      const findUser = await StudentAuth.checkEmailOrPhoneExist({email})      
      const accessToken = await generateAccessToken({uid:findUser.uid,otp:true,id:findUser.id,type:"signupgoogle"}); 

      const data = {
        accessToken,
        type:"signup"
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupWithSocialAccount`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse;
  }

  // sign in
  export const signinUser=async(user: ISingin)=>{+

    log.info(`${TAG}.signinUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    let email=user.email
    let phoneNumber=user.phoneNumber
    // let uniqID=user.uniqID
    const existedUser = await StudentAuth.checkEmailOrPhoneExist({email,phoneNumber});
    try{
      let transaction=null
      if(existedUser){
        if(existedUser.status!="ACTIVE"){
          serviceResponse.message = 'your account is freazed by careerpedia please contact careerpedia team !';
          serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
          serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
          return serviceResponse
        }
        if(user.password || user.uuid){
            if(user.password){
              let compare=await comparePasswords(existedUser.password,user.password)
              // let compare2=await comparePasswords(existedUser.uniqId,user.uuid)
              if(compare){
                const uid=existedUser.uid
                const accessToken=await generateAccessToken({uid:existedUser.uid,signin:true})
                console.log(accessToken)
                const data = {
                  accessToken,
                  signin:true
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
              if(compare){
                // const uid=existedUser.uid
                const accessToken=await generateAccessToken({uid:existedUser.uid,signin:true})
                const data = {
                  accessToken,
                  signin:true
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
        if(user.phoneNumber){
          transaction = await getTransaction()
          let otp=await OTP()
          let otpsave
          const otpAccessToken = await generateOTPToken({ ...existedUser });
          const otpexist=await StudentAuth.verifyOTP({phoneNumber:user.phoneNumber})
          if(otpexist){
            otpsave=await StudentAuth.resendOTP({accessToken:otpAccessToken,newOtp:otp,type:"signin",phoneNumber:user.phoneNumber,transaction})
          }else{
            otpsave=await StudentAuth.saveOTP({...existedUser,accessToken:otpAccessToken,type:"signin",otp,transaction})
            
          }
          const resendOtpToken=await generateAccessToken({uid:existedUser.uid,otp:true,type:"signin",phoneNumber:user.phoneNumber})
          await transaction.commit()
          await studentNotification({...otpsave.info,email:existedUser.email})
          const data = {
            // otpAccessToken,
            resendOtpToken,
            otpsave
          }
          serviceResponse.data = data
        }``
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

  // give access remove accerss of a student by admin
  export async function studentUpdateStatus(user){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      // finde student is valid or not
      const decoded=await verifyAccessToken(user.headerValue)
  
      if(decoded &&(user.status=="ACTIVE" ||user.status=="DEACTIVE")){
        if(decoded.role!="admin"){
          serviceResponse.message = `UnAutharized Admin`
          return serviceResponse
        }
        const student=await StudentAuth.studentUpdateStatus({...user})
        const data={
          student
        }
        serviceResponse.message = `student status changed to ${user.status} successfully `
        serviceResponse.data = data
        return serviceResponse
      }else{
        serviceResponse.message = `someThing went wrong in url`
            return serviceResponse
      }
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentUpdateStatus`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse
  }

  // verifying otp
  export async function verifyOTP(otpInfo:any){
    log.info(`${TAG}.verifyOTP() ==> `, otpInfo);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let transaction=null
      const IsAutharaized=await verifyAccessToken(otpInfo.headerValue)
      if(IsAutharaized){
        const student = await StudentAuth.verifyOTP({phoneNumber:IsAutharaized.phoneNumber});
        if(student.otp!=otpInfo.otp){
          serviceResponse.message = "wrong-otp"
          return serviceResponse
        }
        const type=student.type
         if(student.type){
          const isValidOtp=await verifyOTPJWT(student.accessToken)
          if(!isValidOtp){
            serviceResponse.message = "otp expired"
            return serviceResponse
          }
          if(student.type==="signup"){
            // transaction
            
         const savenumber=await StudentAuth.signupPhonenumber({phoneNumber:student.phoneNumber,uid:IsAutharaized.uid})
         const token=await generateAccessToken({...IsAutharaized})
         const data = {
          token,
          type
        }
        // await StudentAuth.deleteOTP({otp:otpInfo.otp})
        serviceResponse.message = "otp validated"
          serviceResponse.data = data
          return serviceResponse
          }
          else if(student.type==="signupgoogle"){
            const savenumber=await StudentAuth.signupPhonenumbers({phoneNumber:student.phoneNumber,uid:IsAutharaized.uid})
            const token=await generateAccessToken({...IsAutharaized})
            const data = {
             token,
             type
           }
           serviceResponse.message = "otp validated"
             serviceResponse.data = data
             return serviceResponse
          }
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

  export async function resendOTP(user){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      // finde student is valid or not
      let transaction = await getTransaction()
      const res=await verifyAccessToken(user)
      const accessToken=await generateOTPToken({otp:user.otp})
      const existedUser=await checkEmailOrPhoneExist({uid:res.uid})
      if(res){
        const otp = await OTP();
        const student=await StudentAuth.resendOTP({...res,accessToken,newOtp:otp},transaction)
        // const otpAccessToken=await generateAccessToken({...otp})
        const data={
          student:student.info
        }
        serviceResponse.message = "otp resend successfully !"
        serviceResponse.data = data
        await transaction.commit()
        await studentNotification({otp,type:(res.type+"resend"),email:existedUser.email})
        return serviceResponse
      }
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.resendOTP`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse
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
      let transaction = await getTransaction()
      let otpsave
      let otp=await OTP()
      // checking user is valid or not 
      const isValid=await StudentAuth.checkEmailOrPhoneExist({email:email.email})
      if(isValid){
        const accessToken = await generateOTPToken({ ...isValid });    
        const otpexist=await StudentAuth.verifyOTP({phoneNumber:isValid.phoneNumber})
        if(otpexist){
          otpsave=await StudentAuth.resendOTP({accessToken:accessToken,newOtp:otp,type:"forget-password",phoneNumber:isValid.phoneNumber},transaction)
        }else{
          otpsave=await StudentAuth.saveOTP({...isValid,accessToken:accessToken,type:"forget-password",otp},transaction);
        }
        const resendOtpToken=await generateAccessToken({uid:isValid.uid,otp:true,type:otpsave.info.type,phoneNumber:isValid.phoneNumber})
        serviceResponse.data={resendOtpToken,otp:otpsave.info.otp}
        await transaction.commit()
          await studentNotification({...otpsave.info,email:isValid.email})
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
      log.error(`ERROR occurred in ${TAG}.setForgetPassword`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return await serviceResponse
  }

export async function getAllStudentList(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
    const decoded=await verifyAccessToken(user.headerValue)
    
     if(decoded){
        if(decoded.role!="admin"){
          serviceResponse.message = `UnAutharized Admin`
          return serviceResponse
        }
        const response=await StudentAuth.getAllStudentList()
        const data={
          ...response
        }
        serviceResponse.data=data
        return await serviceResponse
      }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllStudentList`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }

}



  