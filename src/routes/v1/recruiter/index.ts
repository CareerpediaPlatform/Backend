import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import RecruiterAuth from "./recruiterAuth";
import RecruiterProfile from "./recruiterProfiles";
import * as bodyParser from 'body-parser';


const router = Router();

router.use(APIPath.ROOT_AUTH, RecruiterAuth);
router.use('/profile',RecruiterProfile);

export default router;
