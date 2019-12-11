"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var secrets_1 = require("./utils/secrets");
var middleware_1 = require("./utils/middleware");
var graphql_1 = require("./graphql");
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
        origin: ["" + secrets_1.DOMAIN, "api." + secrets_1.DOMAIN, "http://localhost:3000"],
        credentials: true
    }
});
