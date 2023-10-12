"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = exports.getNumber = void 0;
const logger_1 = __importDefault(require("../logger"));
function getNumber(input) {
    try {
        if (typeof input !== 'number') {
            input = parseInt(input, 10);
        }
    }
    catch (e) {
        logger_1.default.debug('ERROR in getNumber');
        throw e;
    }
    return input;
}
exports.getNumber = getNumber;
function isNull(obj) {
    return obj == null || obj === undefined;
}
exports.isNull = isNull;
