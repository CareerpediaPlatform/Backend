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
const controller = __importStar(require("../../../controller/student/auth"));
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const validation = __importStar(require("../../../validations/auth"));
const authentication_1 = require("src/middlewares/authentication");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
// signup
router.route('/form-signup')
    .post(validation.formSignup, controller.signupUser);
router.route('/gmail-signup')
    .post(validation.linkedInSignup, controller.signupUser);
router.route('/verify-number')
    .post(authentication_1.isAuthenticated, validation.numberLogin, controller.signupPhonenumber);
//  signin
router.route('/email-login')
    .post(validation.emailLogin, controller.signinUser);
router.route('/google-signin')
    .post(validation.linkedInLogin, controller.signinUser);
router.route('/number-login')
    .post(validation.numberLogin, controller.signinUser);
//  others
router.route('/verify-otp')
    .post(authentication_1.isAuthenticated, controller.verifyOTP);
router.route('/resend-otp')
    .patch(authentication_1.isAuthenticated, controller.resendOTP);
router.route('/forget-password')
    .post(controller.forgetPassword);
router.route('/forget-password')
    .patch(authentication_1.isAuthenticated, controller.setForgetPassword);
router.route('/change-password')
    .patch(authentication_1.isAuthenticated, validation.passwordValidation, controller.changePassword);
exports.default = router;
