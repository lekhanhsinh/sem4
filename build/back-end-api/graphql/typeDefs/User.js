"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var UserTypeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    extend type Query {\n        getSelf: UserType\n\n        getUser(id: String!): UserType\n        getUsers(sort: SortInputType, searchs: [SearchInputType]): [UserType]\n    }\n    \n    extend type Mutation {\n        updateSelfDetail(detail: UserDetailInputType!): UserType\n        updateSelfPassword(password: String!, newPassword: String!, repeatPassword: String!): UserType\n\n        register(email: String!, password: String!, repeatPassword: String!, detail: UserDetailInputType!): UserType\n        updateUser(id: String!, detail: UserDetailInputType!): UserType\n        deleteUser(id: String!): String\n    }\n    \n    type UserType {\n        id: String\n        email: EmailAddress\n        name: String\n        gender: String\n        address: String\n        phoneNumber: String\n        dateOfBirth: DateTime\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    input UserDetailInputType {\n        name: String\n        gender: String\n        address: String\n        phoneNumber: String\n        dateOfBirth: DateTime\n    }\n"], ["\n    extend type Query {\n        getSelf: UserType\n\n        getUser(id: String!): UserType\n        getUsers(sort: SortInputType, searchs: [SearchInputType]): [UserType]\n    }\n    \n    extend type Mutation {\n        updateSelfDetail(detail: UserDetailInputType!): UserType\n        updateSelfPassword(password: String!, newPassword: String!, repeatPassword: String!): UserType\n\n        register(email: String!, password: String!, repeatPassword: String!, detail: UserDetailInputType!): UserType\n        updateUser(id: String!, detail: UserDetailInputType!): UserType\n        deleteUser(id: String!): String\n    }\n    \n    type UserType {\n        id: String\n        email: EmailAddress\n        name: String\n        gender: String\n        address: String\n        phoneNumber: String\n        dateOfBirth: DateTime\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    input UserDetailInputType {\n        name: String\n        gender: String\n        address: String\n        phoneNumber: String\n        dateOfBirth: DateTime\n    }\n"])));
exports.default = UserTypeDefs;
var templateObject_1;
