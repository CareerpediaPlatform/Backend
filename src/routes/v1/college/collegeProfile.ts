import * as controller from '../../../controller/college/collegeProfile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'




passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/profile')
 .post(isAuthenticated,controller.collegeProfilePostAndUpdate);
 router.route('/profile')
 .get(isAuthenticated,controller.getCollegeProfile);
 router.route('/college-list/:userID')
 .get(isAuthenticated,controller.getCollegeSingleList);

 export default router

