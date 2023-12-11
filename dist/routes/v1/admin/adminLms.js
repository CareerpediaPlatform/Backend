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
const authentication_1 = require("../../../middlewares/authentication");
const video_upload_1 = require("../../../middlewares/video_upload");
const api_param_constants_1 = require("../../../constants/api_param_constants");
const file_1 = require("../../../validations/file");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router.route('/course-list')
    .get(authentication_1.isAuthenticated, controller.getCourses);
// courses//
router.route('/course-overvie/:coursetype')
    .post(authentication_1.isAuthenticated, controller.coursePost);
router.route('/part/:courseUid')
    .post(authentication_1.isAuthenticated, controller.coursePartPost);
router.route('/module/:partUid')
    .post(authentication_1.isAuthenticated, controller.courseModulesPost);
router.route('/lesson/:moduleUid')
    .post(authentication_1.isAuthenticated, controller.courseLessonPost);
router.route('/test/:moduleUid')
    .post(authentication_1.isAuthenticated, controller.coursetestPost);
router.route('/exercise/:moduleUid')
    .post(authentication_1.isAuthenticated, controller.courseExercisePost);
router.route('/part/:partUid')
    .get(authentication_1.isAuthenticated, controller.getCourseParts);
router.route('/module/:moduleUid')
    .get(authentication_1.isAuthenticated, controller.getCourseModule);
router.route('/lesson/:lessonUid')
    .get(authentication_1.isAuthenticated, controller.getModulesLesson);
router.route('/lesson/:lessonUid')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesLesson);
router.route('/test/:testUid')
    .get(authentication_1.isAuthenticated, controller.getModulesTest);
router.route('/test/:testUid')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesTest);
router.route('/exercise/:exerciseUid')
    .get(authentication_1.isAuthenticated, controller.getModulesExercise);
router.route('/exercise/:exerciseUid')
    .delete(authentication_1.isAuthenticated, controller.deleteModulesExercise);
router.route('/part/:partUid')
    .patch(authentication_1.isAuthenticated, controller.updateCoursePartPost);
router.route('/module/:moduleUid')
    .patch(authentication_1.isAuthenticated, controller.updateCourseModulePost);
router.route('/lesson/:lessonUid')
    .patch(authentication_1.isAuthenticated, controller.updateModuleLesson);
router.route('/test/:testUid')
    .patch(authentication_1.isAuthenticated, controller.updateModuleTest);
router.route('/exercise/:exerciseUid')
    .patch(authentication_1.isAuthenticated, controller.updateModuleExercise);
//  course//
router.route('/course-overview/:type').post((0, video_upload_1.videoFileReader)(api_param_constants_1.FormParams.FILE_FIELD, 2), file_1.emptyChecks, controller.uploadCourse);
router.route('/course-overview/:courseUid').get(controller.getuploadCourse);
router.route('/course-overview/:courseUid').patch((0, video_upload_1.videoFileReader)(api_param_constants_1.FormParams.FILE_FIELD, 2), controller.updateuploadCourse);
router.route('/course-overview/:courseUid').delete(controller.deleteuploadCourse);
router.route('/learn/:id').delete(controller.deleteSingleLearn);
router.route('/part/:partUid')
    .delete(authentication_1.isAuthenticated, controller.deleteCoursePart);
router.route('/module/:moduleUid')
    .delete(authentication_1.isAuthenticated, controller.deleteCourseModule);
router.route('/single-course-overview/:courseUid')
    .get(authentication_1.isAuthenticated, controller.getCourseOverview);
router.route('/course-list/:type')
    .get(authentication_1.isAuthenticated, controller.getCourseListAll);
exports.default = router;
