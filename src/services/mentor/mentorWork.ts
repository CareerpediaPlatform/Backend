import {  mentorWorkExperienceData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";


const TAG = 'services.mentor_workExperience'

export async function updateWorkExperience(user) {

  log.info(`${TAG}.updateWorkExperience() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    const response = await mentorWorkExperienceData.saveWorkExperienceDetails({...user})
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