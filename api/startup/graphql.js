"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var middleware_1 = require("../utils/middleware");
var secrets_1 = require("./secrets");
var graphql_1 = require("../graphql");
var graphql_scalars_1 = require("graphql-scalars");
var session_1 = __importDefault(require("./session"));
var toDocumentNode = function (str) {
    return apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), str.map(function (x) { return "\n" + x; }));
};
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: __spreadArrays([
        toDocumentNode(graphql_scalars_1.typeDefs)
    ], graphql_1.typeDefs),
    resolvers: __assign(__assign({}, graphql_scalars_1.resolvers), graphql_1.resolvers),
    context: function (_a) {
        var req = _a.req;
        return middleware_1.middleware(req);
    },
    playground: secrets_1.ENVIRONMENT === "development" ? {
        settings: {
            "request.credentials": "include"
        },
    } : false
});
exports.server = server;
var app = express_1.default();
exports.app = app;
session_1.default(app);
server.applyMiddleware({ app: app });
var templateObject_1;
