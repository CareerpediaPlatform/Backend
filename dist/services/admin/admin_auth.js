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
exports.loginAdmin = exports.signupUser = void 0;
const mysql_1 = require("../../Database/mysql");
const admin_auth_1 = require("../../Database/mysql/lib/admin/admin_auth");
const status_codes_1 = require("../../constants/status_codes");
const authentication_1 = require("../../helpers/authentication");
const encryption_1 = require("../../helpers/encryption");
const logger_1 = __importDefault(require("../../logger"));
const api_error_1 = require("../../models/lib/api_error");
const service_response_1 = require("../../models/lib/service_response");
const TAG = 'services.auth';
//Admin signup
function signupUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedUser = yield (0, admin_auth_1.checkEmailExist)(user.email);
            if (existedUser) {
                serviceResponse.message = 'Email  is already exist';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            const Admin = yield mysql_1.AdminAuth.signUp(user);
            const data = { Admin };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser`, error);
            serviceResponse.addServerError('Failed to create Admin due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.signupUser = signupUser;
//Admin login
function loginAdmin(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.loginAdmin() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedUser = yield (0, admin_auth_1.checkEmailExist)(user.email);
            const user_id = existedUser.id;
            //checking email exist or not
            if (!existedUser) {
                serviceResponse.message = 'Email is not exist please register';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            //comparing password
            const isPasswordValid = yield (0, encryption_1.comparePasswords)(existedUser.password, user.password);
            if (!isPasswordValid) {
                serviceResponse.message = 'password is does not match';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            else {
                const Admin = yield mysql_1.AdminAuth.login(user);
                const accessToken = yield (0, authentication_1.generateAccessToken)({ uid: Admin[0].uid, role: "admin" });
                const data = {
                    accessToken,
                    role: "admin",
                    user_id
                };
                serviceResponse.data = data;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser`, error);
            serviceResponse.addServerError('Failed to create Admin due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.loginAdmin = loginAdmin;
