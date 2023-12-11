import {  MentorAuth, mentorWorkExperienceData } from "../../Database/mysql";
import { HttpStatusCodes } from "../../constants/status_codes";
import log from "../../logger";
import { APIError } from "../../models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "../../models/lib/service_response";
import { verifyAccessToken } from "../../helpers/authentication";

const TAG = 'services.mentor_workExperience'

export async function updateWorkExperience(user) {

  log.info(`${TAG}.updateWorkExperience() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(user)
    let decoded=await verifyAccessToken(user.headerValue)
    const uid=decoded.uid  
   
    console.log(uid)
    const valid = await MentorAuth.checkMentorUid(uid)
    if(valid){
    const response = await mentorWorkExperienceData.saveWorkExperienceDetails({...user,uid})
    const data = {
      ...response
          }
    serviceResponse.data = data
        }
        else{
          serviceResponse.message="Invalid Mentor UID"
          serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
          serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
          return serviceResponse;
        }
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateWorkExperience`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}
// export async function postEducationDetails(user) {
//   console.log(user)
//     log.info(`${TAG}.postEducationDetails() ==> `, user); 
//     const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
//     try {
//       let decoded=await verifyAccessToken(user.headerValue)
//       const uid = decoded.uid
//       const isValid=await MentorAuth.checkMentorUid(uid);
//       if(isValid){
//         const checkId = await mentorWorkExperienceData.checkId(user.id)
//         if(checkId){

//         const response= await mentorWorkExperienceData.updateWorKExperience({...user,uid:decoded.uid});
//         const data = {
//           ...response
//         }    
//         serviceResponse.data = data
//         return serviceResponse
//       }else{
//        const response= await mentorWorkExperienceData.postWorkExperience({...user,uid:decoded.uid});
//         const data = {
//           ...response
//         }    
//         serviceResponse.data = data
//         return serviceResponse
//       }
    
//       }

//       else{
//         serviceResponse.message="invalid user id";
//         serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
//         serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
//         return serviceResponse
//       }
  
//     } catch (error) {
//       log.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
//       serviceResponse.addServerError('Failed to create user due to technical difficulties');
//     }
//     return serviceResponse;
//   }

export async function postWorkExperience(user) {
  console.log(user)
    log.info(`${TAG}.postWorExperience() ==> `, user); 
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const uid = decoded.uid
      const isValid=await MentorAuth.checkMentorUid(uid);
      if(isValid){
       
       const response= await mentorWorkExperienceData.postWorkExperience({...user,uid:decoded.uid});
        const data = {
          ...response
        }    
        serviceResponse.data = data
        serviceResponse.message="Data is posted  Successfully"
        return serviceResponse
      }
      else{
        serviceResponse.message="invalid user id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postWorExperience`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function updateWorkexperience(user) {
    console.log(user)
      log.info(`${TAG}.updateWorKExperience() ==> `, user); 
      const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
      try {
        let decoded=await verifyAccessToken(user.headerValue)
        const uid = decoded.uid
        const isValid=await MentorAuth.checkMentorUid(uid);
        if(isValid){
          const checkId = await mentorWorkExperienceData.checkId(user.userId)
          if(checkId){
  
          const response= await mentorWorkExperienceData.updateWorKExperience({...user});
          const data = {
            ...response
          }    
          serviceResponse.data = data
          serviceResponse.message="Data is updated  Successfully"
          return serviceResponse
        }   
          else{
            serviceResponse.message="invalid user id";
            serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            return serviceResponse
          }
        }
  
        else{
          serviceResponse.message="invalid user Uid";
          serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
          serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
          return serviceResponse
        }
    
      } catch (error) {
        log.error(`ERROR occurred in ${TAG}.updateWorKExperience`, error);
        serviceResponse.addServerError('Failed to create user due to technical difficulties');
      }
      return serviceResponse;
    }

    export async function deleteWorkExperience(user) {
      console.log(user)
        log.info(`${TAG}.deleteWorkExperience() ==> `, user); 
        const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
        try {
          let decoded=await verifyAccessToken(user.headerValue)
          const uid = decoded.uid
          const isValid=await MentorAuth.checkMentorUid(uid);
          if(isValid){
            const checkId = await mentorWorkExperienceData.checkId(user.userId)
            if(checkId){
    
            const response= await mentorWorkExperienceData.deleteWorkExperience({...user});
            const data = {
              ...response
            }    
            serviceResponse.data = data;
            serviceResponse.message="Data is deleted  Successfully";
            return serviceResponse
          }   
            else{
              serviceResponse.message="invalid user id";
              serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
              serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
              return serviceResponse
            }
          }
    
          else{
            serviceResponse.message="invalid user Uid";
            serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            return serviceResponse
          }
      
        } catch (error) {
          log.error(`ERROR occurred in ${TAG}.deleteWorkExperience`, error);
          serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
      }