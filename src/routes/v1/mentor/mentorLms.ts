import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/mentor/mentorLms'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'
import {isAuthenticated} from '../../../middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/assignment/:partId').get(controller.getAllSAssignments);
 router.route('/assignment-remark/:assignmentId').patch(controller.giveRemark);
 router.route('/reply-thread/:partId/:threadID').post(controller.postThreadreply);
 router.route('/assignment/remarks/:remark_id').get(controller.getSingleRemark);
 
export default router