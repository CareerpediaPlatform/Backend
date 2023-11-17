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
exports.getMentorSingleList = exports.getrecruiterProfile = exports.PersonalAndDetails = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const profileService = __importStar(require("../../services/mentor/mentorPersonal"));
const TAG = 'services.profile_personal';
function PersonalAndDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.PersonalAndDetails()`);
            logger_1.default.debug(`${TAG}.PersonalAndDetails() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            // const {mentorUid}= req.params
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield profileService.savePersonalAndContactDetails({ user, headerValue });
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.PersonalAndDetails() `, error);
            next(error);
        }
    });
}
exports.PersonalAndDetails = PersonalAndDetails;
function getrecruiterProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getrecruiterProfile()`);
            logger_1.default.debug(`${TAG}.getrecruiterProfile() Object = ${JSON.stringify(req.body)}`);
            let userID = req.params.userId;
            const authResponse = yield profileService.getMentorProfile(userID);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getrecruiterProfile() `, error);
            next(error);
        }
    });
}
exports.getrecruiterProfile = getrecruiterProfile;
function getMentorSingleList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getMentorSingleList()`);
            logger_1.default.debug(`${TAG}.getMentorSingleList() Object = ${JSON.stringify(req.body)}`);
            let userID = req.params.userId;
            const authResponse = yield profileService.getMentorList(userID);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMentorSingleList() `, error);
            next(error);
        }
    });
}
exports.getMentorSingleList = getMentorSingleList;
