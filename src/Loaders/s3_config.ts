import logger from '../logger'
import { AWS_S3 } from './config'
import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

let s3Connection

export function s3ConnectionLoader(): any {
  logger.info('loadingS3Connection()')
  try {
    if (s3Connection) {
      return s3Connection
    }
    s3Connection = new S3Client({
      credentials: {
        accessKeyId: AWS_S3.ACCESS_KEY_ID,
        secretAccessKey: AWS_S3.SECRET_ACCESS_KEY,
      },
      // acl: AWS_S3.ACL,
      region: AWS_S3.REGION
    })
    return s3Connection
  } catch (error) {
    logger.error('Error while initialising s3')
    throw error
  }
}