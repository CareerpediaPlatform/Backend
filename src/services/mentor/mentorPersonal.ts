import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

import {  MentorPersonalDetails } from "../../Database/mysql";
const TAG = 'services.profile'


export async function mentorProfile(user) {

    log.info(`${TAG}.mentorProfile() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let userID=user.userID
      const isValid=await MentorPersonalDetails.isValid(userID)
      if(isValid){
        const existedProfile=await MentorPersonalDetails.checkExist(userID)
        if(existedProfile){
          const personalDetails= await MentorPersonalDetails.mentorPersonalDetailsUpdate({...user.personalDetails,userID});
         
          const data = {
            personalDetails
         
          }    
          serviceResponse.data = data
          return serviceResponse
        }
        const response= await MentorPersonalDetails.mentorProfilePost({...user});
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
      log.error(`ERROR occurred in ${TAG}.mentorProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }
