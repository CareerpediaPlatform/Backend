import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { verifyAccessToken } from "src/helpers/authentication";



const TAG = 'services.mentor_PersonalAndContactDetails'


export async function savePersonalAndContactDetails(user) {
  // console.log(user)
    log.info(`${TAG}.savePersonalAndContactDetails() ==> `, user); 
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      const uid = decoded.uid
      console.log(uid)
      const isValid=await mentorPersonalAndContactData.checkMentorUid(uid)
      if(isValid){
        const existedProfile=await mentorPersonalAndContactData.checkExist(uid)
        if(existedProfile){
          const postResponse= await mentorPersonalAndContactData.mentorProfileUpdate(user);
          const data = {
            postResponse
          }  
          console.log(data)  
          serviceResponse.data = data
          serviceResponse.message = "successfully updated !"
          return serviceResponse
        }
        const response= await mentorPersonalAndContactData.mentorProfilePost(user);
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
      log.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


export async function getMentorProfile(userId) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, userId);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await mentorWorkExperienceData.checkProfilExist(userId)
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





