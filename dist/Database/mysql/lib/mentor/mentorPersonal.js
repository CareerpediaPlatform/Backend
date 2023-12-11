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
exports.getMentorList = exports.checkExist = exports.checkMentorUid = exports.getPersonalDetailsByMentorId = exports.mentorProfileUpdate = exports.mentorProfilePost = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_mentorPersonal';
function mentorProfilePost(user, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.mentorProfilePost()`);
        try {
            const profileInsertQuery = `
    INSERT INTO MENTOR_PERSONAL_DETAILS (UID, FIRST_NAME, LAST_NAME, EMAIL, DATE_OF_BIRTH, GENDER, PHONE_NUMBER, PROFILE_PIC, LINKEDIN_PROFILE)
    VALUES(:uid, :firstName, :lastName, :email, :dateOfBirth, :gender, :phoneNumber, :profilePic, :linkedinProfile)`;
            const contactInsertQuery = `
    INSERT INTO MENTOR_CONTACT_DETAILS 
    (UID, ADDRESS, DISTRICT, CITY, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :district, :city,  :state, :pinCode, :country)`;
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.basicDetails), { uid }));
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.contactDetails), { uid }));
            return { profile, contact };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.mentorProfilePost()`, error);
            throw error;
        }
    });
}
exports.mentorProfilePost = mentorProfilePost;
function mentorProfileUpdate(user, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.mentorProfileUpdate()`);
        try {
            const profileUpdateQuery = `UPDATE MENTOR_PERSONAL_DETAILS
    SET FIRST_NAME = :firstName,LAST_NAME = :lastName, EMAIL = :email,DATE_OF_BIRTH = :dateOfBirth,PHONE_NUMBER = :phoneNumber, GENDER=:gender,
    PROFILE_PIC = :profilePic,
    LINKEDIN_PROFILE = :linkedinProfile
    WHERE
    UID = :uid;
    `;
            const contactUpdateQuery = `UPDATE MENTOR_CONTACT_DETAILS
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
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactUpdateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user.contactDetails), { uid }));
            let [profile] = yield (0, sql_query_util_1.executeQuery)(profileUpdateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, user.basicDetails), { uid }));
            const contactDetails = user.contactDetails;
            const basicDetails = user.basicDetails;
            return { contactDetails, basicDetails };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.mentorProfileUpdate()`, error);
            throw error;
        }
    });
}
exports.mentorProfileUpdate = mentorProfileUpdate;
function getPersonalDetailsByMentorId(mentorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getPersonalDetailsByMentorId()  ==>`, mentorId);
            let query = "select * from MENTOR_PERSONAL_DETAILS where USER_ID = :mentorId";
            const [personalDetails] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                mentorId,
            });
            return personalDetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getPersonalDetailsByMentorId()`, error);
            throw error;
        }
    });
}
exports.getPersonalDetailsByMentorId = getPersonalDetailsByMentorId;
function checkMentorUid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(uid);
        try {
            logger_1.default.info(`${TAG}.checkMentorUid()  ==>`, uid);
            let query = 'select * from MENTOR where UID=:uid';
            const [userId] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, {
                uid
            });
            return userId;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkMentorUid()`, error);
            throw error;
        }
    });
}
exports.checkMentorUid = checkMentorUid;
function checkExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExist() ==>`, uid);
            const checkQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE UID=:uid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(checkQuery, sequelize_1.QueryTypes.SELECT, { uid });
            return basic; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.checkExist = checkExist;
function getMentorList(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfileExist() ==>`, userId);
            const personalQuery = 'SELECT PROFILE_PIC,FIRST_NAME,LAST_NAME,EMAIL,MOBILE_NUMBER FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID= :userId';
            const wokrQuery = 'SELECT YEAR_OF_EXPERIENCE FROM `MENTOR_WORK_EXPERIENCE` WHERE USER_ID= :userId';
            const query = `SELECT
            pd.PROFILE_PIC,
            CONCAT(pd.FIRST_NAME, ' ', pd.LAST_NAME) AS NAME,
            pd.EMAIL,
            pd.MOBILE_NUMBER,
            we.YEAR_OF_EXPERIENCE
            FROM MENTOR_PERSONAL_DETAILS pd
            INNER JOIN MENTOR_WORK_EXPERIENCE we ON pd.USER_ID = we.USER_ID
            WHERE pd.USER_ID = :userId`;
            const [basic] = yield (0, sql_query_util_1.executeQuery)(personalQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [work] = yield (0, sql_query_util_1.executeQuery)(wokrQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [conactquery] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { userId });
            return conactquery;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.getMentorList = getMentorList;
