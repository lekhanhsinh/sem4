"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User"
    },
    images: [{
            image: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Image"
            },
            printSize: String,
            count: Number,
            price: Number,
        }],
    totalPrice: Number,
    description: String,
    creditCardNumber: String,
}, { timestamps: true, autoIndex: true });
exports.default = schema;
