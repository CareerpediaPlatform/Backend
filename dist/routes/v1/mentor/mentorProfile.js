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
const profileController = __importStar(require("../../../controller/mentor/mentorProfile"));
const workController = __importStar(require("../../../controller/mentor/mentorWork"));
const educationController = __importStar(require("../../../controller/mentor/mentorEducation"));
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const authentication_1 = require("../../../middlewares/authentication");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router
    .route("/personal-details")
    .post(authentication_1.isAuthenticated, profileController.PersonalAndDetails);
router
    .route("/education-details/:id")
    .put(authentication_1.isAuthenticated, educationController.updateEducationDetail);
router
    .route("/work-details/:id")
    .put(authentication_1.isAuthenticated, workController.updateWorkExperience);
//mentor all profile details 
router.route('/mentor-details/:userId')
    .get(authentication_1.isAuthenticated, profileController.getrecruiterProfile);
//single mentorlist  profile details 
router.route('/mentor-list/:userId')
    .get(authentication_1.isAuthenticated, profileController.getMentorSingleList);
exports.default = router;
