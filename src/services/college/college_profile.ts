import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { IcollegeProfile } from "src/models/lib/profile";
import * as collegeProfileLib from "../../Database/mysql/lib/college/college_profile"
const TAG = 'services.profile'


export async function collegeProfile(user) {
  console.log(user)
    log.info(`${TAG}.collegeProfile() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let userID=user.userID
      const isValid=await collegeProfileLib.isValid(userID)
      if(isValid){
        const existedProfile=await collegeProfileLib.checkExist(userID)
        if(existedProfile){
          const postResponse= await collegeProfileLib.collegeProfileUpdate({...user.basicDetails,userID});
          const contactDetails= await collegeProfileLib.collegeContactUpdate({...user.contactDetails,userID});
          const collegeDetsils= await collegeProfileLib.collegeDetailUpdate({...user.collegeDetails,userID});
          const data = {
            postResponse,
            contactDetails,
            collegeDetsils
          }    
          serviceResponse.data = data
          return serviceResponse
        }
        const response= await collegeProfileLib.collegeProfilePost({...user});
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

  
export async function getCollegeProfile(userID) {
    log.info(`${TAG}.collegeProfile() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const isValid=await collegeProfileLib.isValid(userID)
      if(isValid){
        const existedProfile=await collegeProfileLib.checkProfilExist(userID)
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

export async function collegeProfileDelete(userID) {
    log.info(`${TAG}.collegeProfileDelete() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const isValid=await collegeProfileLib.isValid(userID)
      if(isValid){
        const existedProfile=await collegeProfileLib.checkProfilExist(userID)
        if(existedProfile){
          const response=await collegeProfileLib.collegeProfileDelete(userID)
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
      log.error(`ERROR occurred in ${TAG}.collegeProfileDelete`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getCollegeList(userID) {
    log.info(`${TAG}.getMentorList() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await collegeProfileLib.isValid(userID)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCollegeList`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }
