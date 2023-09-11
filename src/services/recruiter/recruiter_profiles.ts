import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

import {  RecruiterProfileDetailsData } from "../../Database/mysql";
const TAG = 'services.aut'


export async function recruiterProfile(user) {

 
    log.info(`${TAG}.recruiterProfile() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let userID=user.userID
      const isValid=await RecruiterProfileDetailsData.isValid(userID)
      if(isValid){
        const existedProfile=await RecruiterProfileDetailsData.checkExist(userID)
        if(existedProfile){
          const basicDetails= await RecruiterProfileDetailsData.recruitereBasicDetailsUpdate({...user.Profile,userID});
          const contactDetails= await RecruiterProfileDetailsData.recruiterContactUpdate({...user.Contact,userID});
          const companyDetsils= await RecruiterProfileDetailsData.recruitercompanyDetailUpdate({...user.Company,userID});
          const data = {
            basicDetails,
            contactDetails,
            companyDetsils
          }    
          serviceResponse.data = data
          return serviceResponse
        }
        const response= await RecruiterProfileDetailsData.recruiterProfilePost({...user});
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
      log.error(`ERROR occurred in ${TAG}.recruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  
export async function getRecruiterProfile(userID) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await RecruiterProfileDetailsData.checkProfilExist(userID)
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