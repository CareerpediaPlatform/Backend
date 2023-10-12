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
exports.validate = exports.idValidation = exports.baseQueryListValidation = exports.uniqueIdentifiedValidation = exports.searchTextValidation = exports.numericValidation = exports.isoDate = void 0;
const date_1 = __importDefault(require("@joi/date"));
const app_defaults_1 = require("../constants/app_defaults");
const error_constants_1 = require("../constants/error_constants");
const status_codes_1 = require("../constants/status_codes");
const JoiBase = __importStar(require("joi"));
const logger_1 = __importDefault(require("../logger"));
const models_1 = require("../models");
const Joi = JoiBase.extend(date_1.default);
function isoDate() {
    return Joi.date().format('YYYY-MM-DD');
}
exports.isoDate = isoDate;
function numericValidation() {
    return Joi.string().pattern(/^[0-9]+$/);
}
exports.numericValidation = numericValidation;
function searchTextValidation() {
    return Joi.string().min(app_defaults_1.MIN_SEARCH_TEXT_LENGTH)
        .messages({
        'any.min': `Minimum ${app_defaults_1.MIN_SEARCH_TEXT_LENGTH} characters are required to search.`
    });
}
exports.searchTextValidation = searchTextValidation;
function uniqueIdentifiedValidation() {
    return Joi.any();
}
exports.uniqueIdentifiedValidation = uniqueIdentifiedValidation;
function baseQueryListValidation() {
    return Joi.object().keys({
        searchText: searchTextValidation(),
        queryId: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number(),
        sortBy: Joi.string(),
        sortOrder: Joi.string().valid('asc', 'desc')
    });
}
exports.baseQueryListValidation = baseQueryListValidation;
function idValidation(field) {
    return Joi.object().keys({
        id: uniqueIdentifiedValidation()
            .required()
            .messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', field !== null && field !== void 0 ? field : 'id'),
            'string.pattern.base': error_constants_1.ErrorMessages.INVALID_NUMBER_STRING.replace('$field', field !== null && field !== void 0 ? field : 'id')
        })
    });
}
exports.idValidation = idValidation;
const buildUsefulErrorObject = (errors) => {
    const usefulErrors = [];
    for (const error of errors.error.details) {
        if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
            usefulErrors.push(new models_1.APIError(error.message, error.type, error.path.join('_')));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            logger_1.default.debug('missed error:' + error);
        }
    }
    return new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.BAD_REQUEST, 'Please fill all Mandatory fields with valid values!.', null, true, usefulErrors);
};
function validate(schema, req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info('START of common.validator.validate()');
            schema = schema.append({
                token: Joi.string().allow('')
            });
            let body = Object.assign({}, req.params, req.query);
            if (req.method === 'POST' || req.method === 'PUT') {
                body = Object.assign(body, req.body);
            }
            const result = yield schema.validate(body, { abortEarly: false });
            if (result.error != null) {
                logger_1.default.debug(JSON.stringify(result));
                const errorResponse = buildUsefulErrorObject(result);
                res.status((_a = errorResponse.statusCode) !== null && _a !== void 0 ? _a : status_codes_1.HttpStatusCodes.BAD_REQUEST).send({ errors: errorResponse.errors });
            }
            else {
                next();
            }
        }
        catch (error) {
            logger_1.default.error('ERROR occurred in validation.common.validate()');
            next(error);
        }
    });
}
exports.validate = validate;
