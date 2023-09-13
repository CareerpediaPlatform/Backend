import * as controller from '../../../controller/mentor/mentorPersonal'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/details/:userID')
 .post(controller.mentorProfilePostAndUpdate);





 export default router