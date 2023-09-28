import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import AdminAuth from "./adminAuth";
import adminStudent from "./adminStudent";
import adminCollege from "./adminCollege";
import course from "./course"


const router = Router();

router.use(APIPath.ROOT_AUTH, AdminAuth);
router.use("/student", adminStudent);
router.use("/college", adminCollege);
router.use("/",course)


export default router;

