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
exports.mentorUpdateStatus = exports.getUserId = exports.changePassword = exports.login = exports.getMentorUid = exports.checkEmailExist = exports.signUp = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const encryption_1 = require("src/helpers/encryption");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_mentorAuth';
// export async function signUp(user: IMentor,transaction?:any) {
//   logger.info(`${TAG}.saveUser()`);
//   try {
//     // const generatePassword = await generatePasswordWithPrefixAndLength(25, "Careerpedia-Mentor");
//     const hashedPassword = await hashPassword(user.password);
//     // console.log(generatePassword)
//     // const hashedPassword = await hashPassword(generatePassword);
//     console.log(hashedPassword)
//     const data = {
//       uid: crypto.randomUUID(),
//       email: user.email,
//       password: hashedPassword,
//       type:user.type,
//       course:user.course,
//       status:user.status
//     };
//     const query = 'SELECT course_id FROM courses_parts WHERE partTitle = :partTitle';
//     const mentorQuery = await executeQuery(query, [data.course], (error, results) => {
//       if (error) {
//         console.error('Error finding course_id:', error);
//     }else{
//       if (results.length > 0) {
//         data.course = results[0].course;}
//         let mentorInsertQuery = `insert into MENTOR(course_id,UID, EMAIL, PASSWORD,TYPE,COURSE,STATUS)
//         values(:course_id,:uid, :email, :password,:type,:course,:status)`;
//         await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
//           ...data,transaction
//         });
//         return data;
//     }
//     })
//   } catch (error) {
//     logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
//     throw error;
//   }
// }
function signUp(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const TAG = 'MentorService';
        logger_1.default.info(`${TAG}.signUp()`);
        try {
            // Hash the user's password
            const hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
            // Find the course_id based on the provided course name
            const courseQuery = `SELECT course_id FROM courses_parts WHERE partTitle= :partTitle`;
            const selectedCourseType = user.course;
            console.log(selectedCourseType);
            const courseResult = yield (0, sql_query_util_1.executeQuery)(courseQuery, { partTitle: selectedCourseType });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            if (courseResult.length === 0) {
                throw new Error('Course not found'); // Handle course not found error
            }
            const course_id = courseResult[0].course_id;
            // Prepare mentor data for insertion
            const mentorData = {
                course_id: course_id,
                uid: crypto.randomUUID(),
                email: user.email,
                password: hashedPassword,
                type: user.type,
                course: user.course,
                status: user.status
            };
            // Insert mentor data into the "MENTOR" table
            const mentorInsertQuery = `
    INSERT INTO MENTOR (course_id, UID, EMAIL, PASSWORD, TYPE, COURSE, STATUS)
    VALUES (:course_id, :uid, :email, :password, :type, :course, :status)
  `;
            yield (0, sql_query_util_1.executeQuery)(mentorInsertQuery, mentorData, sequelize_1.QueryTypes.INSERT, {
                transaction
            });
            return mentorData;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signUp()`, error);
            throw error;
        }
    });
}
exports.signUp = signUp;
function checkEmailExist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkEmailExist()  ==>`, email);
            let query = 'select * from MENTOR where EMAIL=:email ';
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
function getMentorUid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getMentorUid()  ==>`, uid);
            let query = 'select * from MENTOR where UID=:uid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getMentorUid()`, error);
            throw error;
        }
    });
}
exports.getMentorUid = getMentorUid;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.saveUser()`);
            let query = 'SELECT * FROM MENTOR WHERE EMAIL=:email';
            const mentorloginQuery = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                email: user.email
            });
            return mentorloginQuery;
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
            const query = `UPDATE MENTOR SET PASSWORD = :hashedPassword WHERE UID = :uid`;
            const mentorChangePassword = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({ hashedPassword }, user));
            return mentorChangePassword;
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
            let query = `select USER_ID from MENTOR where USER_ID=:uid`;
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getUserId()`, error);
            throw error;
        }
    });
}
exports.getUserId = getUserId;
function mentorUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.mentorUpdateStatus()`);
        try {
            const info = {
                uid: user.uid,
                status: user.status,
            };
            const updateQuery = `UPDATE MENTOR
    SET status = :status
    WHERE uid = :uid;
    `;
            const [res] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, info));
            console.log(res);
            return res;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.mentorUpdateStatus()`, error);
            throw error;
        }
    });
}
exports.mentorUpdateStatus = mentorUpdateStatus;
