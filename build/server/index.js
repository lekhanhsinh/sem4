"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var vhost_ts_1 = __importDefault(require("vhost-ts"));
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("@api/index"));
var server_1 = require("./startup/server");
var secrets_1 = require("./startup/secrets");
var logger_1 = __importDefault(require("./startup/logger"));
var session_1 = __importDefault(require("./startup/session"));
var app = express_1.default();
session_1.default(app);
app.use(vhost_ts_1.default("api." + secrets_1.DOMAIN, index_1.default.app));
app.use(vhost_ts_1.default("" + secrets_1.DOMAIN, server_1.app));
var httpServer = http_1.default.createServer(app);
index_1.default.server.installSubscriptionHandlers(httpServer);
httpServer.listen(secrets_1.PORT, function () {
    logger_1.default.info("Server ready at http://" + secrets_1.DOMAIN + ":" + secrets_1.PORT);
    logger_1.default.info("Api ready at http://api." + secrets_1.DOMAIN + ":" + secrets_1.PORT + index_1.default.server.graphqlPath);
    if (secrets_1.ENVIRONMENT === "development") {
        logger_1.default.info("Server playground at http://api." + secrets_1.DOMAIN + ":" + secrets_1.PORT + index_1.default.server.graphqlPath);
    }
});
