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
exports.updateEducation = void 0;
const mysql_1 = require("src/Database/mysql");
const status_codes_1 = require("src/constants/status_codes");
const logger_1 = __importDefault(require("src/logger"));
const service_response_1 = require("src/models/lib/service_response");
const TAG = 'services.mentor_Education';
function updateEducation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`${TAG}.updateEducation() ==> `, user);
        const serviceResponse = new service_response_1.ServiceResponse(status_codes_1.HttpStatusCodes.CREATED, '', false);
        try {
            console.log("dgycdgscsdcsdcsdcdscsdc");
            console.log(user);
            const response = yield mysql_1.mentorEducationData.saveEducationDetails(Object.assign({}, user));
            const data = Object.assign({}, response);
            serviceResponse.data = data;
        }
        catch (error) {
            logger_1.default.error(`ERROR occurred in ${TAG}.updateEducation`, error);
            serviceResponse.addServerError('Failed to create user due to technical difficulties');
        }
        return serviceResponse;
    });
}
exports.updateEducation = updateEducation;
