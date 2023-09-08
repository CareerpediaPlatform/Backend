import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as uuid from 'uuid';
import * as path from 'path';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const s3 = new AWS.S3({
    accessKeyId: "AKIA3AQ36CJO5JLK5G5M",
    secretAccessKey: "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",
    region: "ap-south-1", 
  });


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid.v4()}${ext}`);
    },
  }),
});

export default upload;





































