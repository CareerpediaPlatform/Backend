import * as controller from '../../../controller/student/profile'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { isAuthenticated } from 'src/middlewares/authentication'
import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import { emptyChecks } from 'src/validations/file'
import * as validation from '../../../validations/user'

passportConfiguration(passport)
const router = Router()
 router.use(passport.initialize())

 router.route('/education/')
 .put(isAuthenticated,controller.updateEducationDetails);
 router.route('/education/')
 .delete(isAuthenticated,controller.studentProfileEducationDelete);

 router.route('/work-experience/')
 .put(isAuthenticated,controller.updateWorkExperience);
 router.route('/work-experience/')
 .delete(isAuthenticated,controller.studentProfileExperienceDelete);
 router.route('/personal-contact')
 .patch(isAuthenticated,controller.studentProfilePost);
 router.route('/student-profile')
 .get(isAuthenticated,controller.getStudentProfile);
 router.route('/resume').post(isAuthenticated,videoFileReader(FormParams.FILE_FIELD,1),emptyChecks,controller.uploadResume);
 router.route('/resume').get(isAuthenticated,controller.getStudentResume);

 router.route('/education')
 .post(isAuthenticated,controller.studentEducationPost);

 router.route('/work-experience')
 .post(isAuthenticated,controller.studentWorkExperiencePost);

 export default router