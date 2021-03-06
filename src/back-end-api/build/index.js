"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var express_1 = __importDefault(require("express"));
var node_cache_1 = __importDefault(require("node-cache"));
var apollo_server_express_1 = require("apollo-server-express");
var secrets_1 = require("./utils/secrets");
var middleware_1 = require("./utils/middleware");
var graphql_1 = require("./graphql");
exports.myCache = new node_cache_1.default();
exports.myCache.set("pricePerCm", 0.5);
exports.myCache.set("pricePerPic", 2);
exports.myCache.set("method", "PERCM");
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: graphql_1.resolvers,
    context: function (_a) {
        var req = _a.req, connection = _a.connection;
        return middleware_1.middleware(req, connection);
    },
    subscriptions: {
        onConnect: middleware_1.subscriptionOnConnect
    },
    playground: secrets_1.ENVIRONMENT === "development" ? {
        settings: {
            "request.credentials": "same-origin"
        },
    } : false
});
exports.server = server;
var app = express_1.default();
exports.app = app;
server.applyMiddleware({
    app: app,
    cors: {
        origin: ["http://" + secrets_1.DOMAIN + (secrets_1.PORT ? ":" + secrets_1.PORT : ""), "http://api." + secrets_1.DOMAIN + (secrets_1.PORT ? ":" + secrets_1.PORT : ""), "http://localhost:3000"],
        credentials: true
    }
});
