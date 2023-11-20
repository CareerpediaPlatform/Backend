import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { StudentAuth, attachment } from "../../Database/mysql"
import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";

import { saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';

import { verifyAccessToken } from "src/helpers/authentication";

import { getMyCourse } from "src/Database/mysql/lib/admin/admin_lms";
import { APIError } from "src/models";
const TAG = 'assignment.service'

export async function uploadAssignment(files:any,headerValue: any, partId: any): Promise<IServiceResponse> {
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
        const response = await attachment.uploadAssignment(fileDetails,uid,partId)
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

  export async function getAllAssignments(partId: any,headerValue: any){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
           response=await attachment.getAllAssignments(partId,uid)
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

  export async function uploadNotes(note: any,headerValue): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadNotes() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response = await attachment.uploadNote(note,uid)
      }
      else{
        serviceResponse.message="invalid user id";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse
      }
      serviceResponse.data = { response, note}
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadNotes`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }

  export async function getAllNotes(headerValue){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response=await attachment.getAllNotes(uid)
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

  export async function uploadThread(thread: any,headerValue: any, partId: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadThread() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
        response = await attachment.uploadThread(thread,uid,partId)
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


  export async function getSingleThread(partId,threadId,headerValue){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      let response:any;
      let decoded=await verifyAccessToken(headerValue)
      const isValid=await StudentAuth.checkEmailOrPhoneExist({uid:decoded.uid})
      const uid=decoded.uid
      if(isValid){
         response=await attachment.getSingleThread(partId,threadId,uid)
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

  export async function postThreadreply(reply:any, threadId:any, uid:any) {
    log.info(`${TAG}.postThreadreply() ==> `,reply,threadId,uid);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const response = await attachment.postThreadreply(reply,threadId,uid)
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

  export async function getAllThreadsCourse(courseId) {
    log.info(`${TAG}.getAllThreadsCourse() ==> `,courseId);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const exist = await getMyCourse(courseId)
      if(exist.length>0){
        const response = await attachment.getAllThreadsCourse(courseId)
        const data = {
          ...response,
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

  export async function getAllThreadsPart(partId) {
    log.info(`${TAG}.getAllThreadsPart() ==> `,partId);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const response = await attachment.getAllThreadsPart(partId)
      const data = {
        ...response,
      }
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getAllThreadsPart`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

