import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse, IAdmin} from '../../models'
import * as adminlmsServices from '../../services/admin/adminLms'
import nodeUtil from 'util'


const TAG = 'controller.lms.admin'

export async function getCourseOverview(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getCourseOverview()`);
      log.debug(`${TAG}.getCourseOverview() Object = ${JSON.stringify(req.body)}`)
      const courseUid=req.params.courseUid
      const response: IServiceResponse = await adminlmsServices.getCourseOverview(courseUid)
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseOverview() `, error)
      next(error)
    }
  }

export async function getCourses(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
      log.info(`${TAG}.getCourses()`);
      log.debug(`${TAG}.getCourses()`)
      // const type = req.query.type;
      const type = req.params
      console.log(type)
      let response:IServiceResponse= await adminlmsServices.getCourses(type)
      responseBuilder(response, res, next, req)
    }catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourses() `, error)
      next(error)
    }
  }

  // course//
  export async function uploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.uploadCourse()`)
      log.debug(`${TAG}.uploadCourse() Object = ${JSON.stringify(req.body)}`)
      const course = req.body
      const file = req.files
      const type = req.params
     
      log.debug(`${TAG}.uploadCourse() req file:` + nodeUtil.inspect(req.file))
  
      const serviceResponse: IServiceResponse = await adminlmsServices.uploadCourse(file,course,type)
  
      responseBuilder(serviceResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.uploadCourse() `, error)
      next(error)
    }
  }

  export async function getuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getuploadCourse()`);
      log.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUid = req.params.courseUid
      const authResponse= await adminlmsServices.getuploadCourse(courseUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error)
      next(error)
    }
  }

  export async function updateuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.updateuploadCourse()`);
      log.debug(`${TAG}.updateuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUid = req.params.courseUid
      const file = req.files
      const course = req.body
      console.log(course)
      console.log(courseUid)
      const authResponse= await adminlmsServices.updateuploadCourse(courseUid,file,course)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.updateuploadCourse() `, error)
      next(error)
    }
  }

  export async function deleteuploadCourse(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getuploadCourse()`);
      log.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`)
      let courseUid = req.params.courseUid
      const authResponse= await adminlmsServices.deleteuploadCourse(courseUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error)
      next(error)
    }
  }


  // courses//
  export async function coursePost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.coursePost()`);
      log.debug(`${TAG}.coursePost() Object = ${JSON.stringify(req.body)}`)
      const user = req.body;
      console.log(user)
      let coursetype = req.params.coursetype
      console.log(coursetype)
      const authResponse: IServiceResponse = await adminlmsServices.courseUser(user,coursetype)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.coursePost() `, error)
      next(error)
    }
  }
  
  export async function coursePartPost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.coursePartPost()`);
      log.debug(`${TAG}.coursePartPost() Object = ${JSON.stringify(req.body)}`)
      const user = req.body;
      console.log(user)
      let courseUid = req.params.courseUid
      console.log(courseUid)
      const authResponse: IServiceResponse = await adminlmsServices.coursePartUser({...user,courseUid})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.coursePartPost() `, error)
      next(error)
    }
  }
  
  export async function getCourseParts(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getCourseParts()`);
      log.debug(`${TAG}.getCourseParts() Object = ${JSON.stringify(req.body)}`)
      let partUid = req.params.partUid
      console.log(partUid)
      const authResponse= await adminlmsServices.getCoursePart(partUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseParts() `, error)
      next(error)
    }
  }
  
  
  export async function courseModulesPost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.courseModulesPost()`);
      log.debug(`${TAG}.courseModulesPost() Object = ${JSON.stringify(req.body)}`)
      const user = req.body;
      console.log(user)
      let partUid = req.params.partUid;
      console.log(partUid)
      const authResponse: IServiceResponse = await adminlmsServices.courseModulesUser({...user,partUid})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.courseModulesPost() `, error)
      next(error)
    }
  }
  
  export async function getCourseModule(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getCourseModule()`);
      log.debug(`${TAG}.getCourseModule() Object = ${JSON.stringify(req.body)}`)
      let moduleUid = req.params.moduleUid
      console.log(moduleUid)
      const authResponse= await adminlmsServices.getCourseModules(moduleUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseModule() `, error)
      next(error)
    }
  }
  
  
  export async function courseLessonPost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.courseLessonPost()`);
      log.debug(`${TAG}.courseLessonPost() Object = ${JSON.stringify(req.body)}`)
      const lessonData = req.body;
      console.log(lessonData)
      let moduleUid = req.params.moduleUid
      console.log(moduleUid)
      const authResponse: IServiceResponse = await adminlmsServices.lessonUser({...lessonData,moduleUid})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.courseModulesPost() `, error)
      next(error)
    }
  }
  
  
  export async function coursetestPost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.coursetestPost()`);
      log.debug(`${TAG}.coursetestPost() Object = ${JSON.stringify(req.body)}`)
      const testData = req.body;
      console.log(testData)
      let moduleUid = req.params.moduleUid
      console.log(moduleUid)
      const authResponse: IServiceResponse = await adminlmsServices.testUser({...testData,moduleUid})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.coursetestPost() `, error)
      next(error)
    }
  }
  
  export async function courseExercisePost(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.courseExercisePost()`);
      log.debug(`${TAG}.courseExercisePost() Object = ${JSON.stringify(req.body)}`)
      const exerciseData = req.body;
      console.log(exerciseData)
      let moduleUid = req.params.moduleUid
      console.log(moduleUid)
      const authResponse: IServiceResponse = await adminlmsServices.exerciseUser({...exerciseData,moduleUid})
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.courseExercisePost() `, error)
      next(error)
    }
  }
  
  
  export async function getModulesLesson(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getModulesLesson()`);
      log.debug(`${TAG}.getModulesLesson() Object = ${JSON.stringify(req.body)}`)
      // let moduleUid = req.params.moduleUid
      // console.log(moduleUid)
      let lessonUid = req.params.lessonUid
      console.log(lessonUid)
      const authResponse= await adminlmsServices.getModulesLesson(lessonUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesLesson() `, error)
      next(error)
    }
  }
  
  export async function deleteModulesLesson(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleteModulesLesson()`);
      log.debug(`${TAG}.deleteModulesLesson() Object = ${JSON.stringify(req.body)}`)
      let lessonUid = req.params.lessonUid
      console.log(lessonUid)
      const authResponse= await adminlmsServices.deleteModulesLesspon(lessonUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesLesson() `, error)
      next(error)
    }
  }
  
  
  export async function getModulesTest(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getModulesTest()`);
      log.debug(`${TAG}.getModulesTest() Object = ${JSON.stringify(req.body)}`)
      // let moduleUid = req.params.moduleUid
      // console.log(moduleUid)
      let testUid = req.params.testUid
      console.log(testUid)
      const authResponse= await adminlmsServices.getModulesTest(testUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesTest() `, error)
      next(error)
    }
  }
  
  export async function deleteModulesTest(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleteModulesTest()`);
      log.debug(`${TAG}.deleteModulesTest() Object = ${JSON.stringify(req.body)}`)
      let testUid = req.params.testUid
      console.log(testUid)
      const authResponse= await adminlmsServices.deleteModulesTest(testUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesTest() `, error)
      next(error)
    }
  }
  
  export async function getModulesExercise(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getModulesExercise()`);
      log.debug(`${TAG}.getModulesExercise() Object = ${JSON.stringify(req.body)}`)
      // let moduleUid = req.params.moduleUid
      // console.log(moduleUid)
      let exerciseUid = req.params.exerciseUid
      console.log(exerciseUid)
      const authResponse= await adminlmsServices.getModulesExercise(exerciseUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getModulesExercise() `, error)
      next(error)
    }
  }
  
export async function deleteModulesExercise(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleteModulesExercise()`);
      log.debug(`${TAG}.deleteModulesExercise() Object = ${JSON.stringify(req.body)}`)
      let exerciseUid = req.params.exerciseUid
      console.log(exerciseUid)
      const authResponse= await adminlmsServices.deleteModulesExercise(exerciseUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteModulesExercise() `, error)
      next(error)
    }
  }


  
export async function updateCoursePartPost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateCoursePartPost()`);
    log.debug(`${TAG}.updateCoursePartPost() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let partUid = req.params.partUid
    console.log(partUid)
    const authResponse= await adminlmsServices.updateCoursePartPost(user,partUid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateCoursePartPost() `, error)
    next(error)
  }
}

