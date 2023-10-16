"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../../controller/student/auth");
const profile_1 = require("../../../controller/student/profile");
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const authentication_1 = require("src/middlewares/authentication");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router.route('/status/:status/:uid')
    .patch(authentication_1.isAuthenticated, auth_1.studentUpdateStatus);
router.route('/List')
    .get(authentication_1.isAuthenticated, auth_1.getAllStudentList);
router.route('/:uid')
    .get(authentication_1.isAuthenticated, profile_1.getSingleStudentProfile);
exports.default = router;
