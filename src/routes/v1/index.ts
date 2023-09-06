import { Router } from 'express'
import { ROOT_AUTH } from "src/constants/api_path_constants";
import MentorRoutes from "./mentor/mentorAuth";
import AdminRoutes from "./admin/adminAuth";
import RecruiterRoutes from "./recruiter/recruiterAuth";
import CollegeRoutes from "./college/collegeAuth"

const router = Router();

//auth routes
router.use(`${ROOT_AUTH}/admin`, AdminRoutes); 
router.use(`${ROOT_AUTH}/mentor`, MentorRoutes);
router.use(`${ROOT_AUTH}/recruiter`, RecruiterRoutes);
router.use(`${ROOT_AUTH}/college-admin`, CollegeRoutes);



export default router;