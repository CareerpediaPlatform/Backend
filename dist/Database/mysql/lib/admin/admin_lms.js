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
exports.updateExercisesPost = exports.deleteLearnId = exports.updateTestPost = exports.updateLessonPost = exports.checkLearnId = exports.updateModulesPost = exports.updateCoursePartPost = exports.deleteExercisePost = exports.getExercisePost = exports.exercisesPost = exports.deleteTestPost = exports.getTestPost = exports.testPost = exports.deleteLessonPost = exports.getLessonPost = exports.checkModuleUid = exports.lessonPost = exports.getModule = exports.checkPartUid = exports.modulesPost = exports.getPart = exports.coursePartPost = exports.checkCoureUid = exports.coursesPost = exports.deleteuploadCourse = exports.updateuploadCourse = exports.getuploadCourse = exports.checkCourseIdExist = exports.uploadCourse = exports.getAllCourses = exports.getMyCourse = exports.getMyCourses = exports.getPartDetail = exports.getCourses = exports.getCourseOverview = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user_lms';
function getCourseOverview(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = courseId;
        try {
            logger_1.default.info(`${TAG}.getCourseOverview()  ==>`);
            let query = `SELECT
  c.thumbnail AS thumbnail,
  c.video AS video,
  c.title AS title,
MAX(c.description) AS description,
MAX(c.mentor) AS mentor,
MAX(c.id) AS id,
MAX(c.type) AS type,
  GROUP_CONCAT(DISTINCT wyl.point) AS whatYouLearn,
(
 select JSON_ARRAYAGG(
      JSON_OBJECT(
          'part', cp.partTitle,
          'description', cp.description,
          'modules', (
              SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'name', m.moduleName,
                      'desc', m.moduleDescription,
                       'lesson', (
              SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                   'name', l.lessonName,
                                  'points', l.lessonPoints,
                                  'duration', l.lessonDuration
                  )
              ) 
              FROM lesson AS l WHERE m.id = l.moduleId
          ),
                          'exercises', (
              SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                                   'name', e.exerciseName,
                          'points', e.exercisePoints
                  )
              ) 
              FROM Exercise AS e WHERE m.id = e.moduleId
          ),
                      'test', (
              SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'name', t.testName,
                          'points', t.testPoints
                  )
              ) 
              FROM Test AS t WHERE m.id = t.moduleId
          )
                  )
              ) 
              FROM Module AS m 
              WHERE cp.id = m.coursePartId
          )
      ) 
  ) FROM CoursePart cp where c.id = cp.courseId 
)AS part
FROM Course AS c 
LEFT JOIN WhatYouLearn AS wyl ON c.id = wyl.courseId WHERE c.id=:id
GROUP BY
  c.thumbnail,
  c.video,
  c.title,
  c.description,
  c.mentor,c.id,c.type;`;
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { id: id });
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview()`, error);
            throw error;
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(courseType) {
    return __awaiter(this, void 0, void 0, function* () {
        // let id=courseId
        try {
            logger_1.default.info(`${TAG}.getCourses()  ==>`);
            let query = `SELECT * FROM COURSE WHERE TYPE=:type`;
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { type: courseType });
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourses()`, error);
            throw error;
        }
    });
}
exports.getCourses = getCourses;
function getPartDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        // let id=courseId
        try {
            logger_1.default.info(`${TAG}.getPartDetail()  ==>`);
            let query = `   select
    'part', cp.partTitle,
    'description', cp.description,
    'modules', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'name', m.moduleName,
                'desc', m.moduleDescription,
                 'exercises', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                             'name', e.exerciseName,
                    'points', e.exercisePoints
            )
        ) 
        FROM Exercise AS e WHERE m.id = e.moduleId
    ),
                 'lesson', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
             'name', l.lessonName,
                            'points', l.lessonPoints,
                            'duration', l.lessonDuration
            )
        ) 
        FROM lesson AS l WHERE m.id = l.moduleId
    ),
              'test', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', t.testName,
                    'points', t.testPoints
            )
        ) 
        FROM Test AS t WHERE m.id = t.moduleId
    )
            )
        ) 
        FROM Module AS m 
        WHERE cp.id = m.coursePartId
) AS module FROM CoursePart cp WHERE id = ? AND cp.courseId  = ?;`;
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, [1, 1]);
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getPartDetail()`, error);
            throw error;
        }
    });
}
exports.getPartDetail = getPartDetail;
// student
function getMyCourses(list) {
    return __awaiter(this, void 0, void 0, function* () {
        // let id=courseId
        try {
            logger_1.default.info(`${TAG}.getMyCourses()  ==>`);
            const userIDs = [...list];
            const query = 'SELECT * FROM course WHERE id IN (?)';
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, [list]);
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMyCourses()`, error);
            throw error;
        }
    });
}
exports.getMyCourses = getMyCourses;
// student
function getMyCourse(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getMyCourse()  ==>`);
            const query = 'SELECT * FROM courses WHERE course_id=:courseId';
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { courseId: courseId });
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMyCourse()`, error);
            throw error;
        }
    });
}
exports.getMyCourse = getMyCourse;
function getAllCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllCourses()  ==>`);
            const userIDs = [2];
            const query = 'SELECT * FROM course';
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, [userIDs]);
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllCourses()`, error);
            throw error;
        }
    });
}
exports.getAllCourses = getAllCourses;
// course
function uploadCourse(fileDetails, imageDetails, course, type) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadVideoFile()`);
        try {
            const data = {
                uid: crypto.randomUUID(),
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
                filePath: fileDetails.filePath,
                learn: course.learn
            };
            console.log(data);
            console.log(data.uid);
            const videoInsertQuery = `INSERT INTO COURSE (UID,  THUMBNAIL, VIDEO, TITLE, DESCRIPTION, MENTOR, LESSON, EXERCISES, TEST, PRICE, DISCOUNTPRICE, Type )
    VALUES(:uid, :thumbnail, :video, :title, :description, :mentor, :lesson, :exercises, :test, :price, :discountprice, :type )`;
            const response = [];
            const learnQuery = `INSERT INTO  WHATYOULEARN
    ( UID,LEARN)
     values( :uid,:learn )`;
            let array = JSON.parse(course.learn);
            for (const singleData of array) {
                const res = yield (0, sql_query_util_1.executeQuery)(learnQuery, sequelize_1.QueryTypes.INSERT, { learn: singleData, uid: data.uid });
                response.push(res);
            }
            const [coursedata] = yield (0, sql_query_util_1.executeQuery)(videoInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), type));
            return { response, coursedata };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFile()`, error);
            throw error;
        }
    });
}
exports.uploadCourse = uploadCourse;
function checkCourseIdExist(courseUID) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(courseUID);
        try {
            logger_1.default.info(`${TAG}.checkCourseIdExist() ==>`, courseUID);
            const checkQuery = 'SELECT * FROM `COURSE` WHERE UID= :courseUID';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { courseUID });
            return basic; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkCourseIdExist()`, error);
            throw error;
        }
    });
}
exports.checkCourseIdExist = checkCourseIdExist;
function getuploadCourse(courseUID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getuploadCourse() ==>`, courseUID);
            const checkQuery = 'SELECT * FROM `COURSE` WHERE UID= :courseUID';
            const getQuery = 'SELECT * FROM `WHATYOULEARN` WHERE UID= :courseUID';
            const query = '';
            const [basicCourse] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { courseUID });
            const [basicCourseLearn] = yield (0, sql_query_util_1.executeQuery)(getQuery, sequelize_1.QueryTypes.SELECT, { courseUID });
            return { basicCourse, basicCourseLearn };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.getuploadCourse = getuploadCourse;
