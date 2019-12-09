"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var Image_1 = __importDefault(require("./Image"));
var Folder_1 = __importDefault(require("./Folder"));
var Order_1 = __importDefault(require("./Order"));
var resolvers = {
    Query: Object.assign({}, User_1.default.Query, Image_1.default.Query, Folder_1.default.Query, Order_1.default.Query),
    Mutation: Object.assign({}, User_1.default.Mutation, Auth_1.default.Mutation, Image_1.default.Mutation, Folder_1.default.Mutation, Order_1.default.Mutation)
};
exports.default = resolvers;
