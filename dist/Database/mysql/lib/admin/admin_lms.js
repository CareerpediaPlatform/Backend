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
exports.getAllCourseList = exports.checkExerciseUid = exports.checkTestUid = exports.checkLessonUid = exports.deleteCourseModule = exports.deleteCoursePart = exports.updateExercisesPost = exports.deleteLearnId = exports.updateTestPost = exports.updateLessonPost = exports.checkLearnId = exports.updateModulesPost = exports.updateCoursePartPost = exports.deleteExercisePost = exports.getExercisePost = exports.exercisesPost = exports.deleteTestPost = exports.getTestPost = exports.testPost = exports.deleteLessonPost = exports.getLessonPost = exports.checkModuleUid = exports.lessonPost = exports.getModule = exports.checkPartUid = exports.modulesPost = exports.getPart = exports.coursePartPost = exports.checkCoureUid = exports.coursesPost = exports.deleteuploadCourse = exports.updateuploadCourse = exports.getuploadCourse = exports.checkCourseIdExist = exports.uploadCourses = exports.getAllCourses = exports.getMyCourse = exports.getMyCourses = exports.getPartDetail = exports.getCourses = exports.getCourseOverview = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user_lms';
function getCourseOverview(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(courseUid);
        try {
            logger_1.default.info(`${TAG}.getCourseOverview()  ==>`);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            let query = `SELECT
  c.video AS video,
  c.title AS title,
  MAX(c.description) AS description,
  MAX(c.mentor) AS mentor,
  MAX(c.COURSE_UID) AS id,
  MAX(c.type) AS type,
  (
   select JSON_ARRAYAGG(
      JSON_OBJECT(
      'id',wyl.ID,
      'learn',wyl.LEARN
      )
      ) FROM WHAT_YOU_LEARN AS wyl WHERE wyl.COURSE_UID=c.COURSE_UID
  ) AS whatyoulearn,
    (
   select JSON_ARRAYAGG(
      JSON_OBJECT(
      'partUid',p.PART_UID,
      'title',p.PART_TITLE,
    'modules',(
     select JSON_ARRAYAGG(
      JSON_OBJECT(
        'moduleId',m.MODULE_UID,
      'name',m.MODULE_NAME,
      'Lessons',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'lessonId',l.LESSON_UID,
      'lesson',l.LESSON_NAME,
      'points',l.POINTS
      )) FROM LESSON_MODULES AS l WHERE l.MODULE_UID=m.MODULE_UID),
        'tests',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'testId',t.TEST_UID,
      'test',t.TEST_NAME,
      'points',t.POINTS,
      'marks',t.MARKS
      )) FROM TEST_MODULES AS t WHERE t.MODULE_UID=m.MODULE_UID),
            'exercise',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'exerciseId',e.EXERCISE_UID,
      'exercise',e.QUESTION_NAME,
      'points',e.POINTS,
      'marks',e.MARKS
      )) FROM EXERCISE_MODULES AS e WHERE e.MODULE_UID=m.MODULE_UID)
      )
      ) FROM COURSE_MODULE AS m  where m.PART_UID=p.PART_UID)
      )
      ) FROM COURSE_PART AS p  WHERE p.COURSE_UID=c.COURSE_UID
  ) AS courseParts
FROM COURSE_OVERVIEW AS c
WHERE c.COURSE_UID = :courseUid
GROUP BY
  c.video,
  c.title,
  c.mentor,
  c.COURSE_UID,
  c.type;`;
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { courseUid: courseUid });
            return results;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getCourseOverview()`, error);
            throw error;
        }
    });
}
exports.getCourseOverview = getCourseOverview;
function getCourses(type) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(type);
        try {
            logger_1.default.info(`${TAG}.getCourses()  ==>`);
            let query = `SELECT * FROM COURSE_OVERVIEW WHERE TYPE=:type`;
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { type: type });
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
function getMyCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getMyCourse()  ==>`);
            const query = 'SELECT * FROM COURSE_OVERVIEW WHERE COURSE_UID=:courseUid';
            const results = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { courseUid: courseUid });
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
function uploadCourses(fileDetails, course, type) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadVideoFile()`);
        try {
            const courseUid = crypto.randomUUID();
            console.log(courseUid);
            const data = {
                courseUid: courseUid,
                video: fileDetails.fileUrl,
                title: course.title,
                description: course.description,
                mentor: course.mentor,
                lesson: course.lesson,
                exercises: course.exercises,
                test: course.test,
                price: course.price,
                discount: course.discount,
                filePath: fileDetails.filePath,
            };
            const videoInsertQuery = `INSERT INTO COURSE_OVERVIEW (COURSE_UID, VIDEO, TITLE, DESCRIPTION, MENTOR, LESSON, EXERCISES, TEST, PRICE, DISCOUNT, TYPE )
    VALUES(:courseUid,:video, :title, :description, :mentor, :lesson, :exercises, :test, :price, :discount, :type )`;
            const response = [];
            const learnQuery = `INSERT INTO  WHAT_YOU_LEARN
    ( COURSE_UID,LEARN)
     values( :courseUid,:learn )`;
            let array = JSON.parse(course.learn);
            for (const singleData of array) {
                const res = yield (0, sql_query_util_1.executeQuery)(learnQuery, sequelize_1.QueryTypes.INSERT, { learn: singleData, courseUid: courseUid });
                response.push(res);
            }
            const [coursedata] = yield (0, sql_query_util_1.executeQuery)(videoInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), type));
            return { coursedata, courseUid, response };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFile()`, error);
            throw error;
        }
    });
}
exports.uploadCourses = uploadCourses;
function checkCourseIdExist(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(courseUid);
        try {
            logger_1.default.info(`${TAG}.checkCourseIdExist() ==>`, courseUid);
            const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { courseUid });
            return basic; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkCourseIdExist()`, error);
            throw error;
        }
    });
}
exports.checkCourseIdExist = checkCourseIdExist;
function getuploadCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getuploadCourse() ==>`, courseUid);
            const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUid';
            const getQuery = 'SELECT * FROM `WHAT_YOU_LEARN` WHERE COURSE_UID= :courseUid';
            const [basicCourse] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { courseUid });
            const basicCourseLearn = yield (0, sql_query_util_1.executeQuery)(getQuery, sequelize_1.QueryTypes.SELECT, { courseUid });
            return { basicCourse, basicCourseLearn };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.getuploadCourse = getuploadCourse;
