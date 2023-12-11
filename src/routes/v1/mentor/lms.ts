import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'
import { getCourseOverview } from "../../../Database/mysql/lib/student/lms";

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/course-overview/:courseId')
     .post(isAuthenticated,getCourseOverview);