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
exports.login = exports.checkEmailExist = exports.signUp = void 0;
const logger_1 = __importDefault(require("../../../../logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const encryption_1 = require("../../../../helpers/encryption");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user';
function signUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveUser()`);
        try {
            const hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
            const data = {
                uid: crypto.randomUUID(),
                email: user.email,
                password: hashedPassword
            };
            let AadminInsertQuery = `insert into ADMIN(UID, EMAIL, PASSWORD)
    values(:uid, :email, :password)`;
            yield (0, sql_query_util_1.executeQuery)(AadminInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
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
            let query = 'select * from ADMIN where EMAIL=:email ';
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
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.saveUser()`, user.email);
            // Check if the user with the given email exists
            let query = "select * from ADMIN where EMAIL=:email ";
            const adminloginQuery = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                email: user.email,
            });
            return adminloginQuery;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveUser()`, error);
            throw error;
        }
    });
}
exports.login = login;
