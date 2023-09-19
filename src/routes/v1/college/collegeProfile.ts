import * as controller from '../../../controller/college/collegeProfile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/profile/:userID')
 .post(isAuthenticated,controller.collegeProfilePostAndUpdate);
 router.route('/profile/:userID')
 .get(isAuthenticated,controller.getCollegeProfile);
 router.route('/profile/:userID')
 .delete(isAuthenticated,controller.collegeProfileDelete);
 router.route('/profile/:userID')
 .get(isAuthenticated,controller.collegeProfileDelete);

 export default router