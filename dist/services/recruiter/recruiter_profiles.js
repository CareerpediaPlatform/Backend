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
exports.uploadVideoFile = exports.updateCompanylogo = exports.getRecruiterList = exports.uploadCompanyLogoFile = exports.deleteRecruiterProfile = exports.getRecruiterProfile = exports.recruiterProfile = void 0;
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const mysql_1 = require("../../Database/mysql");
const config_1 = require("../../Loaders/config");
const file_constants_1 = require("src/constants/file_constants");
const s3_media_1 = require("src/helpers/s3_media");
const util_1 = __importDefault(require("util"));
const authentication_1 = require("src/helpers/authentication");
const TAG = 'services.profile';
function recruiterProfile(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.recruiterProfile() ==> `, user);
        console.log(user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const uid = decoded[0].uid;
            const isValid = yield mysql_1.RecruiterAuth.getRecruiterUid(uid);
            if (isValid) {
                const existedProfile = yield mysql_1.RecruiterProfileDetailsData.checkExist(uid);
                if (existedProfile) {
                    const basicDetails = yield mysql_1.RecruiterProfileDetailsData.recruiterBasicDetailsUpdate(Object.assign(Object.assign({}, user.Profile), { uid }));
                    const contactDetails = yield mysql_1.RecruiterProfileDetailsData.recruiterContactUpdate(Object.assign(Object.assign({}, user.Contact), { uid }));
                    const companyDetsils = yield mysql_1.RecruiterProfileDetailsData.recruitercompanyDetailUpdate(Object.assign(Object.assign({}, user.Company), { uid }));
                    const data = {
                        basicDetails,
                        contactDetails,
                        companyDetsils
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
                const response = yield mysql_1.RecruiterProfileDetailsData.recruiterProfilePost(Object.assign(Object.assign({}, user), { uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "invalid user uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.recruiterProfile = recruiterProfile;
function getRecruiterProfile(headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterProfile() ==> `, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const uid = decoded.uid;
            const isValid = yield mysql_1.RecruiterAuth.getRecruiterUid(uid);
            if (isValid) {
                const existedProfile = yield mysql_1.RecruiterProfileDetailsData.getRecruiterProfile(uid);
                if (existedProfile) {
                    const data = {
                        existedProfile
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
                else {
                    serviceResponse.message = "invalid user uid";
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                    return serviceResponse;
                }
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getRecruiterProfile = getRecruiterProfile;
function deleteRecruiterProfile(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteRecruiterProfile() ==> `, userID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const deleteProfile = yield mysql_1.RecruiterProfileDetailsData.deleteRecruiter(userID);
            if (deleteProfile) {
                serviceResponse.message = "user deleted successfully";
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
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteRecruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteRecruiterProfile = deleteRecruiterProfile;
//****************companylogo********************/
function uploadCompanyLogoFile(files) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadCompanyLogoFile() `);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.COMPANY_LOGO;
            const data = yield (0, s3_media_1.saveFile)(files, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            logger_1.default.debug(` ${TAG}.uploadCompanyLogoFile 's3 response:'` + util_1.default.inspect(data));
            logger_1.default.debug(` ${TAG}.uploadCompanyLogoFile 'fileS3 URL: ' ` + (0, s3_media_1.getFileUrl)(data.savedFileKey, config_1.AWS_S3.BUCKET_NAME));
            const fileDetails = {
                fileName: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.savedFileName,
                originalFileName: (_b = files[0]) === null || _b === void 0 ? void 0 : _b.originalname,
                contentType: (_c = files[0]) === null || _c === void 0 ? void 0 : _c.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_d = data[0]) === null || _d === void 0 ? void 0 : _d.savedFileKey,
                fileUrl: (_e = data[0]) === null || _e === void 0 ? void 0 : _e.savedLocation,
                isPublic: true,
                metaData: null
            };
            const fileSavedResp = yield mysql_1.RecruiterProfileDetailsData.saveFile(fileDetails);
            serviceResponse.message = `successfully uploaded ${files[0].originalname}`;
            serviceResponse.data = {
                uid: fileSavedResp === null || fileSavedResp === void 0 ? void 0 : fileSavedResp.uid,
                fileName: fileDetails.fileName,
                fileUrl: fileDetails.fileUrl,
                originalFileName: fileDetails.originalFileName,
                contentType: fileDetails.contentType
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadCompanyLogoFile = uploadCompanyLogoFile;
function getRecruiterList(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterList() ==> `, userID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedProfile = yield mysql_1.RecruiterProfileDetailsData.getRecruiterList(userID);
            if (existedProfile) {
                const data = {
                    existedProfile
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterFile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getRecruiterList = getRecruiterList;
function updateCompanylogo(file, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCompanylogo() ==> `, userID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.COMPANY_LOGO;
            const data = yield (0, s3_media_1.saveFile)(file, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            logger_1.default.debug(` ${TAG}.updateCompanylogo 's3 response:'` + util_1.default.inspect(data));
            logger_1.default.debug(` ${TAG}.updateCompanylogo 'fileS3 URL: ' ` + (0, s3_media_1.getFileUrl)(data.savedFileKey, config_1.AWS_S3.BUCKET_NAME));
            const fileDetails = {
                fileName: data === null || data === void 0 ? void 0 : data.savedFileName,
                originalFileName: file.originalname,
                contentType: file.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: data === null || data === void 0 ? void 0 : data.savedFileKey,
                fileUrl: data === null || data === void 0 ? void 0 : data.savedLocation,
                isPublic: true,
                metaData: null
            };
            console.log(fileDetails.originalFileName);
            const updateImage = yield mysql_1.RecruiterProfileDetailsData.updateCompanylogo(fileDetails, userID);
            serviceResponse.message = `successfully uploaded ${file.originalname}`;
            serviceResponse.data = {
                fileName: fileDetails.fileName,
                originalFileName: fileDetails.originalFileName,
                contentType: fileDetails.contentType
            };
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCompanylogo`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateCompanylogo = updateCompanylogo;
//*************videouploading********************************/
function uploadVideoFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadVideoFile() `);
        console.log("33333333333333333333333333333");
        console.log(file);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.LMS_VIDEOS;
            const data = yield (0, s3_media_1.saveFile)(file, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            logger_1.default.debug(` ${TAG}.uploadVideoFile 's3 response:'` + util_1.default.inspect(data));
            logger_1.default.debug(` ${TAG}.uploadVideoFile 'fileS3 URL: ' ` + (0, s3_media_1.getFileUrl)(data.savedFileKey, config_1.AWS_S3.BUCKET_NAME));
            const fileDetails = {
                fileName: data === null || data === void 0 ? void 0 : data.savedFileName,
                originalFileName: file === null || file === void 0 ? void 0 : file.originalname,
                contentType: file === null || file === void 0 ? void 0 : file.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: data === null || data === void 0 ? void 0 : data.savedFileKey,
                fileUrl: data === null || data === void 0 ? void 0 : data.savedLocation,
                isPublic: true,
                metaData: null
            };
            const fileSavedResp = yield mysql_1.RecruiterProfileDetailsData.uploadVideoFile(fileDetails);
            logger_1.default.debug(` ${TAG}.uploadCompanyInfoFile 'fileSavedResp response:'` + util_1.default.inspect(fileSavedResp));
            serviceResponse.message = `successfully uploaded ${file.originalname}`;
            serviceResponse.data = {
                uid: fileSavedResp === null || fileSavedResp === void 0 ? void 0 : fileSavedResp.uid,
                fileName: fileDetails.fileName,
                originalFileName: fileDetails.originalFileName,
                contentType: fileDetails.contentType
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadVideoFile = uploadVideoFile;
