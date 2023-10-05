
import * as controller from '../../../controller/student/assignment'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import { emptyCheck, emptyChecks } from 'src/validations/file'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())


 router.route('/upload-assignment').post(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.uploadAssignment);
 router.route('/assignment').get(controller.getAllSAssignment);
 router.route('/course/notes').post(controller.uploadNote);
 router.route('/course/notes').get(controller.getAllNotes);
 router.route('/part/thread').post(controller.uploadThread);
 router.route('/part/thread/:threadID/:uid').get(controller.getAllThreads);
 router.route('/mentor/reply-thread/:threadID/:uid').post(controller.postThreadreply)
 router.route('/thread/part/:partId').get(controller.getAllThreadsPart)
 router.route('/thread/course/:courseId').get(controller.getAllThreadsCourse)


export default router