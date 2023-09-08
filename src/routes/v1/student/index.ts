import {Router } from 'express'
import AuthRoutes from './auth'
import UserRoutes from './user'
// import * as APIPaths from '../../../constants/api_path_constants'
import { ROOT_AUTH } from "src/constants/api_path_constants";

const router = Router()

router.use(`${ROOT_AUTH}`, AuthRoutes)
router.use('/', UserRoutes)

export default router;