import {  mentorWorkExperienceData } from "src/Database/mysql";
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
    const uid=decoded[0].uid  
    const response = await mentorWorkExperienceData.saveWorkExperienceDetails({...user,uid})
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateWorkExperience`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}