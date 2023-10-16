"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfiguration = void 0;
const logger_1 = __importDefault(require("../logger"));
function passportConfiguration(passport) {
    logger_1.default.info('passportConfiguration()');
    try {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    catch (e) {
        logger_1.default.error('Error in passportConfiguration()', e);
    }
}
exports.passportConfiguration = passportConfiguration;
