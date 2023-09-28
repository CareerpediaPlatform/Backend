import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from '../../../controller/student/lms'
import { isAuthenticated } from 'src/middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

router.route('/course-overview/:courseId')
.get(isAuthenticated,controller.getCourseOverview);

router.route('/course-list')
.get(isAuthenticated,controller.getCourses);

router.route('/my-course-list')
.get(isAuthenticated,controller.getMyCourses);

router.route('/get-part/:courseId/:partId')
.get(isAuthenticated,controller.getPartDetail);

export default router;