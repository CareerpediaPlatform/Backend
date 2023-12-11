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
exports.getPartDetail = exports.getMyCourses = exports.getCourses = exports.getCourseOverview = void 0;
const logger_1 = __importDefault(require("../../../../logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
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
