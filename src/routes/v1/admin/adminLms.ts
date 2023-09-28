import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from '../../../controller/admin/adminLms'
import { isAuthenticated } from 'src/middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

router.route('/course-overview/:courseId')
.get(isAuthenticated,controller.getCourseOverview);

router.route('/course-list')
.get(isAuthenticated,controller.getCourses);

export default router;