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
exports.getMentorList = exports.getMentorProfile = exports.savePersonalAndContactDetails = void 0;
const mysql_1 = require("../../Database/mysql");
const status_codes_1 = require("../../constants/status_codes");
const logger_1 = __importDefault(require("../../logger"));
const api_error_1 = require("../../models/lib/api_error");
const service_response_1 = require("../../models/lib/service_response");
const authentication_1 = require("../../helpers/authentication");
const TAG = 'services.mentor_PersonalAndContactDetails';
function savePersonalAndContactDetails(user, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(user)
        logger_1.default.info(`${TAG}.savePersonalAndContactDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const uid = decoded.uid;
            console.log(uid);
            const isValid = yield mysql_1.mentorPersonalAndContactData.checkMentorUid(uid);
            if (isValid) {
                const existedProfile = yield mysql_1.mentorPersonalAndContactData.checkExist(uid);
                if (existedProfile) {
                    const postResponse = yield mysql_1.mentorPersonalAndContactData.mentorProfileUpdate(user, uid);
                    const data = {
                        postResponse
                    };
                    console.log(data);
                    serviceResponse.data = data;
                    serviceResponse.message = "successfully updated !";
                    return serviceResponse;
                }
                const response = yield mysql_1.mentorPersonalAndContactData.mentorProfilePost(user, uid);
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid Mentor Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.savePersonalAndContactDetails = savePersonalAndContactDetails;
function getMentorProfile(headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterProfile() ==> `, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const uid = decoded.uid;
            console.log(uid);
            const isValid = yield mysql_1.mentorPersonalAndContactData.checkMentorUid(uid);
            if (isValid) {
                const existedProfile = yield mysql_1.mentorWorkExperienceData.checkProfilExist(uid);
                const data = {
                    existedProfile
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid Mentor Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getMentorProfile = getMentorProfile;
function getMentorList(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getMentorList() ==> `, userId);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedProfile = yield mysql_1.mentorPersonalAndContactData.getMentorList(userId);
            if (existedProfile) {
                const data = {
                    existedProfile
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getMentorList = getMentorList;
