"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const error_handler_1 = require("../middlewares/error_handler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const v1_1 = __importDefault(require("./v1"));
const swigger_1 = require("../utils/swigger");
// const swaggerDocument = YAML.load(SWAGGER_DOC_PATH)
function initializeRoutes(app) {
    logger_1.default.info('initializeRoutes()');
    // Set up Swagger documentation using the loaded YAML file
    // swaggerSpecification(app);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swigger_1.swaggerSpecification));
    app.use('/api/v1/', v1_1.default);
    app.get('*', function (req, res) {
        res.status(404).send('what???');
    });
    app.use(error_handler_1.errorHandler);
}
exports.default = initializeRoutes;
