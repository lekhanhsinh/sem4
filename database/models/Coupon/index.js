"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = __importDefault(require("./schema"));
var middlewares_1 = __importDefault(require("./middlewares"));
var CouponClass = (function () {
    function CouponClass() {
    }
    return CouponClass;
}());
schema_1.default.loadClass(CouponClass);
middlewares_1.default(schema_1.default);
exports.default = mongoose_1.default.model("Coupon", schema_1.default);
