"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
var ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
exports.ENVIRONMENT = ENVIRONMENT;
var MONGODB_URI = (ENVIRONMENT === "production" ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"]) + "";
exports.MONGODB_URI = MONGODB_URI;
if (ENVIRONMENT === "development" && !process.env["MONGODB_URI_LOCAL"]) {
    throw new Error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
}
if (ENVIRONMENT === "production" && !process.env["MONGODB_URI"]) {
    throw new Error("No mongo connection string. Set MONGODB_URI environment variable.");
}
