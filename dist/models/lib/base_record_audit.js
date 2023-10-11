"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRecordAudit = void 0;
const base_record_1 = require("./base_record");
class BaseRecordAudit extends base_record_1.BaseRecord {
    constructor(id, name, auditInfo) {
        super(id, name);
        this.auditInfo = auditInfo;
    }
}
exports.BaseRecordAudit = BaseRecordAudit;
