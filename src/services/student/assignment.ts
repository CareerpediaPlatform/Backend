import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { attachment } from "../../Database/mysql"
import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";

import { saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';
import { getMyCourse } from "src/Database/mysql/lib/admin/admin_lms";
const TAG = 'assignment.service'

export async function uploadAssignment(files:any): Promise<IServiceResponse> {
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
      
      const fileSavedResp = await attachment.uploadAssignment(fileDetails)
     
      log.debug(` ${TAG}.uploadAssignment 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
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

  export async function getAllAssignments(user){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
          const response=await attachment.getAllAssignments(user)
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

  export async function uploadNotes(note: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadNotes() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const note_Id = await attachment.uploadNote(note)
      serviceResponse.data = {  
        note_Id,
        note,
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadNotes`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }

  export async function getAllNotes(user){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
          const response=await attachment.getAllNotes(user)
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

  export async function uploadThread(thread: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadThread() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const thread_Id = await attachment.uploadThread(thread)
      serviceResponse.data = {  
        thread_Id,
        thread
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadThread`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }


  export async function getAllThreads(threadId,uid){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
          const response=await attachment.getAllThreads(threadId,uid)
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