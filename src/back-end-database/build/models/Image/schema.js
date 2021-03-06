"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    name: String,
    path: String,
    description: String,
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true, autoIndex: true });
exports.default = schema;
