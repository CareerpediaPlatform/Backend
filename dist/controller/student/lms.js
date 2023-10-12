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
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const lmsServices = __importStar(require("../../services/student/lms"));
const TAG = 'controller.lms.student';
function getCourseOverview(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourseOverview()`);
            logger_1.default.debug(`${TAG}.getCourseOverview() Object = ${JSON.stringify(req.body)}`);
            const courseId = req.params.courseId;
            const response = yield lmsServices.getCourseOverview(courseId);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview() `, error);
            next(error);
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourses()`);
            logger_1.default.debug(`${TAG}.getCourses()`);
            const courseType = req.query.type;
            const response = yield lmsServices.getCourses(courseType);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourses() `, error);
            next(error);
        }
    });
}
exports.getCourses = getCourses;
function getMyCourses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getMyCourses()`);
            logger_1.default.debug(`${TAG}.getMyCourses()`);
            const { array } = req.body;
            const response = yield lmsServices.getMyCourses([...array]);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMyCourses() `, error);
            next(error);
        }
    });
}
exports.getMyCourses = getMyCourses;
function getPartDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getPartDetail()`);
            logger_1.default.debug(`${TAG}.getPartDetail()`);
            const courseType = req.query.type;
            const response = yield lmsServices.getPartDetail();
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getPartDetail() `, error);
            next(error);
        }
    });
}
exports.getPartDetail = getPartDetail;
