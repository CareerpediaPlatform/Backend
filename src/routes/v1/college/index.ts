import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import CollegeAuth from "./collegeAuth";

const router = Router();

router.use(APIPath.ROOT_AUTH, CollegeAuth);


export default router;
