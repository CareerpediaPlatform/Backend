import * as APIPaths from '../../../constants/api_path_constants'
import {studentUpdateStatus,getAllStudentList} from "../../../controller/student/auth"
import {getSingleStudentProfile} from "../../../controller/student/profile"
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/status/:status/:uid')
     .patch(studentUpdateStatus);

 router.route('/List')
     .get(getAllStudentList);

 router.route('/:uid')
     .get(getSingleStudentProfile);
     

export default router