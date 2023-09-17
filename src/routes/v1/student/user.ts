import { isAuthenticated } from 'src/middlewares/authentication'
import * as APIPaths from '../../../constants/api_path_constants'
import * as controller from '../../../controller/student/auth'
import { Router } from 'express'
const router=Router()


// router.use(isAuthenticated)


export default router