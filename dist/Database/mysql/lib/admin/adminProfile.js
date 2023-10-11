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
exports.updateStatusRecruiterDeactive = exports.updateStatusRecruiterActive = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = 'data_stores_mysql_lib_user';
//remove access recuriter -active
function updateStatusRecruiterActive(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateStatusRecruiter()`);
        try {
            let statusUpdateQuery = `UPDATE RECRUITER SET STATUS = true WHERE USER_ID= ?`;
            yield (0, sql_query_util_1.executeQuery)(statusUpdateQuery, sequelize_1.QueryTypes.UPDATE, [userId]);
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
            throw error;
        }
    });
}
exports.updateStatusRecruiterActive = updateStatusRecruiterActive;
//remove access recuriter -deactive
function updateStatusRecruiterDeactive(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateStatusRecruiter()`);
        try {
            let statusUpdateQuery = `UPDATE RECRUITER SET STATUS = false WHERE USER_ID= ?`;
            yield (0, sql_query_util_1.executeQuery)(statusUpdateQuery, sequelize_1.QueryTypes.UPDATE, [userId]);
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
            throw error;
        }
    });
}
exports.updateStatusRecruiterDeactive = updateStatusRecruiterDeactive;
//remove access mentor
// export async function updateStatusMentor(user) {
//     logger.info(`${TAG}.saveUser()`);
//     try { 
//       let statusUpdateQuery = `UPDATE myproject_db.recruiter SET STATUS = true WHERE USER_ID = :userId;`;
//       await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, {
//         user
//       });
//       return user;
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
//       throw error;
//     }
//   }
//remove access college
// export async function updateStatusCollege(user) {
//     logger.info(`${TAG}.saveUser()`);
//     try { 
//       let statusUpdateQuery = `UPDATE myproject_db.recruiter SET STATUS = true WHERE USER_ID = :userId;`;
//       await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, {
//         user
//       });
//       return user;
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
//       throw error;
//     }
//   }
