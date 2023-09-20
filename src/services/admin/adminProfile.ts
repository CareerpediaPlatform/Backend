import { AdminAuth } from "src/Database/mysql";
import { checkEmailExist } from "src/Database/mysql/lib/admin/admin_auth";
import { AdminProfile } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import { comparePasswords } from "src/helpers/encryption";
import log from "src/logger";
import { IAdmin } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";



const TAG = 'services.admin.recruiter.removeAccess'

export async function updateRemoveAccessRecruiter(userId) {
    log.info(`${TAG}.updateRemoveAccessRecruiter() ==> `, userId);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  
    try {
      await AdminProfile.updateStatusRecruiterActive(userId);
      serviceResponse.message = "recruiter actived"; // Set the response message
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateRemoveAccessRecruiter`, error);
      serviceResponse.addServerError('Failed to activate recruiter due to technical difficulties');
    }
  
    return serviceResponse;
  }
  