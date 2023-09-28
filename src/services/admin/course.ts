import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";

import { coursedata } from "../../Database/mysql"
import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";

import { getFileUrl, getVideoDuration, saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';
const TAG = 'course.service'

export async function uploadCourse(files: any[],course:any,type: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadVideoFile() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(files, fileDirectory, AWS_S3.BUCKET_NAME)
   
      // log.debug(` ${TAG}.uploadVideoFile 's3 response:'` + nodeUtil.inspect(data))
      // log.debug(
      //   ` ${TAG}.uploadVideoFile 'fileS3 URL: ' ` + getFileUrl(data.savedFileKey, AWS_S3.BUCKET_NAME)
      // )
      const file = files[0];
      const data1 = data[0]
      const fileDetails = {
        fileName: data1?.savedFileName,
        originalFileName: file?.originalname,
        contentType: file?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data1?.savedFileKey,
        fileUrl: data1?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }
      const image = files[1];
      const data2 = data[1]
      const imageDetails = {
        fileName: data2?.savedFileName,
        originalFileName: image?.originalname,
        contentType:image?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data2?.savedFileKey,
        fileUrl: data2?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }
    // const type="basic"
    
    console.log(imageDetails)
      
      const fileSavedResp = await coursedata.uploadCourse(fileDetails,imageDetails,course,type)
     
      log.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
      // serviceResponse.message = `successfully uploaded ${file.originalname}`
      serviceResponse.data = {
       
        uid: course.uid,
        // fileName: fileDetails.fileName,
        // originalFileName: fileDetails.originalFileName,
        // contentType: fileDetails.contentType,
        thumbnail: imageDetails.fileUrl,
        video: fileDetails.fileUrl,
        title: course.title,
        description: course.description,
        mentor: course.mentor,
        lesson: course.lesson,
        exercises: course.exercises,
        test: course.test,
        price: course.price,
        discountprice: course.discountprice,
        type:type
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }
  export async function getuploadCourse(courseUID) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedCourseID=await coursedata.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await coursedata.getuploadCourse(courseUID)
        const data = {
          existedCourse 
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid UId"
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }
  export async function updateuploadCourse(courseUID:any, files:any, course:any) {
    log.info(`${TAG}.updateuploadCourse() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(files, fileDirectory, AWS_S3.BUCKET_NAME)
      const file = files[0];
      const data1 = data[0]
      const fileDetails = {
        fileName: data1?.savedFileName,
        originalFileName: file?.originalname,
        contentType: file?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data1?.savedFileKey,
        fileUrl: data1?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }
      const image = files[1];
      const data2 = data[1]
      const imageDetails = {
        fileName: data2?.savedFileName,
        originalFileName: image?.originalname,
        contentType:image?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data2?.savedFileKey,
        fileUrl: data2?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }

      const existedCourseID=await coursedata.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await coursedata.updateuploadCourse(fileDetails,imageDetails,courseUID,course)
        const data = {
          existedCourse 
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid courseId"
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateuploadCourse`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function deleteuploadCourse(courseUID:any) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedCourseID=await coursedata.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await coursedata.deleteuploadCourse(courseUID)
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid UId"
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }