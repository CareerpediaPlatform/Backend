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


router.route('/course-list')
.get(isAuthenticated,controller.getCourses);


// courses//
router.route('/course-overvie/:coursetype')
 .post(isAuthenticated,controller.coursePost);

 router.route('/part/:courseUid')
 .post(isAuthenticated,controller.coursePartPost);

 router.route('/module/:partUid')
 .post(isAuthenticated,controller.courseModulesPost);

 router.route('/lesson/:moduleUid')
 .post(isAuthenticated,controller.courseLessonPost);

 router.route('/test/:moduleUid')
 .post(isAuthenticated,controller.coursetestPost);

 router.route('/exercise/:moduleUid')
 .post(isAuthenticated,controller.courseExercisePost);

 router.route('/part/:courseUid/:partUid')
 .get(isAuthenticated,controller.getCourseParts);

 router.route('/module/:partUid')
 .get(isAuthenticated,controller.getCourseModule);

 router.route('/lesson/:lessonUid')
 .get(isAuthenticated,controller.getModulesLesson);

 router.route('/lesson/:lessonUid')
 .delete(isAuthenticated,controller.deleteModulesLesson);

 router.route('/test/:testUid') 
 .get(isAuthenticated,controller.getModulesTest);

 router.route('/test/:testUid')
 .delete(isAuthenticated,controller.deleteModulesTest);

 router.route('/exercise/:exerciseUid')
 .get(isAuthenticated,controller.getModulesExercise);

 router.route('/exercise/:exerciseUid')
 .delete(isAuthenticated,controller.deleteModulesExercise);

 router.route('/part/:partUid')
 .patch(isAuthenticated,controller.updateCoursePartPost);

 router.route('/module/:moduleUid')
 .patch(isAuthenticated,controller.updateCourseModulePost);

 router.route('/lesson/:lessonUid')
 .patch(isAuthenticated,controller.updateModuleLesson);

 router.route('/test/:testUid')
 .patch(isAuthenticated,controller.updateModuleTest);

 router.route('/exercise/:exerciseUid')
 .patch(isAuthenticated,controller.updateModuleExercise);

//  course//
 router.route('/course-overview/:type').post(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.uploadCourse)
 router.route('/course-overview/:courseUid').get(controller.getuploadCourse);
 router.route('/course-overview/:courseUid').patch(videoFileReader(FormParams.FILE_FIELD,2),controller.updateuploadCourse)
 router.route('/course-overview/:courseUid').delete(controller.deleteuploadCourse);
 router.route('/learn/:id').delete(controller.deleteSingleLearn)

 router.route('/part/:partUid')
 .delete(isAuthenticated,controller.deleteCoursePart);

 router.route('/module/:moduleUid')
 .delete(isAuthenticated,controller.deleteCourseModule);

 router.route('/single-course-overview/:courseUid')
.get(isAuthenticated,controller.getCourseOverview);

 

export default router;