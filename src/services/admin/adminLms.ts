import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import * as lmsLib from "../../Database/mysql/lib/admin/admin_lms"

const TAG = 'services.lms.admin'
export async function getCourseOverview(courseId){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
          const response=await lmsLib.getCourseOverview(courseId)
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  
export async function getCourses(coursetype){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    let response;
    try{
      if(coursetype){
        response=await lmsLib.getCourses(coursetype)
      }
      else{
        response=await lmsLib.getAllCourses()
      }
          
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  
// export async function getAllCourses(){
//     const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
//     try{
      
//           const response=await lmsLib.getAllCourses()
//           const data=[
//             ...response
//           ]
//           serviceResponse.data=data
//           return await serviceResponse
//     }catch (error) {
//       log.error(`ERROR occurred in ${TAG}.getAllCourses()`, error);
//       serviceResponse.addServerError('Failed to create user due to technical difficulties');
//     }
  
//   }
  