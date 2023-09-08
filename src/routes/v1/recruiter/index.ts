import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import RecruiterAuth from "./recruiterAuth";

const router = Router();

router.use(APIPath.ROOT_AUTH, RecruiterAuth);


export default router;
