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
exports.getCollegeList = exports.getCollegeProfile = exports.collegeProfile = void 0;
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const collegeProfileLib = __importStar(require("../../Database/mysql/lib/college/college_profile"));
const authentication_1 = require("src/helpers/authentication");
const TAG = 'services.profile';
function collegeProfile(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeProfile() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const isValid = yield collegeProfileLib.isValid(decoded.uid);
            if (isValid) {
                const existedProfile = yield collegeProfileLib.checkExist(decoded.uid);
                if (existedProfile) {
                    const postResponse = yield collegeProfileLib.collegeProfileUpdate(Object.assign(Object.assign({}, user.basicDetails), { id: existedProfile.id }));
                    const contactDetails = yield collegeProfileLib.collegeContactUpdate(Object.assign(Object.assign({}, user.contactDetails), { id: existedProfile.id }));
                    const collegeDetsils = yield collegeProfileLib.collegeDetailUpdate(Object.assign(Object.assign({}, user.collegeDetails), { id: existedProfile.id }));
                    const data = {
                        postResponse,
                        contactDetails,
                        collegeDetsils
                    };
                    serviceResponse.data = data;
                    return serviceResponse;
                }
                const response = yield collegeProfileLib.collegeProfilePost(Object.assign(Object.assign({}, user), { uid: decoded.uid }));
                const data = Object.assign({}, response);
                serviceResponse.data = data;
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
            logger_1.default.error(`ERROR occurred in ${TAG}.college_profile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.collegeProfile = collegeProfile;
function getCollegeProfile(headerValue) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeProfile() ==> `, headerValue);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let decoded = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const isValid = yield collegeProfileLib.isValid(decoded.uid);
            if (isValid) {
                const existedProfile = yield collegeProfileLib.checkProfilExist(decoded.uid);
                if (existedProfile) {
                    const data = {
                        existedProfile
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
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getCollegeProfile = getCollegeProfile;
function getCollegeList(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getMentorList() ==> `, userID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedProfile = yield collegeProfileLib.isValid(userID);
            if (existedProfile) {
                const data = {
                    existedProfile
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCollegeList`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getCollegeList = getCollegeList;
