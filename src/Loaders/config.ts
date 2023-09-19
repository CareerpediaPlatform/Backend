import dotenv from 'dotenv'
import { getNumber, isNull } from '../utils/strings';
import AppError from '../models/lib/app_error';
import logger from '../logger';
import { resolve } from 'path'

dotenv.config()
export const AES_ENC_KEY = process.env.ASE_ENC_KEY ?? 'bf3c199c2470we477d907b1e0917c17c'
export const PORT = process.env.PORT ?? 3307
export const API_CALL_LOG_FORMAT = process.env.API_CALL_LOG_FORMAT ??
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
export const LOG_LEVEL = process.env?.LOG_LEVEL ?? 'debug'

//JWT TOKEN
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET ?? 'careerpediaaccesstkn'
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'careerpediareftkn';
export const JWT_ACCESS_TOKEN_EXPIRY_TIME = 2 * 60 * 60
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = 30 * 24 * 60 * 60
export const OTP_EXPIRY_TIME = 600

export const SWAGGER_DOC_PATH = process.env.SWAGGER_DOC_PATH ?? resolve('./careerpedia-doc.yml')

//AWS Config

export const AWS_BUCKET = process.env.AWS_BUCKET 
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION 
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY 
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

/*MySQL DB config*/
export const MYSQL_DATABASE = {
  address: process.env.SQL_DATABASE_ADDRESS || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.SQL_DATABASE_USERNAME,
  password: process.env.SQL_DATABASE_PASSWORD,
  db_name: process.env.DATABASE_NAME || '',
  pool_size: process.env.DATABASE_POOL_SIZE || '30',
};

export const sqlConfig = {
  user: MYSQL_DATABASE.username,
  password: MYSQL_DATABASE.password,
  database: MYSQL_DATABASE.db_name,
  server: MYSQL_DATABASE.address,
  port: getNumber(MYSQL_DATABASE.port),
  pool: {
    max: getNumber(MYSQL_DATABASE.pool_size),
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

// for image
export const AWS_S3 = {
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_KEY,
  BUCKET_NAME: process.env.AWS_BUCKET,
  ACL: process.env.S3_ACL || 'public-read',
  REGION: process.env.AWS_BUCKET_REGION,
  SECURE_BUCKET_NAME: process.env.S3_SECURE_BUCKET_NAME
};


  // checking required information in .env file
  export const checkEnv=async()=>{
    logger.info("env validation started")
    const requiredInfo=['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD']
    requiredInfo.forEach((field) => {
      if (isNull(process.env[field])) {
        throw new AppError(`Required configuration '${field}' is missing`)
      }
    })
  }

  // export async function checkEnv (): Promise<void> {
  //   logger.info('STARTED Validation of env variables!')
  //   const mandatoryFields = ['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD']
  //   mandatoryFields.forEach((field) => {
  //     if (isNull(process.env[field])) {
  //       throw new AppError(`Required configuration '${field}' is missing`)
  //     }
  //   })
  // }