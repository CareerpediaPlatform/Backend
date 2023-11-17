"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getStudentResume = exports.uploadResume = exports.studentProfileExperienceDelete = exports.studentProfileEducationDelete = exports.updateWorkExperience = exports.updateEducationDetails = exports.getSingleStudentProfile = exports.getStudentProfile = exports.studentProfilePost = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const profileService = __importStar(require("../../services/student/profile"));
const TAG = "controler.student.profile";
function studentProfilePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.studentProfilePost()`);
            logger_1.default.debug(`${TAG}.studentProfilePost() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const user = req.body;
            const authResponse = yield profileService.studentProfilePost(Object.assign(Object.assign({}, user), { headerValue }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfilePost() `, error);
            next(error);
        }
    });
}
exports.studentProfilePost = studentProfilePost;
function getStudentProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getStudentProfile()`);
            logger_1.default.debug(`${TAG}.getStudentProfile() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield profileService.getStudentProfile(headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getStudentProfile() `, error);
            next(error);
        }
    });
}
exports.getStudentProfile = getStudentProfile;
function getSingleStudentProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getSingleStudentProfile()`);
            logger_1.default.debug(`${TAG}.getSingleStudentProfile() Object = ${JSON.stringify(req.body)}`);
            let uid = req.params.uid;
            const authResponse = yield profileService.getSingleStudentProfile(uid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleStudentProfile() `, error);
            next(error);
        }
    });
}
exports.getSingleStudentProfile = getSingleStudentProfile;
function updateEducationDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateEducationDetails()`);
            logger_1.default.debug(`${TAG}.updateEducationDetails() Object = ${JSON.stringify(req.body)}`);
            const data = req.body;
            const headerValue = req.headers.authorization.split(' ')[1];
            const Response = yield profileService.updateEducationDetails({ data, headerValue });
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducationDetails() `, error);
            next(error);
        }
    });
}
exports.updateEducationDetails = updateEducationDetails;
function updateWorkExperience(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateWorkExperience()`);
            logger_1.default.debug(`${TAG}.updateWorkExperience() Object = ${JSON.stringify(req.body)}`);
            const data = req.body;
            const headerValue = req.headers.authorization.split(' ')[1];
            const Response = yield profileService.updateWorkExperience({ data, headerValue });
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateWorkExperience() `, error);
            next(error);
        }
    });
}
exports.updateWorkExperience = updateWorkExperience;
function studentProfileEducationDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        ``;
        try {
            logger_1.default.info(`${TAG}.studentProfileEducationDelete()`);
            logger_1.default.debug(`${TAG}.studentProfileEducationDelete() Object = ${JSON.stringify(req.body)}`);
            const info = req.body;
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
            console.log(info);
            const headerValue = req.headers.authorization.split(' ')[1];
            const Response = yield profileService.studentProfileEducationDelete(Object.assign(Object.assign({}, info), { headerValue }));
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileEducationDelete() `, error);
            next(error);
        }
    });
}
exports.studentProfileEducationDelete = studentProfileEducationDelete;
function studentProfileExperienceDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.studentProfileExperienceDelete()`);
            logger_1.default.debug(`${TAG}.studentProfileExperienceDelete() Object = ${JSON.stringify(req.body)}`);
            const info = req.body;
            const headerValue = req.headers.authorization.split(' ')[1];
            const Response = yield profileService.studentProfileExperienceDelete(Object.assign(Object.assign({}, info), { headerValue }));
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileExperienceDelete() `, error);
            next(error);
        }
    });
}
exports.studentProfileExperienceDelete = studentProfileExperienceDelete;
function uploadResume(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadResume()`);
            logger_1.default.debug(`${TAG}.uploadResume() Object = ${JSON.stringify(req.body)}`);
            const file = req.files;
            console.log(file);
            const headerValue = req.headers.authorization.split(' ')[1];
            const Response = yield profileService.uploadResume(file, headerValue);
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadResum() `, error);
            next(error);
        }
    });
}
exports.uploadResume = uploadResume;
function getStudentResume(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getStudentResume()`);
            logger_1.default.debug(`${TAG}.getStudentResume() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield profileService.getStudentResume(headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getStudentResume() `, error);
            next(error);
        }
    });
}
exports.getStudentResume = getStudentResume;
