import * as controller from '../../../controller/recruiter/recruiterProfiles'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { imageFileReader } from '../../../middlewares/file_upload'
import { FormParams } from '../../../constants/api_param_constants'
import { emptyCheck, emptyChecks } from '../../../validations/file'
import { videoFileReader } from 'src/middlewares/video_upload'
import {isAuthenticated} from '../../../middlewares/authentication'

passportConfiguration(passport)


const router = Router()
 router.use(passport.initialize())

 router.route('/details')
 .post(isAuthenticated,controller.recruiterProfilePostAndUpdate);
 
 router.route('/details')
 .get(isAuthenticated,controller.getrecruiterProfile);

 router.route('/details/:userID')
 .delete(isAuthenticated,controller.deleterecruiterProfile);

 router.route('/company-logo')
 .post(videoFileReader(FormParams.FILE_FIELD,1), emptyChecks, controller.uploadCompanyLogoFile)

 router.route('/recruiter-list/:userID')
 .get(isAuthenticated ,controller.getRecruiterSingleList);

 router.route('/company-logo/:userID')
 .get(controller.getrecruiterCompanyLogo)

 router.route('/company-logo/:userID')
 .post(imageFileReader(FormParams.FILE_FIELD),emptyCheck,controller.updateCompanylogo)

router.route('/video')
 .post(videoFileReader(FormParams.FILE_FIELD,2),emptyChecks,controller.uploadVideoFile)

 export default router