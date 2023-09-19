import { Router } from 'express'
import { ROOT_AUTH } from "src/constants/api_path_constants";
import MentorRoutes from "./mentor/mentorAuth";
import AdminRoutes from "./admin/adminAuth";
import RecruiterRoutes from "./recruiter/recruiterAuth";
import CollegeRoutes from "./college/collegeAuth";
import StudentAuth from "./student/index";

import RecruiterProfiles from "./recruiter/recruiterProfiles";


import StudentAuth from "./student/index"
import MentorRoutes from "./mentor";
import AdminRoutes from "./admin";
import RecruiterRoutes from "./recruiter";
import CollegeRoutes from "./college"


const router = Router();

//auth routes

router.use(`${ROOT_AUTH}/admin`, AdminRoutes);
router.use(`${ROOT_AUTH}/mentor`, MentorRoutes);
router.use(`${ROOT_AUTH}/recruiter`, RecruiterRoutes);
router.use(`${ROOT_AUTH}/college-admin`, CollegeRoutes);
router.use('/student',StudentAuth);  // api/v1/student/auth/form-signup

router.use('/recruiter',RecruiterProfiles) //api/v1/recruiter/details



router.use(`/admin`, AdminRoutes);   //ex: api/v1/admin/auth/signup 
router.use('/mentor', MentorRoutes); 
router.use(`/recruiter`, RecruiterRoutes);
router.use(`/college-admin`, CollegeRoutes);
router.use('/student',StudentAuth); 


export default router;