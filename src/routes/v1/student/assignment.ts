
import * as controller from '../../../controller/student/assignment'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import {  emptyChecks } from 'src/validations/file'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())


 router.route('/upload-assignment/:partId').post(videoFileReader(FormParams.FILE_FIELD,1),emptyChecks,controller.uploadAssignment);
 router.route('/assignment/:partId').get(controller.getAllSAssignment);
 router.route('/course/notes').post(controller.uploadNote);
 router.route('/course/notes').get(controller.getAllNotes);
 router.route('/part/thread/:partId').post(controller.uploadThread);
 router.route('/part/thread/:partId/:threadID').get(controller.getSingleThread);

export default router