"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    totalPrice: Number,
    creditCardNumber: String,
    address: String,
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User"
    },
    items: [{
            quantity: Number,
            size: String,
            material: String,
            image: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Image"
            },
            totalPrice: Number
        }],
    status: {
        type: String,
        default: "Ongoing"
    },
    charge: String,
    description: String
}, { timestamps: true, autoIndex: true });
exports.default = schema;
