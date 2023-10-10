import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {  RecruiterProfileDetailsData } from "../../Database/mysql";
import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";

import { getFileUrl,getSanitizedFileName, saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';


const TAG = 'services.profile'


export async function recruiterProfile(user) {
    log.info(`${TAG}.recruiterProfile() ==> `, user);  
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      let userID=user.userID
      const isValid=await RecruiterProfileDetailsData.isValid(userID)
      if(isValid){
        const existedProfile=await RecruiterProfileDetailsData.checkExist(userID)
        if(existedProfile){
          const basicDetails= await RecruiterProfileDetailsData.recruiterBasicDetailsUpdate({...user.Profile,userID});
          const contactDetails= await RecruiterProfileDetailsData.recruiterContactUpdate({...user.Contact,userID});
          const companyDetsils= await RecruiterProfileDetailsData.recruitercompanyDetailUpdate({...user.Company,userID});
          const data = {
            basicDetails,
            contactDetails,
            companyDetsils
          }    
          serviceResponse.data = data
          return serviceResponse
        }
      
        const response= await RecruiterProfileDetailsData.recruiterProfilePost({...user});
        const data = {
          ...response
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
  
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.recruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  
export async function getRecruiterProfile(userID) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await RecruiterProfileDetailsData.checkProfilExist(userID)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  export async function deleteRecruiterProfile(userID){
    
    log.info(`${TAG}.deleteRecruiterProfile() ==> `, userID);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      const deleteProfile=await RecruiterProfileDetailsData.deleteRecruiter(userID)
      if(deleteProfile){
      
        serviceResponse.message="user deleted successfully"
        return serviceResponse
        
      }
      else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    }
    catch(error){
      log.error(`ERROR occurred in ${TAG}.deleteRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse
  }


  //****************companylogo********************/
  export async function uploadCompanyLogoFile(

    file: any
   
  ): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadCompanyLogoFile() `)
   
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.COMPANY_LOGO
      const data = await saveFile(file, fileDirectory, AWS_S3.BUCKET_NAME)
      log.debug(` ${TAG}.uploadCompanyLogoFile 's3 response:'` + nodeUtil.inspect(data))
      log.debug(
        ` ${TAG}.uploadCompanyLogoFile 'fileS3 URL: ' ` + getFileUrl(data.savedFileKey, AWS_S3.BUCKET_NAME)
      )
      const fileDetails = {
        fileName: data?.savedFileName,
        originalFileName: file?.originalname,
        contentType: file?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data?.savedFileKey,
        fileUrl: data?.savedLocation,
        isPublic: true,
        metaData: null
      }
  
      const fileSavedResp = await RecruiterProfileDetailsData.saveFile(fileDetails)
      // log.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
      serviceResponse.message = `successfully uploaded ${file.originalname}`
      serviceResponse.data = {
        uid: fileSavedResp?.uid,
        fileName: fileDetails.fileName,
        originalFileName: fileDetails.originalFileName,
        contentType: fileDetails.contentType
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }
 

  export async function getRecruiterList(userID) {
    log.info(`${TAG}.getMentorList() ==> `, userID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await RecruiterProfileDetailsData.getRecruiterList(userID)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    }
    catch(error){
      log.error(`ERROR occurred in ${TAG}.getRecruiterFile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }

  }

  export async function updateCompanylogo(file:any,userID){

    log.info(`${TAG}.updateCompanylogo() ==> `, userID);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      const fileDirectory = DIRECTORIES.COMPANY_LOGO
      const data = await saveFile(file, fileDirectory, AWS_S3.BUCKET_NAME)
      log.debug(` ${TAG}.updateCompanylogo 's3 response:'` + nodeUtil.inspect(data))
      log.debug(
        ` ${TAG}.updateCompanylogo 'fileS3 URL: ' ` + getFileUrl(data.savedFileKey, AWS_S3.BUCKET_NAME)
      )
      const fileDetails = {
        fileName: data?.savedFileName,
        originalFileName: file.originalname,
        contentType: file.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data?.savedFileKey,
        fileUrl: data?.savedLocation,
        isPublic: true,
        metaData: null
      }
     console.log(fileDetails.originalFileName)
      const updateImage = await  RecruiterProfileDetailsData.updateCompanylogo(fileDetails,userID)
    serviceResponse.message=`successfully uploaded ${file.originalname}`
    serviceResponse.data = {
     
      fileName: fileDetails.fileName,
      originalFileName: fileDetails.originalFileName,
      contentType: fileDetails.contentType
    }
      return serviceResponse
    }
    catch(error){
      log.error(`ERROR occurred in ${TAG}.updateCompanylogo`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse
  }


  //*************videouploading********************************/

  export async function uploadVideoFile(

    file: any
   
  ): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadVideoFile() `)
   console.log("33333333333333333333333333333")
   console.log(file)
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(file, fileDirectory, AWS_S3.BUCKET_NAME)
      log.debug(` ${TAG}.uploadVideoFile 's3 response:'` + nodeUtil.inspect(data))
      log.debug(
        ` ${TAG}.uploadVideoFile 'fileS3 URL: ' ` + getFileUrl(data.savedFileKey, AWS_S3.BUCKET_NAME)
      )
      const fileDetails = {
        fileName: data?.savedFileName,
        originalFileName: file?.originalname,
        contentType: file?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data?.savedFileKey,
        fileUrl: data?.savedLocation,
        isPublic: true,
        metaData: null
      }
  
      const fileSavedResp = await RecruiterProfileDetailsData.uploadVideoFile(fileDetails)
      log.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
      serviceResponse.message = `successfully uploaded ${file.originalname}`
      serviceResponse.data = {
        uid: fileSavedResp?.uid,
        fileName: fileDetails.fileName,
        originalFileName: fileDetails.originalFileName,
        contentType: fileDetails.contentType
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }
 
 
