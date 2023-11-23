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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseListAll = exports.deleteCourseModule = exports.deleteCoursePart = exports.deleteSingleLearn = exports.updateModuleExercise = exports.updateModuleTest = exports.updateModuleLesson = exports.updateCourseModulePost = exports.updateCoursePartPost = exports.deleteModulesExercise = exports.getModulesExercise = exports.deleteModulesTest = exports.getModulesTest = exports.deleteModulesLesson = exports.getModulesLesson = exports.courseExercisePost = exports.coursetestPost = exports.courseLessonPost = exports.getCourseModule = exports.courseModulesPost = exports.getCourseParts = exports.coursePartPost = exports.coursePost = exports.deleteuploadCourse = exports.updateuploadCourse = exports.getuploadCourse = exports.uploadCourse = exports.getCourses = exports.getCourseOverview = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const adminlmsServices = __importStar(require("../../services/admin/adminLms"));
const util_1 = __importDefault(require("util"));
const TAG = 'controller.lms.admin';
function getCourseOverview(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourseOverview()`);
            logger_1.default.debug(`${TAG}.getCourseOverview() Object = ${JSON.stringify(req.body)}`);
            const courseUid = req.params.courseUid;
            const response = yield adminlmsServices.getCourseOverview(courseUid);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview() `, error);
            next(error);
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourses()`);
            logger_1.default.debug(`${TAG}.getCourses()`);
            // const type = req.query.type;
            const type = req.params;
            console.log(type);
            let response = yield adminlmsServices.getCourses(type);
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourses() `, error);
            next(error);
        }
    });
}
exports.getCourses = getCourses;
// course//
function uploadCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadCourse()`);
            logger_1.default.debug(`${TAG}.uploadCourse() Object = ${JSON.stringify(req.body)}`);
            const course = req.body;
            const file = req.files;
            const type = req.params;
            logger_1.default.debug(`${TAG}.uploadCourse() req file:` + util_1.default.inspect(req.file));
            const serviceResponse = yield adminlmsServices.uploadCourse(file, course, type);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCourse() `, error);
            next(error);
        }
    });
}
exports.uploadCourse = uploadCourse;
function getuploadCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getuploadCourse()`);
            logger_1.default.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`);
            let courseUid = req.params.courseUid;
            const authResponse = yield adminlmsServices.getuploadCourse(courseUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error);
            next(error);
        }
    });
}
exports.getuploadCourse = getuploadCourse;
function updateuploadCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateuploadCourse()`);
            logger_1.default.debug(`${TAG}.updateuploadCourse() Object = ${JSON.stringify(req.body)}`);
            let courseUid = req.params.courseUid;
            const file = req.files;
            const course = req.body;
            console.log(course);
            console.log(courseUid);
            const authResponse = yield adminlmsServices.updateuploadCourse(courseUid, file, course);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateuploadCourse() `, error);
            next(error);
        }
    });
}
exports.updateuploadCourse = updateuploadCourse;
function deleteuploadCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getuploadCourse()`);
            logger_1.default.debug(`${TAG}.getuploadCourse() Object = ${JSON.stringify(req.body)}`);
            let courseUid = req.params.courseUid;
            const authResponse = yield adminlmsServices.deleteuploadCourse(courseUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getuploadCourse() `, error);
            next(error);
        }
    });
}
exports.deleteuploadCourse = deleteuploadCourse;
// courses//
function coursePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.coursePost()`);
            logger_1.default.debug(`${TAG}.coursePost() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let coursetype = req.params.coursetype;
            console.log(coursetype);
            const authResponse = yield adminlmsServices.courseUser(user, coursetype);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursePost() `, error);
            next(error);
        }
    });
}
exports.coursePost = coursePost;
function coursePartPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.coursePartPost()`);
            logger_1.default.debug(`${TAG}.coursePartPost() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let courseUid = req.params.courseUid;
            console.log(courseUid);
            const authResponse = yield adminlmsServices.coursePartUser(Object.assign(Object.assign({}, user), { courseUid }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursePartPost() `, error);
            next(error);
        }
    });
}
exports.coursePartPost = coursePartPost;
function getCourseParts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourseParts()`);
            logger_1.default.debug(`${TAG}.getCourseParts() Object = ${JSON.stringify(req.body)}`);
            let partUid = req.params.partUid;
            console.log(partUid);
            const authResponse = yield adminlmsServices.getCoursePart(partUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseParts() `, error);
            next(error);
        }
    });
}
exports.getCourseParts = getCourseParts;
function courseModulesPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.courseModulesPost()`);
            logger_1.default.debug(`${TAG}.courseModulesPost() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let partUid = req.params.partUid;
            console.log(partUid);
            const authResponse = yield adminlmsServices.courseModulesUser(Object.assign(Object.assign({}, user), { partUid }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.courseModulesPost() `, error);
            next(error);
        }
    });
}
exports.courseModulesPost = courseModulesPost;
function getCourseModule(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourseModule()`);
            logger_1.default.debug(`${TAG}.getCourseModule() Object = ${JSON.stringify(req.body)}`);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.getCourseModules(moduleUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseModule() `, error);
            next(error);
        }
    });
}
exports.getCourseModule = getCourseModule;
function courseLessonPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.courseLessonPost()`);
            logger_1.default.debug(`${TAG}.courseLessonPost() Object = ${JSON.stringify(req.body)}`);
            const lessonData = req.body;
            console.log(lessonData);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.lessonUser(Object.assign(Object.assign({}, lessonData), { moduleUid }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.courseModulesPost() `, error);
            next(error);
        }
    });
}
exports.courseLessonPost = courseLessonPost;
function coursetestPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.coursetestPost()`);
            logger_1.default.debug(`${TAG}.coursetestPost() Object = ${JSON.stringify(req.body)}`);
            const testData = req.body;
            console.log(testData);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.testUser(Object.assign(Object.assign({}, testData), { moduleUid }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursetestPost() `, error);
            next(error);
        }
    });
}
exports.coursetestPost = coursetestPost;
function courseExercisePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.courseExercisePost()`);
            logger_1.default.debug(`${TAG}.courseExercisePost() Object = ${JSON.stringify(req.body)}`);
            const exerciseData = req.body;
            console.log(exerciseData);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.exerciseUser(Object.assign(Object.assign({}, exerciseData), { moduleUid }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.courseExercisePost() `, error);
            next(error);
        }
    });
}
exports.courseExercisePost = courseExercisePost;
function getModulesLesson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getModulesLesson()`);
            logger_1.default.debug(`${TAG}.getModulesLesson() Object = ${JSON.stringify(req.body)}`);
            // let moduleUid = req.params.moduleUid
            // console.log(moduleUid)
            let lessonUid = req.params.lessonUid;
            console.log(lessonUid);
            const authResponse = yield adminlmsServices.getModulesLesson(lessonUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesLesson() `, error);
            next(error);
        }
    });
}
exports.getModulesLesson = getModulesLesson;
function deleteModulesLesson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteModulesLesson()`);
            logger_1.default.debug(`${TAG}.deleteModulesLesson() Object = ${JSON.stringify(req.body)}`);
            let lessonUid = req.params.lessonUid;
            console.log(lessonUid);
            const authResponse = yield adminlmsServices.deleteModulesLesspon(lessonUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesLesson() `, error);
            next(error);
        }
    });
}
exports.deleteModulesLesson = deleteModulesLesson;
function getModulesTest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getModulesTest()`);
            logger_1.default.debug(`${TAG}.getModulesTest() Object = ${JSON.stringify(req.body)}`);
            // let moduleUid = req.params.moduleUid
            // console.log(moduleUid)
            let testUid = req.params.testUid;
            console.log(testUid);
            const authResponse = yield adminlmsServices.getModulesTest(testUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesTest() `, error);
            next(error);
        }
    });
}
exports.getModulesTest = getModulesTest;
function deleteModulesTest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteModulesTest()`);
            logger_1.default.debug(`${TAG}.deleteModulesTest() Object = ${JSON.stringify(req.body)}`);
            let testUid = req.params.testUid;
            console.log(testUid);
            const authResponse = yield adminlmsServices.deleteModulesTest(testUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesTest() `, error);
            next(error);
        }
    });
}
exports.deleteModulesTest = deleteModulesTest;
function getModulesExercise(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getModulesExercise()`);
            logger_1.default.debug(`${TAG}.getModulesExercise() Object = ${JSON.stringify(req.body)}`);
            // let moduleUid = req.params.moduleUid
            // console.log(moduleUid)
            let exerciseUid = req.params.exerciseUid;
            console.log(exerciseUid);
            const authResponse = yield adminlmsServices.getModulesExercise(exerciseUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesExercise() `, error);
            next(error);
        }
    });
}
exports.getModulesExercise = getModulesExercise;
function deleteModulesExercise(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteModulesExercise()`);
            logger_1.default.debug(`${TAG}.deleteModulesExercise() Object = ${JSON.stringify(req.body)}`);
            let exerciseUid = req.params.exerciseUid;
            console.log(exerciseUid);
            const authResponse = yield adminlmsServices.deleteModulesExercise(exerciseUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesExercise() `, error);
            next(error);
        }
    });
}
exports.deleteModulesExercise = deleteModulesExercise;
function updateCoursePartPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateCoursePartPost()`);
            logger_1.default.debug(`${TAG}.updateCoursePartPost() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let partUid = req.params.partUid;
            console.log(partUid);
            const authResponse = yield adminlmsServices.updateCoursePartPost(user, partUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCoursePartPost() `, error);
            next(error);
        }
    });
}
exports.updateCoursePartPost = updateCoursePartPost;
function updateCourseModulePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateCourseModulePost()`);
            logger_1.default.debug(`${TAG}.updateCourseModulePost() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.updateCourseModulePost(user, moduleUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCourseModulePost() `, error);
            next(error);
        }
    });
}
exports.updateCourseModulePost = updateCourseModulePost;
function updateModuleLesson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateModuleLesson()`);
            logger_1.default.debug(`${TAG}.updateModuleLesson() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let lessonUid = req.params.lessonUid;
            console.log(lessonUid);
            const authResponse = yield adminlmsServices.updateLessonPost(user, lessonUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateModuleLesson() `, error);
            next(error);
        }
    });
}
exports.updateModuleLesson = updateModuleLesson;
function updateModuleTest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateModuleTest()`);
            logger_1.default.debug(`${TAG}.updateModuleTest() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let testUid = req.params.testUid;
            console.log(testUid);
            const authResponse = yield adminlmsServices.updateTestPost(user, testUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateModuleTest() `, error);
            next(error);
        }
    });
}
exports.updateModuleTest = updateModuleTest;
function updateModuleExercise(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateModuleExercise()`);
            logger_1.default.debug(`${TAG}.updateModuleExercise() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            let exerciseUid = req.params.exerciseUid;
            console.log(exerciseUid);
            const authResponse = yield adminlmsServices.updateExercisePost(user, exerciseUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateModuleExercise() `, error);
            next(error);
        }
    });
}
exports.updateModuleExercise = updateModuleExercise;
function deleteSingleLearn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteSingleLearn()`);
            logger_1.default.debug(`${TAG}.deleteSingleLearn() Object = ${JSON.stringify(req.body)}`);
            let learnId = req.params;
            const authResponse = yield adminlmsServices.deleteSingleLearn(learnId);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteSingleLearn() `, error);
            next(error);
        }
    });
}
exports.deleteSingleLearn = deleteSingleLearn;
function deleteCoursePart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteCoursePart()`);
            logger_1.default.debug(`${TAG}.deleteCoursePart() Object = ${JSON.stringify(req.body)}`);
            let partUid = req.params.partUid;
            console.log(partUid);
            const authResponse = yield adminlmsServices.deleteCoursePart(partUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCoursePart() `, error);
            next(error);
        }
    });
}
exports.deleteCoursePart = deleteCoursePart;
function deleteCourseModule(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteCourseModule()`);
            logger_1.default.debug(`${TAG}.deleteCourseModule() Object = ${JSON.stringify(req.body)}`);
            let moduleUid = req.params.moduleUid;
            console.log(moduleUid);
            const authResponse = yield adminlmsServices.deleteCourseModule(moduleUid);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCourseModule() `, error);
            next(error);
        }
    });
}
exports.deleteCourseModule = deleteCourseModule;
function getCourseListAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getCourseListAll()`);
            logger_1.default.debug(`${TAG}.getCourseListAll() Object = ${JSON.stringify(req.body)}`);
            let type = req.params.type;
            console.log(type);
            const authResponse = yield adminlmsServices.getCourseAllList(type);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseListAll() `, error);
            next(error);
        }
    });
}
exports.getCourseListAll = getCourseListAll;
