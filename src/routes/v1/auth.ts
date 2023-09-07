import * as APIPaths from '../../constants/api_path_constants'
import * as controller from '../../controller/mentorAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../validations/auth'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
    //  .post(validation.login, controller.login);

 router.route('/signup')
     .post(controller.signupUser);

export default router