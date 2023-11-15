import log from '../logger';
import path from 'path';
import {  PutObjectCommand } from '@aws-sdk/client-s3';
import { s3ConnectionLoader } from '../Loaders/s3_config';
import * as nodeUtil from 'util';
import { AWS_S3 } from '../Loaders/config'
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import getVideoDurationInSeconds from 'get-video-duration';



const TAG = 'helpers.s3_media'
// export async function saveFile(file: any, folderName: string, bucketName: string): Promise<any> {
  
//     log.info(`${TAG}.saveFile()`)
//     try {
//       if(file == null){
//         throw new Error("File is empty")
//       }
//       const originalname = file[0].originalname;
//       const videoPath = path.join(folderName, originalname);
//       console.log('Original Name:', videoPath);
//       const fileName = getSanitizedFileName(file?.originalname)
     
//       return await saveFileBuffer(file?.buffer, folderName + '/' + fileName, bucketName, fileName,originalname)
//     } catch (e) {
//       log.error(`ERROR occurred in ${TAG}.saveFile()`, e)
//       throw e
//     }
//   }
  export async function saveFile(file: any, folderName: string, bucketName: string): Promise<any> {
    log.info(`${TAG}.saveFile()`);
    console.log(file)
   
    try {

      const savedFilesData = [];
      const fileList = Array.isArray(file) ? file : [file];
      for (const individualFile of fileList) {
        if (individualFile == null) {
          console.error('File is empty or null');
          continue;  
        }
        const originalname = individualFile.originalname;
        console.log("originalnameaaaaaaaaaaaaaaaaaaa")
        console.log(originalname)
        // const fileMimetype = individualFile.mimetype;

        // // Add validation to check if the file is an MP4 video
        // if (fileMimetype !== 'video/mp4') {
        //   console.error('Invalid file type. Only MP4 files are allowed.');
        //   continue;
        // }
  
        const uniqueIdentifier = uuidv4(); // Generate a unique identifier for each file
        const filePath = path.join( folderName,uniqueIdentifier + '-' + originalname);
        console.log('Original Name:', filePath);
        const fileName = getSanitizedFileName(originalname);
        const savedFileData = await saveFileBuffer(
          individualFile.buffer,
          filePath,
          bucketName,
          fileName,
          originalname
        );
  
        savedFilesData.push(savedFileData);
      
      }
   
      return savedFilesData;
    } catch (e) {
      log.error(`ERROR occurred in ${TAG}.saveFile()`, e);
      throw e;
    }
  }
  export async function saveFileBuffer(fileBuffer: any, filePath: any, bucketName: string, fileName?: string, videoPath?: string): Promise<any> {

    log.info(`${TAG}.saveFileBuffer()`)
    try {
      const params = {
        Bucket: bucketName,
        Key: filePath,
        Body: fileBuffer
      }
      const command = new PutObjectCommand(params)
      const s3Connection = s3ConnectionLoader()
      const data = await s3Connection.send(command)
    
      log.debug(`${TAG}.saveFileBuffer() s3 upload response::` + nodeUtil.inspect(data))
      data.savedFileKey = filePath
      data.savedFileName = fileName
      data.savedLocation = getFileUrl(filePath, bucketName)
      // const duration = await getVideoDurations( data.savedFileKey);
      //   console.log("****************************************")
      //   console.log(duration)
      return data
     
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.saveFileBuffer()`, error)
      throw error
    }
  }
  
  export function getFileUrl(fileKey: string, bucket: string): string {
    return `https://${bucket}.s3.${AWS_S3.REGION}.amazonaws.com/${fileKey}`
 
  }


  export function getFileName(filePath: string): string {
    return path.basename(filePath)
  }
  
  export function getSanitizedFileName(fileName: string): string {
    fileName = fileName?.replace(/ /g, '_')
    return Math.floor(Date.now()) + '-' + (fileName || '')
  }
  

  

export async function getVideoDurations(filePath: any): Promise<void> {
  try {
    // Convert to absolute path
    const absolutePath = resolve(filePath);
    
    const duration: number | undefined = await getVideoDurationInSeconds(absolutePath);
    if (duration !== undefined) {
      console.log(duration);
    } else {
      console.log('Unable to determine video duration.');
    }
  } catch (error) {
    console.error('Error fetching video duration:', error);
  }
}

// ...
