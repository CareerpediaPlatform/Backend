import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/college/collegeAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'
import {isAuthenticated} from '../../../middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
     .post(validation.SignIn,controller.loginCollege);

 router.route('/signup')
 .post(isAuthenticated,controller.signupCollege);

 
 router.route('/change-password')
 .patch(isAuthenticated,validation.passwordValidation,controller.changePasswordController);
    

export default router