"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInfo = void 0;
class AuditInfo {
    constructor(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime) {
        this.createdBy = createdBy;
        this.creationTime = creationTime;
        this.lastUpdatedBy = lastUpdatedBy;
        this.lastUpdatedTime = lastUpdatedTime;
    }
}
exports.AuditInfo = AuditInfo;
