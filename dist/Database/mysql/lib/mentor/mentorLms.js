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
exports.getSingleRemark = exports.postThreadreply = exports.checkAssignmentId = exports.giveRemark = exports.getAllAssignments = void 0;
const logger_1 = __importDefault(require("../../../../logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = 'data_stores_mysql_lib_mentor_lms';
function getAllAssignments(partId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllAssignments() ==>`, partId);
            const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE PART_ID= :partId';
            const getAllAssignments = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                partId: partId.partId
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
function giveRemark(remark, assignmentId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getAllAssignments() ==>`, assignmentId);
            const query = `UPDATE ASSIGNMENT SET REMARKS= :remark,MENTOR_ID= :uid WHERE ASSIGNMENT_ID= :assignmentId`;
            const Remark = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, remark), { assignmentId, uid }));
            return Remark;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
            throw error;
        }
    });
}
exports.giveRemark = giveRemark;
function checkAssignmentId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkAssignmentId() ==>`, id);
            const query = `SELECT * FROM ASSIGNMENT WHERE ASSIGNMENT_ID= :id`;
            const result = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { id });
            return result;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
            throw error;
        }
    });
}
exports.checkAssignmentId = checkAssignmentId;
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
function getSingleRemark(uid, remarkId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
        console.log(remarkId);
        try {
            logger_1.default.info(`${TAG}.getSingleRemark() ==>`, remarkId, uid);
            const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE MENTOR_ID= :uid AND REMARKS= :remarkId';
            const getAllAssignments = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, {
                remarkId: remarkId.remark_id, uid
            });
            return getAllAssignments;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getSingleRemark()`, error);
            throw error;
        }
    });
}
exports.getSingleRemark = getSingleRemark;
