import * as APIPaths from '../../constants/api_path_constants'
import * as controller from '../../controller/collegeAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../validations/auth'
import {isAuthenticated} from '../../middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
     .post(controller.loginCollege);

 router.route('/signup')
 .post(isAuthenticated,controller.signupCollege);

 
 router.route('/change-password')
 .post(isAuthenticated,controller.changePasswordController);
    

export default router