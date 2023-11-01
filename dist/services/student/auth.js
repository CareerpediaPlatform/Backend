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
exports.getAllStudentList = exports.setForgetPassword = exports.forgetPassword = exports.changePassword = exports.resendOTP = exports.verifyOTP = exports.studentUpdateStatus = exports.signinUser = exports.signupWithSocialAccount = exports.signupPhonenumber = exports.signupUser = void 0;
const mysql_1 = require("src/Database/mysql");
const sql_query_util_1 = require("src/Database/mysql/helpers/sql.query.util");
const auth_1 = require("src/Database/mysql/lib/student/auth");
const status_codes_1 = require("src/constants/status_codes");
const authentication_1 = require("src/helpers/authentication");
const encryption_1 = require("src/helpers/encryption");
const logger_1 = __importDefault(require("src/logger"));
const api_error_1 = require("src/models/lib/api_error");
const service_response_1 = require("src/models/lib/service_response");
const nodemail_1 = require("src/utils/nodemail");
const TAG = 'services.auth.student';
function signupUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupUser() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let email = user.email;
            const existedUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email });
            if (existedUser) {
                serviceResponse.message = 'Email or Mobile is already exist';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            // getting all the students form both tables and sorting the array list
            let list = yield mysql_1.StudentAuth.getAllStudentList();
            let listArray = Object.values(list);
            function compareByAge(a, b) {
                return a.id - b.id;
            }
            let sortedList = listArray.sort(compareByAge);
            const lastElementId = sortedList[sortedList.length - 1]; // last element of sorted array
            const student = yield mysql_1.StudentAuth.signUp(Object.assign(Object.assign({}, user), { id: lastElementId ? lastElementId.id + 1 : 1 }));
            const findUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email });
            const accessToken = yield (0, authentication_1.generateAccessToken)({ uid: findUser.uid, number: true, id: findUser.id, type: "signup" });
            const data = {
                accessToken,
                type: "signup"
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupUser`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.signupUser = signupUser;
// signup setting phone number
function signupPhonenumber(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupPhonenumber() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            console.log(user);
            if (decoded) {
                const existedUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ phoneNumber: user.phoneNumber });
                if (existedUser) {
                    serviceResponse.message = 'Mobile Number is already exist';
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                    return serviceResponse;
                }
                let otp = yield (0, authentication_1.OTP)();
                let otpsave;
                const otpAccessToken = yield (0, authentication_1.generateOTPToken)(Object.assign({}, existedUser));
                const otpexist = yield mysql_1.StudentAuth.verifyOTP({ phoneNumber: user.phoneNumber });
                if (otpexist) {
                    otpsave = yield mysql_1.StudentAuth.resendOTP({ accessToken: otpAccessToken, newOtp: otp, type: "signup", phoneNumber: user.phoneNumber });
                }
                else {
                    otpsave = yield yield mysql_1.StudentAuth.saveOTP(Object.assign(Object.assign({}, decoded), { accessToken: otpAccessToken, phoneNumber: user.phoneNumber, otp }));
                }
                const resendOtpToken = yield (0, authentication_1.generateAccessToken)({ uid: decoded.uid, otp: true, type: otpsave.info.type, phoneNumber: user.phoneNumber });
                // await transaction.commit()
                // await studentNotification({otp,type:"lllllll",email:existedUser.email})
                const data = {
                    accessToken: resendOtpToken,
                    otp: otpsave.info.otp,
                    type: "otp"
                };
                serviceResponse.data = data;
                // await transaction.commit()
                // await studentNotification({otp:otpsave.info.otp,type:otpsave.info.type,email:existedUser.email})
            }
            return serviceResponse;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupPhonenumber`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.signupPhonenumber = signupPhonenumber;
// signup with google and linked in
function signupWithSocialAccount(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.signupWithSocialAccount() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let email = user.email;
            const existedUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email });
            if (existedUser) {
                serviceResponse.message = 'Email or Mobile is already exist';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            // getting all the students form both tables and sorting the array list
            let list = yield mysql_1.StudentAuth.getAllStudentList();
            let listArray = Object.values(list);
            function compareByAge(a, b) {
                return a.id - b.id;
            }
            let sortedList = listArray.sort(compareByAge);
            const lastElementId = sortedList[sortedList.length - 1]; // last element of sorted array
            //TODO send OTP to mobile/ email
            const student = yield mysql_1.StudentAuth.signupWithSocialAccount(Object.assign(Object.assign({}, user), { id: lastElementId ? lastElementId.id + 1 : 1 }));
            const findUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email });
            const accessToken = yield (0, authentication_1.generateAccessToken)({ uid: findUser.uid, otp: true, id: findUser.id, type: "signupgoogle" });
            const data = {
                accessToken,
                type: "signup"
            };
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.signupWithSocialAccount`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.signupWithSocialAccount = signupWithSocialAccount;
// sign in
const signinUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    +logger_1.default.info(`${TAG}.signinUser() ==> `, user);
    const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
    let email = user.email;
    let phoneNumber = user.phoneNumber;
    // let uniqID=user.uniqID
    const existedUser = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email, phoneNumber });
    try {
        let transaction = null;
        if (existedUser) {
            if (existedUser.status != "ACTIVE") {
                serviceResponse.message = 'your account is freazed by careerpedia please contact careerpedia team !';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.NOT_FOUND;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
            if (user.password || user.uuid) {
                if (user.password) {
                    let compare = yield (0, encryption_1.comparePasswords)(existedUser.password, user.password);
                    // let compare2=await comparePasswords(existedUser.uniqId,user.uuid)
                    if (compare) {
                        const uid = existedUser.uid;
                        const accessToken = yield (0, authentication_1.generateAccessToken)({ uid: existedUser.uid, signin: true });
                        console.log(accessToken);
                        const data = {
                            accessToken,
                            signin: true
                        };
                        serviceResponse.data = data;
                    }
                    else {
                        serviceResponse.message = 'wrong password';
                        serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                        serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                    }
                }
                else {
                    let compare = yield (0, encryption_1.comparePasswords)(existedUser.uniqId, user.uuid);
                    if (compare) {
                        // const uid=existedUser.uid
                        const accessToken = yield (0, authentication_1.generateAccessToken)({ uid: existedUser.uid, signin: true });
                        const data = {
                            accessToken,
                            signin: true
                        };
                        serviceResponse.data = data;
                    }
                    else {
                        serviceResponse.message = 'invalid user';
                        serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                        serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                    }
                }
            }
            if (user.phoneNumber) {
                transaction = yield (0, sql_query_util_1.getTransaction)();
                let otp = yield (0, authentication_1.OTP)();
                let otpsave;
                const otpAccessToken = yield (0, authentication_1.generateOTPToken)(Object.assign({}, existedUser));
                const otpexist = yield mysql_1.StudentAuth.verifyOTP({ phoneNumber: user.phoneNumber });
                if (otpexist) {
                    otpsave = yield mysql_1.StudentAuth.resendOTP({ accessToken: otpAccessToken, newOtp: otp, type: "signin", phoneNumber: user.phoneNumber, transaction });
                }
                else {
                    otpsave = yield mysql_1.StudentAuth.saveOTP(Object.assign(Object.assign({}, existedUser), { accessToken: otpAccessToken, type: "signin", otp, transaction }));
                }
                const resendOtpToken = yield (0, authentication_1.generateAccessToken)({ uid: existedUser.uid, otp: true, type: "signin", phoneNumber: user.phoneNumber });
                yield transaction.commit();
                yield (0, nodemail_1.studentNotification)(Object.assign(Object.assign({}, otpsave.info), { email: existedUser.email }));
                const data = {
                    // otpAccessToken,
                    resendOtpToken,
                    otpsave
                };
                serviceResponse.data = data;
            }
            ``;
        }
        else {
            serviceResponse.message = 'wrong or invalid email/mobile';
            serviceResponse.statusCode = status_codes_1.HttpStatusCodes.NOT_FOUND;
            serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
        }
        return yield serviceResponse;
    }
    catch (error) {
        logger_1.default.error(`ERROR occurred in ${TAG}.signinUser`, error);
        serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
});
exports.signinUser = signinUser;
// give access remove accerss of a student by admin
function studentUpdateStatus(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde student is valid or not
            const decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            if (decoded && (user.status == "ACTIVE" || user.status == "DEACTIVE")) {
                if (decoded.role != "admin") {
                    serviceResponse.message = `UnAutharized Admin`;
                    return serviceResponse;
                }
                const student = yield mysql_1.StudentAuth.studentUpdateStatus(Object.assign({}, user));
                const data = {
                    student
                };
                serviceResponse.message = `student status changed to ${user.status} successfully `;
                serviceResponse.data = data;
                return serviceResponse;
            }
            else {
                serviceResponse.message = `someThing went wrong in url`;
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.studentUpdateStatus`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.studentUpdateStatus = studentUpdateStatus;
// verifying otp
function verifyOTP(otpInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.verifyOTP() ==> `, otpInfo);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let transaction = null;
            const IsAutharaized = yield (0, authentication_1.verifyAccessToken)(otpInfo.headerValue);
            if (IsAutharaized) {
                const student = yield mysql_1.StudentAuth.verifyOTP({ phoneNumber: IsAutharaized.phoneNumber });
                if (student.otp != otpInfo.otp) {
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.message = "wrong-otp";
                    return serviceResponse;
                }
                const type = student.type;
                if (student.type) {
                    const isValidOtp = yield (0, authentication_1.verifyOTPJWT)(student.accessToken);
                    if (!isValidOtp) {
                        serviceResponse.message = "otp expired";
                        return serviceResponse;
                    }
                    if (student.type === "signup") {
                        // transaction
                        const savenumber = yield mysql_1.StudentAuth.signupPhonenumber({ phoneNumber: student.phoneNumber, uid: IsAutharaized.uid });
                        const token = yield (0, authentication_1.generateAccessToken)(Object.assign({}, IsAutharaized));
                        const data = {
                            token,
                            type
                        };
                        // await StudentAuth.deleteOTP({otp:otpInfo.otp})
                        serviceResponse.message = "otp validated";
                        serviceResponse.data = data;
                        return serviceResponse;
                    }
                    else if (student.type === "signupgoogle") {
                        const savenumber = yield mysql_1.StudentAuth.signupPhonenumbers({ phoneNumber: student.phoneNumber, uid: IsAutharaized.uid });
                        const token = yield (0, authentication_1.generateAccessToken)(Object.assign({}, IsAutharaized));
                        const data = {
                            token,
                            type
                        };
                        serviceResponse.message = "otp validated";
                        serviceResponse.data = data;
                        return serviceResponse;
                    }
                    const user = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ phoneNumber: student.phoneNumber });
                    const token = yield (0, authentication_1.generateAccessToken)({ uid: user.uid, type: type });
                    const data = {
                        token,
                        type
                    };
                    serviceResponse.message = "otp validated";
                    serviceResponse.data = data;
                }
                else {
                    serviceResponse.message = 'invalid otp or wrong otp';
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                    return serviceResponse;
                }
            }
            else {
                serviceResponse.message = 'unAutharized user';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.BAD_REQUEST;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.verifyOTP`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.verifyOTP = verifyOTP;
function resendOTP(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde student is valid or not
            let transaction = yield (0, sql_query_util_1.getTransaction)();
            const res = yield (0, authentication_1.verifyAccessToken)(user);
            const accessToken = yield (0, authentication_1.generateOTPToken)({ otp: user.otp });
            const existedUser = yield (0, auth_1.checkEmailOrPhoneExist)({ uid: res.uid });
            if (res) {
                const otp = yield (0, authentication_1.OTP)();
                const student = yield mysql_1.StudentAuth.resendOTP(Object.assign(Object.assign({}, res), { accessToken, newOtp: otp }), transaction);
                // const otpAccessToken=await generateAccessToken({...otp})
                const data = {
                    student: student.info
                };
                serviceResponse.message = "otp resend successfully !";
                serviceResponse.data = data;
                yield transaction.commit();
                yield (0, nodemail_1.studentNotification)({ otp, type: (res.type + "resend"), email: existedUser.email });
                return serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.resendOTP`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.resendOTP = resendOTP;
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde student is valid or not
            const uid = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            const student = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: uid.uid });
            if (student) {
                const IsValid = yield (0, encryption_1.comparePasswords)(student.password, user.oldPassword);
                if (IsValid) {
                    const response = yield mysql_1.StudentAuth.changePassword({ password: user.newPassword, uid: uid.uid });
                    console.log("response");
                    console.log(response);
                    serviceResponse.message = "password changed successfully";
                    serviceResponse.data = response;
                }
                else {
                    serviceResponse.message = 'old password is wrong';
                    serviceResponse.statusCode = status_codes_1.HttpStatusCodes.NOT_FOUND;
                    serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
                }
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.changePassword`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.changePassword = changePassword;
// forgetpassword
function forgetPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            let transaction = yield (0, sql_query_util_1.getTransaction)();
            let otpsave;
            let otp = yield (0, authentication_1.OTP)();
            // checking user is valid or not 
            const isValid = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ email: email.email });
            if (isValid) {
                const accessToken = yield (0, authentication_1.generateOTPToken)(Object.assign({}, isValid));
                const otpexist = yield mysql_1.StudentAuth.verifyOTP({ phoneNumber: isValid.phoneNumber });
                if (otpexist) {
                    otpsave = yield mysql_1.StudentAuth.resendOTP({ accessToken: accessToken, newOtp: otp, type: "forget-password", phoneNumber: isValid.phoneNumber }, transaction);
                }
                else {
                    otpsave = yield mysql_1.StudentAuth.saveOTP(Object.assign(Object.assign({}, isValid), { accessToken: accessToken, type: "forget-password", otp }), transaction);
                }
                const resendOtpToken = yield (0, authentication_1.generateAccessToken)({ uid: isValid.uid, otp: true, type: otpsave.info.type, phoneNumber: isValid.phoneNumber });
                serviceResponse.data = { accessToken: resendOtpToken, otp: otpsave.info.otp, type: "otp" };
                yield transaction.commit();
                yield (0, nodemail_1.studentNotification)(Object.assign(Object.assign({}, otpsave.info), { email: isValid.email }));
            }
            else {
                serviceResponse.message = 'invalid email !';
                serviceResponse.statusCode = status_codes_1.HttpStatusCodes.NOT_FOUND;
                serviceResponse.addError(new api_error_1.APIError(serviceResponse.message, '', ''));
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.forgetPassword`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.forgetPassword = forgetPassword;
function setForgetPassword({ newPassword, headerValue }) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            // finde student is valid or not
            const uid = yield (0, authentication_1.verifyAccessToken)(headerValue);
            const student = yield mysql_1.StudentAuth.checkEmailOrPhoneExist({ uid: uid.uid });
            if (student) {
                const response = yield mysql_1.StudentAuth.changePassword({ password: newPassword, uid: uid.uid });
                serviceResponse.message = "password changed successfully";
                serviceResponse.data = response;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.setForgetPassword`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return yield serviceResponse;
    });
}
exports.setForgetPassword = setForgetPassword;
function getAllStudentList(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            const decoded = yield (0, authentication_1.verifyAccessToken)(user.headerValue);
            if (decoded) {
                if (decoded.role != "admin") {
                    serviceResponse.message = `UnAutharized Admin`;
                    return serviceResponse;
                }
                const response = yield mysql_1.StudentAuth.getAllStudentList();
                const data = Object.assign({}, response);
                serviceResponse.data = data;
                return yield serviceResponse;
            }
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getAllStudentList`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
    });
}
exports.getAllStudentList = getAllStudentList;
