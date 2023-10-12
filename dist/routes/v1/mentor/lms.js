"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const authentication_1 = require("../../../middlewares/authentication");
const lms_1 = require("src/Database/mysql/lib/student/lms");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router.route('/course-overview/:courseId')
    .post(authentication_1.isAuthenticated, lms_1.getCourseOverview);
