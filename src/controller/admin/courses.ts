import { Request, Response, NextFunction } from 'express';
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import * as CourseServices from '../../services/admin/courses'

const TAG = 'services.profile.admin'



export async function coursePost(req: any, res: Response, next: NextFunction): Promise<void> {
  try {
    log.info(`${TAG}.coursePost()`);
    log.debug(`${TAG}.coursePost() Object = ${JSON.stringify(req.body)}`)
    const user = req.body;
    console.log(user)
    let coursetype = req.params.coursetype
    console.log(coursetype)
    const authResponse: IServiceResponse = await CourseServices.courseUser(user,coursetype)
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
    const authResponse: IServiceResponse = await CourseServices.coursePartUser({...user,course_id})
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
    const authResponse= await CourseServices.getCoursePart(course_id,part_id)
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
    const authResponse: IServiceResponse = await CourseServices.courseModulesUser({...user,part_id})
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
    const authResponse= await CourseServices.getCourseModules(part_id,module_id)
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
    const authResponse: IServiceResponse = await CourseServices.lessonUser({...lessonData,module_id})
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
    const authResponse: IServiceResponse = await CourseServices.testUser({...testData,module_id})
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
    const authResponse: IServiceResponse = await CourseServices.exerciseUser({...exerciseData,module_id})
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
    const authResponse= await CourseServices.getModulesLesspon(module_id,lesson_id)
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
    const authResponse= await CourseServices.deleteModulesLesspon(module_id,lesson_id)
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
    const authResponse= await CourseServices.getModulesTest(module_id,test_id)
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
    const authResponse= await CourseServices.deleteModulesTest(module_id,test_id)
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
    const authResponse= await CourseServices.getModulesTest(module_id,exercise_id)
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
    const authResponse= await CourseServices.deleteModulesTest(module_id,exercise_id)
    responseBuilder(authResponse, res, next, req)
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.deleteModulesExercise() `, error)
    next(error)
  }
}
