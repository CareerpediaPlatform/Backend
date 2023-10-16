"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
const error_constants_1 = require("../../constants/error_constants");
const status_codes_1 = require("../../constants/status_codes");
const api_error_1 = require("./api_error");
const strings_1 = require("../../utils/strings");
class ServiceResponse {
    constructor(statusCode, message, showMessage, data, errors) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.showMessage = showMessage;
        this.errors = errors;
    }
    addError(apiError) {
        if ((0, strings_1.isNull)(this.errors)) {
            this.errors = [];
        }
        this.errors.push(apiError);
    }
    addServerError(errorMessage, responseMessage) {
        this.statusCode = status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR;
        this.message = responseMessage !== null && responseMessage !== void 0 ? responseMessage : errorMessage;
        this.addError(new api_error_1.APIError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : 'Failed to process the request due to technical difficulties', error_constants_1.ErrorCodes.SYSTEM_ERROR));
    }
}
exports.ServiceResponse = ServiceResponse;
