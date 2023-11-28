
import * as controller from '../../../controller/student/assignment'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { videoFileReader } from 'src/middlewares/video_upload'
import { FormParams } from 'src/constants/api_param_constants'
import {  emptyChecks } from 'src/validations/file'
import { isAuthenticated } from 'src/middlewares/authentication'


passportConfiguration(passport)
const router = Router()
 router.use(passport.initialize())

 router.route('/assignment/:partUid').post(videoFileReader(FormParams.FILE_FIELD,1),emptyChecks,controller.uploadAssignment);
 router.route('/assignment/:partUid').get(controller.getAllSAssignment);
 router.route('/course-note/:partUid').post(controller.uploadNote);
 router.route('/course-note/:partUid').get(controller.getAllNotes);
 router.route('/part/thread/:partUid').post(controller.uploadThread);
 router.route('/part/thread/:partId/:threadID').get(controller.getSingleThread);

    //  router.route('/part/thread').post(controller.uploadThread);
    //  router.route('/part/thread/:threadID/:uid').get(controller.getAllThreads);
    //  router.route('/mentor/reply-thread/:threadID/:uid').post(controller.postThreadreply)
 router.route('/thread/part/:partId').get(controller.getAllThreadsPart)
 router.route('/thread/course/:courseId').get(controller.getAllThreadsCourse)



export default router