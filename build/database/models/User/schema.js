"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    fisrtName: String,
    lastName: String,
    avatar: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    phoneNumber: String,
    roles: {
        type: [
            {
                type: mongoose_1.default.Types.ObjectId,
                ref: "Role",
            }
        ],
        default: []
    },
    folders: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Folder"
    }
}, { timestamps: true, autoIndex: true });
exports.default = schema;
