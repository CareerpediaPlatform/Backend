import { StudentAuth, StudentProfile} from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

const TAG="student.service.profile"

export async function updateEducationDetails(user) {
    log.info(`${TAG}.updateEducationDetails() ==> `,user);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const response = await StudentProfile.updateEducationDetails({...user})
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
      const response = await StudentProfile.updateWorkExperience({...user})
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

  // export async function studentProfileDelete(userID) {
  //   log.info(`${TAG}.studentProfileDelete() ==> `, userID);
      
  //   const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  //   try {
  //     const isValid=await StudentAuth.checkEmailOrPhoneExist({id:userID})
  //     if(isValid){
  //       const existedProfile=await StudentProfile.(userID)
  //       if(existedProfile){
  //         const response=await StudentProfile.studentProfileDelete(userID)
  //         const data = {
  //           response
  //         }    
  //         serviceResponse.data = data
  //         return serviceResponse
  //       }
  //     }else{
  //       serviceResponse.message="invalid user id"
  //       return serviceResponse
  //     }
    
  //   } catch (error) {
  //     log.error(`ERROR occurred in ${TAG}.studentProfileDelete`, error);
  //     serviceResponse.addServerError('Failed to create user due to technical difficulties');
  //   }
  //   return serviceResponse;
  // }

export async function studentProfileEducationDelete({info,id}) {
    log.info(`${TAG}.studentProfileEducationDelete() ==> `, info);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const isValid=await StudentAuth.checkEmailOrPhoneExist({id:id})
      if(isValid){
        const existedProfile=await StudentProfile.checkExistEducationAndExperience(info[0].uid)
        if(existedProfile){
          const response=await StudentProfile.studentEducationDelete(info[0].uid)
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

export async function studentProfileExperienceDelete({info,id}) {
    log.info(`${TAG}.studentProfileExperienceDelete() ==> `, info);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const isValid=await StudentAuth.checkEmailOrPhoneExist({id:id})
      if(isValid){
        const existedProfile=await StudentProfile.checkExistEducationAndExperience(info[0].uid)
        if(existedProfile){
          const response=await StudentProfile.studentExperienceDelete(info[0].uid)
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