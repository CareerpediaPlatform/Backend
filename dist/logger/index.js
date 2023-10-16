"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../Loaders/config");
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const objectifyError = (0, winston_1.format)((info, error) => {
    if (error instanceof Error) {
        info = Object.assign({
            message: info.message,
            stack: error.stack
        }, info);
    }
    return info;
});
const printf = (info) => {
    var _a;
    return `${info.timestamp} ${info.label}[${info.level}]: ${info.message} ${(_a = info.stack) !== null && _a !== void 0 ? _a : ''}`;
};
function logger() {
    return (0, winston_1.createLogger)({
        exitOnError: false,
        level: config_1.LOG_LEVEL,
        format: winston_1.format.combine(objectifyError(), winston_1.format.label({
            label: path_1.default.basename((process.mainModule != null) ? process.mainModule.filename : '')
        }), winston_1.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }), winston_1.format.printf(printf)),
        silent: process.env.NODE_ENV === 'test',
        transports: [
            new winston_1.transports.Console({
                format: winston_1.format.combine(objectifyError(), winston_1.format.colorize(), winston_1.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }), winston_1.format.printf(printf))
            }),
            new winston_daily_rotate_file_1.default({
                filename: path_1.default.resolve('./logs', 'careerpedia-platform-api-%DATE%.log'),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '50m',
                maxFiles: '15d'
            })
        ]
    });
}
exports.default = logger();
