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
exports.changePassword = exports.loginUser = exports.signupUser = void 0;
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
            transaction = yield (0, sql_query_util_1.getTransaction)();
            const mentor = yield mysql_1.MentorAuth.signUp(user, transaction);
            yield transaction.commit();
            (0, nodemail_1.sendRegistrationNotification)(user);
            const accessToken = yield (0, authentication_1.generateAccessToken)(Object.assign({}, mentor));
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
                const mentor_uid = existedUser.uid;
                const role = "mentor";
                const accessToken = yield (0, authentication_1.generateAccessToken)({ mentor_uid, role });
                const data = {
                    accessToken
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
// export async function changeUserPassword(user: any) {
//   const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
//   try {
//     const uid=await verifyAccessToken(user.headerValue)
//     console.log(uid)
//     const existedUser = await getMentorUid({uid:uid.uid});
//     console.log(existedUser)
//     console.log(existedUser.password)
//     if (!existedUser) {
//       serviceResponse.message = 'User not found'; 
//       serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
//       serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
//     } else {
//       const isValid = await comparehashPasswords(existedUser.password, user.oldPassword);
//       if (isValid) {
//         const response = await MentorAuth.changePassword({ password: user.newPassword, ...user });
//         serviceResponse.message = "Password changed successfully";
//         serviceResponse.data = response;
//       } else {
//         serviceResponse.message = 'Old password is wrong';
//         serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
//         serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
//       }
//     }
//   } catch (error) {
//     log.error(`ERROR occurred in ${TAG}.changeUserPassword`, error);
//     serviceResponse.addServerError('Failed to change password due to technical difficulties');
//   }
//   return serviceResponse;
// }
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde student is valid or not
            const uid = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const mentor = yield mysql_1.MentorAuth.getMentorUid({ uid: uid.uid });
            if (mentor) {
                const IsValid = yield (0, encryption_1.comparePasswords)(mentor.password, user.oldPassword);
                if (IsValid) {
                    const response = yield mysql_1.MentorAuth.changePassword({ password: user.newPassword, uid: uid.uid });
                    console.log("response");
                    console.log(response);
                    serviceResponse.message = "password changed successfully";
                    serviceResponse.data = response;
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
