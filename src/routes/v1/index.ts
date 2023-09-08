import { Router } from 'express'
import MentorRoutes from "./mentor";
import AdminRoutes from "./admin";
import RecruiterRoutes from "./recruiter";
import CollegeRoutes from "./college"

const router = Router();

//auth routes
router.use(`/admin`, AdminRoutes);   //ex: api/v1/admin/auth/signup 
router.use('/mentor', MentorRoutes); 
router.use(`/recruiter`, RecruiterRoutes);
router.use(`/college-admin`, CollegeRoutes);


export default router;