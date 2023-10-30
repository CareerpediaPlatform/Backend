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
exports.checkEmailOrPhoneExist = exports.verifyOTP = exports.deleteOTP = exports.resendOTP = exports.saveOTP = exports.studentUpdateStatus = exports.findTable = exports.getAllStudentList = exports.signupPhonenumbers = exports.signupPhonenumber = exports.changePassword = exports.signupWithSocialAccount = exports.signUp = void 0;
const logger_1 = __importDefault(require("src/logger"));
const sql_query_util_1 = require("../../helpers/sql.query.util");
const sequelize_1 = require("sequelize");
const encryption_1 = require("src/helpers/encryption");
const authentication_1 = require("src/helpers/authentication");
var crypto = require("crypto");
const TAG = 'data_stores_mysql_lib_user';
function signUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signUp()`);
        try {
            const hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
            const data = {
                id: user.id,
                uid: crypto.randomUUID(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: hashedPassword,
                role: "student",
                status: "ACTIVE"
            };
            let userInsertQuery = `

      INSERT INTO STUDENT_AUTH_FORM(ID, UID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER,PASSWORD,ROLE,STATUS)
      VALUES (:uid, :firstName, :lastName, :email,:phoneNumber, :password, :role, :status)

      INSERT INTO STUDENT_AUTH_FORM(id, uid, first_name, last_name, email, password,role,status)
      VALUES (:id, :uid, :firstName, :lastName, :email, :password, :role, :status)

    `;
            yield (0, sql_query_util_1.executeQuery)(userInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signUp()`, error);
            throw error;
        }
    });
}
exports.signUp = signUp;
// signup with email and linked in
function signupWithSocialAccount(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupWithSocialAccount()`);
        try {
            const hashedPassword = yield (0, encryption_1.hashPassword)(user.uuid);
            const data = {
                id: user.id,
                uid: crypto.randomUUID(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                uuid: hashedPassword,
                status: "ACTIVE"
            };
            let userInsertQuery = `
      INSERT INTO STUDENT_AUTH_GMAIL (id, uid, first_name, last_name, email, uniqId, status)
      VALUES (:id , :uid, :firstName, :lastName, :email, :uuid, :status)
    `;
            yield (0, sql_query_util_1.executeQuery)(userInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, data));
            return data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupWithSocialAccount()`, error);
            throw error;
        }
    });
}
exports.signupWithSocialAccount = signupWithSocialAccount;
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashedPassword = yield (0, encryption_1.hashPassword)(user.password);
        try {
            logger_1.default.info(`${TAG}.changePassword()  ==>`, user);
            let query = 'UPDATE STUDENT_AUTH_FORM SET password= :hashedPassword WHERE uid= :uid';
            const response = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({ hashedPassword }, user));
            return response;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword()`, error);
            throw error;
        }
    });
}
exports.changePassword = changePassword;
function signupPhonenumber(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signupPhonenumber()  ==>`, user);
            let query = 'UPDATE STUDENT_AUTH_FORM SET phone_number= :phoneNumber WHERE uid= :uid';
            const response = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return { response, transaction };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupPhonenumber()`, error);
            throw error;
        }
    });
}
exports.signupPhonenumber = signupPhonenumber;
function signupPhonenumbers(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.signupPhonenumbers()  ==>`, user);
            let query = 'UPDATE STUDENT_AUTH_GMAIL SET phone_number= :phoneNumber WHERE uid= :uid';
            const response = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.UPDATE, Object.assign({}, user));
            return { response, transaction };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupPhonenumbers()`, error);
            throw error;
        }
    });
}
exports.signupPhonenumbers = signupPhonenumbers;
// getAllStudentList
function getAllStudentList() {
    return __awaiter(this, void 0, void 0, function* () {
        const getTable1 = `SELECT 
  id, uid, first_name, last_name, email, status
FROM
STUDENT_AUTH_FORM 
UNION ALL SELECT 
  id, uid, first_name, last_name, email,status
