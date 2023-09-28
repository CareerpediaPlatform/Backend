import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { IcollegeProfile } from "src/models/lib/profile";
import {Courses} from "src/Database/mysql";

const TAG = 'services.Courses'


export async function courseUser(user,coursetype) {
    log.info(`${TAG}.courseUser() ==> `, coursetype);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
    
      const coursePost = await Courses.coursesPost(user,coursetype)
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
    
      const coursePart = await Courses.coursePartPost(user)
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

export async function getCoursePart(course_id,part_id) {
    log.info(`${TAG}.getCoursePart() ==> `, course_id,part_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(course_id)
      console.log(part_id)
      const getCourseUid = await Courses.checkCoureUid(course_id);
      console.log(getCourseUid);
      if (!getCourseUid) {
        serviceResponse.message = "Invalid course part UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const coursePart = await Courses.getPart(part_id)
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
    
      const courseModules = await Courses.modulesPost(user)
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
  
export async function getCourseModules(part_id,module_id) {
    log.info(`${TAG}.getCourseModules() ==> `, module_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(part_id)
      const getPartUid = await Courses.checkPartUid(part_id);
      console.log(getPartUid);
      if (!getPartUid) {
        serviceResponse.message = "Invalid course part UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.getModule(module_id)
      const data = {
        courseModules       
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
    
      const courseModules = await Courses.lessonPost(lessonData)
      const data = {
        courseModules       
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
    
      const courseModules = await Courses.testPost(testData)
      const data = {
        courseModules       
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
    
      const courseModules = await Courses.exercisesPost(exerciseData)
      const data = {
        courseModules       
      }    
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.exerciseUser`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getModulesLesspon(module_id,lesson_id) {
    log.info(`${TAG}.getModulesLesspon() ==> `, module_id);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      console.log(module_id)
      console.log(lesson_id)
      const getLesonid = await Courses.checkModuleUid(module_id);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course lesson UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.getLessonPost(lesson_id)
      const data = {
        courseModules       
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
      const getLessonid = await Courses.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course lesson UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.deleteLessonPost(lesson_id)
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
      const getLesonid = await Courses.checkModuleUid(module_id);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course test UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.getTestPost(test_id)
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
      const getLessonid = await Courses.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course test UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.deleteTestPost(test_id)
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
      const getLesonid = await Courses.checkModuleUid(module_id);
      console.log(getLesonid);
      if (!getLesonid) {
        serviceResponse.message = "Invalid course exercise UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.getExercisePost(exercise_id)
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
      const getLessonid = await Courses.checkModuleUid(module_id);
      console.log(getLessonid);
      if (!getLessonid) {
        serviceResponse.message = "Invalid course Exercise UID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
      const courseModules = await Courses.deleteTestPost(exercise_id)
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
