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
const controller = __importStar(require("../../../controller/student/assignment"));
const express_1 = require("express");
const passport_1 = require("../../../middlewares/passport");
const passport_2 = __importDefault(require("passport"));
const video_upload_1 = require("src/middlewares/video_upload");
const api_param_constants_1 = require("src/constants/api_param_constants");
const file_1 = require("src/validations/file");
(0, passport_1.passportConfiguration)(passport_2.default);
const router = (0, express_1.Router)();
router.use(passport_2.default.initialize());
router.route('/assignment/:partUid').post((0, video_upload_1.videoFileReader)(api_param_constants_1.FormParams.FILE_FIELD, 1), file_1.emptyChecks, controller.uploadAssignment);
router.route('/assignment/:partUid').get(controller.getAllSAssignment);
router.route('/course-note/:partUid').post(controller.uploadNote);
router.route('/course-note/:partUid').get(controller.getAllNotes);
router.route('/part/thread/:partUid').post(controller.uploadThread);
router.route('/part/thread/:partUid/:threadId').get(controller.getSingleThread);
router.route('/part/thread-reply/:partUid/:threadId').post(controller.postThreadreply);
//  router.route('/part/thread').post(controller.uploadThread);
//  router.route('/part/thread/:threadID/:uid').get(controller.getAllThreads);
//  router.route('/mentor/reply-thread/:threadID/:uid').post(controller.postThreadreply)
router.route('/part/thread/:partUid').get(controller.getAllThreadsPart);
router.route('/course/thread/:courseUid').get(controller.getAllThreadsCourse);
exports.default = router;
