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
exports.getPartDetail = exports.getMyCourses = exports.getCourses = exports.getCourseOverview = void 0;
const status_codes_1 = require("../../constants/status_codes");
const logger_1 = __importDefault(require("../../logger"));
const service_response_1 = require("../../models/lib/service_response");
const lmsLib = __importStar(require("../../Database/mysql/lib/student/lms"));
const TAG = 'services.lms.student';
function getCourseOverview(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield lmsLib.getCourseOverview(courseId);
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(coursetype) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield lmsLib.getCourses(coursetype);
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getCourses = getCourses;
function getMyCourses(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield lmsLib.getMyCourses([...list]);
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMyCourses`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getMyCourses = getMyCourses;
function getPartDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield lmsLib.getPartDetail();
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getPartDetail`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getPartDetail = getPartDetail;