function updateuploadCourse(fileDetails, courseUid, course) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateuploadCourse() ==>`, courseUid);
            const data = {
                courseUid: courseUid,
                // thumbnail: imageDetails.fileUrl,
                video: fileDetails.fileUrl,
                title: course.title,
                description: course.description,
                mentor: course.mentor,
                lesson: course.lesson,
                exercises: course.exercises,
                test: course.test,
                price: course.price,
                discount: course.discount,
                learn: course.learn
            };
            console.log(course);
            console.log(data);
            const updateQuery = `UPDATE COURSE_OVERVIEW SET  VIDEO= :video, TITLE= :title, DESCRIPTION=:description, MENTOR= :mentor, LESSON= :lesson, EXERCISES= :exercises, TEST= :test, PRICE= :price, DISCOUNT= :discount WHERE COURSE_UID=:courseUid`;
            const [basicCourse] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, data), { courseUid }));
            const response = [];
            const learnQuery = `UPDATE WHAT_YOU_LEARN SET LEARN= :learn WHERE COURSE_UID= :courseUid`;
            let array = JSON.parse(course.learn);
            for (const singleData of array) {
                const res = yield (0, sql_query_util_1.executeQuery)(learnQuery, sequelize_1.QueryTypes.UPDATE, { learn: singleData, courseUid });
                response.push(res);
            }
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateuploadCourse()`, error);
            throw error;
        }
    });
}
exports.updateuploadCourse = updateuploadCourse;
function deleteuploadCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteuploadCourse() ==>`, courseUid);
            const checkQuery = 'DELETE  FROM `COURSE_OVERVIEW` WHERE COURSE_UID=:courseUid';
            const basicCourse = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.DELETE, { courseUid });
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
        const course_uid = crypto.randomUUID();
        logger_1.default.info(`${TAG}.coursesPost()`);
        try {
            const courseInsertQuery = `INSERT INTO COURSE_OVERVIEW(COURSE_UID, TITLE, DESCRIPTION, PRICE, DISCOUNT, THUMBNAIL, VIDEO, MENTOR, LESSON, EXERCISES,TEST,TYPE) 
VALUES (:course_uid,:title, :description, :price, :discountPrice,:thumbnail,:video, :mentor, :lesson, :exercises, :test,:type)`;
            let [course] = yield (0, sql_query_util_1.executeQuery)(courseInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { coursetype, course_uid: course_uid }));
            return course;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursesPost()`, error);
            throw error;
        }
    });
}
exports.coursesPost = coursesPost;
function checkCoureUid(coureUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkCoureUid()  ==>`, coureUid);
            let query = 'select * from COURSE_PART where COURSE_UID=:coureUid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                coureUid
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
        const partUid = crypto.randomUUID();
        logger_1.default.info(`${TAG}.coursePartPost()`);
        console.log(user);
        console.log(user.coureUid);
        try {
            const coursePartInsertQuery = `
    INSERT INTO COURSE_PART 
    (COURSE_UID,PART_UID,PART_TITLE, DESCRIPTION,LESSONS,DURATION,EXERCISES,TESTS) 
    VALUES (:courseUid, :partUid, :partTitle, :description, :lessons, :duration, :exercises, :tests)`;
            let [coursePart] = yield (0, sql_query_util_1.executeQuery)(coursePartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { partUid: partUid }));
            return coursePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.coursePartPost()`, error);
            throw error;
        }
    });
}
exports.coursePartPost = coursePartPost;
function getPart(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getPart()  ==>`, partUid);
            let query = "select * from COURSE_PART where PART_UID = :partUid";
            const [personalDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                partUid
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
        const moduleUid = crypto.randomUUID();
        logger_1.default.info(`${TAG}.modulesPost()`);
        try {
            const coursePartInsertQuery = `
    INSERT INTO COURSE_MODULE 
    (PART_UID,MODULE_UID,MODULE_NAME,DESCRIPTION,MENTOR,LESSONS,EXERCISES,TESTS) 
    VALUES (:partUid, :moduleUid,:moduleName,:description,:mentor, :lesson,:exercises,:tests)`;
            let [coursePart] = yield (0, sql_query_util_1.executeQuery)(coursePartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { moduleUid: moduleUid }));
            return coursePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.modulesPost()`, error);
            throw error;
        }
    });
}
exports.modulesPost = modulesPost;
function checkPartUid(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkPartUid()  ==>`, partUid);
            let query = 'select * from COURSE_MODULE where PART_UID=:partUid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                partUid
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
function getModule(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getModule()  ==>`, moduleUid);
            let query = "select * from COURSE_MODULE where MODULE_UID = :moduleUid";
            const [personalDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                moduleUid
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
function lessonPost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.lessonPost()`);
        const lessonUid = crypto.randomUUID();
        console.log(lessonUid);
        try {
            const lessonPartInsertQuery = `
    INSERT INTO LESSON_MODULES 
    (LESSON_UID, MODULE_UID, LESSON_NAME, POINTS, VIDEO, THUMBNAIL, ATTACHMENTS) 
    VALUES (:lessonUid, :moduleUid, :lessonName, :points, :video, :thumbnail, :attachments)`;
            let [testPart] = yield (0, sql_query_util_1.executeQuery)(lessonPartInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { lessonUid: lessonUid }));
            return testPart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.lessonPost()`, error);
            throw error;
        }
    });
}
exports.lessonPost = lessonPost;
function checkModuleUid(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkModuleUid()  ==>`, moduleUid);
            let query = `
      SELECT MODULE_UID FROM LESSON_MODULES WHERE MODULE_UID = :moduleUid
      UNION ALL
      SELECT MODULE_UID FROM TEST_MODULES WHERE MODULE_UID = :moduleUid
      UNION ALL
      SELECT MODULE_UID FROM EXERCISE_MODULES WHERE MODULE_UID = :moduleUid
    `;
            const [result] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                moduleUid
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
function getLessonPost(lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getLessonPost()  ==>`, lessonUid);
            let query = "select * from LESSON_MODULES where MODULE_UID = :lessonUid";
            const lessonDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                lessonUid
            });
            // const data={
            //   lessonDetails: Object.values(lessonDetails)
            // }
            return lessonDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getLessonPost()`, error);
            throw error;
        }
    });
}
exports.getLessonPost = getLessonPost;
function deleteLessonPost(lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getLessonPost()  ==>`, lessonUid);
            let query = "DELETE FROM LESSON_MODULES WHERE LESSON_UID = :lessonUid";
            const lessonDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                lessonUid
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
        const testUid = crypto.randomUUID();
        logger_1.default.info(`${TAG}.testPost()`);
        try {
            const testInsertQuery = `
    INSERT INTO TEST_MODULES 
    (TEST_UID,MODULE_UID,TEST_TYPE, MARKS,POINTS,TEST_NAME) 
    VALUES (:testUid, :moduleUid, :testType, :marks ,:points,:testName)`;
            let [testPart] = yield (0, sql_query_util_1.executeQuery)(testInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { testUid: testUid }));
            return testPart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.testPost()`, error);
            throw error;
        }
    });
}
exports.testPost = testPost;
function getTestPost(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getTestPost()  ==>`, moduleUid);
            let query = "select * from TEST_MODULES where MODULE_UID = :moduleUid";
            const testDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                moduleUid
            });
            const data = {
                testDetails: Object.values(testDetails)
            };
            return Object.assign({}, data);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getTestPost()`, error);
            throw error;
        }
    });
}
exports.getTestPost = getTestPost;
function deleteTestPost(testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteTestPost()  ==>`, testUid);
            let query = "DELETE FROM TEST_MODULES WHERE TEST_UID = :testUid";
            const testDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                testUid
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
        const exerciseUid = crypto.randomUUID();
        logger_1.default.info(`${TAG}.exercisesPost()`);
        try {
            const exerciseInsertQuery = `
    INSERT INTO EXERCISE_MODULES 
    (EXERCISE_UID,MODULE_UID,QUESTION_NAME, QUESTION_TYPE,MARKS,POINTS,OPTION1,OPTION2,OPTION3,OPTION4,ANSWER) 
    VALUES (:exerciseUid, :moduleUid, :questionName, :questionType,:marks,:points,:option1,:option2,:option3,:option4,:answer)`;
            let [exercisePart] = yield (0, sql_query_util_1.executeQuery)(exerciseInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user), { exerciseUid: exerciseUid }));
            return exercisePart;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.exercisesPost()`, error);
            throw error;
        }
    });
}
exports.exercisesPost = exercisesPost;
function getExercisePost(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getTestPost()  ==>`, moduleUid);
            let query = "select * from EXERCISE_MODULES where MODULE_UID = :moduleUid";
            const exerciseDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                moduleUid
            });
            const data = {
                exerciseDetails: Object.values(exerciseDetails)
            };
            return Object.assign({}, data);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getTestPost()`, error);
            throw error;
        }
    });
}
exports.getExercisePost = getExercisePost;
function deleteExercisePost(exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteExercisePost()  ==>`, exerciseUid);
            let query = "DELETE FROM EXERCISE_MODULES WHERE EXERCISE_UID = :exerciseUid";
            const exerciseDetails = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                exerciseUid
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
function updateCoursePartPost(user, partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCoursePartPost()`);
        try {
            let updateCoursePartPostQuery = `UPDATE COURSE_PART SET
    PART_TITLE= :partTitle, DESCRIPTION = :description, LESSONS = :lessons, DURATION = :duration, EXERCISES =:exercises, TESTS = :tests WHERE PART_UID = :partUid`;
            const updateCoursePartPosts = yield (0, sql_query_util_1.executeQuery)(updateCoursePartPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { partUid: partUid }));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCoursePartPost()`, error);
            throw error;
        }
    });
}
exports.updateCoursePartPost = updateCoursePartPost;
function updateModulesPost(user, moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateModulesPost()`);
        try {
            let updateModulesPostQuery = `UPDATE COURSE_MODULE SET
    MODULE_NAME= :moduleName, DESCRIPTION = :description, MENTOR = :mentor, LESSONS = :lesson, EXERCISES =:exercises, TESTS = :tests WHERE MODULE_UID = :moduleUid`;
            const updateModulesPort = yield (0, sql_query_util_1.executeQuery)(updateModulesPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { moduleUid }));
            return user;
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
            let query = 'select * from WHAT_YOU_LEARN where ID= :learnId';
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
function updateLessonPost(user, lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateLessonPost()`);
        try {
            const data = {
                lessonUid: lessonUid,
                lessonName: user.lessonName,
                points: user.points,
                video: user.video,
                thumbnail: user.thumbnail,
                attachments: user.attachments
            };
            let updateLessonPostQuery = `UPDATE LESSON_MODULES SET
    LESSON_NAME= :lessonName, POINTS = :points, VIDEO = :video, THUMBNAIL = :thumbnail, ATTACHMENTS =:attachments WHERE LESSON_UID = :lessonUid`;
            const updateLessonPost = yield (0, sql_query_util_1.executeQuery)(updateLessonPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, data), { lessonUid }));
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateLessonPost()`, error);
            throw error;
        }
    });
}
exports.updateLessonPost = updateLessonPost;
function updateTestPost(user, testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateTestPost()`);
        try {
            let updateTestPostQuery = `UPDATE TEST_MODULES SET
    TEST_TYPE= :testType, MARKS = :marks, POINTS = :points, TEST_NAME = :testName WHERE TEST_UID = :testUid`;
            const updateTestPost = yield (0, sql_query_util_1.executeQuery)(updateTestPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { testUid }));
            return user;
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
            let query = "DELETE FROM WHAT_YOU_LEARN WHERE ID = :Id";
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
function updateExercisesPost(user, exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateExercisesPost()`);
        try {
            let updateExercisesPostQuery = `UPDATE EXERCISE_MODULES SET
    QUESTION_NAME= :questionName, MARKS = :marks, POINTS = :points, OPTION1 = :option1,OPTION2 = :option2,OPTION3 = :option3,OPTION4 = :option4,ANSWER = :answer WHERE EXERCISE_UID = :exerciseUid`;
            const updateExercisesPost = yield (0, sql_query_util_1.executeQuery)(updateExercisesPostQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user), { exerciseUid }));
            return updateExercisesPost;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateExercisesPost()`, error);
            throw error;
        }
    });
}
exports.updateExercisesPost = updateExercisesPost;
//DELETE
function deleteCoursePart(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteCoursePart() ==>`, partUid);
            const checkQuery = 'DELETE  FROM `COURSE_PART` WHERE PART_UID=:partUid';
            const basicCourse = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.DELETE, { partUid });
            return basicCourse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCoursePart()`, error);
            throw error;
        }
    });
}
exports.deleteCoursePart = deleteCoursePart;
function deleteCourseModule(moduleUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteCourseModule() ==>`, moduleUid);
            const checkQuery = 'DELETE  FROM `COURSE_MODULE` WHERE MODULE_UID=:moduleUid';
            const basicCourse = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.DELETE, { moduleUid });
            return basicCourse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteCourseModule()`, error);
            throw error;
        }
    });
}
exports.deleteCourseModule = deleteCourseModule;
function checkLessonUid(lessonUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkLessonUid()  ==>`, lessonUid);
            let query = "select * from LESSON_MODULES where LESSON_UID = :lessonUid";
            const [lessonDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                lessonUid
            });
            return lessonDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkLessonUid()`, error);
            throw error;
        }
    });
}
exports.checkLessonUid = checkLessonUid;
function checkTestUid(testUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkTestUid()  ==>`, testUid);
            let query = "select * from TEST_MODULES where TEST_UID = :testUid";
            const [testDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                testUid
            });
            return testDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkTestUid()`, error);
            throw error;
        }
    });
}
exports.checkTestUid = checkTestUid;
function checkExerciseUid(exerciseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExerciseUid()  ==>`, exerciseUid);
            let query = "select * from EXERCISE_MODULES where EXERCISE_UID = :exerciseUid";
            const [exerciseDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                exerciseUid
            });
            return exerciseDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkExerciseUid()`, error);
            throw error;
        }
    });
}
exports.checkExerciseUid = checkExerciseUid;
function getAllCourseList(type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllCourseList()  ==>`, type);
            console.log(type);
            let query = "select * from COURSE_OVERVIEW where TYPE = :type";
            const courseList = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                type
            });
            // const data={
            //   exerciseDetails: Object.values(exerciseDetails)
            // }
            return courseList;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllCourseList()`, error);
            throw error;
        }
    });
}
exports.getAllCourseList = getAllCourseList;
