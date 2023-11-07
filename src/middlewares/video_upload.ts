import multer from 'multer'
import { request } from 'http'
import logger from '../logger'
import nodeUtil from 'util'

const ERROR_FILE_FILTER = 'ERROR_FILE_FILTER'
const TAG = 'middlewares.video_upload'



const upload = multer({
  limits: {
    fileSize: 500 * 1024 * 1024, // 500mb
    fieldNameSize: 200, // bytes
  },
  fileFilter: (req, file, cb) => {
    
    if (file != null) {
 
      const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'image/jpeg', 'image/png', 'image/jpg','application/pdf', 'application/zip', 'application/doc', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (allowedMimeTypes.includes(file.mimetype)) {
      
        cb(null, true);
      } else {
        const err = new Error('Only .mp4, .mpeg, .quicktime, .jpeg, .png, .pdf, .zip, .doc, .xlsx  format allowed for videos!');
        err.name = ERROR_FILE_FILTER;
        return cb(err);
      }
    } else {
      
      cb(null, false);
      const err = new Error('File is INVALID');
      err.name = ERROR_FILE_FILTER;
      return cb(err);
    }
  },
});

// export const videoFileReader = function (fieldName: string): any {
//   return function (req: any, res, next): any {
//     upload.single(fieldName)(req, res, function (err) {
//       if (!err) {
        
//         next();
//       } else if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         console.error('Multer error:', err);
//         res.status(400).send({ error: err.message });
//       } else {
//         if (err.name === ERROR_FILE_FILTER) {
//           res.status(400).send({ error: err.message });
//         } else {
//           // An unknown error occurred when uploading.
//           console.error('Unknown error:', err);
//           res.status(500).send({ error: 'Technical Issues' });
//         }
//       }
//     });
//   };
// };


export const videoFileReader = function (fieldName: string,maxCount:number): any {
  
  return function (req: any, res, next): any {
    upload.array(fieldName,maxCount)(req, res, function (err) {
      if (!err) {
        next(); 
  
       
      } else if (err instanceof multer.MulterError) {
  
        // A Multer error occurred when uploading.
        console.error('Multer error:', err);
        res.status(400).send({ error: err.message });
        
      } else {
        if (err.name === ERROR_FILE_FILTER) {
          res.status(400).send({ error: err.message });
         
        } else {
          // An unknown error occurred when uploading.
          console.error('Unknown error:', err);
          res.status(500).send({ error: 'Technical Issues' });
        }
      }
    });
  };
};


// Function to parse form data with nested keys
export function parseFormData(formData: Record<string, string>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in formData) {
    const [section, field] = key.split('[');
    if (!result[section]) {
      result[section] = {};
    }

    const fieldName = field.replace(']', '');
    result[section][fieldName] = formData[key];
  }

  return result;
}