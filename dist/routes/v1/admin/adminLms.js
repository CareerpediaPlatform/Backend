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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const controller = __importStar(require("../../../controller/admin/adminLms"));
const authentication_1 = require("src/middlewares/authentication");
const video_upload_1 = require("src/middlewares/video_upload");
const api_param_constants_1 = require("src/constants/api_param_constants");
const file_1 = require("src/validations/file");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router.route('/course-list')
    .get(authentication_1.isAuthenticated, controller.getCourses);
// courses//
router.route('/course/:coursetype')
    .post(authentication_1.isAuthenticated, controller.coursePost);
router.route('/part/:course_id')
    .post(authentication_1.isAuthenticated, controller.coursePartPost);
router.route('/module/:part_id')
    .post(authentication_1.isAuthenticated, controller.courseModulesPost);
router.route('/lesson/:module_id')
    .post(authentication_1.isAuthenticated, controller.courseLessonPost);
router.route('/test/:module_id')
    .post(authentication_1.isAuthenticated, controller.coursetestPost);
router.route('/exercise/:module_id')
    .post(authentication_1.isAuthenticated, controller.courseExercisePost);
router.route('/part/:course_id/:part_id')
    .get(authentication_1.isAuthenticated, controller.getCourseParts);
router.route('/module/:part_id/:module_id')
    .get(authentication_1.isAuthenticated, controller.getCourseModule);
router.route('/lesson/:module_id/:lesson_id')
    .get(authentication_1.isAuthenticated, controller.getModulesLesson);
router.route('/lesson/:module_id/:lesson_id')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesLesson);
router.route('/test/:module_id/:test_id')
    .get(authentication_1.isAuthenticated, controller.getModulesTest);
router.route('/test/:module_id/:test_id')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesTest);
router.route('/exercise/:module_id/:exercise_id')
    .get(authentication_1.isAuthenticated, controller.getModulesExercise);
router.route('/exercise/:module_id/:exercise_id')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesExercise);
router.route('/part/:part_id')
    .patch(authentication_1.isAuthenticated, controller.updateCoursePartPost);
router.route('/module/:module_id')
    .patch(authentication_1.isAuthenticated, controller.updateCourseModulePost);
router.route('/lesson/:lesson_id')
    .patch(authentication_1.isAuthenticated, controller.updateModuleLesson);
router.route('/test/:test_id')
    .patch(authentication_1.isAuthenticated, controller.updateModuleTest);
router.route('/exercise/:exercise_id')
    .patch(authentication_1.isAuthenticated, controller.updateModuleExercise);
//  course//
router.route('/course-overview/:type').post((0, video_upload_1.videoFileReader)(api_param_constants_1.FormParams.FILE_FIELD, 2), file_1.emptyChecks, controller.uploadCourse);
router.route('/course-overview/:uid').get(controller.getuploadCourse);
router.route('/course-overview/:uid').patch((0, video_upload_1.videoFileReader)(api_param_constants_1.FormParams.FILE_FIELD, 2), file_1.emptyChecks, controller.updateuploadCourse);
router.route('/course-overview/:uid').delete(controller.deleteuploadCourse);
router.route('/learn/:id').delete(controller.deleteSingleLearn);
exports.default = router;
