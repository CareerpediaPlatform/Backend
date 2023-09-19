import {  mentorEducationData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "src/Database/mysql";


const TAG = 'services.mentor_Education'

export async function updateEducation(user) {

  log.info(`${TAG}.updateEducation() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {

    console.log("dgycdgscsdcsdcsdcdscsdc")
    console.log(user)
    
    const response = await mentorEducationData.saveEducationDetails({...user})
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateEducation`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}


export async function deleteEducationProfile(uid){
  console.log("SERvices**********************")
  console.log(uid)
  log.info(`${TAG}.deleteRecruiterProfile() ==> `, uid);
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{

    
    const deleteProfile=await mentorEducationData.deleteRecruiter(uid)
    if(deleteProfile){
      serviceResponse.message="user deleted successfully"
      return serviceResponse  
    }
    else{
      serviceResponse.message="invalid user id"
      return serviceResponse
    }
  }
  catch(error){
    log.error(`ERROR occurred in ${TAG}.deleteRecruiterProfile`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse
}