import { Router } from 'express'
import MentorRoutes from "./mentor";
import AdminRoutes from "./admin";
import RecruiterRoutes from "./recruiter";
import CollegeRoutes from "./college";
import StudentAuth from "./student/index";




const router = Router();


router.use(`/admin`, AdminRoutes);   //ex: api/v1/admin/auth/signup  
router.use('/mentor', MentorRoutes); 
router.use(`/recruiter`, RecruiterRoutes);
router.use(`/admin/college`, CollegeRoutes);
router.use('/student',StudentAuth);  // api/v1/student/auth/form-signup



export default router;