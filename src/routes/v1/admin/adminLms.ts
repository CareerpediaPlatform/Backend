import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from '../../../controller/admin/adminLms'
import { isAuthenticated } from 'src/middlewares/authentication'

import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import { emptyCheck, emptyChecks } from 'src/validations/file'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

// router.route('/course-overview/:courseId')
// .get(isAuthenticated,controller.getCourseOverview);

router.route('/course-list')
.get(isAuthenticated,controller.getCourses);

// courses//
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

 router.route('/part/:part_id')
 .patch(isAuthenticated,controller.updateCoursePartPost);

 router.route('/module/:module_id')
 .patch(isAuthenticated,controller.updateCourseModulePost);

 router.route('/lesson/:lesson_id')
 .patch(isAuthenticated,controller.updateModuleLesson);

 router.route('/test/:test_id')
 .patch(isAuthenticated,controller.updateModuleTest);

 router.route('/exercise/:exercise_id')
 .patch(isAuthenticated,controller.updateModuleExercise);

//  course//
 router.route('/course-overview/:type').post(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.uploadCourse)
 router.route('/course-overview/:uid').get(controller.getuploadCourse);
 router.route('/course-overview/:uid').patch(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.updateuploadCourse)
 router.route('/course-overview/:uid').delete(controller.deleteuploadCourse);
 router.route('/learn/:id').delete(controller.deleteSingleLearn)

 

export default router;