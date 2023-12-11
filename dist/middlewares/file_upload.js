"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileReader = exports.fileReader = exports.uploadProfileImage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const logger_1 = __importDefault(require("../logger"));
const util_1 = __importDefault(require("util"));
const ERROR_FILE_FILTER = 'ERROR_FILE_FILTER';
const TAG = 'middlewares.file_upload';
exports.upload = (0, multer_1.default)({
    limits: {
        fileSize: 100 * 1024 * 1024, //100mb
        fieldNameSize: 200 // bytes
    }
});
exports.uploadProfileImage = (0, multer_1.default)({
    limits: {
        fileSize: 1 * 1024 * 1024, //1mb
        fieldNameSize: 200 // bytes
    },
    fileFilter: (req, file, cb) => {
        console.log('fileFilter.. file:' + util_1.default.inspect(file));
        if (file != null && (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'
            || file.mimetype == 'image/webp')) {
            cb(null, true);
        }
        else {
            cb(null, false);
            const err = new Error('Only .png, .jpg, .jpeg and .webp format allowed!');
            if (file == null) {
                err.message = 'File is INVALID';
            }
            err.name = ERROR_FILE_FILTER;
            return cb(err);
        }
    }
});
const fileReader = function (fieldName) {
    return function (req, res, next) {
        exports.upload.single(fieldName)(req, res, function (err) {
            if (!err) {
                // Everything went fine.
                next();
            }
            else if (err instanceof multer_1.default.MulterError) {
                // A Multer error occurred when uploading.
                logger_1.default.info(`${TAG}.fileReader(): Multer error.`, err);
                res.status(400).send({ error: err.message });
            }
            else {
                if (err.name === ERROR_FILE_FILTER) {
                    res.status(400).send({ error: err.message });
                }
                else {
                    // An unknown error occurred when uploading.
                    logger_1.default.error(`${TAG}.fileReader(): Unknown error.`, err);
                    res.status(500).send({ error: 'Technical Issues' });
                }
            }
        });
    };
};
exports.fileReader = fileReader;
const imageFileReader = function (fieldName) {
    // logger.debug(`${TAG}.imageFileReader(): start: ` + fieldName)
    return function (req, res, next) {
        exports.uploadProfileImage.single(fieldName)(req, res, function (err) {
            if (!err) {
                next();
            }
            else if (err instanceof multer_1.default.MulterError) {
                // A Multer error occurred when uploading.
                logger_1.default.info(`${TAG}.imageFileReader(): Multer error.`, err);
                res.status(400).send({ error: err.message });
            }
            else {
                // An unknown error occurred when uploading.
                logger_1.default.error(`${TAG}.imageFileReader(): Unknown error.`, err);
                res.status(500).send({ error: 'Technical Issues' });
            }
        });
    };
};
exports.imageFileReader = imageFileReader;
