"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var rootTypeDefs = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    type Query {\n        _empty: String\n    }\n\n    type Mutation {\n        _empty: String\n    }\n\n    input SortInputType {\n        sortBy: String\n        asc: Boolean\n    }\n\n    input SearchInputType {\n        path: String\n        str: String\n        options: String\n    }\n"], ["\n\n    type Query {\n        _empty: String\n    }\n\n    type Mutation {\n        _empty: String\n    }\n\n    input SortInputType {\n        sortBy: String\n        asc: Boolean\n    }\n\n    input SearchInputType {\n        path: String\n        str: String\n        options: String\n    }\n"])));
exports.default = [
    rootTypeDefs,
    User_1.default,
    Auth_1.default
];
var templateObject_1;
