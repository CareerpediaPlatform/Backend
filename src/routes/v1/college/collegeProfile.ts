// collegeProfilePostAndUpdate
import * as controller from '../../../controller/college/collegeProfile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/profile/:userID')
 .post(controller.collegeProfilePostAndUpdate);
 router.route('/profile/:userID')
 .get(controller.getCollegeProfile);

 export default router