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
exports.getAllThreadsPart = exports.getAllThreadsCourse = exports.postThreadreply = exports.getSingleThread = exports.uploadThread = exports.getAllNotes = exports.uploadNote = exports.getAllSAssignment = exports.uploadAssignment = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const util_1 = __importDefault(require("util"));
const assignmentService = __importStar(require("../../services/student/assignment"));
const TAG = 'controller.studentAttachment';
function uploadAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadAssignment()`);
            logger_1.default.debug(`${TAG}.uploadAssignment() Object = ${JSON.stringify(req.body)}`);
            logger_1.default.debug(`${TAG}.uploadAssignment() req file:` + util_1.default.inspect(req.file));
            const headerValue = req.headers.authorization.split(' ')[1];
            const partUid = req.params;
            const serviceResponse = yield assignmentService.uploadAssignment(req.files, headerValue, partUid);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCourse() `, error);
            next(error);
        }
    });
}
exports.uploadAssignment = uploadAssignment;
function getAllSAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllSAssignment()`);
            logger_1.default.debug(`${TAG}.getAllSAssignment() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const partUid = req.params;
            const authResponse = yield assignmentService.getAllAssignments(partUid, headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error);
            next(error);
        }
    });
}
exports.getAllSAssignment = getAllSAssignment;
function uploadNote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadNote()`);
            logger_1.default.debug(`${TAG}.uploadNote() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const note = req.body;
            const partUid = req.params;
            const serviceResponse = yield assignmentService.uploadNotes(partUid, headerValue, note);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCourse() `, error);
            next(error);
        }
    });
}
exports.uploadNote = uploadNote;
function getAllNotes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllNotes()`);
            logger_1.default.debug(`${TAG}.getAllNotes() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const partUid = req.params;
            console.log(partUid);
            const authResponse = yield assignmentService.getAllNotes(partUid, headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error);
            next(error);
        }
    });
}
exports.getAllNotes = getAllNotes;
function uploadThread(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadThread()`);
            logger_1.default.debug(`${TAG}.uploadThread() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const thread = req.body;
            const partUid = req.params;
            const serviceResponse = yield assignmentService.uploadThread(thread, headerValue, partUid);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadThread() `, error);
            next(error);
        }
    });
}
exports.uploadThread = uploadThread;
function getSingleThread(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getSingleThread()`);
            logger_1.default.debug(`${TAG}.getSingleThread() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const threadId = req.params;
            console.log(threadId);
            const partUid = req.params;
            console.log(partUid);
            const authResponse = yield assignmentService.getSingleThread(partUid, threadId, headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllSAssignment() `, error);
            next(error);
        }
    });
}
exports.getSingleThread = getSingleThread;
function postThreadreply(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.postThreadreply()`);
            logger_1.default.debug(`${TAG}.postThreadreply() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            console.log(headerValue);
            const reply = req.body;
            const partUid = req.params;
            const threadId = req.params;
            const serviceResponse = yield assignmentService.postThreadreply(reply, headerValue, partUid, threadId);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.postThreadreply() `, error);
            next(error);
        }
    });
}
exports.postThreadreply = postThreadreply;
function getAllThreadsCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsCourse()`);
            logger_1.default.debug(`${TAG}.getAllThreadsCourse() Object = ${JSON.stringify(req.body)}`);
            const { courseUid } = req.params;
            const serviceResponse = yield assignmentService.getAllThreadsCourse(courseUid);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsCourse() `, error);
            next(error);
        }
    });
}
exports.getAllThreadsCourse = getAllThreadsCourse;
function getAllThreadsPart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsPart()`);
            logger_1.default.debug(`${TAG}.getAllThreadsPart() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const partUid = req.params;
            console.log(partUid);
            const serviceResponse = yield assignmentService.getAllThreadsPart(partUid, headerValue);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsPart() `, error);
            next(error);
        }
    });
}
exports.getAllThreadsPart = getAllThreadsPart;