FROM
STUDENT_AUTH_GMAIL;`;
        const res = yield (0, sql_query_util_1.executeQuery)(getTable1, sequelize_1.QueryTypes.SELECT, {});
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        console.log(res);
        return yield Object.assign({}, res);
    });
}
exports.getAllStudentList = getAllStudentList;
// update stauys active and deactive
function findTable(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateQuery = `SELECT 
  CASE
      WHEN EXISTS (SELECT 1 FROM STUDENT_AUTH_GMAIL WHERE uid = :uid) THEN 'STUDENT_AUTH_GMAIL'
      ELSE 'STUDENT_AUTH_FORM'
  END AS table_name
  `;
        const [res] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.SELECT, {
            uid: uid
        });
        console.log(res);
        return res.tableName;
    });
}
exports.findTable = findTable;
function studentUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.studentUpdateStatus()`);
        try {
            const info = {
                uid: user.uid,
                status: user.status,
            };
            let tableName = yield findTable(user.uid);
            const updateQuery = `UPDATE ${tableName}
    SET status = :status
    WHERE uid = :uid;
    `;
            const [res] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, info));
            console.log(res);
            return res;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentUpdateStatus()`, error);
            throw error;
        }
    });
}
exports.studentUpdateStatus = studentUpdateStatus;
// otp generator
function saveOTP(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.saveOTP()`);
        try {
            const otp = yield (0, authentication_1.OTP)();
            const info = {
                student_id: user.id,
                otp: user.otp,
                phoneNumber: user.phoneNumber,
                type: user.type,
                accesstoken: user.accessToken
            };
            let userInsertQuery = `
    INSERT INTO OTP_AUTH(student_id, otp, phone_number, access_token, type)
    VALUES (:student_id, :otp, :phoneNumber, :accesstoken, :type)`;
            yield (0, sql_query_util_1.executeQuery)(userInsertQuery, sequelize_1.QueryTypes.INSERT, Object.assign({}, info));
            return { info, transaction };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.saveOTP()`, error);
            throw error;
        }
    });
}
exports.saveOTP = saveOTP;
function resendOTP(user, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.resendOTP()`);
        try {
            const info = {
                otp: user.newOtp,
                accesstoken: user.accessToken,
                phoneNumber: user.phoneNumber,
                type: user.type,
            };
            const updateQuery = `
    UPDATE  OTP_AUTH
    SET
    otp=:otp,
    access_token= :accesstoken,
    type= :type
        WHERE phone_number=:phoneNumber;
  `;
            const [res] = yield (0, sql_query_util_1.executeQuery)(updateQuery, sequelize_1.QueryTypes.UPDATE, Object.assign({}, info));
            return { info, transaction };
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.resendOTP()`, error);
            throw error;
        }
    });
}
exports.resendOTP = resendOTP;
function deleteOTP(userotp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const otp = userotp.otp;
            logger_1.default.info(`${TAG}.deleteOTP()  ==>`, otp);
            let query = 'DELETE FROM OTP_AUTH WHERE otp=:otp';
            const [user] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.DELETE, {
                otp
            });
            if (user) {
                return user;
            }
            else {
                return false;
            }
            // console.log("error")
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleteOTP()`, error);
            throw error;
        }
    });
}
exports.deleteOTP = deleteOTP;
function verifyOTP(userotp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const phoneNumber = userotp.phoneNumber;
            logger_1.default.info(`${TAG}.verifyOTP()  ==>`, phoneNumber);
            let query = 'select * from OTP_AUTH where phone_number= :phoneNumber';
            const [user] = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, Object.assign({}, userotp));
            if (user) {
                return user;
            }
            else {
                return false;
            }
            // console.log("error")
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.verifyOTP()`, error);
            throw error;
        }
    });
}
exports.verifyOTP = verifyOTP;
function checkEmailOrPhoneExist(info) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.checkEmailOrPhoneExist() ==>`, info);
            let query1;
            let query2;
            let queries = [];
            let user;
            if (info.email && info.phoneNumber) {
                query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE email = :email OR phone_number = :phoneNumber';
                query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE email = :email OR phone_number = :phoneNumber';
                queries = [query1, query2];
            }
            else if (info.email) {
                query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE email = :email';
                query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE email = :email';
                queries = [query1, query2];
            }
            else if (info.phoneNumber) {
                query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE phone_number = :phoneNumber';
                query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE phone_number = :phoneNumber';
                queries = [query1, query2];
            }
            else if (info.uid) {
                query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE uid = :uid';
                query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE uid = :uid';
                queries = [query1, query2];
            }
            else if (info.id) {
                query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE id= :id';
                query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE id= :id';
                queries = [query1, query2];
            }
            for (const query of queries) {
                user = yield (0, sql_query_util_1.executeQuery)(query, sequelize_1.QueryTypes.SELECT, Object.assign({}, info));
                if (user && user.length > 0) {
                    return user[0]; // Return the first matching user found
                }
            }
            return null; // Return null if no user is found
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
            throw error;
        }
    });
}
exports.checkEmailOrPhoneExist = checkEmailOrPhoneExist;
