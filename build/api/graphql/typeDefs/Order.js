"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
var OrderTypeDefs = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    extend type Query {\n        getOrder(id: String!): OrderType\n        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n        getOrdersSelf(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n    }\n\n    extend type Mutation {\n        createOrder(folderId: String!, order: OrderCreateInputType!): OrderType\n        updateOrder(id: String!, order: OrderInputType!): OrderType\n        deleteOrder(id: String!): String\n    }\n\n    type OrderType {\n        id: String\n        user: UserType\n        images: [ImageOrderType]\n        totalPrice: Float\n        description: String\n        creditCardNumber: String\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    type ImageOrderType {\n        image: ImageType\n        printSize: String\n        count: Int\n        price: Float\n    }\n\n    input ImageOrderInputType {\n        image: String\n        printSize: String\n        count: Int\n    }\n\n    input OrderCreateInputType {\n        images: [ImageOrderInputType]!\n        description: String\n        creditCardNumber: String\n        coupon: String\n    }\n\n    input OrderInputType {\n        images: [ImageOrderInputType]\n        description: String\n        creditCardNumber: String\n        coupon: String\n    }\n"], ["\n\n    extend type Query {\n        getOrder(id: String!): OrderType\n        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n        getOrdersSelf(sort: SortInputType, searchs: [SearchInputType]): [OrderType]\n    }\n\n    extend type Mutation {\n        createOrder(folderId: String!, order: OrderCreateInputType!): OrderType\n        updateOrder(id: String!, order: OrderInputType!): OrderType\n        deleteOrder(id: String!): String\n    }\n\n    type OrderType {\n        id: String\n        user: UserType\n        images: [ImageOrderType]\n        totalPrice: Float\n        description: String\n        creditCardNumber: String\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    type ImageOrderType {\n        image: ImageType\n        printSize: String\n        count: Int\n        price: Float\n    }\n\n    input ImageOrderInputType {\n        image: String\n        printSize: String\n        count: Int\n    }\n\n    input OrderCreateInputType {\n        images: [ImageOrderInputType]!\n        description: String\n        creditCardNumber: String\n        coupon: String\n    }\n\n    input OrderInputType {\n        images: [ImageOrderInputType]\n        description: String\n        creditCardNumber: String\n        coupon: String\n    }\n"])));
exports.default = OrderTypeDefs;
var templateObject_1;
