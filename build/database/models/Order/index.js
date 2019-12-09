"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = __importDefault(require("./schema"));
var middlewares_1 = __importDefault(require("./middlewares"));
var OrderClass = (function () {
    function OrderClass() {
    }
    return OrderClass;
}());
schema_1.default.loadClass(OrderClass);
middlewares_1.default(schema_1.default);
exports.default = mongoose_1.default.model("Order", schema_1.default);
