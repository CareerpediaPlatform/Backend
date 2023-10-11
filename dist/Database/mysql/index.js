"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLms = exports.attachment = exports.StudentProfile = exports.mentorWorkExperienceData = exports.mentorEducationData = exports.mentorPersonalAndContactData = exports.RecruiterProfileDetailsData = exports.StudentAuth = exports.CollegeAuth = exports.RecruiterAuth = exports.MentorAuth = exports.AdminAuth = void 0;
const AdminAuth = __importStar(require("./lib/admin/admin_auth"));
exports.AdminAuth = AdminAuth;
const MentorAuth = __importStar(require("./lib/mentor/mentorAuth"));
exports.MentorAuth = MentorAuth;
const RecruiterAuth = __importStar(require("./lib/recruiter/recruiter_auth"));
exports.RecruiterAuth = RecruiterAuth;
const CollegeAuth = __importStar(require("./lib/college/college_auth"));
exports.CollegeAuth = CollegeAuth;
const StudentAuth = __importStar(require("./lib/student/auth"));
exports.StudentAuth = StudentAuth;
const RecruiterProfileDetailsData = __importStar(require("./lib/recruiter/recruiter_profiles"));
exports.RecruiterProfileDetailsData = RecruiterProfileDetailsData;
//MENTOR PROFILE
const mentorPersonalAndContactData = __importStar(require("./lib/mentor/mentorPersonal"));
exports.mentorPersonalAndContactData = mentorPersonalAndContactData;
const mentorEducationData = __importStar(require("./lib/mentor/mentorEducational"));
exports.mentorEducationData = mentorEducationData;
const mentorWorkExperienceData = __importStar(require("./lib/mentor/mentorWorkExperience"));
exports.mentorWorkExperienceData = mentorWorkExperienceData;
const StudentProfile = __importStar(require("./lib/student/profile"));
exports.StudentProfile = StudentProfile;
const attachment = __importStar(require("./lib/student/assignment"));
exports.attachment = attachment;
// import * as AdminProfile from './lib/admin/'
const adminLms = __importStar(require("./lib/admin/admin_lms"));
exports.adminLms = adminLms;
