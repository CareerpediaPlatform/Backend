"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRecord = void 0;
class BaseRecord {
    constructor(id, name, description, additionalProp1, code) {
        this.id = id === null || id === void 0 ? void 0 : id.toString();
        this.name = name;
        this.description = description;
        this.additionalProp1 = additionalProp1;
        this.code = code;
    }
}
exports.BaseRecord = BaseRecord;
