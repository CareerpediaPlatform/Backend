import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import MentorAuth from "./mentorAuth";
import MentorProfile from "./mentorProfile";
import MentorWork from "./mentorProfile";
import MentorLms from "./mentorLms";

const router = Router();

router.use(APIPath.ROOT_AUTH, MentorAuth);
router.use(MentorProfile);
router.use(MentorWork);
router.use(MentorLms);


export default router;
