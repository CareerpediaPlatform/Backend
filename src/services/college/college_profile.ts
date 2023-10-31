import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { IcollegeProfile } from "src/models/lib/profile";
import * as collegeProfileLib from "../../Database/mysql/lib/college/college_profile"
import { verifyAccessToken } from "src/helpers/authentication";
const TAG = 'services.profile'


export async function collegeProfile(user) {
    log.info(`${TAG}.collegeProfile() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
      
      const isValid=await collegeProfileLib.isValid(decoded.uid)
     
      if(isValid){
        const existedProfile=await collegeProfileLib.checkExist(decoded.uid)
         if(existedProfile){
          const postResponse= await collegeProfileLib.collegeProfileUpdate({...user.basicDetails,id:existedProfile.id});
          const contactDetails= await collegeProfileLib.collegeContactUpdate({...user.contactDetails,id:existedProfile.id});
          const collegeDetsils= await collegeProfileLib.collegeDetailUpdate({...user.collegeDetails,id:existedProfile.id});
          const data = {
            postResponse,
            contactDetails,
            collegeDetsils
          }    
          console.log("527364812394012341=234",data)
          serviceResponse.data = data
          return serviceResponse
        }
        
        const response= await collegeProfileLib.collegeProfilePost({...user,uid:decoded.uid});
        const data = {
          ...response
        } 
        console.log("ruasibdfaosidfoais",response)
        serviceResponse.data = data
        return serviceResponse  
    }
      else{
        serviceResponse.message="invalid user id"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.college_profile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  
export async function getCollegeProfile(headerValue) {
    log.info(`${TAG}.collegeProfile() ==> `, headerValue);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await collegeProfileLib.isValid(decoded.uid)
      if(isValid){
        const existedProfile=await collegeProfileLib.checkProfilExist(decoded.uid)
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
