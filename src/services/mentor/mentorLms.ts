import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import * as mentorlms from "../../Database/mysql/lib/mentor/mentorLms";
import { verifyAccessToken } from "src/helpers/authentication";
import { MentorAuth } from "src/Database/mysql";

const TAG = 'services.mentor_LMS';


export async function getAllAssignments(partId: any){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
       const response= await mentorlms.getAllAssignments(partId)
        const data={
          response
        }
          serviceResponse.data=data
          return  serviceResponse
        
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllAssignmentsList`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }


  export async function giveRemark(remark: any,assignmentId: any,headerValue: any){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
      let response;
      let decoded=await verifyAccessToken(headerValue)
      console.log(decoded)
      const uid=decoded.mentor_uid
      const mentorValid = await MentorAuth.getMentorUid(uid)
      if(mentorValid){
      const id= assignmentId.assignmentId
      const isValid = await mentorlms.checkAssignmentId(id)
       if(isValid){
         response= await mentorlms.giveRemark(remark,id,uid)
       }
       else{
        serviceResponse.message="Invalid mentorId";
        return serviceResponse
       }
    }
      else{
        serviceResponse.message="Invalid mentorId";
        return serviceResponse
      }
     
        const data={
          response
        }
          serviceResponse.data=data
          return  serviceResponse
        
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.giveRemark`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }


  export async function postThreadreply(reply:any, threadId:any, headerValue:any, partId: any) {
    log.info(`${TAG}.postThreadreply() ==> `,reply,threadId,headerValue);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let response;
      let decoded=await verifyAccessToken(headerValue)
      console.log(decoded)
      const uid=decoded.mentor_uid
      const mentorValid = await MentorAuth.getMentorUid(uid)
      if(mentorValid){
      response = await mentorlms.postThreadreply(reply,threadId,uid,partId)
      }
      else{
        serviceResponse.message="Invalid USER ID"
      }
       
      const data = {
        ...response,
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postThreadreply`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function getSingleRemark(remarkId: any,headerValue: any){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response;
      let decoded=await verifyAccessToken(headerValue)
      console.log(decoded)
      const uid=decoded.mentor_uid
      const mentorValid = await MentorAuth.getMentorUid(uid)
      if(mentorValid){
        response= await mentorlms.getSingleRemark(uid,remarkId)
      }
        
        const data={
          response
        }
          serviceResponse.data=data
          return  serviceResponse
        
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getSingleRemark`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
