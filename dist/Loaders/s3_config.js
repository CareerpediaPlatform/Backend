"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3ConnectionLoader = void 0;
const logger_1 = __importDefault(require("../logger"));
const config_1 = require("./config");
const client_s3_1 = require("@aws-sdk/client-s3");
let s3Connection;
function s3ConnectionLoader() {
    logger_1.default.info('loadingS3Connection()');
    try {
        if (s3Connection) {
            return s3Connection;
        }
        s3Connection = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: config_1.AWS_S3.ACCESS_KEY_ID,
                secretAccessKey: config_1.AWS_S3.SECRET_ACCESS_KEY,
            },
            // acl: AWS_S3.ACL,
            region: config_1.AWS_S3.REGION
        });
        return s3Connection;
    }
    catch (error) {
        logger_1.default.error('Error while initialising s3');
        throw error;
    }
}
exports.s3ConnectionLoader = s3ConnectionLoader;
