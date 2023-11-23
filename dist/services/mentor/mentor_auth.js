"use strict";
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
exports.mentorUpdateStatus = exports.changePassword = exports.loginUser = exports.signupUser = void 0;
const mysql_1 = require("src/Database/mysql");
const mentorAuth_1 = require("src/Database/mysql/lib/mentor/mentorAuth");
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const authentication_1 = require("../../helpers/authentication");
const encryption_1 = require("src/helpers/encryption");
const sql_query_util_1 = require("src/Database/mysql/helpers/sql.query.util");
const nodemail_1 = require("../../utils/nodemail");
const encryption_2 = require("src/helpers/encryption");
const TAG = 'services.auth';
function signupUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let transaction = null;
            const existedUser = yield (0, mentorAuth_1.checkEmailExist)(user.email);
            if (existedUser) {
                serviceResponse.message = 'Email  is already exist';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            const generatePassword = yield (0, encryption_2.generatePasswordWithPrefixAndLength)(14, "Careerpedia");
            transaction = yield (0, sql_query_util_1.getTransaction)();
            const mentor = yield mysql_1.MentorAuth.signUp(user, generatePassword, transaction);
            yield transaction.commit();
            console.log(user);
            (0, nodemail_1.sendRegistrationNotifications)(user, generatePassword);
            const uid = mentor.uid;
            const email = mentor.email;
            const accessToken = yield (0, authentication_1.generateAccessToken)({ uid, email });
            const data = {
                accessToken
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.signupUser = signupUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.loginUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // Check if the user with the given email exists
            const existedUser = yield (0, mentorAuth_1.checkEmailExist)(user.email);
            console.log(existedUser);
            //if email does not exist 
            if (!existedUser) {
                serviceResponse.message = 'Email  is not exist please register';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            const isPasswordValid = yield (0, encryption_1.comparePasswords)(existedUser.password, user.password);
            if (!isPasswordValid) {
                serviceResponse.message = 'Invalid password';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.UNAUTHORIZED;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
            }
            else {
                const mentor_login = yield mysql_1.MentorAuth.login(user);
                const uid = existedUser.uid;
                const email = existedUser.email;
                const accessToken = yield (0, authentication_1.generateAccessToken)({ uid, email });
                const data = {
                    accessToken, type: "mentor-signin", role: "mentor"
                };
                serviceResponse.data = data;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.loginUser`, error);
            serviceResponse.addServerError('Failed to perform login due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.loginUser = loginUser;
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde mentor is valid or not
            const uid = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const mentor = yield mysql_1.MentorAuth.getMentorUid({ uid: uid.uid });
            if (mentor) {
                const IsValid = yield (0, encryption_1.comparePasswords)(mentor.password, user.oldPassword);
                if (IsValid) {
                    const response = yield mysql_1.MentorAuth.changePassword({ password: user.newPassword, uid: uid.uid });
                    console.log("response");
                    console.log(response);
                    serviceResponse.message = "password changed successfully";
                    // serviceResponse.data=response
                }
                else {
                    serviceResponse.message = 'old password is wrong';
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.NOT_FOUND;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                }
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.changePassword = changePassword;
//  access or remove accerss of a mentor by admin
function mentorUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // find admin is valid or not
            const decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            if (decoded && (user.status == "ACTIVE" || user.status == "DEACTIVE")) {
                if (decoded.role != "admin") {
                    serviceResponse.message = `UnAutharized Admin`;
                    return serviceResponse;
                }
                const recruiter = yield mysql_1.MentorAuth.mentorUpdateStatus(Object.assign({}, user));
                const data = {
                    recruiter
                };
                serviceResponse.message = `recruiter status changed to ${user.status} successfully `;
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = `something went wrong in url`;
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.mentorUpdateStatus`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.mentorUpdateStatus = mentorUpdateStatus;
