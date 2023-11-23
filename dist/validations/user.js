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
exports.personaldetails = exports.createUser = exports.userValidation = void 0;
const error_constants_1 = require("../constants/error_constants");
const Joi = __importStar(require("joi"));
const logger_1 = __importDefault(require("../logger"));
const common_1 = require("./common");
const TAG = 'validations.user';
function userValidation() {
    return Joi.object().keys({
        userName: Joi.string()
            .required()
            .min(3)
            .max(128)
            .messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'firstName'),
            'any.max': error_constants_1.ErrorMessages.INVALID_MAX_LENGTH.replace('$field', 'firstName')
                .replace('$length', '128'),
            'any.min': error_constants_1.ErrorMessages.INVALID_MIN_LENGTH.replace('$field', 'firstName')
                .replace('$length', '3')
        }),
        userEmail: Joi.string()
            .email()
            .required()
            .max(128)
            .messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'email ID'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'email ID')
                .replace('$length', '128'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'email ID')
        }),
        role: (0, common_1.idValidation)('roleId')
            .required()
            .messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'role')
        })
    });
}
exports.userValidation = userValidation;
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.createUser()`);
        try {
            const schema = userValidation();
            yield (0, common_1.validate)(schema, req, res, next);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.createUser()`, error);
            next(error);
        }
    });
}
exports.createUser = createUser;
const personaldetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        basicDetails: Joi.object({
            firstName: Joi.string().min(2).max(50).required(),
            lastName: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            dateOfBirth: Joi.date().iso().max('now').required(),
            gender: Joi.string().valid('male', 'female', 'other').required(),
            phoneNumber: Joi.string().pattern(/^[0-9]{8,15}$/).required(),
            profilePic: Joi.string().required(),
            linkedinProfile: Joi.string().uri().required(),
        }),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.personaldetails = personaldetails;
