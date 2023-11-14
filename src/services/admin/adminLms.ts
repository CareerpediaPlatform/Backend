import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import {adminLms} from "../../Database/mysql"

import { AWS_S3 } from '../../Loaders/config';
import { DIRECTORIES } from "src/constants/file_constants";
import {  getFileUrl, getVideoDurations, saveFile } from "src/helpers/s3_media";
import nodeUtil from 'util';

const TAG = 'services.lms.admin'
export async function getCourseOverview(courseId){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      
          const response=await adminLms.getCourseOverview(courseId)
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  
export async function getCourses(coursetype){
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    let response;
    try{
      if(coursetype){
        response=await adminLms.getCourses(coursetype)
      }
      else{
        response=await adminLms.getAllCourses()
      }
          
          const data=[
            ...response
          ]
          serviceResponse.data=data
          return await serviceResponse
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
  
  }
  

  // course_overvew//
  export async function uploadCourse(files: any[],course:any,type: any): Promise<IServiceResponse> {
    log.info(`${TAG}.uploadCourse() `)

    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false)
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(files, fileDirectory, AWS_S3.BUCKET_NAME)
      const fileDetails = {
        fileName: data[0]?.savedFileName,
        originalFileName: files[0]?.originalname,
        contentType: files[0]?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data[0]?.savedFileKey,
        fileUrl: data[0]?.savedLocation,
        isPublic: true,
        metaData: null,
      
      }
      const fileUrl=  getFileUrl(data[0]?.savedFileKey, AWS_S3.BUCKET_NAME)
       const duration = await getVideoDurations(fileUrl);
        console.log("****************************************")
        console.log(duration)
   
      // const imageDetails = {
      //   fileName: data[1]?.savedFileName,
      //   originalFileName: files[1]?.originalname,
      //   contentType:files[1]?.mimetype,
      //   s3Bucket: AWS_S3.BUCKET_NAME,
      //   filePath: data[1]?.savedFileKey,
      //   fileUrl: data[1]?.savedLocation,
      //   isPublic: true,
      //   metaData: null,
      // }
      const fileSavedResp = await adminLms.uploadCourse(fileDetails,course,type)
    
        serviceResponse.data = {
        courseUID: course.courseUID,
        // thumbnail: imageDetails.fileUrl,
        video: fileDetails.fileUrl,
        title: course.title,
        description: course.description,
        mentor: course.mentor,
        lesson: course.lesson,
        exercises: course.exercises,
        test: course.test,
        price: course.price,
        discountprice: course.discountprice,
        type:type,
        learn: course.learn
      }

    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse`, error)
      serviceResponse.addServerError('Failed to upload file due to technical difficulties')
    }
    return serviceResponse
  }

export async function getuploadCourse(courseUID) {
    log.info(`${TAG}.getuploadCourse() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedCourseID=await adminLms.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await adminLms.getuploadCourse(courseUID)
        const data = {
          existedCourse 
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid COURSE UId"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getuploadCourse`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }
  
export async function updateuploadCourse(courseUID:any, files:any, course:any) {
    log.info(`${TAG}.updateuploadCourse() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const fileDirectory = DIRECTORIES.LMS_VIDEOS
      const data = await saveFile(files, fileDirectory, AWS_S3.BUCKET_NAME)
      const fileDetails = {
        fileName: data[0]?.savedFileName,
        originalFileName: files[0]?.originalname,
        contentType: files[0]?.mimetype,
        s3Bucket: AWS_S3.BUCKET_NAME,
        filePath: data[0]?.savedFileKey,
        fileUrl: data[0].savedLocation,
        isPublic: true,
        metaData: null,
      }
   
      // const imageDetails = {
      //   fileName: data[1]?.savedFileName,
      //   originalFileName: files[1].originalname,
      //   contentType:files[1].mimetype,
      //   s3Bucket: AWS_S3.BUCKET_NAME,
      //   filePath: data[1]?.savedFileKey,
      //   fileUrl: data[1]?.savedLocation,
      //   isPublic: true,
      //   metaData: null,
      // }
    

      const existedCourseID=await adminLms.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await adminLms.updateuploadCourse(fileDetails,courseUID,course)
        const data = {
          existedCourse 
        }    
        serviceResponse.data = data
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid courseId"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateuploadCourse`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function deleteuploadCourse(courseUID:any) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, courseUID);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedCourseID=await adminLms.checkCourseIdExist(courseUID)
      if(existedCourseID){
        const existedCourse=await adminLms.deleteuploadCourse(courseUID)
        return serviceResponse
      }
      else{
        serviceResponse.message= "Invalid COURSE UId"
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

  // courses//
export async function courseUser(user,coursetype) {
    log.info(`${TAG}.courseUser() ==> `, coursetype);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const coursePost = await adminLms.coursesPost(user,coursetype)
      const data = {
        coursePost       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.courseUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


export async function coursePartUser(user) {
    log.info(`${TAG}.coursePartUser() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const coursePart = await adminLms.coursePartPost(user)
      const data = {
        coursePart       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.coursePartUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getCoursePart(courseUid,partUid) {
    log.info(`${TAG}.getCoursePart() ==> `, courseUid,partUid);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(courseUid)
      console.log(partUid)
      const getCourseUid = await adminLms.checkCoureUid(courseUid);
      console.log(getCourseUid);
      if (!getCourseUid) {
        serviceResponse.message = "Invalid course part UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const coursePart = await adminLms.getPart(partUid)
      const data = {
        coursePart       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCoursePart`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  } 

export async function courseModulesUser(user) {
    log.info(`${TAG}.courseModulesUser() ==> `, user);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const courseModules = await adminLms.modulesPost(user)
      const data = {
        courseModules       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.courseModulesUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  } 
  
export async function getCourseModules(partUid) {
    log.info(`${TAG}.getCourseModules() ==> `, partUid);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      // console.log(moduleUid)
      console.log(partUid)
      const getPartUid = await adminLms.checkPartUid(partUid);
      console.log(getPartUid);
      // if (!getPartUid) {
      //   serviceResponse.message = "Invalid course part UID";
      //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      //   return serviceResponse;
      // }
      // const courseModules = await adminLms.getModule(moduleUid)
      const data = {
        getPartUid       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseModules`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }   

export async function lessonUser(lessonData) {
    log.info(`${TAG}.lessonUser() ==> `, lessonData);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const lessonModulePost = await adminLms.lessonPost(lessonData)
      const data = {
        lessonModulePost       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.lessonUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }    

export async function testUser(testData) {
    log.info(`${TAG}.testUser() ==> `, testData);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const testModulesPost = await adminLms.testPost(testData)
      const data = {
        testModulesPost       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.testUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function exerciseUser(exerciseData) {
    log.info(`${TAG}.exerciseUser() ==> `, exerciseData);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const exerciseModulesPost = await adminLms.exercisesPost(exerciseData)
      const data = {
        exerciseModulesPost       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.exerciseUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getModulesLesson(moduleUid,lessonUid) {
    log.info(`${TAG}.getModulesLesspon() ==> `, moduleUid);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(moduleUid)
      console.log(lessonUid)
      const getLesonid = await adminLms.checkModuleUid(moduleUid);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course lesson UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const getLessonModules = await adminLms.getLessonPost(lessonUid)
      const data = {
        getLessonModules       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesLesspon`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }   

export async function deleteModulesLesspon(module_id,lesson_id) {
    log.info(`${TAG}.deleteModulesLesspon() ==> `, module_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(lesson_id)
      console.log("aaaaaaaaaaaaaaaaaa")
      const getLessonid = await adminLms.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course lesson UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await adminLms.deleteLessonPost(lesson_id)
      const data = {
        courseModules       
      }    
      serviceResponse.message = "course module lesson deleted"
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesLesspon`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getModulesTest(module_id,test_id) {
    log.info(`${TAG}.getModulesTest() ==> `, test_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(test_id)
      const getLesonid = await adminLms.checkModuleUid(module_id);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course test UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await adminLms.getTestPost(test_id)
      const data = {
        courseModules       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesTest`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }   

export async function deleteModulesTest(module_id,test_id) {
    log.info(`${TAG}.deleteModulesLesspon() ==> `, test_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(test_id)
      const getLessonid = await adminLms.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course test UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await adminLms.deleteTestPost(test_id)
      const data = {
        courseModules       
      }    
      serviceResponse.message = "course module test deleted"
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesLesspon`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getModulesExercise(module_id,exercise_id) {
    log.info(`${TAG}.getModulesExercise() ==> `, exercise_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(exercise_id)
      const getLesonid = await adminLms.checkModuleUid(module_id);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course exercise UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await adminLms.getExercisePost(exercise_id)
      const data = {
        courseModules       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesExercise`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }   

export async function deleteModulesExercise(module_id,exercise_id) {
    log.info(`${TAG}.deleteModulesExercise() ==> `, exercise_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(exercise_id)
      const getLessonid = await adminLms.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course Exercise UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await adminLms.deleteTestPost(exercise_id)
      const data = {
        courseModules       
      }    
      serviceResponse.message = "course module exercise deleted"
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesExercise`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }


  
export async function updateCoursePartPost(user,partUid) {

  log.info(`${TAG}.updateCoursePartPost() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(partUid)
    const getPartUid = await adminLms.getPart(partUid);
    console.log(getPartUid);
    if (!getPartUid) {
      serviceResponse.message = "Invalid course part UID";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    const response = await adminLms.updateCoursePartPost(user,partUid)
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateCoursePartPost`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}

export async function updateCourseModulePost(user,moduleUid) {

  log.info(`${TAG}.updateCourseModulePost() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(moduleUid)
    const getModuleUid = await adminLms.getModule(moduleUid);
    console.log(getModuleUid);
    if (!getModuleUid) {
      serviceResponse.message = "Invalid course module UID";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    const response = await adminLms.updateModulesPost(user,moduleUid)
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateCourseModulePost`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}

export async function updateLessonPost(user,lessonUid) {
  log.info(`${TAG}.updateLessonPost() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(lessonUid)
    const getLessonUid = await adminLms.getLessonPost(lessonUid);
    console.log(getLessonUid);
    if (!getLessonUid) {
      serviceResponse.message = "Invalid  module lesson UID";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    const response = await adminLms.updateLessonPost(user,lessonUid)
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateLessonPost`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}

export async function updateTestPost(user,testUid) {

  log.info(`${TAG}.updateTestPost() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(testUid)
    const getTestUid = await adminLms.getTestPost(testUid);
    console.log(getTestUid);
    if (!getTestUid) {
      serviceResponse.message = "Invalid  module test UID";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    const response = await adminLms.updateTestPost(user,testUid)
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateTestPost`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}

export async function updateExercisePost(user,exerciseUid) {

  log.info(`${TAG}.updateExercisePost() ==> `,user);  
  const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
  try {
    console.log(exerciseUid)
    const getTestUid = await adminLms.getExercisePost(exerciseUid);
    console.log(getTestUid);
    if (!getTestUid) {
      serviceResponse.message = "Invalid  module Exercise UID";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
      return serviceResponse;
    }
    const response = await adminLms.updateExercisesPost(user,exerciseUid)
    const data = {
      ...response
          }
    serviceResponse.data = data
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateExercisePost`, error);
    serviceResponse.addServerError('Failed to create user due to technical difficulties');
  }
  return serviceResponse;
}


  export async function deleteSingleLearn(learnId) {
    log.info(`${TAG}.deleteModulesExercise() ==> `, learnId);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const getLearnid = await adminLms.checkLearnId(learnId);
    
      if (getLearnid) {
        const learnID = await adminLms.deleteLearnId(learnId)
      }
      else{
        serviceResponse.message = "Invalid course-overview LearnId";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
       
      serviceResponse.message = "course-overview learn deleted"
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteLearnId`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }









