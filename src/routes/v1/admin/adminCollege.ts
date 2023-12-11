import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from '../../../controller/college/collegeAuth'
import { isAuthenticated } from '../../../middlewares/authentication'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:uid')
     .patch(isAuthenticated,controller.collegeUpdateStatus);

export default router