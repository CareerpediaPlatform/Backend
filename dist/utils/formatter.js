"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = void 0;
const logger_1 = __importDefault(require("../logger"));
const { forEach, camelCase, isPlainObject, isArray, } = require('lodash');
function formCamelCaseForArray(data) {
    return data.map(toCamelCase);
}
function toCamelCase(object) {
    const camelCaseObject = {};
    try {
        if (Array.isArray(object)) {
            return formCamelCaseForArray(object);
        }
        else if (!isNaN(object)) {
            return object;
        }
        forEach(object, (value, key, i) => {
            if (isPlainObject(value)) {
                value = toCamelCase(value);
            }
            else if (isArray(value)) {
                value = formCamelCaseForArray(value);
            }
            camelCaseObject[camelCase(key)] = value;
        });
        console.log("camelCaseObject");
        console.log(camelCaseObject);
        return camelCaseObject;
    }
    catch (err) {
        logger_1.default.error('ERROR in toCamelCase()', err);
        return object;
    }
}
exports.toCamelCase = toCamelCase;
