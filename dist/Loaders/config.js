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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnv = exports.AWS_S3 = exports.sqlConfig = exports.MYSQL_DATABASE = exports.AWS_SECRET_KEY = exports.AWS_ACCESS_KEY = exports.AWS_BUCKET_REGION = exports.AWS_BUCKET = exports.SENDER_EMAIL_ID = exports.SWAGGER_DOC_PATH = exports.OTP_EXPIRY_TIME = exports.JWT_REFRESH_TOKEN_EXPIRY_TIME = exports.JWT_ACCESS_TOKEN_EXPIRY_TIME = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_SECRET = exports.LOG_LEVEL = exports.API_CALL_LOG_FORMAT = exports.PORT = exports.AES_ENC_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const strings_1 = require("../utils/strings");
const app_error_1 = __importDefault(require("../models/lib/app_error"));
const logger_1 = __importDefault(require("../logger"));
const path_1 = require("path");
dotenv_1.default.config();
exports.AES_ENC_KEY = (_a = process.env.ASE_ENC_KEY) !== null && _a !== void 0 ? _a : 'bf3c199c2470we477d907b1e0917c17c';
exports.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3307;
exports.API_CALL_LOG_FORMAT = (_c = process.env.API_CALL_LOG_FORMAT) !== null && _c !== void 0 ? _c : ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
exports.LOG_LEVEL = (_e = (_d = process.env) === null || _d === void 0 ? void 0 : _d.LOG_LEVEL) !== null && _e !== void 0 ? _e : 'debug';
//JWT TOKEN
exports.JWT_ACCESS_TOKEN_SECRET = (_f = process.env.JWT_ACCESS_TOKEN_SECRET) !== null && _f !== void 0 ? _f : 'careerpediaaccesstkn';
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'careerpediareftkn';
exports.JWT_ACCESS_TOKEN_EXPIRY_TIME = 2 * 60 * 60;
exports.JWT_REFRESH_TOKEN_EXPIRY_TIME = 30 * 24 * 60 * 60;
exports.OTP_EXPIRY_TIME = 600;
exports.SWAGGER_DOC_PATH = (_g = process.env.SWAGGER_DOC_PATH) !== null && _g !== void 0 ? _g : (0, path_1.resolve)('./careerpedia-doc.yml');
//nodemailer
exports.SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID || '';
//AWS Config
exports.AWS_BUCKET = process.env.AWS_BUCKET;
exports.AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
/*MySQL DB config*/
exports.MYSQL_DATABASE = {
    address: process.env.SQL_DATABASE_ADDRESS || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.SQL_DATABASE_USERNAME,
    password: process.env.SQL_DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME || '',
    pool_size: process.env.DATABASE_POOL_SIZE || '30',
};
exports.sqlConfig = {
    user: exports.MYSQL_DATABASE.username,
    password: exports.MYSQL_DATABASE.password,
    database: exports.MYSQL_DATABASE.db_name,
    server: exports.MYSQL_DATABASE.address,
    port: (0, strings_1.getNumber)(exports.MYSQL_DATABASE.port),
    pool: {
        max: (0, strings_1.getNumber)(exports.MYSQL_DATABASE.pool_size),
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
// for image
exports.AWS_S3 = {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_KEY,
    BUCKET_NAME: process.env.AWS_BUCKET,
    ACL: process.env.S3_ACL || 'public-read',
    REGION: process.env.AWS_BUCKET_REGION,
    SECURE_BUCKET_NAME: process.env.S3_SECURE_BUCKET_NAME
};
// checking required information in .env file
const checkEnv = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("env validation started");
    const requiredInfo = ['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD'];
    requiredInfo.forEach((field) => {
        if ((0, strings_1.isNull)(process.env[field])) {
            throw new app_error_1.default(`Required configuration '${field}' is missing`);
        }
    });
});
exports.checkEnv = checkEnv;
// export async function checkEnv (): Promise<void> {
//   logger.info('STARTED Validation of env variables!')
//   const mandatoryFields = ['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD']
//   mandatoryFields.forEach((field) => {
//     if (isNull(process.env[field])) {
//       throw new AppError(`Required configuration '${field}' is missing`)
//     }
//   })
// }
