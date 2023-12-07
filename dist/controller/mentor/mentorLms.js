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
exports.getSingleRemark = exports.postThreadreply = exports.giveRemark = exports.getAllSAssignments = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const lmsService = __importStar(require("../../services/mentor/mentorLms"));
const TAG = 'services.mentorLms';
function getAllSAssignments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllSAssignments()`);
            logger_1.default.debug(`${TAG}.getAllSAssignments() Object = ${JSON.stringify(req.body)}`);
            // const headerValue =req.headers.authorization.split(' ')[1]
            const partId = req.params;
            const Response = yield lmsService.getAllAssignments(partId);
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error);
            next(error);
        }
    });
}
exports.getAllSAssignments = getAllSAssignments;
function giveRemark(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.giveRemark()`);
            logger_1.default.debug(`${TAG}.giveRemark() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const assignmentId = req.params;
            const remark = req.body;
            const Response = yield lmsService.giveRemark(remark, assignmentId, headerValue);
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.giveRemark() `, error);
            next(error);
        }
    });
}
exports.giveRemark = giveRemark;
function postThreadreply(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.postThreadreply()`);
            logger_1.default.debug(`${TAG}.postThreadreply() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const reply = req.body;
            const partUid = req.params;
            const threadId = req.params;
            const serviceResponse = yield lmsService.postThreadreply(headerValue, reply, partUid, threadId);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postThreadreply() `, error);
            next(error);
        }
    });
}
exports.postThreadreply = postThreadreply;
function getSingleRemark(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getSingleRemark()`);
            logger_1.default.debug(`${TAG}.getSingleRemark() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const remarkId = req.params;
            const Response = yield lmsService.getSingleRemark(remarkId, headerValue);
            (0, response_builder_1.responseBuilder)(Response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleRemark() `, error);
            next(error);
        }
    });
}
exports.getSingleRemark = getSingleRemark;
