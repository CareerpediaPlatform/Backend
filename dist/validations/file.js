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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyChecks = exports.emptyCheck = void 0;
const status_codes_1 = require("../constants/status_codes");
function emptyCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.file == null) {
            res.status(status_codes_1.HttpStatusCodes.BAD_REQUEST).send({ errors: 'INVALID File' });
        }
        else {
            next();
        }
    });
}
exports.emptyCheck = emptyCheck;
function emptyChecks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.files || req.files.length === 0) {
            res.status(status_codes_1.HttpStatusCodes.BAD_REQUEST).send({ errors: 'No video files uploaded.' });
        }
        else {
            // req.files.forEach((file) => {
            //   console.log('File uploaded:', file.path);
            // });
            next();
        }
    });
}
exports.emptyChecks = emptyChecks;
