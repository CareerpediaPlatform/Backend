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
exports.getRecruiterSingleList = exports.uploadVideoFile = exports.updateCompanylogo = exports.getrecruiterCompanyLogo = exports.uploadCompanyLogoFile = exports.uploadCompanyLogo = exports.deleterecruiterProfile = exports.getrecruiterProfile = exports.recruiterProfilePostAndUpdate = void 0;
const response_builder_1 = require("../../helpers/response_builder");
const logger_1 = __importDefault(require("../../logger"));
const util_1 = __importDefault(require("util"));
const models_1 = require("../../models");
const status_codes_1 = require("src/constants/status_codes");
const recruiterProfileServices = __importStar(require("../../services/recruiter/recruiter_profiles"));
const TAG = 'controler.recruiterProfile';
function recruiterProfilePostAndUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.recruiterProfilePostAndUpdate()`);
            logger_1.default.debug(`${TAG}.recruiterProfilePostAndUpdate() Object = ${JSON.stringify(req.body)}`);
            const user = req.body;
            console.log(user);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield recruiterProfileServices.recruiterProfile(Object.assign(Object.assign({}, user), { headerValue }));
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.recruiterProfilePostAndUpdate() `, error);
            next(error);
        }
    });
}
exports.recruiterProfilePostAndUpdate = recruiterProfilePostAndUpdate;
function getrecruiterProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getrecruiterProfile()`);
            logger_1.default.debug(`${TAG}.getrecruiterProfile() Object = ${JSON.stringify(req.body)}`);
            const headerValue = req.headers.authorization.split(' ')[1];
            const authResponse = yield recruiterProfileServices.getRecruiterProfile(headerValue);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getrecruiterProfile() `, error);
            next(error);
        }
    });
}
exports.getrecruiterProfile = getrecruiterProfile;
function deleterecruiterProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.deleterecruiterProfile()`);
            logger_1.default.debug(`${TAG}.deleterecruiterProfile() Object = ${JSON.stringify(req.body)}`);
            let userID = req.params.userID;
            const authResponse = yield recruiterProfileServices.deleteRecruiterProfile(userID);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.deleterecruiterProfile() `, error);
            next(error);
        }
    });
}
exports.deleterecruiterProfile = deleterecruiterProfile;
//***************companylog************** */
function uploadCompanyLogo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadCompanyLogo()`);
            const response = new models_1.ServiceResponse(status_codes_1.HttpStatusCodes.OK, 'File uploaded Successfully.', false);
            response.data = {
                fileLocation: req.files[0].location
            };
            (0, response_builder_1.responseBuilder)(response, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCompanyLogo() `, error);
            next(error);
        }
    });
}
exports.uploadCompanyLogo = uploadCompanyLogo;
function uploadCompanyLogoFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadCompanyLogoFile()`);
            logger_1.default.debug(`${TAG}.uploadCompanyLogoFile() req file:` + util_1.default.inspect(req.file));
            const serviceResponse = yield recruiterProfileServices.uploadCompanyLogoFile(req.files);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadCompanyLogoFile() `, error);
            next(error);
        }
    });
}
exports.uploadCompanyLogoFile = uploadCompanyLogoFile;
function getrecruiterCompanyLogo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getrecruiterCompanyLogo()`);
            logger_1.default.debug(`${TAG}.getrecruiterCompanyLogo() Object = ${JSON.stringify(req.body)}`);
            let userID = req.params.userID;
            const authResponse = yield recruiterProfileServices.getRecruiterProfile(userID);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getrecruiterCompanyLogo() `, error);
            next(error);
        }
    });
}
exports.getrecruiterCompanyLogo = getrecruiterCompanyLogo;
function updateCompanylogo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.updateCompanylogo()`);
            let userID = req.params.userID;
            const serviceResponse = yield recruiterProfileServices.updateCompanylogo(req.file, userID);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateCompanylogo() `, error);
            next(error);
        }
    });
}
exports.updateCompanylogo = updateCompanylogo;
/***************************uploadvideo*******************/
function uploadVideoFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.uploadVideoFile()`);
            logger_1.default.debug(`${TAG}.uploadVideoFile() Object = ${JSON.stringify(req.body)}`);
            const { firstName } = req.body;
            console.log(firstName);
            logger_1.default.debug(`${TAG}.uploadVideoFile() req file:` + util_1.default.inspect(req.file));
            const serviceResponse = yield recruiterProfileServices.uploadVideoFile(req.file);
            (0, response_builder_1.responseBuilder)(serviceResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.uploadVideoFile() `, error);
            next(error);
        }
    });
}
exports.uploadVideoFile = uploadVideoFile;
function getRecruiterSingleList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info(`${TAG}.getRecruiterSingleList()`);
            logger_1.default.debug(`${TAG}.getRecruiterSingleList() Object = ${JSON.stringify(req.body)}`);
            let userID = req.params.userID;
            const authResponse = yield recruiterProfileServices.getRecruiterList(userID);
            (0, response_builder_1.responseBuilder)(authResponse, res, next, req);
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.getRecruiterSingleList() `, error);
            next(error);
        }
    });
}
exports.getRecruiterSingleList = getRecruiterSingleList;
