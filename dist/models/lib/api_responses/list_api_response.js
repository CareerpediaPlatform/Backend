"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAPIResponse = void 0;
class ListAPIResponse {
    constructor(resultsList, hasMoreResults, fromIndex, toIndex, totalResultsCount, queryId, sortBy, sortOrder, url) {
        this.list = resultsList;
        this.hasMoreResults = hasMoreResults;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.totalResultsCount = totalResultsCount;
        this.queryId = queryId;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.url = url;
    }
}
exports.ListAPIResponse = ListAPIResponse;
