"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var AuthEmployeeTypeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    extend type Mutation {\n        loginEmployee(email: String!, password: String!): EmployeeType\n        logoutEmployee: String\n    }\n"], ["\n    extend type Mutation {\n        loginEmployee(email: String!, password: String!): EmployeeType\n        logoutEmployee: String\n    }\n"])));
exports.default = AuthEmployeeTypeDefs;
var templateObject_1;
