"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import 
// 
exports.default = (app) => {
    const corsOptions = {
        origin: '*', // Set the allowed origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
        optionsSuccessStatus: 204 // Set the status code for successful preflight requests
    };
    app.use(express_1.default.urlencoded({ extended: true }));
    //app.use(express.json())
    app.use(express_1.default.json({ strict: false }));
    app.use((0, cors_1.default)(corsOptions));
};
