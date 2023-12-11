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
exports.checkThreadId = exports.getAllThreadsPart = exports.getAllThreadsCourse = exports.postThreadreply = exports.getSingleThread = exports.uploadThread = exports.getAllNotes = exports.uploadNote = exports.getAllAssignments = exports.uploadAssignment = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = 'data_stores_mysql_lib_student_assignment';
function uploadAssignment(fileDetails, uid, partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadAssignment()`);
        try {
            const data = {
                uid: uid,
                assignment: fileDetails.fileUrl,
                filePath: fileDetails.filePath,
                partUid: partUid.partUid
            };
            const InsertQuery = `INSERT INTO STUDENT_ASSIGNMENT (UID, ASSIGNMENT, PART_UID)
      VALUES(:uid, :assignment, :partUid)`;
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
function getAllAssignments(partUid, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllAssignments() ==>`, uid);
            const checkQuery = 'SELECT * FROM STUDENT_ASSIGNMENT WHERE UID= :uid and PART_UID= :partUid';
            const getAllAssignments = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                uid, partUid: partUid.partUid
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
function uploadNote(partUid, uid, note) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadNote()`);
        try {
            const data = {
                uid: uid,
                note: note.note,
                partUid: partUid.partUid
            };
            console.log(data);
            const InsertQuery = `INSERT INTO STUDENT_NOTE (UID, NOTE, PART_UID)
      VALUES(:uid, :note, :partUid)`;
            const [notedata] = yield (0, sql_query_util_1.executeQuery)(InsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadNote()`, error);
            throw error;
        }
    });
}
exports.uploadNote = uploadNote;
function getAllNotes(partUid, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllNotes() ==>`, partUid);
            console.log(partUid);
            const checkQuery = 'SELECT * FROM STUDENT_NOTE WHERE UID= :uid and PART_UID= :partUid';
            const getAllNotes = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                uid, partUid: partUid.partUid
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
function uploadThread(thread, uid, partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadThread()`);
        try {
            const data = {
                uid: uid,
                title: thread.title,
                description: thread.description,
                partUid: partUid.partUid
            };
            console.log(data);
            const InsertQuery = `INSERT INTO STUDENT_THREAD (UID,  TITLE, DESCRIPTION, PART_UID)
      VALUES(:uid, :title, :description, :partUid)`;
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
function getSingleThread(partUid, threadId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(partUid);
            console.log(threadId);
            logger_1.default.info(`${TAG}.getSingleThread() ==>`, partUid, threadId, uid);
            const query = `SELECT st.TITLE, st.DESCRIPTION, (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT('reply', tr.REPLY)
        ) FROM THREAD_REPLY tr WHERE tr.THREAD_ID = st.THREAD_ID
    ) AS replay FROM STUDENT_THREAD st WHERE st.UID = :uid AND st.THREAD_ID = :threadId AND st.PART_UID = :partUid;
    `;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { partUid: partUid.partUid, THREAD_ID: threadId.threadId, uid });
            return Thread;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleThread()`, error);
            throw error;
        }
    });
}
exports.getSingleThread = getSingleThread;
function postThreadreply(reply, uid, partUid, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.posthtreadreply()`);
        try {
            const response = [];
            const insertQuery = `INSERT INTO THREAD_REPLY (THREAD_ID, UID, PART_UID, REPLY, REPLYTO) 
        VALUES (:threadId, :uid, :partUid, :reply, :replyto)`;
            for (const data of reply) {
                const postData = {
                    threadId: threadId.threadId,
                    uid: uid,
                    reply: data.reply,
                    replyto: data.replyto,
                    partUid: partUid.partUid,
                };
                const res = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, postData);
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
function getAllThreadsCourse(courseUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsCourse() ==>`, courseUid);
            //have to add thumbnail 
            const query = `SELECT c.TITLE, 'part', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'part', cp.TITLE,
                'threads', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'title', st.TITLE,
                            'description', st.DESCRIPTION,
                            'reply', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'REPLY', tr.REPLY
                                    )
                                ) FROM THREAD_REPLY tr WHERE tr.THREAD_ID = st.THREAD_ID
                            )
                        )
                    ) FROM STUDENT_THREAD st WHERE st.PART_UID = cp.COURSE_UID
                )
            )
        ) FROM COURSE_OVERVIEW cp WHERE c.COURSE_UID = cp.COURSE_UID
    ) AS COURSE_PART FROM COURSE_OVERVIEW c WHERE c.COURSE_UID = :courseUid;
    `;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { courseUid: courseUid });
            return Thread;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsCourse()`, error);
            throw error;
        }
    });
}
exports.getAllThreadsCourse = getAllThreadsCourse;
function getAllThreadsPart(partUid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllThreadsPart() ==>`, partUid);
            console.log(partUid);
            const query = `SELECT st.TITLE, st.DESCRIPTION,
      (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT('reply', tr.REPLY)
          ) 
          FROM THREAD_REPLY tr 
          WHERE tr.THREAD_ID = st.THREAD_ID
      ) AS replay 
  FROM STUDENT_THREAD st 
  WHERE st.PART_UID = :partUid;
  `;
            const Thread = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { partUid: partUid.partUid });
            return Object.assign(Object.assign({}, Thread), { partUid });
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllThreadsPart()`, error);
            throw error;
        }
    });
}
exports.getAllThreadsPart = getAllThreadsPart;
function checkThreadId(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(threadId);
            logger_1.default.info(`${TAG}.checkPartUid()  ==>`, threadId);
            let query = 'select * from STUDENT_THREAD where THREAD_ID=:threadId';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                threadId: threadId.threadId
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkPartUid()`, error);
            throw error;
        }
    });
}
exports.checkThreadId = checkThreadId;
