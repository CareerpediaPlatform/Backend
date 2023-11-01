"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const APIPath = __importStar(require("../../../constants/api_path_constants"));
const adminAuth_1 = __importDefault(require("./adminAuth"));
const adminStudent_1 = __importDefault(require("./adminStudent"));
const adminCollege_1 = __importDefault(require("./adminCollege"));
const adminLms_1 = __importDefault(require("./adminLms"));
const adminRecruiter_1 = __importDefault(require("./adminRecruiter"));
const adminMentor_1 = __importDefault(require("./adminMentor"));
const router = (0, express_1.Router)();
router.use(APIPath.ROOT_AUTH, adminAuth_1.default);
router.use("/student", adminStudent_1.default);
router.use("/college", adminCollege_1.default); //college/auth/signup
router.use("/course", adminLms_1.default);
router.use("/recuiter", adminRecruiter_1.default); //api/v1/admin/recuiter/status/:status/:uid
router.use("/mentor", adminMentor_1.default); //mentor/auth/signup
exports.default = router;
