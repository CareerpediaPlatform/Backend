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
const TAG = 'services.mentor_PersonalAndContactDetails';
function savePersonalAndContactDetails(menPersonalData, mentorUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.savePersonalAndContactDetails() ==> `, menPersonalData);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            console.log(mentorUid);
            console.log(menPersonalData);
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            const mentorUserId = yield mysql_1.mentorPersonalAndContactData.isValid(mentorUid);
            console.log(mentorUserId);
            if (!mentorUserId) {
                serviceResponse.message = "Invalid mentor ID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const existingPersonalDetails = yield mysql_1.mentorPersonalAndContactData.getPersonalDetailsByMentorId(mentorUserId.userId);
            if (existingPersonalDetails) {
                existingPersonalDetails.profile_pic = menPersonalData.profile_pic;
                existingPersonalDetails.first_name = menPersonalData.first_name;
                existingPersonalDetails.last_name = menPersonalData.last_name;
                existingPersonalDetails.email = menPersonalData.email;
                existingPersonalDetails.mobile_number = menPersonalData.mobile_number;
                existingPersonalDetails.date_of_birth = menPersonalData.date_of_birth;
                existingPersonalDetails.linkedin_profile = menPersonalData.linkedin_profile;
                existingPersonalDetails.address = menPersonalData.address;
                existingPersonalDetails.city = menPersonalData.city;
                existingPersonalDetails.district = menPersonalData.district;
                existingPersonalDetails.state = menPersonalData.state;
                existingPersonalDetails.pincode = menPersonalData.pincode;
                existingPersonalDetails.country = menPersonalData.country;
                const updatedPersonalDataResponse = yield mysql_1.mentorPersonalAndContactData.updatePersonalAndContactDetails(mentorUserId.userId, existingPersonalDetails);
                serviceResponse.data = {
                    mentorPersonalAndContactDetailsUid: updatedPersonalDataResponse,
                };
            }
            else {
                const personalDataResponse = yield mysql_1.mentorPersonalAndContactData.savePersonalAndContactDetails(menPersonalData, mentorUserId.userId);
                menPersonalData.data = {
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
