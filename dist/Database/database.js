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
exports.sqlConnection = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../Loaders/config");
let connection;
const sqlConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connection) {
            return connection;
        }
        connection = new sequelize_1.Sequelize(config_1.MYSQL_DATABASE.db_name, config_1.MYSQL_DATABASE.username, config_1.MYSQL_DATABASE.password, {
            dialect: 'mysql',
            host: config_1.MYSQL_DATABASE.address,
            port: 3306,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: false,
        });
        yield connection.authenticate();
        console.log("db conncted");
        return connection;
    }
    catch (error) {
        throw error;
    }
});
exports.sqlConnection = sqlConnection;
