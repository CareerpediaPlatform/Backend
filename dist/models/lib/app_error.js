"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, additionalInfo) {
        super(message);
        this.additionalInfo = additionalInfo;
    }
}
exports.default = AppError;
