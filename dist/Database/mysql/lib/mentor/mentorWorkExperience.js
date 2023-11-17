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
exports.checkExist = exports.checkProfilExist = exports.isValid = exports.saveWorkExperienceDetails = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = "data_stores_mysql_lib_mentor_work_experience";
function saveWorkExperienceDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveWorkExperienceDetails()`);
        console.log(user);
        try {
            const response = [];
            const insertQuery = `INSERT INTO  MENTOR_WORK_EXPERIENCE
      (USER_ID, UID,OCCUPATION, JOB_ROLE, START_DATE,END_DATE,YEAR_OF_EXPERIENCE)
       values(:userId, :uid,:occupation ,:job_role, :start_date,:end_date,:year_of_experience)`;
            const updateQuery = `UPDATE MENTOR_WORK_EXPERIENCE SET
      OCCUPATION = :occupation, JOB_ROLE = :job_role, START_DATE = :start_date, END_DATE = :end_date , YEAR_OF_EXPERIENCE = :year_of_experience WHERE id = :id`;
            for (const data of user.data) {
                let uid = crypto.randomUUID();
                console.log(data);
                if (data.id) {
                    const res = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, data));
                    response.push(res);
                }
                else {
                    const res = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid, userId: user.id }));
                    response.push(res);
                }
            }
            return Object.assign({}, response);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveWorkExperienceDetails()`, error);
            throw error;
        }
    });
}
exports.saveWorkExperienceDetails = saveWorkExperienceDetails;
function isValid(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj");
        console.log(userId);
        try {
            logger_1.default.info(`${TAG}.checkProfilExist() ==>`, userId);
            console.log("1234567890");
            const contactQuery = 'SELECT * FROM `MENTOR` WHERE USER_ID=:userId';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { userId: userId });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.isValid = isValid;
//geting all data  
function checkProfilExist(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfileExist() ==>`, userId);
            const basicQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID= :userId';
            const educationQuery = 'SELECT * FROM MENTOR_EDUCATION_DETAILS WHERE USER_ID=:userId';
            const workQuery = 'SELECT * FROM `MENTOR_WORK_EXPERIENCE` WHERE USER_ID=:userId';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(basicQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [work] = yield (0, sql_query_util_1.executeQuery)(workQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [eduaction] = yield (0, sql_query_util_1.executeQuery)(educationQuery, sequelize_1.QueryTypes.SELECT, { userId });
            return { basic, eduaction, work };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.checkProfilExist = checkProfilExist;
///userid in mentor
function checkExist(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExist() ==>`, userId);
            const checkQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID=:userId';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { userId });
            return basic; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.checkExist = checkExist;
// export async function deleteWorkExperience(uid) {
//   try {
//     logger.info(`${TAG}.deleteRecruiter() ==>`, uid);
//     console.log(" **************************llib*************")
//     console.log(uid)
//     const response=[]
//     const deleteQueries = [
//       'DELETE FROM MENTOR_PERSONAL_DETAILS WHERE UID = :uid',
//     ];
//     for (const query of deleteQueries) {
//       const res=await executeQuery(query, QueryTypes.DELETE, {
//         uid
//       });
//       response.push(res)
//     }
//     return {message:"recruiter deleted",response}; 
//   } catch (error) {
//     logger.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
//     throw error;
//   }
// }
