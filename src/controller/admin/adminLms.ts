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
      const courseId=req.params.courseId
      const response: IServiceResponse = await adminlmsServices.getCourseOverview(courseId)
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
      
      const courseType = req.query.type;
      let response:IServiceResponse= await adminlmsServices.getCourses(courseType)
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
      let courseUID = req.params.uid
      const authResponse= await adminlmsServices.getuploadCourse(courseUID)
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
      let courseUID = req.params.uid
      const file = req.files
      const course = req.body
      const authResponse= await adminlmsServices.updateuploadCourse(courseUID,file,course)
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
      let courseUID = req.params.uid
      const authResponse= await adminlmsServices.deleteuploadCourse(courseUID)
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
      let course_id = req.params.course_id
      console.log(course_id)
      const authResponse: IServiceResponse = await adminlmsServices.coursePartUser({...user,course_id})
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
      let course_id = req.params.course_id
      console.log(course_id)
      let part_id = req.params.part_id
      console.log(part_id)
      const authResponse= await adminlmsServices.getCoursePart(course_id,part_id)
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
      let part_id = req.params.part_id
      console.log(part_id)
      const authResponse: IServiceResponse = await adminlmsServices.courseModulesUser({...user,part_id})
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
      let part_id = req.params.part_id
      console.log(part_id)
      let module_id = req.params.module_id
      console.log(module_id)
      const authResponse= await adminlmsServices.getCourseModules(part_id,module_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      const authResponse: IServiceResponse = await adminlmsServices.lessonUser({...lessonData,module_id})
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
      let module_id = req.params.module_id
      console.log(module_id)
      const authResponse: IServiceResponse = await adminlmsServices.testUser({...testData,module_id})
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
      let module_id = req.params.module_id
      console.log(module_id)
      const authResponse: IServiceResponse = await adminlmsServices.exerciseUser({...exerciseData,module_id})
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
      let module_id = req.params.module_id
      console.log(module_id)
      let lesson_id = req.params.lesson_id
      console.log(lesson_id)
      const authResponse= await adminlmsServices.getModulesLesspon(module_id,lesson_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      let lesson_id = req.params.lesson_id
      console.log(lesson_id)
      const authResponse= await adminlmsServices.deleteModulesLesspon(module_id,lesson_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      let test_id = req.params.test_id
      console.log(test_id)
      const authResponse= await adminlmsServices.getModulesTest(module_id,test_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      let test_id = req.params.test_id
      console.log(test_id)
      const authResponse= await adminlmsServices.deleteModulesTest(module_id,test_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      let exercise_id = req.params.exercise_id
      console.log(exercise_id)
      const authResponse= await adminlmsServices.getModulesTest(module_id,exercise_id)
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
      let module_id = req.params.module_id
      console.log(module_id)
      let exercise_id = req.params.exercise_id
      console.log(exercise_id)
      const authResponse= await adminlmsServices.deleteModulesTest(module_id,exercise_id)
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
    let part_id = req.params.part_id
    console.log(part_id)
    const authResponse= await adminlmsServices.updateCoursePartPost(user,part_id)
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
    let module_id = req.params.module_id
    console.log(module_id)
    const authResponse= await adminlmsServices.updateCourseModulePost(user,module_id)
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
    let lesson_id = req.params.lesson_id
    console.log(lesson_id)
    const authResponse= await adminlmsServices.updateLessonPost(user,lesson_id)
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
    let test_id = req.params.test_id
    console.log(test_id)
    const authResponse= await adminlmsServices.updateTestPost(user,test_id)
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
    let exercise_id = req.params.exercise_id
    console.log(exercise_id)
    const authResponse= await adminlmsServices.updateExercisePost(user,exercise_id)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateModuleExercise() `, error)
    next(error)
  }
}
