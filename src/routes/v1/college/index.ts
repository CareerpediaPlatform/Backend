import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import CollegeAuth from "./collegeAuth";
import CollegeProfile from "./collegeProfile";

const router = Router();

router.use(APIPath.ROOT_AUTH, CollegeAuth);
router.use("/", CollegeProfile);


export default router;
