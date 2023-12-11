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
exports.recruiterUpdateStatus = exports.getUserId = exports.changePassword = exports.login = exports.checkRecruiterUid = exports.getRecruiterUid = exports.checkEmailExist = exports.signUp = void 0;
const logger_1 = __importDefault(require("../../../../logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const encryption_1 = require("../../../../helpers/encryption");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user';
function signUp(user, generatePassword, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveUser()`);
        try {
            console.log(generatePassword);
            const hashedPassword = yield (0, encryption_1.hashPassword)(generatePassword);
            const data = {
                uid: crypto.randomUUID(),
                email: user.email,
                password: hashedPassword,
                status: "ACTIVE"
            };
            let recruiterInsertQuery = `insert into RECRUITER(UID, EMAIL, PASSWORD,STATUS)
    values(:uid, :email, :password,:status)`;
            yield (0, sql_query_util_1.executeQuery)(recruiterInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { transaction }));
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveUser()`, error);
            throw error;
        }
    });
}
exports.signUp = signUp;
function checkEmailExist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkEmailExist()  ==>`, email);
            let query = 'select * from RECRUITER where EMAIL=:email ';
            const [user] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                email
            });
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkEmailExist()`, error);
            throw error;
        }
    });
}
exports.checkEmailExist = checkEmailExist;
function getRecruiterUid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("333333333333333", uid);
        try {
            console.log(uid);
            logger_1.default.info(`${TAG}.getRecruiterUid()  ==>`, uid);
            let query = 'select * from RECRUITER where UID=:uid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid: uid.uid
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMentorUid()`, error);
            throw error;
        }
    });
}
exports.getRecruiterUid = getRecruiterUid;
function checkRecruiterUid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getRECRUITERUid()  ==>`, uid);
            let query = 'select * from RECRUITER where UID=:uid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRECRUITERUid()`, error);
            throw error;
        }
    });
}
exports.checkRecruiterUid = checkRecruiterUid;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.saveUser()`);
            let query = 'SELECT * FROM RECRUITER WHERE EMAIL=:email';
            const recruiterloginQuery = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                email: user.email
            });
            return recruiterloginQuery;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveUser()`, error);
            throw error;
        }
    });
}
exports.login = login;
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
            // Update the mentor's password in the database
            const query = `UPDATE RECRUITER SET PASSWORD = :hashedPassword WHERE UID = :uid`;
            const recruiterChangePassword = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({ hashedPassword }, user));
            return recruiterChangePassword;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword()`, error);
            throw error;
        }
    });
}
exports.changePassword = changePassword;
function getUserId(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getUserId()  ==>`, uid);
            // console.log("uisjdfdfdkfldkf");
            console.log(uid);
            let query = 'select USER_ID from RECRUITER where USER_ID=:uid';
            const [recruiterId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            console.log(recruiterId);
            return recruiterId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getUserId`, error);
            throw error;
        }
    });
}
exports.getUserId = getUserId;
// //remove access recuriter -active or deactive
function recruiterUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.recruiterUpdateStatus()`);
        try {
            const info = {
                uid: user.uid,
                status: user.status,
            };
            const updateQuery = `UPDATE RECRUITER
    SET status = :status
    WHERE uid = :uid;
    `;
            const [response] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, info));
            console.log(response);
            return response;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterUpdateStatus()`, error);
            throw error;
        }
    });
}
exports.recruiterUpdateStatus = recruiterUpdateStatus;
