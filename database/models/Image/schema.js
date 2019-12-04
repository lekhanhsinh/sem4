"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    },
    folder: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Folder"
    },
    description: String
}, { timestamps: true, autoIndex: true });
exports.default = schema;
