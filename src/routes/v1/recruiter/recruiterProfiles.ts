import * as controller from '../../../controller/recruiter/recruiterProfiles'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import { fileReader, imageFileReader } from '../../../middlewares/file_upload'
import { FormParams } from '../../../constants/api_param_constants'
// import { emptyCheck } from '../../validations/file'
import { emptyCheck } from '../../../validations/file'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/details/:userID')
 .post(controller.recruiterProfilePostAndUpdate);
 router.route('/details/:userID')
 .get(controller.getrecruiterProfile);


 router.route('/details/:userID').delete(controller.deleterecruiterProfile);

 router.route('/company-logo')
 .post(imageFileReader(FormParams.FILE_FIELD), emptyCheck, controller.uploadCompanyLogoFile)

 router.route('/company-logo/:userID').get(controller.getrecruiterCompanyLogo)

 export default router