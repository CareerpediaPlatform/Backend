"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.studentNotification = exports.sendRegistrationNotifications = exports.sendRegistrationNotification = exports.studentOtpEmail = exports.sendSignupEmails = exports.sendSignupEmail = exports.sendmail = exports.createTransport = void 0;
const nodeMailer = __importStar(require("nodemailer"));
const logger_1 = __importDefault(require("../logger"));
const config_1 = require("src/Loaders/config");
let transport;
function createTransport() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (transport) {
                return transport;
            }
            transport = nodeMailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'beejtesting@gmail.com',
                    pass: 'tqfgcphzkydkxpzn',
                },
            });
            return transport;
        }
        catch (error) {
            logger_1.default.error('Error occurred in createTransport() ', error);
            throw error;
        }
    });
}
exports.createTransport = createTransport;
function sendmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = user.email;
        console.log(email);
        try {
            const mailOptions = {
                from: config_1.SENDER_EMAIL_ID,
                to: email,
                subject: user.subject,
                html: user.message,
            };
            console.log(config_1.SENDER_EMAIL_ID);
            const transporter = yield createTransport();
            return yield transporter.sendMail(mailOptions);
        }
        catch (error) {
            logger_1.default.error('Error occurred in sendmail() ', error);
            throw error;
        }
    });
}
exports.sendmail = sendmail;
// const generatePassword = await generatePasswordWithPrefixAndLength(25, "Careerpedia-Mentor");
function sendSignupEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.message = `<p>Hi 
        <p style=fontSize:20px ; color:blue>Email:<b>${user.email},</b></p>
        <br>
        <p style=fontSize:20px; color:blue>Password:<b>${user.password}</b></p>
        <p>Thanks for signing up with carrierpadia.</p>
     
        <br>
        <br>
        <h4>Best Regards</h4>
        <p>Team  Carrierpedia</p>`;
            user.subject = 'Welcome';
            yield sendmail(user);
            return;
        }
        catch (error) {
            logger_1.default.error('Error occurred in sendSignupEmail');
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.sendSignupEmail = sendSignupEmail;
function sendSignupEmails(user, generatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.message = `<p>Hi 
        <p style=fontSize:20px ; color:blue>Email:<b>${user.email},</b></p>
        <br>
        <p style=fontSize:20px; color:blue>Password:<b>${generatePassword}</b></p>
        <p>Thanks for signing up with carrierpadia.</p>
     
        <br>
        <br>
        <h4>Best Regards</h4>
        <p>Team  Carrierpedia</p>`;
            user.subject = 'Welcome';
            yield sendmail(user);
            return;
        }
        catch (error) {
            logger_1.default.error('Error occurred in sendSignupEmail');
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.sendSignupEmails = sendSignupEmails;
function studentOtpEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.message = `<p>Hi 
        <p style=fontSize:35px,fontWeight:600 ; color:blue><b>${user.type}</b></p>
        <p style=fontSize:20px ; color:blue>Email:<b>${user.email},</b></p>
        <br>
        <p style=fontSize:20px; color:blue>otp:<b>${user.otp}</b></p>
        <p>Thanks for signing up with carrierpadia.</p>
     
        <br>
        <br>
        <h4>Best Regards</h4>
        <p>Team  Carrierpedia</p>`;
            user.subject = 'Welcome';
            yield sendmail(user);
            return;
        }
        catch (error) {
            logger_1.default.error('Error occurred in studentSignupEmail');
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.studentOtpEmail = studentOtpEmail;
//**********notification */
function sendRegistrationNotification(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let emailFailed = '';
            if (user.email) {
                try {
                    yield sendSignupEmail(user);
                }
                catch (error) {
                    logger_1.default.error(error);
                    emailFailed = 'Failed to signup.';
                    logger_1.default.error(error);
                }
            }
            return {
                emailFailed,
            };
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.sendRegistrationNotification = sendRegistrationNotification;
function sendRegistrationNotifications(user, generatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let emailFailed = '';
            if (user.email) {
                try {
                    yield sendSignupEmails(user, generatePassword);
                }
                catch (error) {
                    logger_1.default.error(error);
                    emailFailed = 'Failed to signup.';
                    logger_1.default.error(error);
                }
            }
            return {
                emailFailed,
            };
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.sendRegistrationNotifications = sendRegistrationNotifications;
function studentNotification(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let emailFailed = '';
            if (user.email) {
                try {
                    yield studentOtpEmail(user);
                }
                catch (error) {
                    logger_1.default.error(error);
                    emailFailed = 'Failed to signup.';
                    logger_1.default.error(error);
                }
            }
            return {
                emailFailed,
            };
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.studentNotification = studentNotification;
