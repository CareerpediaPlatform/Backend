import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import AdminAuth from "./adminAuth";
import adminStudent from "./adminStudent";

const router = Router();

router.use(APIPath.ROOT_AUTH, AdminAuth);
router.use("/student", adminStudent);

export default router;

