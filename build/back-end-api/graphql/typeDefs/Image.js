"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var ImageTypeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    extend type Query {\n        getImage(id: String!): ImageType\n        getImages(sort: SortInputType, searchs: [SearchInputType]): [ImageType]\n    }\n\n    extend type Mutation {\n        createImage(detail: ImageInputType!): ImageType\n        updateImage(id: String!, detail: ImageInputType!): ImageType\n        deleteImage(id: String!): String\n    }\n\n    type ImageType {\n        id: String\n        name: String\n        description: String\n        path: String\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    input ImageInputType {\n        name: String\n        description: String\n        file: Upload\n    }\n"], ["\n\n    extend type Query {\n        getImage(id: String!): ImageType\n        getImages(sort: SortInputType, searchs: [SearchInputType]): [ImageType]\n    }\n\n    extend type Mutation {\n        createImage(detail: ImageInputType!): ImageType\n        updateImage(id: String!, detail: ImageInputType!): ImageType\n        deleteImage(id: String!): String\n    }\n\n    type ImageType {\n        id: String\n        name: String\n        description: String\n        path: String\n        createdAt: DateTime\n        updatedAt: DateTime\n    }\n\n    input ImageInputType {\n        name: String\n        description: String\n        file: Upload\n    }\n"])));
exports.default = ImageTypeDefs;
var templateObject_1;
