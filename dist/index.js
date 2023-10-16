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
const express_1 = __importDefault(require("express"));
const Loaders_1 = require("./Loaders");
const config_1 = require("./Loaders/config");
const logger_1 = __importDefault(require("./logger"));
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            yield (0, Loaders_1.initializeApp)(app);
            app.listen(config_1.PORT, () => {
                logger_1.default.info(`SERVER listening on PORT:${config_1.PORT}`);
            });
        }
        catch (error) {
            logger_1.default.error('ERROR in Starting Application', error);
            logger_1.default.error('Killing Application process');
            process.exit(1);
        }
    });
}
startApplication().catch((err) => logger_1.default.error('ERROR occurred while starting Application.', err));
