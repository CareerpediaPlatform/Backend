import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from 'src/controller/mentor/mentorAuth'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:uid')
     .patch(controller.mentorUpdateStatus);


export default router