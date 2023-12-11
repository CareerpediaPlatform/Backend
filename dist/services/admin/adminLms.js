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
exports.getCourseAllList = exports.deleteCourseModule = exports.deleteCoursePart = exports.deleteSingleLearn = exports.updateExercisePost = exports.updateTestPost = exports.updateLessonPost = exports.updateCourseModulePost = exports.updateCoursePartPost = exports.deleteModulesExercise = exports.getModulesExercise = exports.deleteModulesTest = exports.getModulesTest = exports.deleteModulesLesspon = exports.getModulesLesson = exports.exerciseUser = exports.testUser = exports.lessonUser = exports.getCourseModules = exports.courseModulesUser = exports.getCoursePart = exports.coursePartUser = exports.courseUser = exports.deleteuploadCourse = exports.updateuploadCourse = exports.getuploadCourse = exports.uploadCourse = exports.getCourses = exports.getCourseOverview = void 0;
const status_codes_1 = require("../../constants/status_codes");
const logger_1 = __importDefault(require("../../logger"));
const api_error_1 = require("../../models/lib/api_error");
const service_response_1 = require("../../models/lib/service_response");
const mysql_1 = require("../../Database/mysql");
const config_1 = require("../../Loaders/config");
const file_constants_1 = require("../../constants/file_constants");
const s3_media_1 = require("../../helpers/s3_media");
const TAG = 'services.lms.admin';
function getCourseOverview(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const response = yield mysql_1.adminLms.getCourseOverview(courseUid);
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
function getCourses(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(type);
            const existedCourse = yield mysql_1.adminLms.getCourses(type);
            const data = {
                existedCourse
            };
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(data);
            serviceResponse.data = data;
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getCourses = getCourses;
// course_overvew//
function uploadCourse(files, course, type) {
    var _a, _b, _c, _d, _e, _f;
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
            const fileUrl = (0, s3_media_1.getFileUrl)((_f = data[0]) === null || _f === void 0 ? void 0 : _f.savedFileKey, config_1.AWS_S3.BUCKET_NAME);
            const duration = yield (0, s3_media_1.getVideoDurations)(fileUrl);
            console.log("****************************************");
            console.log(duration);
            // const imageDetails = {
            //   fileName: data[1]?.savedFileName,
            //   originalFileName: files[1]?.originalname,
            //   contentType:files[1]?.mimetype,
            //   s3Bucket: AWS_S3.BUCKET_NAME,
            //   filePath: data[1]?.savedFileKey,
            //   fileUrl: data[1]?.savedLocation,
            //   isPublic: true,
            //   metaData: null,
            // }
            const fileSavedResp = yield mysql_1.adminLms.uploadCourses(fileDetails, course, type);
            serviceResponse.data = {
                courseUid: fileSavedResp.courseUid,
                // thumbnail: imageDetails.fileUrl,
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
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCourse`, error);
            serviceResponse.addServerError('Failed to upload file due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.uploadCourse = uploadCourse;
function getuploadCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getuploadCourse() ==> `, courseUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseID = yield mysql_1.adminLms.checkCourseIdExist(courseUid);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.getuploadCourse(courseUid);
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
function updateuploadCourse(courseUid, files, course) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateuploadCourse() ==> `, courseUid);
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
            // const imageDetails = {
            //   fileName: data[1]?.savedFileName,
            //   originalFileName: files[1].originalname,
            //   contentType:files[1].mimetype,
            //   s3Bucket: AWS_S3.BUCKET_NAME,
            //   filePath: data[1]?.savedFileKey,
            //   fileUrl: data[1]?.savedLocation,
            //   isPublic: true,
            //   metaData: null,
            // }
            const existedCourseID = yield mysql_1.adminLms.checkCourseIdExist(courseUid);
            if (existedCourseID) {
                const updatedCourse = yield mysql_1.adminLms.updateuploadCourse(fileDetails, courseUid, course);
                const data = {
                    updatedCourse
                };
                serviceResponse.message = "sucessfully updated";
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
function deleteuploadCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterProfile() ==> `, courseUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseUid = yield mysql_1.adminLms.checkCourseIdExist(courseUid);
            if (existedCourseUid) {
                const existedCourse = yield mysql_1.adminLms.deleteuploadCourse(courseUid);
                serviceResponse.message = "Course Overview successfully deleted!";
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
function getCoursePart(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getCoursePart() ==> `, partUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(partUid);
            // const getCourseUid = await adminLms.checkCoureUid(courseUid);
            // console.log(getCourseUid);
            // if (!getCourseUid) {
            //   serviceResponse.message = "Invalid course part UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            const coursePart = yield mysql_1.adminLms.getPart(partUid);
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
function getCourseModules(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getCourseModules() ==> `, moduleUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(moduleUid);
            // const getModule= await adminLms.checkPartUid(partUid);
            // console.log(getModule);
            // if (!getPartUid) {
            //   serviceResponse.message = "Invalid course part UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            const courseModules = yield mysql_1.adminLms.getModule(moduleUid);
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
            const lessonModulePost = yield mysql_1.adminLms.lessonPost(lessonData);
            const data = {
                lessonModulePost
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
            const testModulesPost = yield mysql_1.adminLms.testPost(testData);
            const data = {
                testModulesPost
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
            const exerciseModulesPost = yield mysql_1.adminLms.exercisesPost(exerciseData);
            const data = {
                exerciseModulesPost
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
function getModulesLesson(lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesLesspon() ==> `, lessonUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(lessonUid);
            // const getLesonid = await adminLms.checkModuleUid(lessonUid);
            // console.log(getLesonid);
            // if (!getLesonid) {
            //   serviceResponse.message = "Invalid course lesson UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            const getLessonModules = yield mysql_1.adminLms.checkLessonUid(lessonUid);
            serviceResponse.data = getLessonModules;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesLesspon`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesLesson = getModulesLesson;
function deleteModulesLesspon(lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesLesspon() ==> `, lessonUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(lessonUid);
            console.log("aaaaaaaaaaaaaaaaaa");
            const getLessonid = yield mysql_1.adminLms.checkLessonUid(lessonUid);
            console.log(getLessonid);
            if (!getLessonid) {
                serviceResponse.message = "Invalid course lesson UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteLessonPost(lessonUid);
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
function getModulesTest(testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesTest() ==> `, testUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(testUid);
            // const getLesonid = await adminLms.checkModuleUid(moduleUid);
            // console.log(getLesonid);
            // if (!getLesonid) {
            //   serviceResponse.message = "Invalid course test UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            const courseModules = yield mysql_1.adminLms.checkTestUid(testUid);
            serviceResponse.data = courseModules;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesTest`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesTest = getModulesTest;
function deleteModulesTest(testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesLesspon() ==> `, testUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(testUid);
            const getTestUid = yield mysql_1.adminLms.checkTestUid(testUid);
            console.log(getTestUid);
            if (!getTestUid) {
                serviceResponse.message = "Invalid course test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteTestPost(testUid);
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
function getModulesExercise(exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getModulesExercise() ==> `, exerciseUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(exerciseUid);
            // const getLesonid = await adminLms.checkModuleUid(moduleUid);
            // console.log(getLesonid);
            // if (!getLesonid) {
            //   serviceResponse.message = "Invalid course exercise UID";
            //   serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            //   serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
            //   return serviceResponse;
            // }
            const courseModules = yield mysql_1.adminLms.checkExerciseUid(exerciseUid);
            serviceResponse.data = courseModules;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModulesExercise`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getModulesExercise = getModulesExercise;
function deleteModulesExercise(exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteModulesExercise() ==> `, exerciseUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(exerciseUid);
            const getLessonid = yield mysql_1.adminLms.checkExerciseUid(exerciseUid);
            console.log(getLessonid);
            if (!getLessonid) {
                serviceResponse.message = "Invalid course Exercise UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const courseModules = yield mysql_1.adminLms.deleteExercisePost(exerciseUid);
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
function updateCoursePartPost(user, partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCoursePartPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(partUid);
            const getPartUid = yield mysql_1.adminLms.getPart(partUid);
            console.log(getPartUid);
            if (!getPartUid) {
                serviceResponse.message = "Invalid course part UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateCoursePartPost(user, partUid);
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
function updateCourseModulePost(user, moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCourseModulePost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(moduleUid);
            const getModuleUid = yield mysql_1.adminLms.getModule(moduleUid);
            console.log(getModuleUid);
            if (!getModuleUid) {
                serviceResponse.message = "Invalid course module UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateModulesPost(user, moduleUid);
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
function updateLessonPost(user, lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateLessonPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(lessonUid);
            const getLessonUid = yield mysql_1.adminLms.getLessonPost(lessonUid);
            console.log(getLessonUid);
            if (!getLessonUid) {
                serviceResponse.message = "Invalid  module lesson UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateLessonPost(user, lessonUid);
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
function updateTestPost(user, testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateTestPost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(testUid);
            const getTestUid = yield mysql_1.adminLms.getTestPost(testUid);
            console.log(getTestUid);
            if (!getTestUid) {
                serviceResponse.message = "Invalid  module test UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateTestPost(user, testUid);
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
function updateExercisePost(user, exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateExercisePost() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(exerciseUid);
            const getTestUid = yield mysql_1.adminLms.getExercisePost(exerciseUid);
            console.log(getTestUid);
            if (!getTestUid) {
                serviceResponse.message = "Invalid  module Exercise UID";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
            const response = yield mysql_1.adminLms.updateExercisesPost(user, exerciseUid);
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateExercisePost`, error);
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
function deleteCoursePart(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteCoursePart() ==> `, partUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseID = yield mysql_1.adminLms.getPart(partUid);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.deleteCoursePart(partUid);
                serviceResponse.message = "Course part successfully deleted!";
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid Course part Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCoursePart`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteCoursePart = deleteCoursePart;
function deleteCourseModule(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteCourseModule() ==> `, moduleUid);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const existedCourseID = yield mysql_1.adminLms.getModule(moduleUid);
            if (existedCourseID) {
                const existedCourse = yield mysql_1.adminLms.deleteCourseModule(moduleUid);
                serviceResponse.message = "Course modules successfully deleted!";
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid Course module Uid";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCourseModule`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.deleteCourseModule = deleteCourseModule;
function getCourseAllList(type) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getCourseAllList() ==> `, type);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log(type);
            const existedCourse = yield mysql_1.adminLms.getAllCourseList(type);
            if (existedCourse) {
                const data = {
                    existedCourse
                };
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = "Invalid course-overview type";
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, "", ""));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseAllList`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.getCourseAllList = getCourseAllList;
