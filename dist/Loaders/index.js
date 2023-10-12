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
exports.initializeApp = void 0;
const logger_1 = __importDefault(require("../logger"));
const routes_1 = __importDefault(require("../routes"));
const config_1 = require("../Loaders/config");
const server_1 = __importDefault(require("../Loaders/server"));
const s3_config_1 = require("./s3_config");
const initializeApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, config_1.checkEnv)();
        (0, server_1.default)(app);
        (0, routes_1.default)(app);
        (0, s3_config_1.s3ConnectionLoader)();
    }
    catch (error) {
        logger_1.default.error('ERROR occurred in initializeApp().', error);
        throw error;
    }
});
exports.initializeApp = initializeApp;
