import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto");
import nodeUtil from 'util';
const TAG = 'data_stores_mysql_lib_admin_course';



export async function uploadCourse(fileDetails:any, imageDetails:any,course:any,type:any): Promise<any> {
    logger.info(`${TAG}.uploadVideoFile()`)
    try {
 
    const data = {
        uid: crypto.randomUUID(),
        thumbnail: imageDetails.fileUrl,
        video: fileDetails.fileUrl,
        title: course.title,
        description: course.description,
        mentor: course.mentor,
        lesson: course.lesson,
        exercises: course.exercises,
        test: course.test,
        price: course.price,
        discountprice: course.discountprice,
        filePath:fileDetails.filePath,
   
      };
      console.log(data)

  
      const videoInsertQuery = `INSERT INTO COURSE (UID,  THUMBNAIL, VIDEO, TITLE, DESCRIPTION, MENTOR, LESSON, EXERCISES, TEST, PRICE, DISCOUNTPRICE, Type )
      VALUES(:uid, :thumbnail, :video, :title, :description, :mentor, :lesson, :exercises, :test, :price, :discountprice, :type )`
  
      const [coursedata] = await executeQuery(videoInsertQuery, QueryTypes.INSERT, {
        ...data,...type
      })
      return coursedata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
      throw error
    }
  }

  export async function checkCourseIdExist(courseUID: any){
  
    try {
      logger.info(`${TAG}.checkCourseIdExist() ==>`, courseUID);
      const checkQuery = 'SELECT * FROM `COURSE` WHERE UID= :courseUID';
      const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUID});
      return basic// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkCourseIdExist()`, error);
      throw error;
    }
  }
  export async function getuploadCourse(courseUID){
    try {
      logger.info(`${TAG}.getuploadCourse() ==>`, courseUID);
      const checkQuery = 'SELECT * FROM `COURSE` WHERE UID=:courseUID';
      const [basicCourse] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUID});
      return basicCourse
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }
  export async function updateuploadCourse(fileDetails: any,imageDetails: any,courseUID: any, course:any){
    try {
      logger.info(`${TAG}.getuploadCourse() ==>`, courseUID);
      const data = {
        thumbnail: imageDetails.fileUrl,
        video: fileDetails.fileUrl,
        title: course.title,
        description: course.description,
        mentor: course.mentor,
        lesson: course.lesson,
        exercises: course.exercises,
        test: course.test,
        price: course.price,
        discountprice: course.discountprice,
      }
      console.log(course)

      console.log(data)
      const updateQuery = `UPDATE COURSE SET THUMBNAIL = :thumbnail, VIDEO= :video, TITLE= :title, DESCRIPTION=:description, MENTOR= :mentor, LESSON= :lesson, EXERCISES= :exercises, TEST= :test, PRICE= :price, DISCOUNTPRICE= :discountprice WHERE UID=:courseUID`;

      const [basicCourse] = await executeQuery(updateQuery, QueryTypes.UPDATE, {...data,courseUID});
      return basicCourse
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateuploadCourse()`, error);
      throw error;
    }
  }


  export async function deleteuploadCourse(courseUID){
    try {
      logger.info(`${TAG}.deleteuploadCourse() ==>`, courseUID);
      const checkQuery = 'DELETE  FROM `COURSE` WHERE UID=:courseUID';
      const basicCourse = await executeQuery(checkQuery, QueryTypes.DELETE, {courseUID});
      return basicCourse
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.deleteuploadCourse()`, error);
      throw error;
    }
  }

  // export async function getCourselist(course:any){
  //   try{
  //     logger.info(`${TAG}.getCourselist() ==>`, course);
  //     checkQuery = `select `
  //   }
  // }