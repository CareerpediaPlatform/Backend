import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import AdminAuth from "./adminAuth";
import adminStudent from "./adminStudent";
import adminCollege from "./adminCollege";
import adminLms from "./adminLms"
import updaterecruiter from "./adminRecruiter";
import lms from "./courses";

const router = Router();

router.use(APIPath.ROOT_AUTH, AdminAuth);
router.use("/student", adminStudent);
router.use("/college", adminCollege);
router.use("/course", adminLms);
router.use("/recuiter", updaterecruiter); //api/v1/admin/recuiter/status/:status/:uid
router.use("/course", lms) //api/v1/admin/course/catogery


export default router;

