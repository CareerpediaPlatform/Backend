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
const mysql_1 = require("src/Database/mysql");
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const authentication_1 = require("src/helpers/authentication");
const TAG = 'services.mentor_PersonalAndContactDetails';
function savePersonalAndContactDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.savePersonalAndContactDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded[0].uid;
            console.log(user);
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            const mentorUserId = yield mysql_1.mentorPersonalAndContactData.isValid(uid);
            const mentor = yield mysql_1.mentorPersonalAndContactData.isValids(uid);
            console.log(mentor);
            if (!mentor) {
                serviceResponse.message = "Invalid mentor ID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const existingPersonalDetails = yield mysql_1.mentorPersonalAndContactData.getPersonalDetailsByMentorId(mentorUserId.userId);
            if (existingPersonalDetails) {
                existingPersonalDetails.profile_pic = user.profile_pic;
                existingPersonalDetails.first_name = user.first_name;
                existingPersonalDetails.last_name = user.last_name;
                existingPersonalDetails.email = user.email;
                existingPersonalDetails.mobile_number = user.mobile_number;
                existingPersonalDetails.date_of_birth = user.date_of_birth;
                existingPersonalDetails.linkedin_profile = user.linkedin_profile;
                existingPersonalDetails.address = user.address;
                existingPersonalDetails.city = user.city;
                existingPersonalDetails.district = user.district;
                existingPersonalDetails.state = user.state;
                existingPersonalDetails.pincode = user.pincode;
                existingPersonalDetails.country = user.country;
                const updatedPersonalDataResponse = yield mysql_1.mentorPersonalAndContactData.updatePersonalAndContactDetails(mentorUserId.userId, existingPersonalDetails);
                serviceResponse.data = {
                    mentorPersonalAndContactDetailsUid: updatedPersonalDataResponse,
                };
            }
            else {
                const personalDataResponse = yield mysql_1.mentorPersonalAndContactData.savePersonalAndContactDetails(user, mentorUserId.userId);
                user.data = {
                    mentorPersonaDetailsUid: personalDataResponse,
                };
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails`, error);
            serviceResponse.addServerError("Failed to add mentor personal details due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.savePersonalAndContactDetails = savePersonalAndContactDetails;
function getMentorProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterProfile() ==> `, userId);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedProfile = yield mysql_1.mentorWorkExperienceData.checkProfilExist(userId);
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
