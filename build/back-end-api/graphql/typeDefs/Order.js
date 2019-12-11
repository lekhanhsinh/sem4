"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var OrderTypeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    extend type Query {\n        getSelfOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n\n        getOrder(id: String!): OrderType\n        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n    }\n\n    extend type Mutation {\n        createOrder(creditCardNumber: String, detail: OrderDetailInputType!): OrderType\n        updateOrder(id: String!, detail: OrderDetailInputType!): OrderType\n        deleteOrder(id: String!): OrderType\n    }\n\n    type OrderType {\n        items: [ItemType]\n        totalPrice: Float\n        address: String\n    }\n\n    input OrderDetailInputType{\n        address: String\n        description: String\n    }\n"], ["\n\n    extend type Query {\n        getSelfOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n\n        getOrder(id: String!): OrderType\n        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n    }\n\n    extend type Mutation {\n        createOrder(creditCardNumber: String, detail: OrderDetailInputType!): OrderType\n        updateOrder(id: String!, detail: OrderDetailInputType!): OrderType\n        deleteOrder(id: String!): OrderType\n    }\n\n    type OrderType {\n        items: [ItemType]\n        totalPrice: Float\n        address: String\n    }\n\n    input OrderDetailInputType{\n        address: String\n        description: String\n    }\n"])));
exports.default = OrderTypeDefs;
var templateObject_1;
