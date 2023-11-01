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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorSignup = exports.SignIn = exports.adminSignIn = exports.formSignup = exports.linkedInSignup = exports.linkedInLogin = exports.numberLogin = exports.passwordValidation = exports.emailLogin = void 0;
const Joi = __importStar(require("joi"));
const common_1 = require("./common");
const error_constants_1 = require("src/constants/error_constants");
const TAG = 'validations.auth';
const emailLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(15).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        })
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.emailLogin = emailLogin;
const passwordValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        newPassword: Joi.string().min(8).max(15).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        })
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.passwordValidation = passwordValidation;
const numberLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        phoneNumber: Joi.string().min(10).max(10).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'phoneNumber'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'phoneNumber')
                .replace('$length', '10'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'phoneNumber')
        }),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.numberLogin = numberLogin;
const linkedInLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        uuid: Joi.string().required(),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.linkedInLogin = linkedInLogin;
const linkedInSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        uuid: Joi.string().required(),
        role: Joi.string().required(),
        terms_and_condition: Joi.boolean().required()
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.linkedInSignup = linkedInSignup;
const formSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(15).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        }),
        terms_and_condition: Joi.boolean().required()
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.formSignup = formSignup;
const adminSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(25).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        }),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.adminSignIn = adminSignIn;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(25).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        }),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.SignIn = SignIn;
const mentorSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        type: Joi.string().required(),
        course: Joi.string().required()
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.mentorSignup = mentorSignup;
