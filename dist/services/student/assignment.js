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
exports.getAllThreadsPart = exports.getAllThreadsCourse = exports.postThreadreply = exports.getSingleThread = exports.uploadThread = exports.getAllNotes = exports.uploadNotes = exports.getAllAssignments = exports.uploadAssignment = void 0;
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const service_response_1 = require("src/models/lib/service_response");
const mysql_1 = require("../../Database/mysql");
const config_1 = require("../../Loaders/config");
const file_constants_1 = require("src/constants/file_constants");
const s3_media_1 = require("src/helpers/s3_media");
const authentication_1 = require("src/helpers/authentication");
const admin_lms_1 = require("src/Database/mysql/lib/admin/admin_lms");
const models_1 = require("src/models");
const TAG = 'assignment.service';
function uploadAssignment(files, headerValue, partUid) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadAssignment()`);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.LMS_VIDEOS;
            const data = yield (0, s3_media_1.saveFile)(files, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            const fileDetails = {
                fileName: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.savedFileName,
                originalFileName: (_b = files[0]) === null || _b === void 0 ? void 0 : _b.originalname,
                contentType: (_c = files[0]) === null || _c === void 0 ? void 0 : _c.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_d = data[0]) === null || _d === void 0 ? void 0 : _d.savedFileKey,
                fileUrl: (_e = data[0]) === null || _e === void 0 ? void 0 : _e.savedLocation,
                isPublic: true,
                metaData: null,
            };
            console.log(fileDetails);
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                const response = yield mysql_1.attachment.uploadAssignment(fileDetails, uid, partUid);
            }
            else {
                serviceResponse.message = "invalid user id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            // serviceResponse.message = `successfully uploaded ${file.originalname}`
            serviceResponse.data = {
                assignment: fileDetails.fileUrl,
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadAssignment`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadAssignment = uploadAssignment;
function getAllAssignments(partUid, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                response = yield mysql_1.attachment.getAllAssignments(partUid, uid);
            }
            else {
                serviceResponse.message = "Invalid User Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
            }
            const data = {
                response
            };
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllAssignmentsList`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getAllAssignments = getAllAssignments;
function uploadNotes(partUid, headerValue, note) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadNotes() `);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                response = yield mysql_1.attachment.uploadNote(partUid, uid, note);
            }
            else {
                serviceResponse.message = "invalid user id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            serviceResponse.data = response;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadNotes`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadNotes = uploadNotes;
function getAllNotes(partUid, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                response = yield mysql_1.attachment.getAllNotes(partUid, uid);
            }
            else {
                serviceResponse.message = "Invalid user Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const data = {
                response
            };
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllNotes`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getAllNotes = getAllNotes;
function uploadThread(thread, headerValue, partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadThread() `);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                response = yield mysql_1.attachment.uploadThread(thread, uid, partUid);
            }
            else {
                serviceResponse.message = "Invalid user Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            serviceResponse.data = {
                response, thread
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadThread`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadThread = uploadThread;
function getSingleThread(partUid, threadId, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            if (isValid) {
                response = yield mysql_1.attachment.getSingleThread(partUid, threadId, uid);
            }
            else {
                serviceResponse.message = "Invalid user Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const data = {
                response
            };
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllNotes`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getSingleThread = getSingleThread;
function postThreadreply(reply, headerValue, partUid, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.postThreadreply() ==> `, reply, partUid, threadId);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            console.log(headerValue);
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            console.log(uid);
            if (isValid) {
                console.log(threadId);
                const checkId = yield mysql_1.attachment.checkThreadId(threadId);
                if (checkId) {
                    response = yield mysql_1.attachment.postThreadreply(reply, uid, partUid, threadId);
                }
            }
            else {
                serviceResponse.message = "Invalid user Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            serviceResponse.data = {
                reply
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postThreadreply`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.postThreadreply = postThreadreply;
function getAllThreadsCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getAllThreadsCourse() ==> `, courseUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const exist = yield (0, admin_lms_1.getMyCourse)(courseUid);
            if (exist.length > 0) {
                const response = yield mysql_1.attachment.getAllThreadsCourse(courseUid);
                const data = {
                    response,
                };
                serviceResponse.data = data;
            }
            else {
                serviceResponse.message = "course does not exist";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsCourse`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getAllThreadsCourse = getAllThreadsCourse;
function getAllThreadsPart(partUid, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getAllThreadsPart() ==> `, partUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            console.log(headerValue);
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: decoded.uid });
            const uid = decoded.uid;
            console.log(uid);
            console.log(uid);
            if (isValid) {
                const response = yield mysql_1.attachment.getAllThreadsPart(partUid);
            }
            else {
                serviceResponse.message = "Invalid user Id";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new models_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const data = Object.assign({}, response);
            console.log(data);
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsPart`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getAllThreadsPart = getAllThreadsPart;
