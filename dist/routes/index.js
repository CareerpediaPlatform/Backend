"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../Loaders/config");
const logger_1 = __importDefault(require("../logger"));
const error_handler_1 = require("../middlewares/error_handler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const v1_1 = __importDefault(require("./v1"));
const swaggerDocument = yamljs_1.default.load(config_1.SWAGGER_DOC_PATH);
function initializeRoutes(app) {
    logger_1.default.info('initializeRoutes()');
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use('/api/v1/', v1_1.default);
    app.get('*', function (req, res) {
        res.status(404).send('what???');
    });
    app.use(error_handler_1.errorHandler);
}
exports.default = initializeRoutes;
