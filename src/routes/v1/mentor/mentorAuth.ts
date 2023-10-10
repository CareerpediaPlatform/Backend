import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/mentor/mentorAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
     .post(controller.loginMentor);

 router.route('/signup')
 .post(controller.signupMentor);

  router.route('/change-password')
 .post(controller.changePasswordController);

 
export default router