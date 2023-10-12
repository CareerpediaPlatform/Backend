"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_constants_1 = require("../constants/error_constants");
const status_codes_1 = require("../constants/status_codes");
const response_builder_1 = require("../helpers/response_builder");
const logger_1 = __importDefault(require("../logger"));
const models_1 = require("../models");
function errorHandler(error, req, res, next) {
    logger_1.default.info('errorHandler()');
    try {
        logger_1.default.error('handling ERROR :', error);
        const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR, error_constants_1.ErrorMessages.INTERNAL_SERVER_ERROR, null);
        return (0, response_builder_1.responseBuilder)(response, res);
    }
    catch (e) {
        logger_1.default.error('Error in middlewares.errorHandler()', e);
    }
    res.status(status_codes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        errors: [new models_1.APIError(error_constants_1.ErrorMessages.INTERNAL_SERVER_ERROR, error_constants_1.ErrorCodes.SYSTEM_ERROR, null)]
    });
}
exports.errorHandler = errorHandler;
