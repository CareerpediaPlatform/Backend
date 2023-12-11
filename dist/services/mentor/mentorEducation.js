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
exports.deleteEducationDetails = exports.updateEducationDetails = exports.postEducationDetails = exports.updateEducation = void 0;
const mysql_1 = require("../../Database/mysql");
const status_codes_1 = require("../../constants/status_codes");
const logger_1 = __importDefault(require("../../logger"));
const api_error_1 = require("../../models/lib/api_error");
const service_response_1 = require("../../models/lib/service_response");
const authentication_1 = require("../../helpers/authentication");
const mysql_2 = require("../../Database/mysql");
const TAG = 'services.mentor_Education';
function updateEducation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateEducation() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(user);
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            console.log("*******************************************");
            console.log(decoded);
            const uid = decoded.uid;
            console.log(uid);
            const valid = yield mysql_2.MentorAuth.checkMentorUid(uid);
            if (valid) {
                const response = yield mysql_1.mentorEducationData.saveEducationDetails(Object.assign(Object.assign({}, user), { uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
            }
            else {
                serviceResponse.message = "Invalid Mentor Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducation`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateEducation = updateEducation;
//SINGLE OBJECT EDUCATION DETAILS
function postEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.postEducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_2.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const response = yield mysql_1.mentorEducationData.postEducationDetails(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                serviceResponse.message = "Data is posted  Successfully";
                return serviceResponse;
            }
            else {
                serviceResponse.message = "invalid user id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.postEducationDetails = postEducationDetails;
function updateEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.updateEducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_2.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const checkId = yield mysql_1.mentorEducationData.checkId(user.userId);
                if (checkId) {
                    const response = yield mysql_1.mentorEducationData.updateEducationDetails(Object.assign({}, user));
                    const data = Object.assign({}, response);
                    serviceResponse.data = data;
                    serviceResponse.message = "Data is updated  Successfully";
                    return serviceResponse;
                }
                else {
                    serviceResponse.message = "invalid user id";
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateEducationDetails = updateEducationDetails;
function deleteEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.deleteEducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_2.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const checkId = yield mysql_1.mentorEducationData.checkId(user.userId);
                if (checkId) {
                    const response = yield mysql_1.mentorEducationData.deleteEducation(Object.assign({}, user));
                    const data = {
                        id: response
                    };
                    serviceResponse.data = data;
                    serviceResponse.message = "Data is deleted  Successfully";
                    return serviceResponse;
                }
                else {
                    serviceResponse.message = "invalid user id";
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteEducationDetails`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteEducationDetails = deleteEducationDetails;
