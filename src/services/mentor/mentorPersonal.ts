import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "../../Database/mysql";
import { HttpStatusCodes } from "../../constants/status_codes";
import log from "../../logger";
import { APIError } from "../../models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "../../models/lib/service_response";
import { verifyAccessToken } from "../../helpers/authentication";



const TAG = 'services.mentor_PersonalAndContactDetails'


export async function savePersonalAndContactDetails(user,headerValue) {
  
  // console.log(user)
    log.info(`${TAG}.savePersonalAndContactDetails() ==> `, user); 
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(headerValue)
      const uid = decoded.uid
      console.log(uid)
      const isValid=await mentorPersonalAndContactData.checkMentorUid(uid)
      if(isValid){
        const existedProfile=await mentorPersonalAndContactData.checkExist(uid)
        if(existedProfile){
          const postResponse= await mentorPersonalAndContactData.mentorProfileUpdate(user,uid);
          const data = {
            postResponse
          }  
          console.log(data)  
          serviceResponse.data = data
          serviceResponse.message = "successfully updated !"
          return serviceResponse
        }
        const response= await mentorPersonalAndContactData.mentorProfilePost(user,uid);
        const data = {
          ...response
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message="Invalid Mentor Uid"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


export async function getMentorProfile(headerValue) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, headerValue);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
   
    try {
      let decoded=await verifyAccessToken(headerValue)
      const uid = decoded.uid
      console.log(uid)
      const isValid=await mentorPersonalAndContactData.checkMentorUid(uid)
    
      if(isValid){
        const existedProfile=await mentorWorkExperienceData.checkProfilExist(uid)
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message="Invalid Mentor Uid"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getMentorList(userId) {
    log.info(`${TAG}.getMentorList() ==> `, userId);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await mentorPersonalAndContactData.getMentorList(userId)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }





