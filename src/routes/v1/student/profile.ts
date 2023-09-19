// updateEducationDetails
import * as controller from '../../../controller/student/profile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'

passportConfiguration(passport)
const router = Router()
 router.use(passport.initialize())

 router.route('/education/:id')
 .put(controller.updateEducationDetails);
 router.route('/education/:id')
 .delete(controller.studentProfileEducationDelete);

 router.route('/work-experience/:id')
 .put(controller.updateWorkExperience);
 router.route('/work-experience/:id')
 .delete(controller.studentProfileExperienceDelete);
 router.route('/profile')
 .patch(controller.studentProfilePost);
 router.route('/profile/:id')
 .get(controller.getStudentProfile);

 export default router