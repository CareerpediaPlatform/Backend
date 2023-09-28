import * as controller from '../../../controller/student/profile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { isAuthenticated } from 'src/middlewares/authentication'

passportConfiguration(passport)
const router = Router()
 router.use(passport.initialize())

 router.route('/education/')
 .put(isAuthenticated,controller.updateEducationDetails);
 router.route('/education/')
 .delete(isAuthenticated,controller.studentProfileEducationDelete);

 router.route('/work-experience/')
 .put(isAuthenticated,controller.updateWorkExperience);
 router.route('/work-experience/')
 .delete(isAuthenticated,controller.studentProfileExperienceDelete);
 router.route('/profile')
 .patch(isAuthenticated,controller.studentProfilePost);
 router.route('/profile/')
 .get(isAuthenticated,controller.getStudentProfile);

 export default router