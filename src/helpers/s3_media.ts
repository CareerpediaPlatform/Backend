import log from '../logger';
import path from 'path';
import {  PutObjectCommand } from '@aws-sdk/client-s3';
import { s3ConnectionLoader } from '../Loaders/s3_config';
import * as nodeUtil from 'util';
import { AWS_S3 } from '../Loaders/config'
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';

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
    try {
      if (file == null || !Array.isArray(file)) {
        throw new Error('File is empty or not an array');
      }
  
      const savedFilesData = [];
  
      for (const individualFile of file) {
        const originalname = individualFile.originalname;
        const uniqueIdentifier = uuidv4(); // Generate a unique identifier for each file
        const filePath = path.join(folderName, uniqueIdentifier + '-' + originalname);
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
      console.log("11111111111111111111111111111111111111111111111")
      console.log(savedFilesData)

  
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
     
      // const duration = await getVideoDuration(videoPath);
      // console.log(duration)
      log.debug(`${TAG}.saveFileBuffer() s3 upload response::` + nodeUtil.inspect(data))
      data.savedFileKey = filePath
      data.savedFileName = fileName
      data.savedLocation = getFileUrl(filePath, bucketName)
   
      console.log(data)
      return data
     
    } catch (e) {
      log.error(`ERROR occurred in ${TAG}.saveFileBuffer()`, e)
      throw e
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
  
export async function getVideoDuration(videoPath: any): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const duration = metadata.format.duration; // Duration in seconds
        resolve(duration);
      }
    });
  });
}
