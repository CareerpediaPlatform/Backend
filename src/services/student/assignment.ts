import { HttpStatusCodes } from "../../constants/status_codes";
import log from "../../logger";
import { IServiceResponse, ServiceResponse } from "../../models/lib/service_response";
import { StudentAuth, attachment } from "../../Database/mysql"
import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "../../constants/file_constants";

import { saveFile } from "../../helpers/s3_media";
// import nodeUtil from 'util';

import { verifyAccessToken } from "../../helpers/authentication";

import { getMyCourse } from "../../Database/mysql/lib/admin/admin_lms";
import { APIError } from "../../models";
const TAG = 'assignment.service'

export async function uploadAssignment(files:any,headerValue: any, partUid: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadAssignment()`)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(files, fileDirectory, AWS_S3.BUCKET_NAME)
      const fileDetails = {
        fileName: data[0]?.savedFileName,
        originalFileName: files[0]?.originalname,
        contentType: files[0]?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data[0]?.savedFileKey,
        fileUrl: data[0]?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }
      console.log(fileDetails)
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
        const response = await attachment.uploadAssignment(fileDetails,uid,partUid)
      }
      else{
        serviceResponse.message="invalid user id"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
      // serviceResponse.message = `successfully uploaded ${file.originalname}`
      serviceResponse.data = {
        assignment: fileDetails.fileUrl,
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadAssignment`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }

  export async function getAllAssignments(partUid: any,headerValue: any){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
           response=await attachment.getAllAssignments(partUid,uid)
      }
      else{
        serviceResponse.message="Invalid User Id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      }
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

  export async function uploadNotes(partUid: any,headerValue,note:any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadNotes() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response = await attachment.uploadNote(partUid,uid,note)
      }
      else{
        serviceResponse.message="invalid user id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
      serviceResponse.data =  response
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadNotes`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }

  export async function getAllNotes(partUid:any,headerValue){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response=await attachment.getAllNotes(partUid,uid)
      }
      else{
        serviceResponse.message="Invalid user Id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
          
          const data={
            response
          }
          serviceResponse.data=data
          return  serviceResponse
        
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllNotes`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }

  export async function uploadThread(thread: any,headerValue: any, partUid: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadThread() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
        response = await attachment.uploadThread(thread,uid,partUid)
      }
      else{
        serviceResponse.message="Invalid user Id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
      
      serviceResponse.data = {  
        response,thread
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadThread`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }


  export async function getSingleThread(partUid,threadId,headerValue){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response=await attachment.getSingleThread(partUid,threadId,uid)
      }
      else{
        serviceResponse.message="Invalid user Id"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
        
          const data={
            response
          }
          serviceResponse.data=data
          return  serviceResponse
        
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllNotes`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }

  export async function postThreadreply(reply:any,headerValue: any, partUid:any, threadId:any) {
    log.info(`${TAG}.postThreadreply() ==> `,reply,partUid,threadId);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let response:any;
      console.log(headerValue)
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      console.log(uid)
      if(isValid){
        console.log(threadId)
       const checkId = await attachment.checkThreadId(threadId)
       if(checkId){
        response = await attachment.postThreadreply(reply,uid,partUid,threadId)
       }
       
      }
      else{
        serviceResponse.message="Invalid user Id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
      
      serviceResponse.data = {  
        reply
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postThreadreply`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function getAllThreadsCourse(courseUid) {
    log.info(`${TAG}.getAllThreadsCourse() ==> `,courseUid);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const exist = await getMyCourse(courseUid)
      if(exist.length>0){
        const response = await attachment.getAllThreadsCourse(courseUid)
        const data = {
          response,
        }
        serviceResponse.data = data
      }else{
        serviceResponse.message="course does not exist"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      }
   
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllThreadsCourse`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function getAllThreadsPart(partUid:any,headerValue:any) {
    log.info(`${TAG}.getAllThreadsPart() ==> `,partUid);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let response:any;
      console.log(headerValue)
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      console.log(uid)
      console.log(uid)
      if(isValid){
       const response = await attachment.getAllThreadsPart(partUid)
      }
      else{
        serviceResponse.message="Invalid user Id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
     
      const data={
        ...response
      }
      console.log(data)
      serviceResponse.data=data
      return  serviceResponse
    
   
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllThreadsPart`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

