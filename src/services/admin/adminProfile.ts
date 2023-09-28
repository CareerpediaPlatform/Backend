import { AdminAuth } from "src/Database/mysql";
import { checkEmailExist } from "src/Database/mysql/lib/admin/admin_auth";
import { RecruiterAuth ,RecruiterProfileDetailsData} from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import { comparePasswords } from "src/helpers/encryption";
import log from "src/logger";
import { IAdmin } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { verifyAccessToken } from "src/helpers/authentication";



const TAG = 'services.admin.recruiter.removeAccess'


  

//  access or remove accerss of a student by admin

 export async function recruiterUpdateStatus(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
    // finde recruiter is valid or not
    let userID=user.userID
    const isValid=await RecruiterProfileDetailsData.isValid(userID)

    if(isValid &&(user.status=="Active" || user.status=="Deactive")){
      if(!isValid){
        serviceResponse.message = `UnAutharized Admin`
        return serviceResponse
      }
      const student=await RecruiterAuth.updateStatusRecruiterActive({...user})
      const data={
        student
      }
      serviceResponse.message = `recruiter status changed to ${user.status} successfully `
      serviceResponse.data = data
      return serviceResponse
    }else{
      serviceResponse.message = `someThing went wrong in url`
          return serviceResponse
    }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.recruiterUpdateStatus`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return await serviceResponse
}
