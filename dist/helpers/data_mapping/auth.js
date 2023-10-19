"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collegeDataMapping = exports.recruiterDataMapping = exports.mentorDataMapping = exports.AdminDataMapping = void 0;
const logger_1 = __importDefault(require("../../logger"));
const models_1 = require("../../models");
//Admin datamapping
function AdminDataMapping(payload) {
    logger_1.default.info('helpers.data_mapping.admin.adminDataMapping()');
    try {
        if (payload != null && payload !== undefined) {
            return new models_1.Admin(payload.email, payload.password);
        }
        return payload;
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.data_mapping.admin.adminDataMapping()');
        throw error;
    }
}
exports.AdminDataMapping = AdminDataMapping;
//mentor datamapping
function mentorDataMapping(payload) {
    logger_1.default.info('helpers.data_mapping.mentor.mentorDataMapping()');
    try {
        if (payload != null && payload !== undefined) {
            return new models_1.Mentor(payload.email, payload.password, payload.type, payload.course, payload.status);
        }
        return payload;
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.data_mapping.mentor.mentorDataMapping()');
        throw error;
    }
}
exports.mentorDataMapping = mentorDataMapping;
//recruiter data mapping
function recruiterDataMapping(payload) {
    logger_1.default.info('helpers.data_mapping.recruiter.recruiterDataMapping()');
    try {
        if (payload != null && payload !== undefined) {
            return new models_1.Recruiter(payload.email, payload.password);
        }
        return payload;
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.data_mapping.recruiter.recruiterDataMapping()');
        throw error;
    }
}
exports.recruiterDataMapping = recruiterDataMapping;
//college data mapping
function collegeDataMapping(payload) {
    logger_1.default.info('helpers.data_mapping.college.collegeDataMapping()');
    try {
        if (payload != null && payload !== undefined) {
            return new models_1.College(payload.email, payload.password);
        }
        return payload;
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in helpers.data_mapping.college.collegeDataMapping()');
        throw error;
    }
}
exports.collegeDataMapping = collegeDataMapping;
