import * as APIPaths from '../../../constants/api_path_constants'
import * as profileController from '../../../controller/mentor/mentorProfile'
import * as workController from '../../../controller/mentor/mentorWork'
import * as educationController from '../../../controller/mentor/mentorEducation'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'


passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router
 .route("/personal-details/:mentorUid")
 .post(isAuthenticated ,profileController.PersonalAndDetails);

 router
 .route("/education-details/:id")
 .put(isAuthenticated ,educationController.updateEducationDetail);

 router
 .route("/work-details/:id")
 .put(isAuthenticated ,workController.updateWorkExperience);

 //mentor all profile details 

 router.route('/mentor-details/:userId')
 .get(isAuthenticated ,profileController.getrecruiterProfile);
 
 //single mentorlist  profile details 
 router.route('/mentor-list/:userId')
 .get(isAuthenticated,profileController.getMentorSingleList);


export default router


