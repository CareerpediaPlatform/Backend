import {  mentorEducationData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "src/Database/mysql";
import { verifyAccessToken } from "src/helpers/authentication";
import { MentorAuth } from "src/Database/mysql";

const TAG = 'services.mentor_Education'

export async function updateEducation(user) {

  log.info(`${TAG}.updateEducation() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {

    console.log(user)
    let decoded=await verifyAccessToken(user.headerValue)
    console.log("*******************************************")
    console.log(decoded)
    const uid=decoded.uid  
    console.log(uid)
    const valid = await MentorAuth.checkMentorUid(uid)
    if(valid){
      const response = await mentorEducationData.saveEducationDetails({...user,uid})
    const data = {
      ...response
          }
    serviceResponse.data = data
    }
    else{
      serviceResponse.message="Invalid Mentor Uid"
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateEducation`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}

//SINGLE OBJECT EDUCATION DETAILS
export async function postEducationDetails(user) {
  console.log(user)
    log.info(`${TAG}.postEducationDetails() ==> `, user); 
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const uid = decoded.uid
      const isValid=await MentorAuth.checkMentorUid(uid);
      if(isValid){
       
       const response= await mentorEducationData.postEducationDetails({...user,uid:decoded.uid});
        const data = {
          ...response
        }    
        serviceResponse.data = data;
        serviceResponse.message="Data is posted  Successfully";
        return serviceResponse
      }
      else{
        serviceResponse.message="invalid user id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function updateEducationDetails(user) {
    console.log(user)
      log.info(`${TAG}.updateEducationDetails() ==> `, user); 
      const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
      try {
        let decoded=await verifyAccessToken(user.headerValue)
        const uid = decoded.uid
        const isValid=await MentorAuth.checkMentorUid(uid);
        if(isValid){
          const checkId = await mentorEducationData.checkId(user.id)
          if(checkId){
  
          const response= await mentorEducationData.updateEducationDetails({...user});
          const data = {
            ...response
          }    
          serviceResponse.data = data;
          serviceResponse.message="Data is updated  Successfully";
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
        log.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
        serviceResponse.addServerError('Failed to create user due to technical difficulties');
      }
      return serviceResponse;
    }

    export async function deleteEducationDetails(user) {
      console.log(user)
        log.info(`${TAG}.deleteEducationDetails() ==> `, user); 
        const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
        try {
          let decoded=await verifyAccessToken(user.headerValue)
          const uid = decoded.uid
          const isValid=await MentorAuth.checkMentorUid(uid);
          if(isValid){
            const checkId = await mentorEducationData.checkId(user.id)
            if(checkId){
    
            const response= await mentorEducationData.deleteEducation({...user});
            const data = {
              id:response
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
          log.error(`ERROR occurred in ${TAG}.deleteEducationDetails`, error);
          serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
      }