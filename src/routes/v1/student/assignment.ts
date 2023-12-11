
import * as controller from '../../../controller/student/assignment'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { videoFileReader } from '../../../middlewares/video_upload'
import { FormParams } from '../../../constants/api_param_constants'
import {  emptyChecks } from '../../../validations/file'
import { isAuthenticated } from '../../../middlewares/authentication'


passportConfiguration(passport)
const router = Router()
 router.use(passport.initialize())

 router.route('/assignment/:partUid').post(videoFileReader(FormParams.FILE_FIELD,1),emptyChecks,controller.uploadAssignment);
 router.route('/assignment/:partUid').get(controller.getAllSAssignment);
 router.route('/course-note/:partUid').post(controller.uploadNote);
 router.route('/course-note/:partUid').get(controller.getAllNotes);
 router.route('/part/thread/:partUid').post(controller.uploadThread);
 router.route('/part/thread/:partUid/:threadId').get(controller.getSingleThread);
 router.route('/part/thread-reply/:partUid/:threadId').post(controller.postThreadreply);

    //  router.route('/part/thread').post(controller.uploadThread);
    //  router.route('/part/thread/:threadID/:uid').get(controller.getAllThreads);
    //  router.route('/mentor/reply-thread/:threadID/:uid').post(controller.postThreadreply)
 router.route('/part/thread/:partUid').get(controller.getAllThreadsPart)
 router.route('/course/thread/:courseUid').get(controller.getAllThreadsCourse)



export default router