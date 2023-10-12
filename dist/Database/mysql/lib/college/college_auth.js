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
exports.collegeUpdateStatus = exports.changePassword = exports.login = exports.checkUidExist = exports.checkEmailExist = exports.signUp = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const encryption_1 = require("src/helpers/encryption");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user';
function signUp(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveUser()`);
        try {
            const hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
            const data = {
                uid: crypto.randomUUID(),
                email: user.email,
                password: hashedPassword,
                status: "ACTIVE"
            };
            let collegeInsertQuery = `insert into COLLEGE(UID, EMAIL, PASSWORD,status)
    values(:uid, :email, :password, :status)`;
            yield (0, sql_query_util_1.executeQuery)(collegeInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { transaction }));
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
            let query = 'select * from COLLEGE where EMAIL=:email ';
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
function checkUidExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkUidExist() ==>`, uid);
            let query = 'SELECT * FROM COLLEGE WHERE UID = :uid';
            const [user] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkUidExist()`, error);
            throw error;
        }
    });
}
exports.checkUidExist = checkUidExist;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.saveUser()`);
            let query = 'SELECT * FROM COLLEGE WHERE EMAIL=:email';
            const collgeloginQuery = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                email: user.email
            });
            return collgeloginQuery;
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
            const query = `UPDATE COLLEGE SET PASSWORD = :hashedPassword WHERE UID = :uid`;
            const collegeChangePassword = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({ hashedPassword }, user));
            return collegeChangePassword;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword()`, error);
            throw error;
        }
    });
}
exports.changePassword = changePassword;
function collegeUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentUpdateStatus()`);
        try {
            const info = {
                uid: user.uid,
                status: user.status,
            };
            const updateQuery = `UPDATE COLLEGE
    SET status = :status
    WHERE uid = :uid;
    `;
            const [res] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, info));
            console.log(res);
            return res;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentUpdateStatus()`, error);
            throw error;
        }
    });
}
exports.collegeUpdateStatus = collegeUpdateStatus;
