"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var vhost_ts_1 = __importDefault(require("vhost-ts"));
var Api = __importStar(require("@back-end-api"));
var Main = __importStar(require("./server"));
var secrets_1 = require("./utils/secrets");
var logger_1 = __importDefault(require("./utils/logger"));
var session_1 = __importDefault(require("./utils/session"));
var app = express_1.default();
exports.app = app;
session_1.default(app);
app.use(vhost_ts_1.default("api." + secrets_1.DOMAIN, Api.app));
app.use(vhost_ts_1.default("" + secrets_1.DOMAIN, Main.app));
var httpServer = http_1.default.createServer(app);
Api.server.installSubscriptionHandlers(httpServer);
httpServer.listen(secrets_1.PORT, function () {
    logger_1.default.info("Server ready at http://" + secrets_1.DOMAIN + ":" + secrets_1.PORT);
    logger_1.default.info("Api ready at http://api." + secrets_1.DOMAIN + ":" + secrets_1.PORT + Api.server.graphqlPath);
    if (secrets_1.ENVIRONMENT === "development") {
        logger_1.default.info("Server playground at http://api." + secrets_1.DOMAIN + ":" + secrets_1.PORT + Api.server.graphqlPath);
    }
});
