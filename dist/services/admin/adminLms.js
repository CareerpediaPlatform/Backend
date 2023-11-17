"use strict";
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
exports.deleteSingleLearn = exports.updateExercisePost = exports.updateTestPost = exports.updateLessonPost = exports.updateCourseModulePost = exports.updateCoursePartPost = exports.deleteModulesExercise = exports.getModulesExercise = exports.deleteModulesTest = exports.getModulesTest = exports.deleteModulesLesspon = exports.getModulesLesspon = exports.exerciseUser = exports.testUser = exports.lessonUser = exports.getCourseModules = exports.courseModulesUser = exports.getCoursePart = exports.coursePartUser = exports.courseUser = exports.deleteuploadCourse = exports.updateuploadCourse = exports.getuploadCourse = exports.uploadCourse = exports.getCourses = exports.getCourseOverview = void 0;
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const mysql_1 = require("../../Database/mysql");
const config_1 = require("../../Loaders/config");
const file_constants_1 = require("src/constants/file_constants");
const s3_media_1 = require("src/helpers/s3_media");
const TAG = 'services.lms.admin';
function getCourseOverview(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield mysql_1.adminLms.getCourseOverview(courseId);
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(coursetype) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        let response;
        try {
            if (coursetype) {
                response = yield mysql_1.adminLms.getCourses(coursetype);
            }
            else {
                response = yield mysql_1.adminLms.getAllCourses();
            }
            const data = [
                ...response
            ];
            serviceResponse.data = data;
            return yield serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getCourses = getCourses;
// course//
function uploadCourse(files, course, type) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadCourse() `);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.LMS_VIDEOS;
            const data = yield (0, s3_media_1.saveFile)(files, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            const fileDetails = {
                fileName: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.savedFileName,
                originalFileName: (_b = files[0]) === null || _b === void 0 ? void 0 : _b.originalname,
                contentType: (_c = files[0]) === null || _c === void 0 ? void 0 : _c.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_d = data[0]) === null || _d === void 0 ? void 0 : _d.savedFileKey,
                fileUrl: (_e = data[0]) === null || _e === void 0 ? void 0 : _e.savedLocation,
                isPublic: true,
                metaData: null,
            };
            const imageDetails = {
                fileName: (_f = data[1]) === null || _f === void 0 ? void 0 : _f.savedFileName,
                originalFileName: (_g = files[1]) === null || _g === void 0 ? void 0 : _g.originalname,
                contentType: (_h = files[1]) === null || _h === void 0 ? void 0 : _h.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_j = data[1]) === null || _j === void 0 ? void 0 : _j.savedFileKey,
                fileUrl: (_k = data[1]) === null || _k === void 0 ? void 0 : _k.savedLocation,
                isPublic: true,
                metaData: null,
            };
            const fileSavedResp = yield mysql_1.adminLms.uploadCourse(fileDetails, imageDetails, course, type);
            serviceResponse.data = {
                uid: course.uid,
                thumbnail: imageDetails.fileUrl,
                video: fileDetails.fileUrl,
                title: course.title,
                description: course.description,
                mentor: course.mentor,
                lesson: course.lesson,
                exercises: course.exercises,
                test: course.test,
                price: course.price,
                discountprice: course.discountprice,
                type: type,
                learn: course.learn
            };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCourse`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadCourse = uploadCourse;
function getuploadCourse(courseUID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getuploadCourse() ==> `, courseUID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseID = yield mysql_1.adminLms.checkCourseIdExist(courseUID);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.getuploadCourse(courseUID);
                const data = {
                    existedCourse
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid COURSE UId";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getuploadCourse`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getuploadCourse = getuploadCourse;
function updateuploadCourse(courseUID, files, course) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateuploadCourse() ==> `, courseUID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const fileDirectory = file_constants_1.DIRECTORIES.LMS_VIDEOS;
            const data = yield (0, s3_media_1.saveFile)(files, fileDirectory, config_1.AWS_S3.BUCKET_NAME);
            const fileDetails = {
                fileName: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.savedFileName,
                originalFileName: (_b = files[0]) === null || _b === void 0 ? void 0 : _b.originalname,
                contentType: (_c = files[0]) === null || _c === void 0 ? void 0 : _c.mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_d = data[0]) === null || _d === void 0 ? void 0 : _d.savedFileKey,
                fileUrl: data[0].savedLocation,
                isPublic: true,
                metaData: null,
            };
            const imageDetails = {
                fileName: (_e = data[1]) === null || _e === void 0 ? void 0 : _e.savedFileName,
                originalFileName: files[1].originalname,
                contentType: files[1].mimetype,
                s3Bucket: config_1.AWS_S3.BUCKET_NAME,
                filePath: (_f = data[1]) === null || _f === void 0 ? void 0 : _f.savedFileKey,
                fileUrl: (_g = data[1]) === null || _g === void 0 ? void 0 : _g.savedLocation,
                isPublic: true,
                metaData: null,
            };
            const existedCourseID = yield mysql_1.adminLms.checkCourseIdExist(courseUID);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.updateuploadCourse(fileDetails, imageDetails, courseUID, course);
                const data = {
                    existedCourse
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid courseId";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateuploadCourse`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateuploadCourse = updateuploadCourse;
function deleteuploadCourse(courseUID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterProfile() ==> `, courseUID);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseID = yield mysql_1.adminLms.checkCourseIdExist(courseUID);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.deleteuploadCourse(courseUID);
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid COURSE UId";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteuploadCourse = deleteuploadCourse;
// courses//
function courseUser(user, coursetype) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.courseUser() ==> `, coursetype);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const coursePost = yield mysql_1.adminLms.coursesPost(user, coursetype);
            const data = {
                coursePost
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.courseUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.courseUser = courseUser;
function coursePartUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.coursePartUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const coursePart = yield mysql_1.adminLms.coursePartPost(user);
            const data = {
                coursePart
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursePartUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.coursePartUser = coursePartUser;
function getCoursePart(course_id, part_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getCoursePart() ==> `, course_id, part_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(course_id);
            console.log(part_id);
            const getCourseUid = yield mysql_1.adminLms.checkCoureUid(course_id);
            console.log(getCourseUid);
            if (!getCourseUid) {
                serviceResponse.message = "Invalid course part UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const coursePart = yield mysql_1.adminLms.getPart(part_id);
            const data = {
                coursePart
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCoursePart`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getCoursePart = getCoursePart;
function courseModulesUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.courseModulesUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const courseModules = yield mysql_1.adminLms.modulesPost(user);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.courseModulesUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.courseModulesUser = courseModulesUser;
function getCourseModules(part_id, module_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getCourseModules() ==> `, module_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(part_id);
            const getPartUid = yield mysql_1.adminLms.checkPartUid(part_id);
            console.log(getPartUid);
            if (!getPartUid) {
                serviceResponse.message = "Invalid course part UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.getModule(module_id);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseModules`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getCourseModules = getCourseModules;
function lessonUser(lessonData) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.lessonUser() ==> `, lessonData);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const courseModules = yield mysql_1.adminLms.lessonPost(lessonData);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.lessonUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.lessonUser = lessonUser;
function testUser(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.testUser() ==> `, testData);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const courseModules = yield mysql_1.adminLms.testPost(testData);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.testUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.testUser = testUser;
function exerciseUser(exerciseData) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.exerciseUser() ==> `, exerciseData);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const courseModules = yield mysql_1.adminLms.exercisesPost(exerciseData);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.exerciseUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.exerciseUser = exerciseUser;
function getModulesLesspon(module_id, lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesLesspon() ==> `, module_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(lesson_id);
            const getLesonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLesonid);
            if (!getLesonid) {
                serviceResponse.message = "Invalid course lesson UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.getLessonPost(lesson_id);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesLesspon`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesLesspon = getModulesLesspon;
function deleteModulesLesspon(module_id, lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesLesspon() ==> `, module_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(lesson_id);
            console.log("aaaaaaaaaaaaaaaaaa");
            const getLessonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLessonid);
            if (!getLessonid) {
                serviceResponse.message = "Invalid course lesson UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteLessonPost(lesson_id);
            const data = {
                courseModules
            };
            serviceResponse.message = "course module lesson deleted";
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesLesspon`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteModulesLesspon = deleteModulesLesspon;
function getModulesTest(module_id, test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesTest() ==> `, test_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(test_id);
            const getLesonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLesonid);
            if (!getLesonid) {
                serviceResponse.message = "Invalid course test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.getTestPost(test_id);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesTest`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesTest = getModulesTest;
function deleteModulesTest(module_id, test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesLesspon() ==> `, test_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(test_id);
            const getLessonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLessonid);
            if (!getLessonid) {
                serviceResponse.message = "Invalid course test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteTestPost(test_id);
            const data = {
                courseModules
            };
            serviceResponse.message = "course module test deleted";
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesLesspon`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteModulesTest = deleteModulesTest;
function getModulesExercise(module_id, exercise_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesExercise() ==> `, exercise_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(exercise_id);
            const getLesonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLesonid);
            if (!getLesonid) {
                serviceResponse.message = "Invalid course exercise UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.getExercisePost(exercise_id);
            const data = {
                courseModules
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesExercise`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesExercise = getModulesExercise;
function deleteModulesExercise(module_id, exercise_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesExercise() ==> `, exercise_id);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            console.log(exercise_id);
            const getLessonid = yield mysql_1.adminLms.checkModuleUid(module_id);
            console.log(getLessonid);
            if (!getLessonid) {
                serviceResponse.message = "Invalid course Exercise UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteTestPost(exercise_id);
            const data = {
                courseModules
            };
            serviceResponse.message = "course module exercise deleted";
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteModulesExercise`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteModulesExercise = deleteModulesExercise;
function updateCoursePartPost(user, part_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCoursePartPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(part_id);
            const getPartUid = yield mysql_1.adminLms.getPart(part_id);
            console.log(getPartUid);
            if (!getPartUid) {
                serviceResponse.message = "Invalid course part UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateCoursePartPost(user, part_id);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCoursePartPost`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateCoursePartPost = updateCoursePartPost;
function updateCourseModulePost(user, module_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCourseModulePost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(module_id);
            const getModuleUid = yield mysql_1.adminLms.getModule(module_id);
            console.log(getModuleUid);
            if (!getModuleUid) {
                serviceResponse.message = "Invalid course module UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateModulesPost(user, module_id);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCourseModulePost`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateCourseModulePost = updateCourseModulePost;
function updateLessonPost(user, lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateLessonPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(lesson_id);
            const getLessonUid = yield mysql_1.adminLms.getLessonPost(lesson_id);
            console.log(getLessonUid);
            if (!getLessonUid) {
                serviceResponse.message = "Invalid  module lesson UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateModulesPost(user, lesson_id);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateLessonPost`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateLessonPost = updateLessonPost;
function updateTestPost(user, test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateTestPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(test_id);
            const getTestUid = yield mysql_1.adminLms.getTestPost(test_id);
            console.log(getTestUid);
            if (!getTestUid) {
                serviceResponse.message = "Invalid  module test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateTestPost(user, test_id);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateTestPost`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateTestPost = updateTestPost;
function updateExercisePost(user, test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateLessonPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(test_id);
            const getTestUid = yield mysql_1.adminLms.getTestPost(test_id);
            console.log(getTestUid);
            if (!getTestUid) {
                serviceResponse.message = "Invalid  module test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateTestPost(user, test_id);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateLessonPost`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateExercisePost = updateExercisePost;
function deleteSingleLearn(learnId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesExercise() ==> `, learnId);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const getLearnid = yield mysql_1.adminLms.checkLearnId(learnId);
            if (getLearnid) {
                const learnID = yield mysql_1.adminLms.deleteLearnId(learnId);
            }
            else {
                serviceResponse.message = "Invalid course-overview LearnId";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            serviceResponse.message = "course-overview learn deleted";
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteLearnId`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteSingleLearn = deleteSingleLearn;
