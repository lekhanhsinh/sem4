"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync(".env")) {
    logger_1.default.debug("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
exports.ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
exports.DOMAIN = process.env["DOMAIN"] ? process.env["DOMAIN"] : "";
exports.MONGODB_URI = (exports.ENVIRONMENT === "production" ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"]) + "";
if (!process.env["MONGODB_URI"] || !process.env["MONGODB_URI_LOCAL"]) {
    if (exports.ENVIRONMENT === "production") {
        logger_1.default.error("No mongo connection string. Set MONGODB_URI environment variable.");
    }
    else {
        logger_1.default.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
