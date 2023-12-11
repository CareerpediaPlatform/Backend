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
exports.workExperienceDetails = exports.EducationDetails = exports.postWorkExperienceDetails = exports.postEducationDetails = exports.getStudentResume = exports.uploadResume = exports.studentProfileExperienceDelete = exports.studentProfileEducationDelete = exports.updateWorkExperience = exports.updateEducationDetails = exports.getSingleStudentProfile = exports.getStudentProfile = exports.studentProfilePost = void 0;
const mysql_1 = require("src/Database/mysql");
const config_1 = require("src/Loaders/config");
const file_constants_1 = require("src/constants/file_constants");
const status_codes_1 = require("src/constants/status_codes");
const authentication_1 = require("src/helpers/authentication");
const s3_media_1 = require("src/helpers/s3_media");
const logger_1 = __importDefault(require("src/logger"));
const service_response_1 = require("src/models/lib/service_response");
const TAG = "student.service.profile";
function studentProfilePost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.studentProfilePost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existedProfile = yield mysql_1.StudentProfile.checkExist(decoded.uid);
                if (existedProfile) {
                    const postResponse = yield mysql_1.StudentProfile.studentProfileUpdate(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                    const data = {
                        postResponse,
                    };
                    console.log(data);
                    serviceResponse.data = data;
                    serviceResponse.message = "successfully updated !";
                    return serviceResponse;
                }
                const response = yield mysql_1.StudentProfile.studentProfilePost(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfilePost`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.studentProfilePost = studentProfilePost;
function getStudentProfile(headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getStudentProfile() ==> `, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existedProfile = yield mysql_1.StudentProfile.checkProfilExist(decoded.uid);
                if (existedProfile) {
                    const data = Object.assign({}, existedProfile);
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getStudentProfile`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.getStudentProfile = getStudentProfile;
function getSingleStudentProfile(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getSingleStudentProfile() ==> `, uid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: uid });
            if (isValid) {
                const existedProfile = yield mysql_1.StudentProfile.checkProfilExist(uid);
                if (existedProfile) {
                    const data = {
                        existedProfile,
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleStudentProfile`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.getSingleStudentProfile = getSingleStudentProfile;
function updateEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateEducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            // console.log(decoded);
            // if (!decoded) {
            //   serviceResponse.message = "Invalid recruiter UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            // const existingPersonalDetails =
            //   await StudentProfile.checkStudentEducationUid(decoded.uid);
            //   console.log(existingPersonalDetails.degree)
            //   console.log(existingPersonalDetails.college)
            //   console.log(existingPersonalDetails.deptBranch)
            //   console.log(existingPersonalDetails.score)
            //   console.log(existingPersonalDetails.startYear)
            //   console.log(existingPersonalDetails.endYear)
            // if (existingPersonalDetails) {
            //   existingPersonalDetails.degree = user.degree;
            //   existingPersonalDetails.deptBranch = user.deptBranch;
            //   existingPersonalDetails.college = user.college;
            //   existingPersonalDetails.score = user.score;
            //   existingPersonalDetails.startYear = user.startYear;
            //   existingPersonalDetails.endYear = user.endYear;
            const response = yield mysql_1.StudentProfile.updateEducationDetails(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducationDetails`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.updateEducationDetails = updateEducationDetails;
function updateWorkExperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateWorkExperience() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const response = yield mysql_1.StudentProfile.updateWorkExperience(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateWorkExperience`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.updateWorkExperience = updateWorkExperience;
function studentProfileEducationDelete(info) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentProfileEducationDelete() ==> `, info);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(info.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existedProfile = yield mysql_1.StudentProfile.checkExistEducationAndExperience(info.id);
                if (existedProfile) {
                    const response = yield mysql_1.StudentProfile.studentEducationDelete(info.id);
                    const data = {
                        response,
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileEducationDelete`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.studentProfileEducationDelete = studentProfileEducationDelete;
function studentProfileExperienceDelete(info) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentProfileExperienceDelete() ==> `, info);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(info.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existedProfile = yield mysql_1.StudentProfile.checkExistEducationAndExperience(info.id);
                if (existedProfile) {
                    const response = yield mysql_1.StudentProfile.studentExperienceDelete(info.id);
                    const data = {
                        response,
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileExperienceDelete`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.studentProfileExperienceDelete = studentProfileExperienceDelete;
function uploadResume(file, headerValue) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadResume() ==> `, file, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.LMS_VIDEOS;
            const data = yield (0, s3_media_1.saveFile)(file, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            const fileDetails = {
                fileName: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.savedFileName,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_b = data[0]) === null || _b === void 0 ? void 0 : _b.savedFileKey,
                fileUrl: (_c = data[0]) === null || _c === void 0 ? void 0 : _c.savedLocation,
                isPublic: true,
                metaData: null,
            };
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existed = yield mysql_1.StudentProfile.checkResume(uid);
                console.log("existed");
                console.log(existed);
                if (existed.length > 0) {
                    response = yield mysql_1.StudentProfile.updateResume(fileDetails, uid);
                }
                else {
                    response = yield mysql_1.StudentProfile.uploadResume(fileDetails, uid);
                }
            }
            const datas = {
                resume: fileDetails.fileUrl,
                uid,
            };
            serviceResponse.data = datas;
            serviceResponse.message = "file uploaded successfully";
            return response;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadResume`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.uploadResume = uploadResume;
function getStudentResume(headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getStudentResume() ==> `, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const existed = yield mysql_1.StudentProfile.checkResume(uid);
                if (existed) {
                    response = yield mysql_1.StudentProfile.getStudentResume(uid);
                }
            }
            return response;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadResume`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.getStudentResume = getStudentResume;
function postEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.postEducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const response = yield mysql_1.StudentProfile.postEducationDetails(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postEducationDetails`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.postEducationDetails = postEducationDetails;
function postWorkExperienceDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.postWorkExperienceDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            if (isValid) {
                const response = yield mysql_1.StudentProfile.postWorkExperience(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postWorkExperienceDetails`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.postWorkExperienceDetails = postWorkExperienceDetails;
function EducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.EducationDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            console.log(user);
            console.log(user.id);
            const checkid = yield mysql_1.StudentProfile.checkEducationId(user.id);
            console.log("aaaaaaaaaaaaaaaaaaa");
            if (checkid) {
                if (isValid) {
                    const response = yield mysql_1.StudentProfile.updateStudentEducationDetails(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                    const data = Object.assign({}, response);
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.EducationDetails`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.EducationDetails = EducationDetails;
function workExperienceDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        logger_1.default.info(`${TAG}.workExperienceDetails() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, "", false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({
                uid: decoded.uid,
            });
            console.log(user);
            console.log(user.id);
            const checkid = yield mysql_1.StudentProfile.checkWorkExperienceId(user.id);
            console.log("aaaaaaaaaaaaaaaaaaa");
            if (checkid) {
                if (isValid) {
                    const response = yield mysql_1.StudentProfile.updateStudentWorkDetails(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                    const data = Object.assign({}, response);
                    serviceResponse.data = data;
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "invalid user id";
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.workExperienceDetails`, error);
            serviceResponse.addServerError("Failed to create user due to technical difficulties");
        }
        return serviceResponse;
    });
}
exports.workExperienceDetails = workExperienceDetails;
