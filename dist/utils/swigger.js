"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecification = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CAREERPEDIA API',
            version: '1.0.0',
        },
    },
    apis: ['../routes/v1/admin/adminAuth'], // Replace with the path to your API code
};
// Generate the Swagger specification
const swaggerSpecification = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpecification = swaggerSpecification;
