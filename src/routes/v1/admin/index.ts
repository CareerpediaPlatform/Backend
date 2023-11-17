import { Router } from "express";
import * as APIPath from "../../../constants/api_path_constants";
import AdminAuth from "./adminAuth";
import adminStudent from "./adminStudent";
import adminCollege from "./adminCollege";
import adminLms from "./adminLms"
import adminRecruiter from "./adminRecruiter";
import adminMentor from "./adminMentor";



const router = Router();

router.use(APIPath.ROOT_AUTH, AdminAuth);
router.use("/student", adminStudent);
router.use("/college", adminCollege); //college/auth/signup
router.use("/course", adminLms);
router.use("/recuiter", adminRecruiter); //api/v1/admin/recuiter/status/:status/:uid
router.use("/mentor",adminMentor);//mentor/auth/signup



export default router;

