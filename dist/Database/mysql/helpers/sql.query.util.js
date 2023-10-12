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
exports.getTransaction = exports.executeQuery = void 0;
const database_1 = require("../../database");
const logger_1 = __importDefault(require("../../../logger/"));
const formatter_1 = require("../../../utils/formatter");
const sequelize_1 = require("sequelize");
function executeQuery(query, type, replacements = {}, transaction = null) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, database_1.sqlConnection)();
            return (0, formatter_1.toCamelCase)(yield connection.query(query, {
                replacements,
                type,
                transaction,
            }));
        }
        catch (error) {
            logger_1.default.error(`ERROR in executeQuery() => ${error}`);
            throw error;
        }
    });
}
exports.executeQuery = executeQuery;
function getTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, database_1.sqlConnection)();
            return yield connection.transaction({
                autoCommit: false,
                isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            });
        }
        catch (error) {
            logger_1.default.error('Error in getTransaction()', error);
            throw error;
        }
    });
}
exports.getTransaction = getTransaction;
