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
exports.getAllThreadsPart = exports.getAllThreadsCourse = exports.postThreadreply = exports.getSingleThread = exports.uploadThread = exports.getAllNotes = exports.uploadNote = exports.getAllAssignments = exports.uploadAssignment = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = 'data_stores_mysql_lib_student_assignment';
function uploadAssignment(fileDetails, uid, partId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadAssignment()`);
        try {
            const data = {
                uid: uid,
                assignment: fileDetails.fileUrl,
                filePath: fileDetails.filePath,
                partId: partId.partId
            };
            const InsertQuery = `INSERT INTO ASSIGNMENT (UID,  ASSIGNMENT, PART_ID)
      VALUES(:uid, :assignment, :partId)`;
            const assignmentdata = yield (0, sql_query_util_1.executeQuery)(InsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return assignmentdata;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadAssignment()`, error);
            throw error;
        }
    });
}
exports.uploadAssignment = uploadAssignment;
function getAllAssignments(partId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllAssignments() ==>`, uid);
            const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE UID= :uid and PART_ID= :partId';
            const getAllAssignments = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                uid, partId: partId.partId
            });
            return getAllAssignments;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
            throw error;
        }
    });
}
exports.getAllAssignments = getAllAssignments;
function uploadNote(student, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadNote()`);
        try {
            const data = {
                uid: uid,
                note: student.note
            };
            console.log(data);
            const InsertQuery = `INSERT INTO NOTE (UID,  NOTE)
      VALUES(:uid, :note)`;
            const [notedata] = yield (0, sql_query_util_1.executeQuery)(InsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return notedata;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadNote()`, error);
            throw error;
        }
    });
}
exports.uploadNote = uploadNote;
function getAllNotes(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllNotes() ==>`, uid);
            const checkQuery = 'SELECT * FROM NOTE WHERE UID= :uid';
            const getAllNotes = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return getAllNotes;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllNotes()`, error);
            throw error;
        }
    });
}
exports.getAllNotes = getAllNotes;
function uploadThread(thread, uid, partId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadThread()`);
        try {
            const data = {
                uid: uid,
                title: thread.title,
                description: thread.description,
                partId: partId.partId
            };
            console.log(data);
            const InsertQuery = `INSERT INTO STUDENT_THREAD (UID,  TITLE, DESCRIPTION, PART_ID)
      VALUES(:uid, :title, :description, :partId)`;
            const [threaddata] = yield (0, sql_query_util_1.executeQuery)(InsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return threaddata;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadThread()`, error);
            throw error;
        }
    });
}
exports.uploadThread = uploadThread;
//************************* Get Single ThreadId student uid************ */
function getSingleThread(partId, threadId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getSingleThread() ==>`, partId, threadId, uid);
            const query = `SELECT st.TITLE,st.DESCRIPTION,(
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT( 'reply', tr.REPLY  )
        ) FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID)AS replay FROM student_thread st WHERE ST.UID= :uid AND ST.THREAD_ID= :THREAD_ID AND PART_ID= :partId`;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { partId: partId.partId, THREAD_ID: threadId.threadID, uid });
            return Thread;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleThread()`, error);
            throw error;
        }
    });
}
exports.getSingleThread = getSingleThread;
function postThreadreply(reply, threadId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.posthtreadreply()`);
        try {
            const response = [];
            const insertQuery = `INSERT INTO thread_reply (THREAD_ID,Uid,REPLY, REPLYTO) 
      VALUES (:threadId, :uid, :reply, :replyto)`;
            for (const data of reply) {
                const res = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid: uid.uid, threadId: threadId.threadID }));
                response.push(res);
            }
            return Object.assign({}, response);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.posthtreadreply()`, error);
            throw error;
        }
    });
}
exports.postThreadreply = postThreadreply;
function getAllThreadsCourse(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsCourse() ==>`, courseId);
            const query = `SELECT c.thumbnail,c.title,'part',(
        SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                           'part', cp.partTitle,'threads',(
                            SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                           'title',st.TITLE,
                           'description',st.DESCRIPTION,
                           'reply',(
                           SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                            'REPLY', tr.REPLY
                           ))FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID
                           ))
                           ) FROM student_thread st WHERE ST.PART_ID=cp.part_id
                           ) 
                           )
                       )  FROM Courses_Parts cp where c.course_id = cp.course_id 
       ) AS part FROM courses c WHERE course_id=:courseId`;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { courseId: courseId });
            return Thread;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsCourse()`, error);
            throw error;
        }
    });
}
exports.getAllThreadsCourse = getAllThreadsCourse;
function getAllThreadsPart(partId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsPart() ==>`, partId);
            const query = `SELECT st.TITLE,st.DESCRIPTION,(
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                             'reply', tr.REPLY
            )
        ) FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID
        )AS replay FROM student_thread st WHERE ST.PART_ID=:partId;
  `;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { partId: partId });
            return Thread;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsPart()`, error);
            throw error;
        }
    });
}
exports.getAllThreadsPart = getAllThreadsPart;
