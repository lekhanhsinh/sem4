"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_scalars_1 = require("graphql-scalars");
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var Employee_1 = __importDefault(require("./Employee"));
var AuthEmployee_1 = __importDefault(require("./AuthEmployee"));
var Image_1 = __importDefault(require("./Image"));
var resolvers = __assign(__assign({}, graphql_scalars_1.resolvers), { Query: Object.assign({}, User_1.default.Query, Employee_1.default.Query, Image_1.default.Query), Mutation: Object.assign({}, User_1.default.Mutation, Auth_1.default.Mutation, Employee_1.default.Mutation, AuthEmployee_1.default.Mutation, Image_1.default.Mutation), Subscription: Object.assign({}) });
exports.default = resolvers;
