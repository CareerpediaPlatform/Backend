"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError {
    constructor(message, errorCode, fieldName) {
        this.message = message;
        this.errorCode = errorCode;
        this.fieldName = fieldName;
    }
}
exports.APIError = APIError;
