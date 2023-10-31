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
exports.getMentorList = exports.isValids = exports.isValid = exports.getPersonalDetailsByMentorId = exports.updatePersonalAndContactDetails = exports.savePersonalAndContactDetails = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_mentorPersonal';
function savePersonalAndContactDetails(mentorPersonalData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.savePersonalAndContactDetails()`);
        try {
            mentorPersonalData["mentorUserId"] = userId;
            let personalDetailQuery = `INSERT INTO MENTOR_PERSONAL_DETAILS 
                                   (USER_ID,UID, PROFILE_PIC, FIRST_NAME, LAST_NAME, EMAIL, MOBILE_NUMBER, DATE_OF_BIRTH, LINKEDIN_PROFILE, ADDRESS, 
                                    CITY, DISTRICT, STATE, PINCODE, COUNTRY)
                                   values(:mentorUserId,:uid,:profile_pic ,:first_name, :last_name, :email, :mobile_number, :date_of_birth, :linkedin_profile, 
                                          :address, :city, :district, :state, :pincode, :country)`;
            console.log(`mentor personal data in data store`, mentorPersonalData);
            yield (0, sql_query_util_1.executeQuery)(personalDetailQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, mentorPersonalData));
            return mentorPersonalData.uid;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails()`, error);
            throw error;
        }
    });
}
exports.savePersonalAndContactDetails = savePersonalAndContactDetails;
function updatePersonalAndContactDetails(userId, mentorPersonalData) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updatePersonalAndContactDetails()`);
        try {
            // mentorPersonalData["updatedBy"] = userId;
            let updatePersonalDetailQuery = `UPDATE MENTOR_PERSONAL_DETAILS SET
      PROFILE_PIC= :profile_pic, FIRST_NAME = :first_name, LAST_NAME = :last_name, EMAIL = :email, MOBILE_NUMBER =:mobile_number, DATE_OF_BIRTH = :date_of_birth, LINKEDIN_PROFILE = :linkedin_profile ,
      ADDRESS = :address, CITY = :city, DISTRICT = :district, STATE = :state, PINCODE =:pincode, COUNTRY = :country WHERE UID = :uid`;
            yield (0, sql_query_util_1.executeQuery)(updatePersonalDetailQuery, sequelize_1.QueryTypes.UPDATE, mentorPersonalData);
            return mentorPersonalData.uid;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updatePersonalAndContactDetails()`, error);
            throw error;
        }
    });
}
exports.updatePersonalAndContactDetails = updatePersonalAndContactDetails;
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
function isValid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj");
        console.log(uid);
        try {
            logger_1.default.info(`${TAG}.isValid() ==>`, uid);
            console.log("1234567890");
            const contactQuery = 'SELECT USER_ID FROM `MENTOR` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.isValid()`, error);
            throw error;
        }
    });
}
exports.isValid = isValid;
function isValids(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj");
        console.log(uid);
        try {
            logger_1.default.info(`${TAG}.isValid() ==>`, uid);
            console.log("1234567890");
            const contactQuery = 'SELECT * FROM `MENTOR` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.isValid()`, error);
            throw error;
        }
    });
}
exports.isValids = isValids;
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
