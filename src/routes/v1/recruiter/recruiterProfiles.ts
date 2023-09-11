import * as controller from '../../../controller/recruiter/recruiterProfiles'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/details/:userID')
 .post(controller.recruiterProfilePostAndUpdate);
 router.route('/details/:userID')
 .get(controller.getrecruiterProfile);

 export default router