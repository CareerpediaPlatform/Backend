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
        logger_1.default.info(`${TAG}.studentProfilePost()`);
        try {
            const profileInsertQuery = `
   INSERT INTO student_personal_details (user_uid,firstName, lastName, email, dob, phoneNumber, linkedInProfile, profilePic, resume)
    VALUES
  (:uid,:firstName, :lastName, :email, :dob, :phoneNumber, :linkedInProfile, :profilePic, :resume)`;
            const contactInsertQuery = `
    INSERT INTO CONTACT_DETAILS 
    (user_uid,address, city, district, state, pinCode, country) 
    VALUES (:uid, :address, :city, :district, :state, :pinCode, :country)`;
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.contactDetails), { uid: user.uid }));
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.basicDetails), { uid: user.uid }));
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
            const profileUpdateQuery = `UPDATE student_personal_details
    SET firstName = :firstName,lastName = :lastName, email = :email,dob = :dob,phoneNumber = :phoneNumber,
      linkedInProfile = :linkedInProfile,
      profilePic = :profilePic,
      resume = :resume
    WHERE
    user_uid = :uid;
    `;
            const contactUpdateQuery = `UPDATE CONTACT_DETAILS
    SET
      address = :address,
      city = :city,
      district = :district,
      state = :state,
      pinCode = :pinCode,
      country = :country
    WHERE
    user_uid = :uid;
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
            const basicQuery = 'SELECT * FROM `student_personal_details` WHERE user_uid= :uid';
            const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid=:uid';
            const educationQuery = 'SELECT * FROM `EDUCATION_DETAILS` WHERE user_uid=:uid';
            const experienceQuery = 'SELECT * FROM `WORK_EXPERIENCE` WHERE user_uid=:uid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(basicQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const education = yield (0, sql_query_util_1.executeQuery)(educationQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const experience = yield (0, sql_query_util_1.executeQuery)(experienceQuery, sequelize_1.QueryTypes.SELECT, { uid });
            const data = {
                basic, contact, education: Object.values(education), experience: Object.values(experience)
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
            const insertQuery = `INSERT INTO EDUCATION_DETAILS (user_uid, degree, field, college, score, start, end) 
      VALUES (:uid, :degree, :field, :college, :score, :start, :end)`;
            const updateQuery = `UPDATE EDUCATION_DETAILS SET degree=:degree, field=:field, college=:college, score=:score, start=start, end=end WHERE id=:id`;
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
            const insertQuery = `INSERT INTO WORK_EXPERIENCE (user_uid, company, role, start, end) VALUES (:uid, :company, :role, :start, :end)`;
            const updateQuery = `UPDATE WORK_EXPERIENCE SET  company = :company,
      role = :role,
      start = :start,
      end = :end WHERE id=:id`;
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
            const deleteQueries = "DELETE FROM EDUCATION_DETAILS WHERE  id= :id;";
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
            const deleteQueries = "DELETE FROM WORK_EXPERIENCE WHERE id= :id;";
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
        let query1;
        let query2;
        let user = [];
        try {
            logger_1.default.info(`${TAG}.checkExistEducationAndExperience() ==>`, id);
            query1 = 'SELECT * FROM `WORK_EXPERIENCE` WHERE id=:id';
            user = yield (0, sql_query_util_1.executeQuery)(query1, sequelize_1.QueryTypes.SELECT, { id: id });
            if (user.length < 1) {
                query2 = 'SELECT * FROM `EDUCATION_DETAILS` WHERE id=:id';
                user = yield (0, sql_query_util_1.executeQuery)(query2, sequelize_1.QueryTypes.SELECT, { id: id });
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
            const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid=:uid';
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
            const query = `INSERT INTO STUDENT_RESUME (USER_UID,SOURCE_URL ) VALUES(:uid,:file)`;
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
            const query = `UPDATE STUDENT_RESUME SET SOURCE_URL= :file  WHERE USER_UID= :uid`;
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
            const query = `SELECT * From STUDENT_RESUME WHERE USER_UID= :uid`;
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
            const query = `SELECT * FROM STUDENT_RESUME WHERE USER_UID= :uid`;
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
