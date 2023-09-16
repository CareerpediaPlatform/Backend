import log from '../logger';
import path from 'path';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3ConnectionLoader } from '../Loaders/s3_config';
import * as nodeUtil from 'util';
import { AWS_S3 } from '../Loaders/config'

const TAG = 'helpers.s3_media'
export async function saveFile(file: any, folderName: string, bucketName: string): Promise<any> {
    log.info(`${TAG}.saveFile()`)
    try {
      if(file == null){
        throw new Error("File is empty")
      }
      const fileName = getSanitizedFileName(file?.originalname)
  
      return await saveFileBuffer(file?.buffer, folderName + '/' + fileName, bucketName, fileName)
    } catch (e) {
      log.error(`ERROR occurred in ${TAG}.saveFile()`, e)
      throw e
    }
  }
  export async function saveFileBuffer(fileBuffer: any, filePath: any, bucketName: string, fileName?: string): Promise<any> {
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