import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {  RecruiterProfileDetailsData } from "../../Database/mysql";

//*****comapnylogo *******/



import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";
// import { getFileUrl, getSanitizedFileName, saveFile } from '../helpers/s3_media';
import { getFileUrl,getSanitizedFileName, saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';
// import {  FileData } from '../Database/mysql'

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
    console.log("SERvices**********************")
    console.log(userID)
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
      log.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
      serviceResponse.message = `successfully uploaded ${file.originalname}`
      serviceResponse.data = {
        uid: fileSavedResp?.uid,
        fileName: fileDetails.fileName,
        originalFileName: file?.originalname,
        contentType: file?.mimetype
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }
 

  