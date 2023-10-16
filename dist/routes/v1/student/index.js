"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const profile_1 = __importDefault(require("./profile"));
const assignment_1 = __importDefault(require("./assignment"));
// import * as APIPaths from '../../../constants/api_path_constants'
const api_path_constants_1 = require("src/constants/api_path_constants");
const lms_1 = __importDefault(require("../student/lms"));
const router = (0, express_1.Router)();
router.use(`${api_path_constants_1.ROOT_AUTH}`, auth_1.default);
router.use('/', user_1.default);
router.use('/profile', profile_1.default);
router.use('/', assignment_1.default);
router.use('/course', lms_1.default);
exports.default = router;
