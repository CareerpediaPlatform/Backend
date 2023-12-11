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
exports.babu = exports.recruiter = exports.updatePayloadSchema = exports.collegeLimiter = exports.adminLimiter = exports.recruiterLimiter = exports.mentorLimiter = exports.studentLimiter = exports.createRateLimiter = exports.changePassword = exports.mentorSignup = exports.SignIn = exports.adminSignIn = exports.formSignup = exports.linkedInSignup = exports.linkedInLogin = exports.numberLogin = exports.passwordValidation = exports.emailLogin = void 0;
const Joi = __importStar(require("joi"));
const common_1 = require("./common");
const error_constants_1 = require("../constants/error_constants");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
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
        newPassword: Joi.string().required().min(8).max(15).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        }),
        oldPassword: Joi.string().required()
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
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        newPassword: Joi.string().min(8).required().messages({
            'string.empty': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'newPassword'),
            'string.min': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'newPassword')
        }),
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.changePassword = changePassword;
// .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+|\-=\\{}\[\]:";'<>?,./]).{8,25}$/)
// Throttling login attempts
const createRateLimiter = (windowMs, max, message) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max,
        message: {
            status: 429,
            message,
        },
    });
};
exports.createRateLimiter = createRateLimiter;
exports.studentLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 5, 'Too many student login attempts, please try again later.');
exports.mentorLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 5, 'Too many mentor login attempts, please try again later.');
exports.recruiterLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 5, 'Too many recruiter login attempts, please try again later.');
exports.adminLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 5, 'Too many admin login attempts, please try again later.');
exports.collegeLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 5, 'Too many college-admin login attempts, please try again later.');
// Define validation schema for the Profile
const profileSchema = Joi.object({
    logo: Joi.string().required(),
    companyName: Joi.string().required(),
    founderName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    website: Joi.string().required(),
    linkedinProfile: Joi.string().required(),
});
// Define validation schema for the Contact
const contactSchema = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    country: Joi.string().required(),
});
// Define validation schema for the Company
const companySchema = Joi.object({
    establishedYear: Joi.string().required(),
    numberOfEmployees: Joi.string().required(),
    departments: Joi.string().required(),
    startYear: Joi.string().required(),
    annualRevenue: Joi.string().required(),
});
// Define validation schema for the entire payload
exports.updatePayloadSchema = Joi.object({
    Profile: profileSchema.required(),
    Contact: contactSchema.required(),
    Company: companySchema.required(),
});
const recruiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        logo: Joi.string().required(),
        companyName: Joi.string().required()
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.recruiter = recruiter;
const babu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        newPassword: Joi.string().required().min(8).max(15).messages({
            'any.required': error_constants_1.ErrorMessages.IS_REQUIRED.replace('$field', 'password'),
            'any.max': error_constants_1.ErrorMessages.INVALID_LENGTH.replace('$field', 'password')
                .replace('$length', '8'),
            'string.pattern': error_constants_1.ErrorMessages.INVALID_FIELD.replace('$field', 'password')
        }),
        oldPassword: Joi.string()
            .min(8)
            .required()
    });
    yield (0, common_1.validate)(schema, req, res, next);
});
exports.babu = babu;
