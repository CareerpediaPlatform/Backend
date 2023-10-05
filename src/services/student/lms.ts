import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import * as lmsLib from "../../Database/mysql/lib/student/lms"

const TAG = 'services.lms.student'
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
    try{
          const response=await lmsLib.getCourses(coursetype)
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
  
export async function getMyCourses(list){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
          const response=await lmsLib.getMyCourses([...list])
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getMyCourses`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  
export async function getPartDetail(){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
          const response=await lmsLib.getPartDetail()
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getPartDetail`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  