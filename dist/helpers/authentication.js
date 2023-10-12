"use strict";
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
exports.OTP = exports.verifyOTPJWT = exports.generateOTPToken = exports.verifyRefreshJWT = exports.generateRefreshToken = exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../Loaders/config");
const logger_1 = __importDefault(require("../logger"));
const service_response_1 = require("src/models/lib/service_response");
const status_codes_1 = require("src/constants/status_codes");
const otpGenerator = require('otp-generator');
function generateJWT(payload, expiresIn, secret) {
    return jsonwebtoken_1.default.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn
    });
}
function generateAccessToken(payload, expiresIn = config_1.JWT_ACCESS_TOKEN_EXPIRY_TIME) {
    try {
        return generateJWT(payload, expiresIn, config_1.JWT_ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        logger_1.default.error(`ERROR in login generateAccessToken() => ${error}`);
    }
}
exports.generateAccessToken = generateAccessToken;
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_TOKEN_SECRET);
}
exports.verifyAccessToken = verifyAccessToken;
function generateRefreshToken(payload, expiresIn = config_1.JWT_REFRESH_TOKEN_EXPIRY_TIME) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('JWT_REFRESH_TOKEN_EXPIRY_TIME ------ ', config_1.JWT_REFRESH_TOKEN_EXPIRY_TIME);
            console.log('expiresIn ------ ', config_1.JWT_REFRESH_TOKEN_EXPIRY_TIME);
            return generateJWT(payload, expiresIn, config_1.JWT_REFRESH_TOKEN_SECRET);
        }
        catch (error) {
            logger_1.default.error(`ERROR in login generateRefreshToken() => ${error}`);
        }
    });
}
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_REFRESH_TOKEN_SECRET);
});
exports.verifyRefreshJWT = verifyRefreshJWT;
function generateOTPToken(payload, expiresIn = config_1.OTP_EXPIRY_TIME) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('generateOTPToken ------ ', config_1.OTP_EXPIRY_TIME);
            console.log('generateOTPToken expiresIn ------ ', config_1.OTP_EXPIRY_TIME);
            return generateJWT(payload, expiresIn, config_1.JWT_ACCESS_TOKEN_SECRET);
        }
        catch (error) {
            logger_1.default.error(`ERROR in login generateRefreshToken() => ${error}`);
        }
    });
}
exports.generateOTPToken = generateOTPToken;
const verifyOTPJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_TOKEN_SECRET);
        if (decoded) {
            return Object.assign({}, decoded);
        }
    }
    catch (error) {
        return null;
    }
    return false;
});
exports.verifyOTPJWT = verifyOTPJWT;
const OTP = () => __awaiter(void 0, void 0, void 0, function* () {
    return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
});
exports.OTP = OTP;
