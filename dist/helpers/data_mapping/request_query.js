"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestQueryDataMapping = void 0;
const logger_1 = __importDefault(require("../../logger"));
const models_1 = require("../../models");
function requestQueryDataMapping(query) {
    logger_1.default.info('helpers.data_mapping.request_query.requestQueryDataMapping()');
    try {
        return new models_1.BaseListAPIRequest(query === null || query === void 0 ? void 0 : query.searchText, query === null || query === void 0 ? void 0 : query.offset, query === null || query === void 0 ? void 0 : query.limit, query === null || query === void 0 ? void 0 : query.queryId, query === null || query === void 0 ? void 0 : query.sortBy, query === null || query === void 0 ? void 0 : query.sortOrder);
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.request_query.requestQueryDataMapping()');
    }
}
exports.requestQueryDataMapping = requestQueryDataMapping;
