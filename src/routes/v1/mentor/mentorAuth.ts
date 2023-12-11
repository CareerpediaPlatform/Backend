import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/mentor/mentorAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'
import {isAuthenticated} from '../../../middlewares/authentication'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
     .post(validation.SignIn,validation.mentorLimiter,controller.loginMentor);

 router.route('/signup')
 .post(validation.mentorSignup,controller.signupMentor);

  router.route('/change-password')
 .patch(isAuthenticated,validation.passwordValidation,controller.changePasswordController);

 
export default router