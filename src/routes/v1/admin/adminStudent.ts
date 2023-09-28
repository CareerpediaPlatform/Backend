import * as APIPaths from '../../../constants/api_path_constants'
import {studentUpdateStatus,getAllStudentList} from "../../../controller/student/auth"
import {getSingleStudentProfile} from "../../../controller/student/profile"
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { isAuthenticated } from 'src/middlewares/authentication'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:uid')
     .patch(isAuthenticated,studentUpdateStatus);

 router.route('/List')
     .get(isAuthenticated,getAllStudentList);

 router.route('/:uid')
     .get(isAuthenticated,getSingleStudentProfile);


export default router