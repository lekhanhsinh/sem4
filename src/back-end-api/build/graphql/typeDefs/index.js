"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
var graphql_scalars_1 = require("graphql-scalars");
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var Employee_1 = __importDefault(require("./Employee"));
var AuthEmployee_1 = __importDefault(require("./AuthEmployee"));
var rootTypeDefs = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    type Query {\n        _empty: String\n    }\n\n    type Mutation {\n        _empty: String\n    }\n\n    type Subscription {\n        _empty: String\n    }\n\n    input SortInputType {\n        sortBy: String\n        asc: Boolean    \n    }\n\n    input SearchInputType {\n        path: String\n        str: String\n        options: String\n    }\n"], ["\n\n    type Query {\n        _empty: String\n    }\n\n    type Mutation {\n        _empty: String\n    }\n\n    type Subscription {\n        _empty: String\n    }\n\n    input SortInputType {\n        sortBy: String\n        asc: Boolean    \n    }\n\n    input SearchInputType {\n        path: String\n        str: String\n        options: String\n    }\n"])));
var scalarTypeDef = graphql_scalars_1.typeDefs.map(function (str) {
    return apollo_server_core_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), str);
});
exports.default = __spread(scalarTypeDef, [
    rootTypeDefs,
    User_1.default,
    Auth_1.default,
    Employee_1.default,
    AuthEmployee_1.default,
]);
var templateObject_1, templateObject_2;
