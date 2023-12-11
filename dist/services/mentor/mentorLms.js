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
exports.getSingleRemark = exports.postThreadreply = exports.giveRemark = exports.getAllAssignments = void 0;
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const service_response_1 = require("src/models/lib/service_response");
const mentorlms = __importStar(require("../../Database/mysql/lib/mentor/mentorLms"));
const authentication_1 = require("src/helpers/authentication");
const mysql_1 = require("src/Database/mysql");
const models_1 = require("src/models");
const TAG = 'services.mentor_LMS';
function getAllAssignments(partId) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield mentorlms.getAllAssignments(partId);
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
function giveRemark(remark, assignmentId, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            console.log(decoded);
            const uid = decoded.mentor_uid;
            const mentorValid = yield mysql_1.MentorAuth.getMentorUid(uid);
            if (mentorValid) {
                const id = assignmentId.assignmentId;
                const isValid = yield mentorlms.checkAssignmentId(id);
                if (isValid) {
                    response = yield mentorlms.giveRemark(remark, id, uid);
                }
                else {
                    serviceResponse.message = "Invalid mentorId";
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = "Invalid mentorId";
                return serviceResponse;
            }
            const data = {
                response
            };
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.giveRemark`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.giveRemark = giveRemark;
function postThreadreply(headerValue, reply, partUid, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.postThreadreply() ==> `, reply, partUid, threadId);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            console.log(headerValue);
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield mysql_1.MentorAuth.getMentorUid({ uid: decoded.uid });
            const uid = decoded.uid;
            console.log(uid);
            if (isValid) {
                response = yield mentorlms.postThreadreply(reply, uid, partUid, threadId);
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
function getSingleRemark(remarkId, headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let response;
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            console.log(decoded);
            const uid = decoded.mentor_uid;
            const mentorValid = yield mysql_1.MentorAuth.getMentorUid(uid);
            if (mentorValid) {
                response = yield mentorlms.getSingleRemark(uid, remarkId);
            }
            const data = {
                response
            };
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleRemark`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getSingleRemark = getSingleRemark;
