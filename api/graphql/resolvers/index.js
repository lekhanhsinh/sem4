"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var resolvers = {
    Query: Object.assign({}, User_1.default.Query),
    Mutation: Object.assign({}, User_1.default.Mutation, Auth_1.default.Mutation)
};
exports.default = resolvers;