function updateuploadCourse(fileDetails, imageDetails, courseUID, course) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getuploadCourse() ==>`, courseUID);
            const data = {
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
                learn: course.learn
            };
            console.log(course);
            console.log(data);
            const updateQuery = `UPDATE COURSE SET THUMBNAIL = :thumbnail, VIDEO= :video, TITLE= :title, DESCRIPTION=:description, MENTOR= :mentor, LESSON= :lesson, EXERCISES= :exercises, TEST= :test, PRICE= :price, DISCOUNTPRICE= :discountprice WHERE UID=:courseUID`;
            const [basicCourse] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, data), { courseUID }));
            const response = [];
            const learnQuery = `UPDATE WHATYOULEARN SET LEARN= :learn WHERE UID= :courseUID`;
            let array = JSON.parse(course.learn);
            for (const singleData of array) {
                const res = yield (0, sql_query_util_1.executeQuery)(learnQuery, sequelize_1.QueryTypes.UPDATE, { learn: singleData, courseUID });
                response.push(res);
            }
            return { basicCourse, response };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateuploadCourse()`, error);
            throw error;
        }
    });
}
exports.updateuploadCourse = updateuploadCourse;
function deleteuploadCourse(courseUID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteuploadCourse() ==>`, courseUID);
            const checkQuery = 'DELETE  FROM `COURSE` WHERE UID=:courseUID';
            const basicCourse = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.DELETE, { courseUID });
            return basicCourse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteuploadCourse()`, error);
            throw error;
        }
    });
}
exports.deleteuploadCourse = deleteuploadCourse;
// courses
function coursesPost(user, coursetype) {
    return __awaiter(this, void 0, void 0, function* () {
        const course_id = crypto.randomUUID();
        logger_1.default.info(`${TAG}.coursesPost()`);
        try {
            const courseInsertQuery = `INSERT INTO courses(course_id, thumbnail, title, description, mentor, lesson, exercises, test, price, discountPrice,video,type) 
VALUES (:course_id,:thumbnail,:title, :description, :mentor, :lesson, :exercises, :test, :price, :discountPrice,:video,:type)`;
            let [course] = yield (0, sql_query_util_1.executeQuery)(courseInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { coursetype, course_id: course_id }));
            return course;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursesPost()`, error);
            throw error;
        }
    });
}
exports.coursesPost = coursesPost;
function checkCoureUid(course_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkCoureUid()  ==>`, course_id);
            let query = 'select * from courses_parts where course_id=:course_id';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                course_id
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkCoureUid()`, error);
            throw error;
        }
    });
}
exports.checkCoureUid = checkCoureUid;
function coursePartPost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const part_id = crypto.randomUUID();
        logger_1.default.info(`${TAG}.coursePartPost()`);
        try {
            const coursePartInsertQuery = `
    INSERT INTO courses_parts 
    (course_id,part_id,partTitle, description,lessons,duration,exercises,tests) 
    VALUES (:course_id, :part_id, :partTitle, :description, :lessons, :duration, :exercises, :tests)`;
            let [coursePart] = yield (0, sql_query_util_1.executeQuery)(coursePartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { part_id: part_id }));
            return coursePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursePartPost()`, error);
            throw error;
        }
    });
}
exports.coursePartPost = coursePartPost;
function getPart(part_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getPart()  ==>`, part_id);
            let query = "select * from courses_parts where part_id = :part_id";
            const [personalDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                part_id
            });
            return personalDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getPart()`, error);
            throw error;
        }
    });
}
exports.getPart = getPart;
function modulesPost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const module_id = crypto.randomUUID();
        logger_1.default.info(`${TAG}.modulesPost()`);
        try {
            const coursePartInsertQuery = `
    INSERT INTO modules 
    (part_id,module_id,module_name,description,lesson,test,exercises,hours) 
    VALUES (:part_id, :module_id,:module_name,:description,:lesson, :test,:exercises,:hours)`;
            let [coursePart] = yield (0, sql_query_util_1.executeQuery)(coursePartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { module_id: module_id }));
            return coursePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.modulesPost()`, error);
            throw error;
        }
    });
}
exports.modulesPost = modulesPost;
function checkPartUid(part_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkPartUid()  ==>`, part_id);
            let query = 'select * from modules where part_id=:part_id';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                part_id
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkPartUid()`, error);
            throw error;
        }
    });
}
exports.checkPartUid = checkPartUid;
function getModule(module_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getModule()  ==>`, module_id);
            let query = "select * from modules where module_id = :module_id";
            const [personalDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                module_id
            });
            return personalDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getModule()`, error);
            throw error;
        }
    });
}
exports.getModule = getModule;
//lessonPost
function lessonPost(lessonData) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.lessonPost()`);
        const lesson_id = crypto.randomUUID();
        console.log(lesson_id);
        try {
            const lessonPartInsertQuery = `
    INSERT INTO lesson 
    (LESSON_ID, MODULE_ID, LESSON_NAME, POINTS, VIDEO, THUMBNAIL, ATTACHMENTS) 
    VALUES (:lesson_id, :module_id, :lesson_name, :points, :video, :thumbnail, :attachments)`;
            let [testPart] = yield (0, sql_query_util_1.executeQuery)(lessonPartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, lessonData), { lesson_id: lesson_id }));
            return testPart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.lessonPost()`, error);
            throw error;
        }
    });
}
exports.lessonPost = lessonPost;
function checkModuleUid(module_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkModuleUid()  ==>`, module_id);
            let query = `
      SELECT module_id FROM lesson WHERE MODULE_ID = :module_id
      UNION ALL
      SELECT module_id FROM test WHERE MODULE_ID = :module_id
      UNION ALL
      SELECT module_id FROM exercise WHERE MODULE_ID = :module_id
    `;
            const [result] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                module_id
            });
            return result;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkModuleUid()`, error);
            throw error;
        }
    });
}
exports.checkModuleUid = checkModuleUid;
function getLessonPost(lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getLessonPost()  ==>`, lesson_id);
            let query = "select * from lesson where LESSON_ID = :lesson_id";
            const [lessonDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                lesson_id
            });
            return lessonDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getLessonPost()`, error);
            throw error;
        }
    });
}
exports.getLessonPost = getLessonPost;
function deleteLessonPost(lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getLessonPost()  ==>`, lesson_id);
            let query = "DELETE FROM lesson WHERE LESSON_ID = :lesson_id";
            const lessonDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                lesson_id
            });
            return lessonDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getLessonPost()`, error);
            throw error;
        }
    });
}
exports.deleteLessonPost = deleteLessonPost;
// testPost
function testPost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const test_id = crypto.randomUUID();
        logger_1.default.info(`${TAG}.testPost()`);
        try {
            const testInsertQuery = `
    INSERT INTO test 
    (TEST_ID,MODULE_ID,TEST_TYPE, MARKS,POINTS,TEST_NAME) 
    VALUES (:test_id, :module_id, :test_type, :marks ,:points,:test_name)`;
            let [testPart] = yield (0, sql_query_util_1.executeQuery)(testInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { test_id: test_id }));
            return testPart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.testPost()`, error);
            throw error;
        }
    });
}
exports.testPost = testPost;
function getTestPost(test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getTestPost()  ==>`, test_id);
            let query = "select * from test where TEST_ID = :test_id";
            const [testDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                test_id
            });
            return testDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getTestPost()`, error);
            throw error;
        }
    });
}
exports.getTestPost = getTestPost;
function deleteTestPost(test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteTestPost()  ==>`, test_id);
            let query = "DELETE FROM test WHERE TEST_ID = :test_id";
            const testDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                test_id
            });
            return testDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteTestPost()`, error);
            throw error;
        }
    });
}
exports.deleteTestPost = deleteTestPost;
// exercisesPost
function exercisesPost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const exercise_id = crypto.randomUUID();
        logger_1.default.info(`${TAG}.exercisesPost()`);
        try {
            const exerciseInsertQuery = `
    INSERT INTO exercise 
    (EXERCISE_ID,MODULE_ID,QUESTION_NAME, MARKS,QUESTION_TYPE,POINTS) 
    VALUES (:exercise_id, :module_id, :question_name, :marks,:question_type,points)`;
            let [exercisePart] = yield (0, sql_query_util_1.executeQuery)(exerciseInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { exercise_id: exercise_id }));
            return exercisePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.exercisesPost()`, error);
            throw error;
        }
    });
}
exports.exercisesPost = exercisesPost;
function getExercisePost(exercise_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getTestPost()  ==>`, exercise_id);
            let query = "select * from exercise where EXERCISE_ID = :exercise_id";
            const [exerciseDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                exercise_id
            });
            return exerciseDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getTestPost()`, error);
            throw error;
        }
    });
}
exports.getExercisePost = getExercisePost;
function deleteExercisePost(exercise_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteExercisePost()  ==>`, exercise_id);
            let query = "DELETE FROM exercise WHERE EXERCISE_ID = :exercise_id";
            const [exerciseDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                exercise_id
            });
            return exerciseDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteExercisePost()`, error);
            throw error;
        }
    });
}
exports.deleteExercisePost = deleteExercisePost;
//UPDATE QUERY
function updateCoursePartPost(user, part_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCoursePartPost()`);
        try {
            let updateCoursePartPostQuery = `UPDATE courses_parts SET
    partTitle= :partTitle, description = :description, lessons = :lessons, duration = :duration, exercises =:exercises, tests = :tests WHERE part_id = :part_id`;
            const updateCoursePartPosts = yield (0, sql_query_util_1.executeQuery)(updateCoursePartPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { part_id: part_id }));
            return updateCoursePartPosts;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCoursePartPost()`, error);
            throw error;
        }
    });
}
exports.updateCoursePartPost = updateCoursePartPost;
function updateModulesPost(user, module_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateModulesPost()`);
        try {
            let updateModulesPostQuery = `UPDATE modules SET
    module_name= :module_name, description = :description, lesson = :lesson, test = :test, exercises =:exercises, hours = :hours WHERE module_id = :module_id`;
            const updateModulesPort = yield (0, sql_query_util_1.executeQuery)(updateModulesPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { module_id }));
            return updateModulesPort;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateModulesPost()`, error);
            throw error;
        }
    });
}
exports.updateModulesPost = updateModulesPost;
function checkLearnId(learnId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkLearnId()  ==>`, learnId);
            let query = 'select * from whatyoulearn where ID= :learnId';
            const [learnID] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                learnId: learnId.id
            });
            console.log("learn_id", [learnID]);
            return learnID;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkLearnId()`, error);
            throw error;
        }
    });
}
exports.checkLearnId = checkLearnId;
function updateLessonPost(user, lesson_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateLessonPost()`);
        try {
            let updateLessonPostQuery = `UPDATE lesson SET
    LESSON_NAME= :lesson_name, POINTS = :points, VIDEO = :video, THUMBNAIL = :thumbnail, ATTACHMENTS =:attachments WHERE LESSON_ID = :lesson_id`;
            const updateLessonPost = yield (0, sql_query_util_1.executeQuery)(updateLessonPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { lesson_id }));
            return updateLessonPost;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateLessonPost()`, error);
            throw error;
        }
    });
}
exports.updateLessonPost = updateLessonPost;
function updateTestPost(user, test_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateTestPost()`);
        try {
            let updateTestPostQuery = `UPDATE test SET
    TEST_TYPE= :test_type, MARKS = :marks, POINTS = :points, TEST_NAME = :test_name WHERE TEST_ID = :test_id`;
            const updateTestPost = yield (0, sql_query_util_1.executeQuery)(updateTestPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { test_id }));
            return updateTestPost;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateTestPost()`, error);
        }
    });
}
exports.updateTestPost = updateTestPost;
function deleteLearnId(learnId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteLearnId()  ==>`, learnId);
            console.log(learnId);
            let query = "DELETE FROM whatyoulearn WHERE ID = :Id";
            const [learnDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                Id: learnId.id
            });
            return learnDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteLearnId()`, error);
            throw error;
        }
    });
}
exports.deleteLearnId = deleteLearnId;
function updateExercisesPost(user, exercise_id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateExercisesPost()`);
        try {
            let updateExercisesPostQuery = `UPDATE exercise SET
    QUESTION_NAME= :question_name, MARKS = :marks, QUESTION_TYPE = :question_type, points = :points WHERE EXERCISE_ID = :exercise_id`;
            const updateExercisesPost = yield (0, sql_query_util_1.executeQuery)(updateExercisesPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { exercise_id }));
            return updateExercisesPost;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateExercisesPost()`, error);
            throw error;
        }
    });
}
exports.updateExercisesPost = updateExercisesPost;