export async function updateCourseModulePost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateCourseModulePost()`);
    log.debug(`${TAG}.updateCourseModulePost() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let moduleUid = req.params.moduleUid
    console.log(moduleUid)
    const authResponse= await adminlmsServices.updateCourseModulePost(user,moduleUid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateCourseModulePost() `, error)
    next(error)
  }
}

export async function updateModuleLesson(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateModuleLesson()`);
    log.debug(`${TAG}.updateModuleLesson() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let lessonUid = req.params.lessonUid
    console.log(lessonUid)
    const authResponse= await adminlmsServices.updateLessonPost(user,lessonUid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateModuleLesson() `, error)
    next(error)
  }
}

export async function updateModuleTest(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateModuleTest()`);
    log.debug(`${TAG}.updateModuleTest() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let testUid = req.params.testUid
    console.log(testUid)
    const authResponse= await adminlmsServices.updateTestPost(user,testUid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateModuleTest() `, error)
    next(error)
  }
}

export async function updateModuleExercise(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.updateModuleExercise()`);
    log.debug(`${TAG}.updateModuleExercise() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let exerciseUid = req.params.exerciseUid
    console.log(exerciseUid)
    const authResponse= await adminlmsServices.updateExercisePost(user,exerciseUid)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateModuleExercise() `, error)
    next(error)
  }
}


  export async function deleteSingleLearn(req: any,res: Response, next: NextFunction): Promise<void>{
    try{
      log.info(`${TAG}.deleteSingleLearn()`);
      log.debug(`${TAG}.deleteSingleLearn() Object = ${JSON.stringify(req.body)}`)
      let learnId = req.params;
      const authResponse= await adminlmsServices.deleteSingleLearn(learnId)
      responseBuilder(authResponse, res, next, req)
    }
    catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteSingleLearn() `, error)
      next(error)
    }
  }

export async function deleteCoursePart(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleteCoursePart()`);
      log.debug(`${TAG}.deleteCoursePart() Object = ${JSON.stringify(req.body)}`)
      let partUid = req.params.partUid
      console.log(partUid)
      const authResponse= await adminlmsServices.deleteCoursePart(partUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteCoursePart() `, error)
      next(error)
    }
  }

  export async function deleteCourseModule(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.deleteCourseModule()`);
      log.debug(`${TAG}.deleteCourseModule() Object = ${JSON.stringify(req.body)}`)
      let moduleUid = req.params.moduleUid
      console.log(moduleUid)
      const authResponse= await adminlmsServices.deleteCourseModule(moduleUid)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.deleteCourseModule() `, error)
      next(error)
    }
  }

  export async function getCourseListAll(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      log.info(`${TAG}.getCourseListAll()`);
      log.debug(`${TAG}.getCourseListAll() Object = ${JSON.stringify(req.body)}`)
      let type = req.params.type
      console.log(type)
      const authResponse= await adminlmsServices.getCourseAllList(type)
      responseBuilder(authResponse, res, next, req)
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getCourseListAll() `, error)
      next(error)
    }
  }

