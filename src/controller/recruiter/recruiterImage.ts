import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
const TAG = 'controler.recruiterImage'


const aws = require('aws-sdk');

const multer = require('multer');
const multers3 = require('multer-s3');
const bucketName = process.env.babuimgbucket;

const s3 = new aws.s3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION, 
})


  

      const upload = (bucketName:string) => multer({
        storage: multers3({
            s3:s3,
            bucket: bucketName,
            metadata: function(req: any, file:any, cb:any){
                cb(null,{fieldName: file.fieldname});
            },
            key:function(req:any,file:any,cb:any){
                cb(null,"image.jpeg");
            },
        }),
      });




export async function setProfilePic(req: any, res: Response, next:NextFunction): Promise<void>{
    const uploadsingle = upload("babuimgbucket").single("image-upload");
    try{
        await new Promise<void>((resolve,reject)=>{
            uploadsingle(req, res, (err: any) => {
                if (err) {
                 return 
                } else {
                  resolve();
                }
              })
        })
       
    }
    catch(error){

    }
}