import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { IcollegeProfile } from "src/models/lib/profile";
import * as collegeProfileLib from "../../Database/mysql/lib/college/college_profile"
import { verifyAccessToken } from "src/helpers/authentication";
const TAG = 'services.profile'


export async function collegeProfile(user) {
  console.log(user)
    log.info(`${TAG}.collegeProfile() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(user.headerValue)
  
      const isValid=await collegeProfileLib.isValid(decoded[0].uid)
     
      if(isValid){
        const existedProfile=await collegeProfileLib.checkExist(decoded[0].uid)
        if(existedProfile){
          const postResponse= await collegeProfileLib.collegeProfileUpdate({...user.basicDetails,id:existedProfile.id});
          const contactDetails= await collegeProfileLib.collegeContactUpdate({...user.contactDetails,id:existedProfile.id});
          const collegeDetsils= await collegeProfileLib.collegeDetailUpdate({...user.collegeDetails,id:existedProfile.id});
          const data = {
            postResponse,
            contactDetails,
            collegeDetsils
          }    
          serviceResponse.data = data
          return serviceResponse
        }
        const response= await collegeProfileLib.collegeProfilePost({...user,uid:decoded[0].uid});
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

  
export async function getCollegeProfile(headerValue) {
    log.info(`${TAG}.collegeProfile() ==> `, headerValue);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await collegeProfileLib.isValid(decoded[0].uid)
      if(isValid){
        const existedProfile=await collegeProfileLib.checkProfilExist(decoded[0].uid)
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



