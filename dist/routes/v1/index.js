"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentor_1 = __importDefault(require("./mentor"));
const admin_1 = __importDefault(require("./admin"));
const recruiter_1 = __importDefault(require("./recruiter"));
const college_1 = __importDefault(require("./college"));
const index_1 = __importDefault(require("./student/index"));
const payment_1 = __importDefault(require("../v1/payment/payment"));
const router = (0, express_1.Router)();
router.use(`/admin`, admin_1.default); //ex: api/v1/admin/auth/signup  
router.use('/mentor', mentor_1.default);
router.use(`/recruiter`, recruiter_1.default);
router.use(`/admin/college`, college_1.default);
router.use('/student', index_1.default); // api/v1/student/auth/form-signup
router.use('/', payment_1.default); // api/v1/student/auth/form-signup
exports.default = router;
