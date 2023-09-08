import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import MentorAuth from "./mentorAuth";

const router = Router();

router.use(APIPath.ROOT_AUTH, MentorAuth);


export default router;
