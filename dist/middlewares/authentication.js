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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const app_defaults_1 = require("../constants/app_defaults");
const error_constants_1 = require("../constants/error_constants");
const status_codes_1 = require("../constants/status_codes");
const authentication_1 = require("../helpers/authentication");
const response_builder_1 = require("../helpers/response_builder");
const logger_1 = __importDefault(require("../logger"));
const models_1 = require("../models");
const nodeUtil = __importStar(require("util"));
const TAG = 'authentication';
function isAuthenticated(req, res, next) {
    var _a;
    if (app_defaults_1.AUTHENTICATION.enabled) {
        logger_1.default.info(`${TAG}.isAuthenticated()`);
        let token = null;
        if (req.headers.authorization != null && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.token) != null) {
            token = req.query.token;
        }
        try {
            if (token === null) {
                logger_1.default.debug('TOKEN is missing!');
                const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.UNAUTHORIZED, 'Token Required.', null, true, [new models_1.APIError('Token required.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'jwtToken')]);
                return (0, response_builder_1.responseBuilder)(response, res, next, req);
            }
            const decode = (0, authentication_1.verifyAccessToken)(token);
            req.userSession = new models_1.UserSession(decode.userId, decode.role, decode.userName);
            logger_1.default.debug('LOGGED IN USER:' + nodeUtil.inspect(req.userSession));
            next();
        }
        catch (error) {
            logger_1.default.error('ERROR occurred in isAuthenticated() ', error);
            let response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, error_constants_1.ErrorMessages.INTERNAL_SERVER_ERROR, true, [new models_1.APIError('Token required.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'jwtToken')]);
            if ((error === null || error === void 0 ? void 0 : error.message) === 'jwt expired') {
                response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.UNAUTHORIZED, error_constants_1.ErrorMessages.SESSION_EXPIRED, true, [new models_1.APIError('Token expired.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'jwtToken')]);
            }
            else if ((error === null || error === void 0 ? void 0 : error.message) === 'invalid signature') {
                response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.UNAUTHORIZED, error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'Token'), true, [new models_1.APIError('Invalid token.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'jwtToken')]);
            }
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
    }
    else {
        next();
    }
}
exports.isAuthenticated = isAuthenticated;
