import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from 'src/controller/college/collegeAuth'
import { isAuthenticated } from 'src/middlewares/authentication'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:uid')
     .patch(isAuthenticated,controller.collegeUpdateStatus);

export default router