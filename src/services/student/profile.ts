import { StudentAuth, StudentProfile} from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import { verifyAccessToken } from "src/helpers/authentication";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

const TAG="student.service.profile"

export async function studentProfilePost(user) {
  console.log(user)
    log.info(`${TAG}.studentProfilePost() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
   
      if(isValid){
        const existedProfile=await StudentProfile.checkExist(decoded.uid)
        if(existedProfile){
          const postResponse= await StudentProfile.studentProfileUpdate({...user,uid:decoded.uid});
          const data = {
            postResponse
          }    
          serviceResponse.data = data
          return serviceResponse
        }
        const response= await StudentProfile.studentProfilePost({...user,uid:decoded.uid});
        const data = {
          ...response
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


  export async function getStudentProfile(headerValue) {
    log.info(`${TAG}.collegeProfile() ==> `, headerValue);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      if(isValid){
        const existedProfile=await StudentProfile.checkProfilExist(decoded.uid)
        if(existedProfile){
          const data = {
            existedProfile
          }    
          serviceResponse.data = data
          return serviceResponse
        }
      }else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function getSingleStudentProfile(uid) {
    log.info(`${TAG}.collegeProfile() ==> `, uid);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:uid})
      if(isValid){      
        const existedProfile=await StudentProfile.checkProfilExist(uid)
        if(existedProfile){
          const data = {
            existedProfile
          }    
          serviceResponse.data = data
          return serviceResponse
        }
      }else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getSingleStudentProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }
  
export async function updateEducationDetails(user) {
    log.info(`${TAG}.updateEducationDetails() ==> `,user);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const response = await StudentProfile.updateEducationDetails({...user,uid:decoded.uid})
      const data = {
        ...response,
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateEducationDetails`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  
export async function updateWorkExperience(user) {
    log.info(`${TAG}.updateWorkExperience() ==> `,user);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const response = await StudentProfile.updateWorkExperience({...user,uid:decoded.uid})
      const data = {
        ...response
            }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateWorkExperience`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function studentProfileEducationDelete(info) {
    log.info(`${TAG}.studentProfileEducationDelete() ==> `, info);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
     
      let decoded=await verifyAccessToken(info.headerValue)
      console.log("2222222222222222222222222222")
      console.log(decoded.uid)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      if(isValid){
        const existedProfile=await StudentProfile.checkExistEducationAndExperience(info.id)
        if(existedProfile){
          const response=await StudentProfile.studentEducationDelete(info.id)
          const data = {
            response
          }    
          serviceResponse.data = data
          return serviceResponse
        }
      }else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentProfileEducationDelete`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function studentProfileExperienceDelete(info) {
    log.info(`${TAG}.studentProfileExperienceDelete() ==> `, info);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(info.headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      if(isValid){
        const existedProfile=await StudentProfile.checkExistEducationAndExperience(info.id)
        if(existedProfile){
          const response=await StudentProfile.studentExperienceDelete(info.id)
          const data = {
            response
          }    
          serviceResponse.data = data
          return serviceResponse
        }
      }else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.studentProfileExperienceDelete`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }