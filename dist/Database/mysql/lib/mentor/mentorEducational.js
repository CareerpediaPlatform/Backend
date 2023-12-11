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
exports.deleteEducation = exports.updateEducationDetails = exports.checkId = exports.postEducationDetails = exports.deleteEducationDetails = exports.saveEducationDetails = void 0;
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
            const educationDetailsQuery = `INSERT INTO  MENTOR_EDUACTION_DETAILS
        ( UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
         values( :uid,:degree ,:deptBranch, :startYear,:endYear)`;
            const updateEducationDetailQuery = `UPDATE MENTOR_EDUACTION_DETAILS SET
    DEGREE = :degree, DEPT_BRANCH = :deptBranch, START_YEAR = :startYear, END_YEAR = :endYear WHERE USER_ID = :id`;
            let items = Object.values(user.data);
            for (const data of items) {
                console.log(data);
                if (data.id) {
                    const res = yield (0, sql_query_util_1.executeQuery)(updateEducationDetailQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, data));
                    response.push(res);
                }
                else {
                    const res = yield (0, sql_query_util_1.executeQuery)(educationDetailsQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid: user.uid }));
                    response.push(res);
                }
            }
            return user;
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
            logger_1.default.info(`${TAG}.deleteEducationDetails() ==>`, uid);
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
//sigle object of education details
function postEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        console.log(user);
        logger_1.default.info(`${TAG}.postEducationDetails()`);
        try {
            const insertQuery = `INSERT INTO  MENTOR_EDUACTION_DETAILS
      ( UID,DEGREE, DEPT_BRANCH, PERCENTAGE, START_YEAR,END_YEAR)
       values( :uid,:degree ,:deptBranch, :percentage
        , :startYear, :endYear)`;
            let [profile] = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
            throw error;
        }
    });
}
exports.postEducationDetails = postEducationDetails;
function checkId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGggggg");
        console.log(id);
        logger_1.default.info(`${TAG}. checkId()`);
        try {
            const checkQuery = `SELECT * FROM MENTOR_EDUACTION_DETAILS WHERE USER_ID=:id`;
            const [userId] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { id });
            console.log(userId);
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checId()`, error);
            throw error;
        }
    });
}
exports.checkId = checkId;
function updateEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateEducationDetails()`);
        try {
            console.log("hsgdjASHCJahsjcASC");
            console.log(user);
            const updateQuery = `UPDATE MENTOR_EDUACTION_DETAILS SET
      DEGREE = :degree, DEPT_BRANCH = :deptBranch, PERCENTAGE= :percentage, START_YEAR = :startYear, END_YEAR = :endYear WHERE USER_ID = :userId`;
            let [profile] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return profile;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
            throw error;
        }
    });
}
exports.updateEducationDetails = updateEducationDetails;
function deleteEducation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.deleteEducation()`);
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        console.log(user);
        console.log(user.id);
        try {
            const insertQuery = `DELETE FROM MENTOR_EDUACTION_DETAILS WHERE USER_ID = :userId`;
            let userId = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.DELETE, {
                userId: user.userId
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteEducation()`, error);
            throw error;
        }
    });
}
exports.deleteEducation = deleteEducation;
