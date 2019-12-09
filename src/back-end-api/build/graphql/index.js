"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_subscriptions_1 = require("graphql-subscriptions");
var typeDefs_1 = __importDefault(require("./typeDefs"));
exports.typeDefs = typeDefs_1.default;
var resolvers_1 = __importDefault(require("./resolvers"));
exports.resolvers = resolvers_1.default;
exports.pubsub = new graphql_subscriptions_1.PubSub();
