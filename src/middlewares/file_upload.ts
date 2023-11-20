import multer from 'multer'
import { request } from 'http'
import logger from '../logger'
import nodeUtil from 'util'



const ERROR_FILE_FILTER = 'ERROR_FILE_FILTER'
const TAG = 'middlewares.file_upload'

export const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024, //100mb
    fieldNameSize: 200 // bytes
  }
})

export const uploadProfileImage = multer({
  limits: {
    fileSize: 1 * 1024 * 1024, //1mb
    fieldNameSize: 200 // bytes
  },
  fileFilter: (req, file, cb) => {
    console.log('fileFilter.. file:'+nodeUtil.inspect(file))
    if (file != null && (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'
      || file.mimetype == 'image/webp')) {
      cb(null, true)
    } else {
      cb(null, false)
      const err: Error = new Error('Only .png, .jpg, .jpeg and .webp format allowed!')
      if(file == null){
        err.message = 'File is INVALID'
      }
      err.name = ERROR_FILE_FILTER
      return cb(err)
    }
  }
})

export const fileReader = function (fieldName: string): any {
  return function (req: any, res, next): any {
    upload.single(fieldName)(req, res, function (err) {
      if (!err) {
        // Everything went fine.
        next()
      } else if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        logger.info(`${TAG}.fileReader(): Multer error.`, err)
        res.status(400).send({ error: err.message })
      } else {
        if (err.name === ERROR_FILE_FILTER){
          res.status(400).send({ error: err.message })
        } else {
          // An unknown error occurred when uploading.
          logger.error(`${TAG}.fileReader(): Unknown error.`, err)
          res.status(500).send({ error: 'Technical Issues' })
        }
      }
    })
  }
}
export const imageFileReader = function (fieldName: string): any {
  // logger.debug(`${TAG}.imageFileReader(): start: ` + fieldName)
  return function (req: any, res, next): any {
    uploadProfileImage.single(fieldName)(req, res, function (err) {
      if (!err) {
       
        next()
      } else if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        logger.info(`${TAG}.imageFileReader(): Multer error.`, err)
        res.status(400).send({ error: err.message })
      } else {
        // An unknown error occurred when uploading.
        logger.error(`${TAG}.imageFileReader(): Unknown error.`, err)
        res.status(500).send({ error: 'Technical Issues' })
      }
    })
  }
}
