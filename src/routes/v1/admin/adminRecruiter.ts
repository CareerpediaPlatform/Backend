import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as controller from 'src/controller/admin/adminProfile'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:userID')
     .patch(controller.recruiterUpdateStatus);



export default router