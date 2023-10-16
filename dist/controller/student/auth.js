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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setForgetPassword = exports.forgetPassword = exports.changePassword = exports.resendOTP = exports.verifyOTP = exports.signinUser = exports.studentUpdateStatus = exports.getAllStudentList = exports.signupPhonenumber = exports.signupUser = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const authService = __importStar(require("../../services/student/auth"));
const TAG = 'controler-student.auth';
function signupUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signupUser()`);
            logger_1.default.debug(`${TAG}.signupUser() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            if (user.password) {
                const authResponse = yield authService.signupUser(user);
                (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
            }
            else if (user.uuid) {
                const authResponse = yield authService.signupWithSocialAccount(user);
                (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser() `, error);
            next(error);
        }
    });
}
exports.signupUser = signupUser;
function signupPhonenumber(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signupPhonenumber()`);
            logger_1.default.debug(`${TAG}.signupPhonenumber() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log("first");
            console.log(user);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield authService.signupPhonenumber(Object.assign(Object.assign({}, user), { headerValue }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupPhonenumber() `, error);
            next(error);
        }
    });
}
exports.signupPhonenumber = signupPhonenumber;
function getAllStudentList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllStudentList()`);
            logger_1.default.debug(`${TAG}.getAllStudentList() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield authService.getAllStudentList({ headerValue });
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllStudentList() `, error);
            next(error);
        }
    });
}
exports.getAllStudentList = getAllStudentList;
function studentUpdateStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.studentUpdateStatus()`);
            logger_1.default.debug(`${TAG}.studentUpdateStatus() Object = ${JSON.stringify(req.body)}`);
            const { status, uid } = req.params;
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield authService.studentUpdateStatus({ status, uid, headerValue });
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentUpdateStatus() `, error);
            next(error);
        }
    });
}
exports.studentUpdateStatus = studentUpdateStatus;
function signinUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signinUser()`);
            logger_1.default.debug(`${TAG}.signinUser() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            const authResponse = yield authService.signinUser(user);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signinUser() `, error);
            next(error);
        }
    });
}
exports.signinUser = signinUser;
function verifyOTP(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.verifyOTP()`);
            logger_1.default.debug(`${TAG}.verifyOTP() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const otp = req.body;
            const otpResponse = yield authService.verifyOTP(Object.assign(Object.assign({}, otp), { headerValue }));
            (0, response_builder_1.responseBuilder)(otpResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.verifyOTP() `, error);
            next(error);
        }
    });
}
exports.verifyOTP = verifyOTP;
function resendOTP(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.resendOTP()`);
            logger_1.default.debug(`${TAG}.resendOTP() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const response = yield authService.resendOTP(headerValue);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.resendOTP() `, error);
            next(error);
        }
    });
}
exports.resendOTP = resendOTP;
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.changePassword()`);
            logger_1.default.debug(`${TAG}.changePassword() Object = ${JSON.stringify(req.body)}`);
            const passwords = req.body;
            const headerValue = req.headers.authorization.split(' ')[1];
            const response = yield authService.changePassword(Object.assign(Object.assign({}, passwords), { headerValue }));
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword() `, error);
            next(error);
        }
    });
}
exports.changePassword = changePassword;
// forget password
function forgetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.forgetPassword()`);
            logger_1.default.debug(`${TAG}.forgetPassword() Object = ${JSON.stringify(req.body)}`);
            const { email } = req.body;
            const headerValue = req.headers.authorization;
            const response = yield authService.forgetPassword({ email });
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.forgetPassword() `, error);
            next(error);
        }
    });
}
exports.forgetPassword = forgetPassword;
function setForgetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.setForgetPassword()`);
            logger_1.default.debug(`${TAG}.setForgetPassword() Object = ${JSON.stringify(req.body)}`);
            const { newPassword } = req.body;
            console.log("headerValue");
            const headerValue = req.headers.authorization.split(' ')[1];
            const response = yield authService.setForgetPassword({ newPassword, headerValue });
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.setForgetPassword() `, error);
            next(error);
        }
    });
}
exports.setForgetPassword = setForgetPassword;
