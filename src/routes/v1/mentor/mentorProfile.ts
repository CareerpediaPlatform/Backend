import * as APIPaths from '../../../constants/api_path_constants'
import * as profileController from '../../../controller/mentor/mentorProfile'
import * as workController from '../../../controller/mentor/mentorWork'
import * as educationController from '../../../controller/mentor/mentorEducation'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'



passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router
 .route("/personal-details/:mentorUid")
 .post(profileController.PersonalAndDetails);


 router
 .route("/education-details/:id")
 .put(educationController.updateEducationDetail);


 router
 .route("/work-details/:id")
 .put(workController.updateWorkExperience);

 //mentor all profile details 

 router.route('/details/:userId')
 .get(profileController.getrecruiterProfile);

 router.route('/details/:userId')
 .delete(profileController.deleterecruiterProfile);

 router.route('/Educationdetails/:uid')
 .delete(educationController.deleterecruiterProfile);

 router.route('/mentor-list/:userId')
 .get(profileController.getMentorSingleList);


export default router


