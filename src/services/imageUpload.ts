import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
// import {  RecruiterProfileDetailsData } from "../../Database/mysql";
import { AWS_S3 } from '../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";
// import { getFileUrl, getSanitizedFileName, saveFile } from '../helpers/s3_media';
import { getFileUrl,getSanitizedFileName, saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';

const TAG=`constant-imageUpload.ts`
export async function uploadCompanyLogoFile(file: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadCompanyLogoFile() `)
   
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.COMPANY_LOGO
      const data = await saveFile(file, fileDirectory, AWS_S3.BUCKET_NAME)
    //   log.debug(` ${TAG}.uploadCompanyLogoFile 's3 response:'` + nodeUtil.inspect(data))
    //   log.debug(
    //     ` ${TAG}.uploadCompanyLogoFile 'fileS3 URL: ' ` + getFileUrl(data.savedFileKey, AWS_S3.BUCKET_NAME)
    //   )
    //   const fileDetails = {
    //     fileName: data?.savedFileName,
    //     originalFileName: file?.originalname,
    //     contentType: file?.mimetype,
    //     s3Bucket: AWS_S3.BUCKET_NAME,
    //     filePath: data?.savedFileKey,
    //     fileUrl: data?.savedLocation,
    //     isPublic: true,
    //     metaData: null
    //   }
  
    //   const fileSavedResp = await RecruiterProfileDetailsData.saveFile(fileDetails)
    //   log.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + nodeUtil.inspect(fileSavedResp))
  
    //   serviceResponse.message = `successfully uploaded ${file.originalname}`
    //   serviceResponse.data = {
    //     uid: fileSavedResp?.uid,
    //     fileName: fileDetails.fileName,
    //     originalFileName: file?.originalname,
    //     contentType: file?.mimetype
    //   }
    return data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    // return serviceResponse
  }