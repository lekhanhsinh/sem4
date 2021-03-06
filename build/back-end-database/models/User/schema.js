"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String,
    name: String,
    gender: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: Date
}, { timestamps: true, autoIndex: true });
exports.default = schema;
