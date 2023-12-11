import {Router } from 'express'
import AuthRoutes from './auth'
import UserRoutes from './user'
import profileRoutes from './profile'
import assignmentRoutes from './assignment'
// import * as APIPaths from '../../../constants/api_path_constants'
import { ROOT_AUTH } from "../../../constants/api_path_constants";
import studentLms from "../student/lms"

const router = Router()

router.use(`${ROOT_AUTH}`, AuthRoutes);
router.use('/', UserRoutes);
router.use('/profile', profileRoutes);
router.use('/',assignmentRoutes);

router.use('/course', studentLms);



export default router;