import {  MentorAuth, mentorWorkExperienceData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { verifyAccessToken } from "src/helpers/authentication";

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