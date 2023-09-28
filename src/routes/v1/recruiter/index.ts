import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import RecruiterAuth from "./recruiterAuth";
import RecruiterProfile from "./recruiterProfiles";


const router = Router();

router.use(APIPath.ROOT_AUTH, RecruiterAuth);
router.use('/',RecruiterProfile);

export default router;
