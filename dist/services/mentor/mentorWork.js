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
exports.deleteWorkExperience = exports.updateWorkexperience = exports.postWorkExperience = exports.updateWorkExperience = void 0;
const mysql_1 = require("../../Database/mysql");
const status_codes_1 = require("../../constants/status_codes");
const logger_1 = __importDefault(require("../../logger"));
const api_error_1 = require("../../models/lib/api_error");
const service_response_1 = require("../../models/lib/service_response");
const authentication_1 = require("../../helpers/authentication");
const TAG = 'services.mentor_workExperience';
function updateWorkExperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateWorkExperience() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(user);
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            console.log(uid);
            const valid = yield mysql_1.MentorAuth.checkMentorUid(uid);
            if (valid) {
                const response = yield mysql_1.mentorWorkExperienceData.saveWorkExperienceDetails(Object.assign(Object.assign({}, user), { uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
            }
            else {
                serviceResponse.message = "Invalid Mentor UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateWorkExperience`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateWorkExperience = updateWorkExperience;
// export async function postEducationDetails(user) {
//   console.log(user)
//     log.info(`${TAG}.postEducationDetails() ==> `, user); 
//     const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
//     try {
//       let decoded=await verifyAccessToken(user.headerValue)
//       const uid = decoded.uid
//       const isValid=await MentorAuth.checkMentorUid(uid);
//       if(isValid){
//         const checkId = await mentorWorkExperienceData.checkId(user.id)
//         if(checkId){
//         const response= await mentorWorkExperienceData.updateWorKExperience({...user,uid:decoded.uid});
//         const data = {
//           ...response
//         }    
//         serviceResponse.data = data
//         return serviceResponse
//       }else{
//        const response= await mentorWorkExperienceData.postWorkExperience({...user,uid:decoded.uid});
//         const data = {
//           ...response
//         }    
//         serviceResponse.data = data
//         return serviceResponse
//       }
//       }
//       else{
//         serviceResponse.message="invalid user id";
//         serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
//         serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
//         return serviceResponse
//       }
//     } catch (error) {
//       log.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
//       serviceResponse.addServerError('Failed to create user due to technical difficulties');
//     }
//     return serviceResponse;
//   }
function postWorkExperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.postWorExperience() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const response = yield mysql_1.mentorWorkExperienceData.postWorkExperience(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
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
            logger_1.default.error(`ERROR occurred in ${TAG}.postWorExperience`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.postWorkExperience = postWorkExperience;
function updateWorkexperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.updateWorKExperience() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const checkId = yield mysql_1.mentorWorkExperienceData.checkId(user.userId);
                if (checkId) {
                    const response = yield mysql_1.mentorWorkExperienceData.updateWorKExperience(Object.assign({}, user));
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
            logger_1.default.error(`ERROR occurred in ${TAG}.updateWorKExperience`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateWorkexperience = updateWorkexperience;
function deleteWorkExperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.deleteWorkExperience() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.MentorAuth.checkMentorUid(uid);
            if (isValid) {
                const checkId = yield mysql_1.mentorWorkExperienceData.checkId(user.userId);
                if (checkId) {
                    const response = yield mysql_1.mentorWorkExperienceData.deleteWorkExperience(Object.assign({}, user));
                    const data = Object.assign({}, response);
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
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteWorkExperience`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteWorkExperience = deleteWorkExperience;
