import { AdminAuth } from "src/Database/mysql";
import { checkEmailExist } from "src/Database/mysql/lib/admin/admin_auth";
import { MentorAuth,RecruiterAuth} from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { verifyAccessToken } from "src/helpers/authentication";



const TAG = 'services.admin.recruiter.removeAccess'


  

//  access or remove accerss of a recruiter by admin

 export async function recruiterUpdateStatus(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
      // find admin is valid or not
    const decoded=await verifyAccessToken(user.headerValue)
    if(decoded &&(user.status=="ACTIVE" ||user.status=="DEACTIVE")){
      if(decoded.role!="admin"){
        serviceResponse.message = `UnAutharized Admin`
        return serviceResponse
      }
      const recruiter=await RecruiterAuth.recruiterUpdateStatus({...user})
      const data={
        recruiter
      }
      serviceResponse.message = `recruiter status changed to ${user.status} successfully `
      serviceResponse.data = data
      return serviceResponse
    }else{
      serviceResponse.message = `something went wrong in url`
          return serviceResponse
    }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.recruiterUpdateStatus`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return await serviceResponse
}

//  access or remove accerss of a mentor by admin

export async function mentorUpdateStatus(user){
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try{
      // find admin is valid or not
    const decoded=await verifyAccessToken(user.headerValue)
    if(decoded &&(user.status=="ACTIVE" ||user.status=="DEACTIVE")){
      if(decoded.role!="admin"){
        serviceResponse.message = `UnAutharized Admin`
        return serviceResponse
      }
      const recruiter=await MentorAuth.mentorUpdateStatus({...user})
      const data={
        recruiter
      }
      serviceResponse.message = `recruiter status changed to ${user.status} successfully `
      serviceResponse.data = data
      return serviceResponse
    }else{
      serviceResponse.message = `something went wrong in url`
          return serviceResponse
    }
  }catch (error) {
    log.error(`ERROR occurred in ${TAG}.mentorUpdateStatus`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return await serviceResponse
}