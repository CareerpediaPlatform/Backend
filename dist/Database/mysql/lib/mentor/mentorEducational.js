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
exports.deleteEducationDetails = exports.saveEducationDetails = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_mentor_education_details';
function saveEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveEducationDetails()`);
        console.log(user);
        try {
            const response = [];
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            const educationDetailsQuery = `INSERT INTO  MENTOR_EDUCATION_DETAILS
        (USER_ID, UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
         values(:userId, :uid,:degree ,:dept_branch, :start_year,:end_year)`;
            const updateEducationDetailQuery = `UPDATE MENTOR_EDUCATION_DETAILS SET
    DEGREE = :degree, DEPT_BRANCH = :dept_branch, START_YEAR = :start_year, END_YEAR = :end_year WHERE id = :id`;
            for (const data of user.data) {
                let uid = crypto.randomUUID();
                console.log(data);
                if (data.id) {
                    const res = yield (0, sql_query_util_1.executeQuery)(updateEducationDetailQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, data));
                    response.push(res);
                }
                else {
                    const res = yield (0, sql_query_util_1.executeQuery)(educationDetailsQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid, userId: user.id }));
                    response.push(res);
                }
            }
            return Object.assign({}, response);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveEducationDetails()`, error);
            throw error;
        }
    });
}
exports.saveEducationDetails = saveEducationDetails;
function deleteEducationDetails(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteRecruiter() ==>`, uid);
            console.log(" **************************llib*************");
            console.log(uid);
            const response = [];
            const deleteQueries = [
                'DELETE FROM MENTOR_PERSONAL_DETAILS WHERE UID = :uid',
            ];
            for (const query of deleteQueries) {
                const res = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                    uid
                });
                response.push(res);
            }
            return { message: "recruiter deleted", response };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
            throw error;
        }
    });
}
exports.deleteEducationDetails = deleteEducationDetails;
// export async function saveEducationDetail(user) {
//     logger.info(`${TAG}.saveEducationDetails()`);
//     console.log(user)
//     try {
//         const response=[]
//         const educationDetailsQuery = `INSERT INTO  MENTOR_EDUCATION_DETAILS
//         (USER_ID, UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
//          values(:userId, :uid,:degree ,:dept_branch, :start_year,:end_year)`;
//     //   const updateEducationDetailQuery = `UPDATE MENTOR_EDUCATION_DETAILS SET
//     // DEGREE = :degree, DEPT_BRANCH = :dept_branch, START_YEAR = :start_year, END_YEAR = :end_year WHERE id = :id`;
//       for (const data of user.data) {
//         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
//         let uid=crypto.randomUUID()
//         console.log(data)
//         const res=await executeQuery(educationDetailsQuery, QueryTypes.INSERT, {
//             ...data,uid
//           });
//           response.push(res)
//       }
//     return {...response};
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveEducationDetails()`, error);
//       throw error;
//     }
//   }
