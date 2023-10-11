"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBuilder = exports.cleanResponseData = void 0;
const lodash_1 = require("lodash");
const logger_1 = __importDefault(require("../logger"));
function cleanResponseData(responseData) {
    try {
        function nestedDataClean(nestedObject) {
            return (0, lodash_1.transform)(nestedObject, (result, value, key) => {
                const isCollection = (0, lodash_1.isObject)(value);
                const cleaned = isCollection ? nestedDataClean(value) : value;
                if (isCollection && (0, lodash_1.isEmpty)(cleaned)) {
                    return;
                }
                else if (typeof value === 'undefined' || value === null) {
                    return;
                }
                if ((0, lodash_1.isArray)(result)) {
                    result.push(cleaned);
                }
                else {
                    (result[key] = cleaned);
                }
            });
        }
        return (0, lodash_1.isObject)(responseData) ? nestedDataClean(responseData) : responseData;
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.dto.');
        throw error;
    }
}
exports.cleanResponseData = cleanResponseData;
function responseBuilder(serviceResponse, res, next, req) {
    var _a, _b, _c;
    logger_1.default.info('helper.response_builder.responseBuilder()');
    try {
        res.set('message', serviceResponse.message);
        if (req.method === 'GET') {
            res.set('showMessage', String((_a = serviceResponse === null || serviceResponse === void 0 ? void 0 : serviceResponse.showMessage) !== null && _a !== void 0 ? _a : false));
        }
        else {
            res.set('showMessage', String(serviceResponse.showMessage));
        }
        if (serviceResponse.errors && serviceResponse.errors.length !== 0) {
            res.status((_b = serviceResponse.statusCode) !== null && _b !== void 0 ? _b : 400).send({ errors: serviceResponse.errors });
        }
        else {
            res.status((_c = serviceResponse.statusCode) !== null && _c !== void 0 ? _c : (req.method === 'POST' ? 201 : 200)).send(serviceResponse);
        }
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helper.response_builder.responseBuilder()', error);
        next(error);
    }
}
exports.responseBuilder = responseBuilder;
