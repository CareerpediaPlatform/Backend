import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/admin/course'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import { emptyCheck, emptyChecks } from 'src/validations/file'
import { imageFileReader } from 'src/middlewares/file_upload'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())


 router.route('/course/course-overview/:type').post(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.uploadCourse)
 router.route('/course/course-overview/:uid').get(controller.getuploadCourse);
 router.route('/course/course-overview/:uid').patch(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.updateuploadCourse)
 router.route('/course/course-overview/:uid').delete(controller.deleteuploadCourse);
export default router