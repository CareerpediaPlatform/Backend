"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListAPIRequest = void 0;
const app_defaults_1 = require("../../../constants/app_defaults");
class BaseListAPIRequest {
    constructor(searchText, offset, limit, queryId, sortBy, sortOrder) {
        this.searchText = searchText;
        this.offset = typeof offset !== 'undefined' ? +offset : app_defaults_1.Pagination.OFFSET;
        this.limit = typeof limit !== 'undefined' ? +limit : app_defaults_1.Pagination.LIMIT;
        this.queryId = queryId;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder !== null && sortOrder !== void 0 ? sortOrder : app_defaults_1.SORT_ORDER;
    }
}
exports.BaseListAPIRequest = BaseListAPIRequest;
