"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var CartTypeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    extend type Query {\n        getCart: CartType\n    }\n\n    extend type Mutation {\n        updateCart(items: [ItemlInputType]!): CartType\n    }\n\n    type CartType {\n        items: [ItemType]\n        totalPrice: Float\n    }\n\n    type ItemType {\n        quantity: Int\n        size: String\n        image: ImageType\n        totalPrice: Float\n    }\n\n    input ItemlInputType {\n        quantity: Int!\n        size: String!\n        image: String!\n    }\n"], ["\n\n    extend type Query {\n        getCart: CartType\n    }\n\n    extend type Mutation {\n        updateCart(items: [ItemlInputType]!): CartType\n    }\n\n    type CartType {\n        items: [ItemType]\n        totalPrice: Float\n    }\n\n    type ItemType {\n        quantity: Int\n        size: String\n        image: ImageType\n        totalPrice: Float\n    }\n\n    input ItemlInputType {\n        quantity: Int!\n        size: String!\n        image: String!\n    }\n"])));
exports.default = CartTypeDefs;
var templateObject_1;
