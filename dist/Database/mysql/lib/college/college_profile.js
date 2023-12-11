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
exports.getCollegeList = exports.collegeProfileDelete = exports.collegeDetailUpdate = exports.collegeContactUpdate = exports.collegeProfileUpdate = exports.collegeProfilePost = exports.isValid = exports.checkExist = exports.checkProfilExist = void 0;
const logger_1 = __importDefault(require("../../../../logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const TAG = 'data_stores_mysql_lib_user-collegeprofile';
function checkProfilExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfilExist() ==>`, uid);
            const basicQuery = 'SELECT * FROM `COLLEGE_BASIC_DETAILS` WHERE UID= :uid';
            const collegeQuery = 'SELECT * FROM `COLLEGE_PROFILE_DETAILS` WHERE UID= :uid';
            const contactQuery = 'SELECT * FROM `COLLEGE_CONTACT_DETAILS` WHERE UID= :uid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(basicQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            const [college] = yield (0, sql_query_util_1.executeQuery)(collegeQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            console.log(basic);
            return { basic, college, contact }; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.checkProfilExist = checkProfilExist;
function checkExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExist() ==>`, uid);
            const contactQuery = 'SELECT * FROM `COLLEGE_CONTACT_DETAILS` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkExist()`, error);
            throw error;
        }
    });
}
exports.checkExist = checkExist;
function isValid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.isValid() ==>`, uid);
            const contactQuery = 'SELECT * FROM `COLLEGE_ADMIN` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk", contact);
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.isValid()`, error);
            throw error;
        }
    });
}
exports.isValid = isValid;
function collegeProfilePost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = user.id;
        let basicDetails = Object.assign(Object.assign({}, user.basicDetails), { uid: user.uid });
        let contactDetails = Object.assign(Object.assign({}, user.contactDetails), { uid: user.uid });
        let collegeDetails = Object.assign(Object.assign({}, user.collegeDetails), { uid: user.uid });
        console.log(basicDetails);
        logger_1.default.info(`${TAG}.collegeProfilePost()`);
        try {
            const profileInsertQuery = `
    INSERT INTO COLLEGE_BASIC_DETAILS 
    (UID,INSTITUTE_LOGO, INSTITUTE_NAME, FOUNDER_NAME, EMAIL, PHONE_NUMBER, WEBSITE, LINKEDIN_PROFILE) 
    VALUES (:uid, :instituteLogo, :instituteName, :founderName, :email, :phoneNumber, :website, :linkedinProfile)`;
            const contactInsertQuery = `
    INSERT INTO COLLEGE_CONTACT_DETAILS 
    (UID,ADDRESS, CITY, DISTRICT, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :city, :district, :state, :pinCode, :country)`;
            const collegeInsertQuery = `
    INSERT INTO COLLEGE_PROFILE_DETAILS (UID, ACCREDITATION, DEEMED, NUMBER_OF_STUDENTS, DEPARTMENTS, COLLEGE_CODE, START_YEAR)
    VALUES (:uid, :accreditation, :deemed, :numberOfStudents, :departments, :collegeCode, :startYear);
    `;
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, contactDetails));
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, basicDetails));
            let [college] = yield (0, sql_query_util_1.executeQuery)(collegeInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, collegeDetails));
            return { profile, contact, college };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.collegeProfilePost()`, error);
            throw error;
        }
    });
}
exports.collegeProfilePost = collegeProfilePost;
function collegeProfileUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeProfileUpdate()`);
        try {
            const updateQuery = `
    UPDATE COLLEGE_BASIC_DETAILS
    SET
    INSTITUTE_LOGO=:instituteLogo,
    INSTITUTE_NAME=:instituteName,
    FOUNDER_NAME = :founderName,
    EMAIL = :email,
    PHONE_NUMBER = :phoneNumber,
    WEBSITE = :website,
    LINKEDIN_PROFILE = :linkedinProfile
        WHERE Id= :id;
  `;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            console.log("3246385723848349814", user);
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.collegeProfileUpdate()`, error);
            throw error;
        }
    });
}
exports.collegeProfileUpdate = collegeProfileUpdate;
function collegeContactUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeContactUpdate()`);
        try {
            const updateQuery = `
    UPDATE COLLEGE_CONTACT_DETAILS
    SET
    ADDRESS =:address,
    CITY = :city,
    DISTRICT =:district,
    STATE =:state,
    PIN_CODE =:pinCode,
    COUNTRY =:country
        WHERE Id= :id;
  `;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.collegeContactUpdate()`, error);
            throw error;
        }
    });
}
exports.collegeContactUpdate = collegeContactUpdate;
function collegeDetailUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeDetailUpdate()`);
        try {
            const updateQuery = `
    UPDATE COLLEGE_PROFILE_DETAILS
    SET
    ACCREDITATION = :accreditation,
    DEEMED = :deemed,
    NUMBER_OF_STUDENTS =:numberOfStudents,
    DEPARTMENTS = :departments,
    COLLEGE_CODE = :collegeCode,
    START_YEAR  =:startYear
        WHERE Id= :id;
  `;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.collegeDetailUpdate()`, error);
            throw error;
        }
    });
}
exports.collegeDetailUpdate = collegeDetailUpdate;
function collegeProfileDelete(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.collegeProfileDelete()`);
        try {
            const response = [];
            const deleteQueries = [
                "DELETE FROM COLLEGE_BASIC_DETAILS WHERE ID = :userID;",
                "DELETE FROM COLLEGE_CONTACT_DETAILS WHERE ID = :userID;",
                "DELETE FROM COLLEGE_PROFILE_DETAILS WHERE ID = :userID;",
                "DELETE FROM COLLEGE_ADMIN WHERE ID = :userID;",
            ];
            for (const query of deleteQueries) {
                const res = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                    userID: user
                });
                response.push(res);
            }
            return { message: "college deleted", response };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.collegeProfileDelete()`, error);
            throw error;
        }
    });
}
exports.collegeProfileDelete = collegeProfileDelete;
function getCollegeList(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfileExist() ==>`, userID);
            const personalQuery = 'SELECT logo,instituteName, founderName, email, phoneNumber, website FROM `COLLEGE_BASIC_DETAILS` WHERE userID= :userID';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(personalQuery, sequelize_1.QueryTypes.SELECT, { userID });
            return basic;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.getCollegeList = getCollegeList;
