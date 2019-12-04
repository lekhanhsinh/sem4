"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
var AuthTypeDefs = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    extend type Mutation {\n        login(email: String!, password: String!): UserType\n        logout: String\n    }\n"], ["\n    extend type Mutation {\n        login(email: String!, password: String!): UserType\n        logout: String\n    }\n"])));
exports.default = AuthTypeDefs;
var templateObject_1;
