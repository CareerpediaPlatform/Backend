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
exports.changePasswordController = exports.loginRecruiter = exports.signupRecruiter = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const authService = __importStar(require("../../services/recruiter/recruiter_auth"));
const auth_1 = require("../../helpers/data_mapping/auth");
const TAG = 'services.auth';
function signupRecruiter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signupRecruiter()`);
            logger_1.default.debug(`${TAG}.signupRecruiter() Object = ${JSON.stringify(req.body)}`);
            const user = (0, auth_1.recruiterDataMapping)(req.body);
            const authResponse = yield authService.signupUser(user);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupRecruiter() `, error);
            next(error);
        }
    });
}
exports.signupRecruiter = signupRecruiter;
function loginRecruiter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.loginRecruiter()`);
            logger_1.default.debug(`${TAG}.loginRecruiter() Object = ${JSON.stringify(req.body)}`);
            const user = (0, auth_1.recruiterDataMapping)(req.body);
            const authResponse = yield authService.loginUser(user);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.loginRecruiter()`, error);
            next(error);
        }
    });
}
exports.loginRecruiter = loginRecruiter;
function changePasswordController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.changePasswordController()`);
            logger_1.default.debug(`${TAG}.changePasswordController() Object = ${JSON.stringify(req.body)}`);
            const passwords = req.body;
            console.log(passwords);
            const headerValue = req.headers.authorization.split(' ')[1];
            const response = yield authService.changePassword(Object.assign(Object.assign({}, passwords), { headerValue }));
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePasswordController()`, error);
            next(error);
        }
    });
}
exports.changePasswordController = changePasswordController;
