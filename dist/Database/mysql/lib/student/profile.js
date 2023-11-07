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
exports.getStudentResume = exports.checkResume = exports.updateResume = exports.uploadResume = exports.checkExist = exports.checkExistEducationAndExperience = exports.studentExperienceDelete = exports.studentEducationDelete = exports.updateWorkExperience = exports.updateEducationDetails = exports.checkProfilExist = exports.studentProfileUpdate = exports.studentProfilePost = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = "student.database-lib.profile";
// creating new student with form data with
function studentProfilePost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // const uid=crypto.randomUUID()
        console.log(user);
        console.log(user.basicDetails);
        logger_1.default.info(`${TAG}.studentProfilePost()`);
        try {
            const profileInsertQuery = `
   INSERT INTO STUDENT_PERSONAL_DETAILS (UID,FIRST_NAME, LAST_NAME, EMAIL, DATE_OF_BIRTH, PHONE_NUMBER, LINKEDIN_PROFILE, PROFILE_PIC)
    VALUES
  (:uid, :firstName, :lastName, :email, :dateOfBirth, :phoneNumber, :linkedInProfile, :profilePic)`;
            const contactInsertQuery = `
    INSERT INTO STUDENT_CONTACT_DETAILS 
    (UID, ADDRESS, DISTRICT, CITY, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :district, :city,  :state, :pinCode, :country)`;
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.basicDetails), { uid: user.uid }));
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.contactDetails), { uid: user.uid }));
            return { profile, contact };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfilePost()`, error);
            throw error;
        }
    });
}
exports.studentProfilePost = studentProfilePost;
function studentProfileUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentProfileUpdate()`);
        try {
            const profileUpdateQuery = `UPDATE STUDENT_PERSONAL_DETAILS
    SET FIRST_NAME = :firstName,LAST_NAME = :lastName, EMAIL = :email,DATE_OF_BIRTH = :dateOfBirth,PHONE_NUMBER = :phoneNumber,
    LINKEDIN_PROFILE = :linkedInProfile,
    PROFILE_PIC = :profilePic
    WHERE
    UID = :uid;
    `;
            const contactUpdateQuery = `UPDATE STUDENT_CONTACT_DETAILS
    SET
    ADDRESS = :address,
    DISTRICT = :district,
    CITY = :city, 
    STATE = :state,
    PIN_CODE = :pinCode,
    COUNTRY = :country
    WHERE
    UID = :uid;
    `;
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactUpdateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user.contactDetails), { uid: user.uid }));
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileUpdateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user.basicDetails), { uid: user.uid }));
            return { profile, contact };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileUpdate()`, error);
            throw error;
        }
    });
}
exports.studentProfileUpdate = studentProfileUpdate;
function checkProfilExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfilExist() ==>`, uid);
            const basicQuery = 'SELECT * FROM `STUDENT_PERSONAL_DETAILS` WHERE UID= :uid';
            const contactQuery = 'SELECT * FROM `STUDENT_CONTACT_DETAILS` WHERE UID=:uid';
            const educationQuery = 'SELECT * FROM `STUDENT_EDUCATION_DETAILS` WHERE UID=:uid';
            const experienceQuery = 'SELECT * FROM `STUDENT_WORK_EXPERIENCE` WHERE UID=:uid';
            const resumeQuery = 'SELECT * FROM `STUDENT_RESUME` WHERE UID=:uid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(basicQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const education = yield (0, sql_query_util_1.executeQuery)(educationQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const experience = yield (0, sql_query_util_1.executeQuery)(experienceQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const resume = yield (0, sql_query_util_1.executeQuery)(resumeQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const data = {
                basic, contact, education: Object.values(education), experience: Object.values(experience), resume
            };
            return Object.assign({}, data); // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.checkProfilExist = checkProfilExist;
function updateEducationDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateEducationDetails()`);
        try {
            const response = [];
            const insertQuery = `INSERT INTO STUDENT_EDUCATION_DETAILS (UID, DEGREE, DEPT_BRANCH, COLLEGE, SCORE, START_YEAR, END_YEAR) 
      VALUES (:uid, :degree, :dept_branch, :college, :score, :start_year, :end_year)`;
            const updateQuery = `UPDATE STUDENT_EDUCATION_DETAILS SET DEGREE=:degree, DEPT_BRANCH=:dept_branch, COLLEGE=:college, SCORE=:score, START_YEAR=start, END_YEAR=end WHERE USER_ID=:userId`;
            for (const data of user.data) {
                console.log(data);
                if (data.id) {
                    const res = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, data));
                    response.push(res);
                }
                else {
                    const res = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid: user.uid }));
                    response.push(res);
                }
            }
            return Object.assign({}, response);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
            throw error;
        }
    });
}
exports.updateEducationDetails = updateEducationDetails;
function updateWorkExperience(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateWorkExperience()`);
        try {
            const response = [];
            const insertQuery = `INSERT INTO STUDENT_WORK_EXPERIENCE (UID, COMPANY, ROLE, START_YEAR, END_YEAR) VALUES (:uid, :company, :role, :start_year, :end_year)`;
            const updateQuery = `UPDATE STUDENT_WORK_EXPERIENCE SET  COMPANY = :company,
      ROLE = :role,
      START_YEAR = :start,
      END_YEAR = :end WHERE ID=:id`;
            for (const data of user.data) {
                console.log(data);
                if (data.id) {
                    const res = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, data));
                    response.push(res);
                }
                else {
                    const res = yield (0, sql_query_util_1.executeQuery)(insertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, data), { uid: user.uid }));
                    response.push(res);
                }
            }
            return Object.assign({}, response);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateWorkExperiencess()`, error);
            throw error;
        }
    });
}
exports.updateWorkExperience = updateWorkExperience;
function studentEducationDelete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentEducationDelete()`);
        try {
            const deleteQueries = "DELETE FROM STUDENT_EDUCATION_DETAILS WHERE  ID=:id;";
            const res = yield (0, sql_query_util_1.executeQuery)(deleteQueries, sequelize_1.QueryTypes.DELETE, {
                id: id
            });
            return { message: "student eduaction details deleted deleted", res };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
            throw error;
        }
    });
}
exports.studentEducationDelete = studentEducationDelete;
function studentExperienceDelete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentExperienceDelete()`);
        try {
            const deleteQueries = "DELETE FROM STUDENT_WORK_EXPERIENCE WHERE  ID=:id;";
            const res = yield (0, sql_query_util_1.executeQuery)(deleteQueries, sequelize_1.QueryTypes.DELETE, {
                id: id
            });
            return { message: "student deleted", res };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
            throw error;
        }
    });
}
exports.studentExperienceDelete = studentExperienceDelete;
function checkExistEducationAndExperience(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        let query1;
        let query2;
        let user = [];
        try {
            logger_1.default.info(`${TAG}.checkExistEducationAndExperience() ==>`, id);
            // Use ? as a placeholder for the parameter and pass the actual value separately
            query1 = 'SELECT * FROM `STUDENT_WORK_EXPERIENCE` WHERE ID = ?';
            user = yield (0, sql_query_util_1.executeQuery)(query1, sequelize_1.QueryTypes.SELECT, [id]);
            if (user.length < 1) {
                // Use ? as a placeholder for the parameter and pass the actual value separately
                query2 = 'SELECT * FROM `STUDENT_EDUCATION_DETAILS` WHERE ID = ?';
                user = yield (0, sql_query_util_1.executeQuery)(query2, sequelize_1.QueryTypes.SELECT, [id]);
            }
            return user; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkExistEducationAndExperience()`, error);
            throw error;
        }
    });
}
exports.checkExistEducationAndExperience = checkExistEducationAndExperience;
function checkExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExist() ==>`, uid);
            const contactQuery = 'SELECT * FROM `STUDENT_CONTACT_DETAILS` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkExist()`, error);
            throw error;
        }
    });
}
exports.checkExist = checkExist;
function uploadResume(source, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("********SDFASDFA************");
        console.log(source, uid);
        try {
            logger_1.default.info(`${TAG}.uploadResume() ==>`, source, uid);
            const query = `INSERT INTO STUDENT_RESUME (UID,SOURCE_URL ) VALUES(:uid,:file)`;
            const resume = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.INSERT, { file: source.fileUrl, uid });
            return resume; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadResume()`, error);
            throw error;
        }
    });
}
exports.uploadResume = uploadResume;
function updateResume(source, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        console.log(uid);
        console.log(source.fileUrl);
        try {
            logger_1.default.info(`${TAG}.updateResume() ==>`, source, uid);
            const query = `UPDATE STUDENT_RESUME SET SOURCE_URL= :file  WHERE UID= :uid`;
            const resume = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, { file: source.fileUrl, uid });
            return resume; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateResume()`, error);
            throw error;
        }
    });
}
exports.updateResume = updateResume;
function checkResume(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkResume() ==>`, uid);
            const query = `SELECT * From STUDENT_RESUME WHERE UID= :uid`;
            const resume = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return resume;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkResume()`, error);
            throw error;
        }
    });
}
exports.checkResume = checkResume;
function getStudentResume(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getStudentResume() ==>`, uid);
            const query = `SELECT * FROM STUDENT_RESUME WHERE UID= :uid`;
            const resume = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return resume;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getStudentResume()`, error);
            throw error;
        }
    });
}
exports.getStudentResume = getStudentResume;
