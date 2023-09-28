import * as controller from '../../../controller/admin/courses'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/course/:coursetype')
 .post(controller.coursePost);

 router.route('/part/:course_id')
 .post(controller.coursePartPost);

 router.route('/module/:part_id')
 .post(controller.courseModulesPost);

 router.route('/lesson/:module_id')
 .post(controller.courseLessonPost);

 router.route('/test/:module_id')
 .post(controller.coursetestPost);

 router.route('/exercise/:module_id')
 .post(controller.courseExercisePost);

 router.route('/part/:course_id/:part_id')
 .get(controller.getCourseParts);

 router.route('/module/:part_id/:module_id')
 .get(controller.getCourseModule);


 router.route('/lesson/:module_id/:lesson_id')
 .get(controller.getModulesLesson);

 router.route('/lesson/:module_id/:lesson_id')
 .delete(controller.deleteModulesLesson);

 router.route('/test/:module_id/:test_id')
 .get(controller.getModulesTest);

 router.route('/test/:module_id/:test_id')
 .delete(controller.deleteModulesTest);

 router.route('/exercise/:module_id/:exercise_id')
 .get(controller.getModulesExercise);

 router.route('/exercise/:module_id/:exercise_id')
 .delete(controller.deleteModulesExercise);

export default router
