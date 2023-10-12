"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My REST API',
            version: '1.0.0',
        },
    },
    apis: ['../routes/index.ts'], // Replace with the path to your API code
};
const specs = (0, swagger_jsdoc_1.default)(options);
module.exports = specs;
