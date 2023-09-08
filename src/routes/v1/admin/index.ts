import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import AdminAuth from "./adminAuth";

const router = Router();

router.use(APIPath.ROOT_AUTH, AdminAuth);

export default router;

