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
exports.getRecruiterList = exports.uploadVideoFile = exports.updateCompanylogo = exports.getRecruiterFile = exports.saveFile = exports.deleteRecruiter = exports.recruitercompanyDetailUpdate = exports.recruiterContactUpdate = exports.recruiterBasicDetailsUpdate = exports.recruiterProfilePost = exports.isValid = exports.checkExist = exports.getRecruiterProfile = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
var crypto = require("crypto");
const util_1 = __importDefault(require("util"));
const TAG = 'data_stores_mysql_lib_user-recruiterprofile';
//get all profile details
function getRecruiterProfile(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfileExist() ==>`, uid);
            const basicQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE UID= :uid';
            const contactQuery = 'SELECT * FROM `RECRUITER_CONTACT_DETAILS` WHERE UID= :uid';
            const companyQuery = 'SELECT * FROM `RECRUITER_COMPANY_DETAILS` WHERE UID= :uid';
            const [basic] = yield (0, sql_query_util_1.executeQuery)(basicQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            const [contact] = yield (0, sql_query_util_1.executeQuery)(contactQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            const [company] = yield (0, sql_query_util_1.executeQuery)(companyQuery, sequelize_1.QueryTypes.SELECT, { uid: uid });
            return { basic, contact, company }; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.getRecruiterProfile = getRecruiterProfile;
// check uesrId in recruiter basic details
function checkExist(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkExist() ==>`, uid);
            const checkQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE UID=:uid';
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
//check userId in recruiter 
function isValid(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkProfilExist() ==>`, uid);
            const Query = 'SELECT * FROM `RECRUITER` WHERE UID=:uid';
            const [contact] = yield (0, sql_query_util_1.executeQuery)(Query, sequelize_1.QueryTypes.SELECT, { uid });
            return contact; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
            throw error;
        }
    });
}
exports.isValid = isValid;
// post recruiter all profile data
function recruiterProfilePost(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        const uid = user.uid;
        logger_1.default.info(`${TAG}.recruiterProfilePost()`);
        try {
            const basicInsertQuery = `INSERT INTO RECRUITER_BASIC_DETAILS
    ( UID, LOGO, COMPANY_NAME, FOUNDER_NAME, EMAIL, PHONE_NUMBER, WEBSITE, LINKEDIN_PROFILE )
      values( :uid, :logo, :companyName, :founderName, :email, :phoneNumber, :website, :linkedinProfile)`;
            const contactInsertQuery = `INSERT INTO RECRUITER_CONTACT_DETAILS
      ( UID, ADDRESS, CITY, DISRICT, STATE, PINCODE, COUNTRY)
        values( :uid, :address, :city, :disrict, 
          :state, :pincode, :country)`;
            const companyInsertQuery = `INSERT INTO RECRUITER_COMPANY_DETAILS
    ( UID, ESTABLISHED_YEAR, NUMBER_OF_EMPLOYEES, DEPARTMENTS, START_YEAR, ANNUAL_REVENUE)
      values( :uid, :establishedYear, :numberOfEmployees, :departments, :startYear, :annualRevenue)`;
            let [basic] = yield (0, sql_query_util_1.executeQuery)(basicInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.Profile), { uid }));
            let [contact] = yield (0, sql_query_util_1.executeQuery)(contactInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.Contact), { uid }));
            let [company] = yield (0, sql_query_util_1.executeQuery)(companyInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign(Object.assign({}, user.Company), { uid }));
            return { basic, contact, company };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterProfilePost()`, error);
            throw error;
        }
    });
}
exports.recruiterProfilePost = recruiterProfilePost;
//update basic details
function recruiterBasicDetailsUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.recruiterBasicDetailsUpdate()`);
        try {
            const updateQuery = `UPDATE RECRUITER_BASIC_DETAILS SET
    LOGO = :logo, COMPANY_NAME = :companyName, FOUNDER_NAME = :founderName, 
    EMAIL = :email, PHONE_NUMBER= :phoneNumber, WEBSITE = :website, LINKEDIN_PROFILE = :linkedinProfile WHERE UID = :uid`;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterBasicDetailsUpdate`, error);
            throw error;
        }
    });
}
exports.recruiterBasicDetailsUpdate = recruiterBasicDetailsUpdate;
// update contact details
function recruiterContactUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.recruiterContactUpdate()`);
        try {
            const updateQuery = `UPDATE RECRUITER_CONTACT_DETAILS SET
    ADDRESS = :address, CITY = :city, 
    DISRICT = :disrict, STATE = :state, 
    PINCODE = :pincode, COUNTRY = :country WHERE UID = :uid`;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterContactUpdate()`, error);
            throw error;
        }
    });
}
exports.recruiterContactUpdate = recruiterContactUpdate;
//update company details
function recruitercompanyDetailUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.recruitercompanyDetailUpdate()`);
        try {
            const updateQuery = `UPDATE RECRUITER_COMPANY_DETAILS SET
    ESTABLISHED_YEAR = :establishedYear, NUMBER_OF_EMPLOYEES = :numberOfEmployees, DEPARTMENTS = :departments, 
    START_YEAR = :startYear, ANNUAL_REVENUE = :annualRevenue WHERE UID = :uid`;
            yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return user;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruitercompanyDetailUpdate()`, error);
            throw error;
        }
    });
}
exports.recruitercompanyDetailUpdate = recruitercompanyDetailUpdate;
//delete recruiter
function deleteRecruiter(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleteRecruiter() ==>`, userID);
            console.log(" **************************llib*************");
            console.log(userID);
            const response = [];
            const deleteQueries = [
                "DELETE FROM RECRUITER_BASIC_DETAILS WHERE USER_ID= :userID;",
                "DELETE FROM RECRUITER_CONTACT_DETAILS WHERE USER_ID=:userID;",
                "DELETE FROM RECRUITER_COMPANY_DETAILS WHERE USER_ID=:userID;",
                "DELETE FROM RECRUITER WHERE USER_ID=:userID;",
            ];
            for (const query of deleteQueries) {
                const res = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                    userID
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
exports.deleteRecruiter = deleteRecruiter;
//*******************companylogo******************* */
function saveFile(fileDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveFile()`);
        try {
            fileDetails['uid'] = crypto.randomUUID();
            fileDetails['metaData'] = JSON.stringify((fileDetails === null || fileDetails === void 0 ? void 0 : fileDetails.metaData) || {});
            const fileInsertQuery = `INSERT INTO FILE_DETAILS
(UID, FILE_NAME,ORIGINAL_FILE_NAME, CONTENT_TYPE, S3_BUCKET, FILE_PATH, FILE_URL, IS_PUBLIC, METADATA, CREATED_AT)
VALUES(:uid,:fileName,:originalFileName, :contentType, :s3Bucket, :filePath, :fileUrl, :isPublic, :metaData, CURRENT_TIMESTAMP)`;
            const [id] = yield (0, sql_query_util_1.executeQuery)(fileInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, fileDetails));
            return { id: id, uid: fileDetails.uid };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFile()`, error);
            throw error;
        }
    });
}
exports.saveFile = saveFile;
function getRecruiterFile(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.getRecruiterFile() ==>`, userID);
        try {
            const getQuery = `SELECT * FROM FILE_DETAILS WHERE USER_ID= :userID`;
            const [filedetails] = yield (0, sql_query_util_1.executeQuery)(getQuery, sequelize_1.QueryTypes.SELECT, { userID });
            return filedetails;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterFile()`, error);
            throw error;
        }
    });
}
exports.getRecruiterFile = getRecruiterFile;
function updateCompanylogo(fileDetails, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateCompanylogo() ==>`, userID, fileDetails);
        console.log("ffffffffffffffffffffffffffffffffffffffff");
        console.log(fileDetails);
        try {
            const updateQuery = `UPDATE FILE_DETAILS SET FILE_NAME=:fileName,ORIGINAL_FILE_NAME=:originalFileName,FILE_PATH=:filePath WHERE USER_ID= :userID`;
            const updatedLogoRecords = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign(Object.assign({}, fileDetails), { userID }));
            logger_1.default.debug('updatedLogoRecords: ' + util_1.default.inspect(updatedLogoRecords));
            return updatedLogoRecords;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCompanylogo()`, error);
            throw error;
        }
    });
}
exports.updateCompanylogo = updateCompanylogo;
//*******************************VIDEO**************************** */
function uploadVideoFile(fileDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.uploadVideoFile()`);
        console.log("44444444444444444444444444444444444444444");
        console.log(fileDetails);
        try {
            fileDetails['uid'] = crypto.randomUUID();
            fileDetails['metaData'] = JSON.stringify((fileDetails === null || fileDetails === void 0 ? void 0 : fileDetails.metaData) || {});
            const videoInsertQuery = `INSERT INTO VIDEO (UID,  VIDEO_URL)VALUES(:uid, :fileUrl)`;
            const [id] = yield (0, sql_query_util_1.executeQuery)(videoInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, fileDetails));
            return { id: id, uid: fileDetails.uid };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveFile()`, error);
            throw error;
        }
    });
}
exports.uploadVideoFile = uploadVideoFile;
function getRecruiterList(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getRecruiterList() ==>`, userId);
            const personalQuery = 'SELECT LOGO, COMPANYNAME, FOUNDERNAME, EMAIL, PHONENUMBER FROM `RECRUITER_BASIC_DETAILS` WHERE USER_ID = :userID';
            const wokrQuery = 'SELECT NUMBEROFEMPLOYEES FROM `RECRUITER_COMPANY_DETAILS` WHERE USER_ID = :userID';
            const query = `SELECT
            pd.LOGO,
            pd.COMPANYNAME,
            pd.FOUNDERNAME,
            pd.EMAIL,
            pd.PHONENUMBER,
            we.NUMBEROFEMPLOYEES
            FROM RECRUITER_BASIC_DETAILS pd
            INNER JOIN RECRUITER_COMPANY_DETAILS we ON pd.USER_ID = we.USER_ID
            WHERE pd.USER_ID = :userID`;
            const [basic] = yield (0, sql_query_util_1.executeQuery)(personalQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [work] = yield (0, sql_query_util_1.executeQuery)(wokrQuery, sequelize_1.QueryTypes.SELECT, { userId });
            const [conactquery] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, { userId });
            return conactquery; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterList()`, error);
            throw error;
        }
    });
}
exports.getRecruiterList = getRecruiterList;
