import * as controller from '../../../controller/admin/courses'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'
import { isAuthenticated } from 'src/middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/course/:coursetype')
 .post(isAuthenticated,controller.coursePost);

 router.route('/part/:course_id')
 .post(isAuthenticated,controller.coursePartPost);

 router.route('/module/:part_id')
 .post(isAuthenticated,controller.courseModulesPost);

 router.route('/lesson/:module_id')
 .post(isAuthenticated,controller.courseLessonPost);

 router.route('/test/:module_id')
 .post(isAuthenticated,controller.coursetestPost);

 router.route('/exercise/:module_id')
 .post(isAuthenticated,controller.courseExercisePost);

 router.route('/part/:course_id/:part_id')
 .get(isAuthenticated,controller.getCourseParts);

 router.route('/module/:part_id/:module_id')
 .get(isAuthenticated,controller.getCourseModule);

 router.route('/lesson/:module_id/:lesson_id')
 .get(isAuthenticated,controller.getModulesLesson);

 router.route('/lesson/:module_id/:lesson_id')
 .delete(isAuthenticated,controller.deleteModulesLesson);

 router.route('/test/:module_id/:test_id')
 .get(isAuthenticated,controller.getModulesTest);

 router.route('/test/:module_id/:test_id')
 .delete(isAuthenticated,controller.deleteModulesTest);

 router.route('/exercise/:module_id/:exercise_id')
 .get(isAuthenticated,controller.getModulesExercise);

 router.route('/exercise/:module_id/:exercise_id')
 .delete(isAuthenticated,controller.deleteModulesExercise);

export default router
