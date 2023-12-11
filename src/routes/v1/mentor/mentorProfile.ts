import { Router } from 'express'
import passport from 'passport'
import * as educationController from '../../../controller/mentor/mentorEducation'
import * as profileController from '../../../controller/mentor/mentorProfile'
import * as workController from '../../../controller/mentor/mentorWork'
import { isAuthenticated } from '../../../middlewares/authentication'
import { passportConfiguration } from '../../../middlewares/passport'


passportConfiguration(passport)

const router = Router()
router.use(passport.initialize())

router
    .route("/personal-details")
    .patch(isAuthenticated, profileController.PersonalAndDetails);

router
    .route("/education-detail")
    .put(isAuthenticated, educationController.updateEducationDetail);

router
    .route("/work-experienc")
    .put(isAuthenticated, workController.updateWorkExperience);

//mentor all profile details 

router.route('/mentor-details')
    .get(isAuthenticated, profileController.getMentorProfile);

//single mentorlist  profile details 
router.route('/mentor-list/:userId')
    .get(isAuthenticated, profileController.getMentorSingleList);


router.route('/education-details')
    .post(isAuthenticated, educationController.mentorEducationPost);
router.route('/education-details')
    .patch(isAuthenticated, educationController.mentorEducationUpdate)
router.route('/education-details')
    .delete(isAuthenticated, educationController.mentorEducationDelete)


router.route('/work-experience')
    .post(isAuthenticated, workController.mentorWorkExperiencePost);
router.route('/work-experience')
    .patch(isAuthenticated, workController.mentorWorkExperienceUpdate)
router.route('/work-experience')
    .delete(isAuthenticated, workController.mentorWorkExperienceDelete)


export default router


