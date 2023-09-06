import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/admin/adminAuth'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route(APIPaths.LOGIN)
     .post(controller.adminLogin);

 router.route('/signup')
     .post(controller.signupUser);

export default router