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
exports.userActionsPermission = exports.isInvestor = exports.isFounder = exports.isAdmin = void 0;
const api_param_constants_1 = require("../constants/api_param_constants");
// import { USER_ACTIONS } from '../constants/api_action_constants'
const error_constants_1 = require("../constants/error_constants");
// import { USER_ROLES } from '../constants/master_data_constants'
const status_codes_1 = require("../constants/status_codes");
const response_builder_1 = require("../helpers/response_builder");
const logger_1 = __importDefault(require("../logger"));
const models_1 = require("../models");
const nodeUtil = __importStar(require("util"));
function isAdmin(req, res, next) {
    var _a;
    const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.FORBIDDEN, error_constants_1.ErrorMessages.FORBIDDEN, true);
    try {
        logger_1.default.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession));
        if (USER_ROLES['3'].name === ((_a = req === null || req === void 0 ? void 0 : req.userSession) === null || _a === void 0 ? void 0 : _a.role)) {
            next();
        }
        else {
            response.message = 'You are not authorized to perform this action.';
            response.statusCode = status_codes_1.HttpStatusCodes.FORBIDDEN;
            response.addError(new models_1.APIError('You are not authorized to perform this action.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'role'));
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in middlewares.permission.isAdmin()', error);
        response.addServerError('Failed to validate permission due to technical issues.');
        return (0, response_builder_1.responseBuilder)(response, res, next, req);
    }
}
exports.isAdmin = isAdmin;
function isFounder(req, res, next) {
    var _a;
    const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.FORBIDDEN, error_constants_1.ErrorMessages.FORBIDDEN, true);
    try {
        logger_1.default.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession));
        if (USER_ROLES['2'].name === ((_a = req === null || req === void 0 ? void 0 : req.userSession) === null || _a === void 0 ? void 0 : _a.role)) {
            next();
        }
        else {
            response.message = 'You are not authorized to perform this action.';
            response.statusCode = status_codes_1.HttpStatusCodes.FORBIDDEN;
            response.addError(new models_1.APIError('You are not authorized to perform this action.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'role'));
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in middlewares.permission.isFounder()', error);
        response.addServerError('Failed to validate permission due to technical issues.');
        return (0, response_builder_1.responseBuilder)(response, res, next, req);
    }
}
exports.isFounder = isFounder;
function isInvestor(req, res, next) {
    var _a;
    const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.FORBIDDEN, error_constants_1.ErrorMessages.FORBIDDEN, true);
    try {
        logger_1.default.debug('LOGGED IN USER: ' + nodeUtil.inspect(req.userSession));
        if (USER_ROLES['3'].name === ((_a = req === null || req === void 0 ? void 0 : req.userSession) === null || _a === void 0 ? void 0 : _a.role)) {
            next();
        }
        else {
            response.message = 'You are not authorized to perform this action.';
            response.statusCode = status_codes_1.HttpStatusCodes.FORBIDDEN;
            response.addError(new models_1.APIError('You are not authorized to perform this action.', error_constants_1.ErrorCodes.UNAUTHORIZED, 'role'));
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in middlewares.permission.isTechnician()', error);
        response.addServerError('Failed to validate permission due to technical issues.');
        return (0, response_builder_1.responseBuilder)(response, res, next, req);
    }
}
exports.isInvestor = isInvestor;
function userActionsPermission(req, res, next) {
    const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.FORBIDDEN, error_constants_1.ErrorMessages.FORBIDDEN, true);
    try {
        const actions = Object.keys(USER_ACTIONS);
        const action = req.params[api_param_constants_1.PathParams.ACTION];
        switch (action) {
            case actions[0]:
                isAdmin(req, res, next);
                break;
            case actions[1]:
                isFounder(req, res, next);
                break;
            case actions[2]:
                isInvestor(req, res, next);
                break;
            default:
                next();
                break;
        }
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in middlewares.permission.userActionsPermission()', error);
        response.addServerError('Failed to validate permission due to technical issues.');
        return (0, response_builder_1.responseBuilder)(response, res, next, req);
    }
}
exports.userActionsPermission = userActionsPermission;
