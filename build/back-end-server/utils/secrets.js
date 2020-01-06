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
else if (fs_1.default.existsSync(".env.example")) {
    logger_1.default.debug("Using .env.example file to supply config environment variables");
    dotenv_1.default.config({ path: ".env.example" });
}
exports.ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
exports.DOMAIN = process.env["DOMAIN"] ? process.env["DOMAIN"] : "";
exports.PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : undefined;
exports.SESSION_SECRET = process.env["SESSION_SECRET"] + "";
exports.SESSION_MAXAGE = process.env["SESSION_MAXAGE"] ? parseInt(process.env["SESSION_MAXAGE"]) : undefined;
if (!process.env["DOMAIN"]) {
    logger_1.default.error("No domain string. Set DOMAIN environment variable.");
    process.exit(1);
}
if (!process.env["SESSION_SECRET"]) {
    logger_1.default.error("No session secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
if (!process.env["SESSION_MAXAGE"]) {
    logger_1.default.error("No session maxAge. Set SESSION_MAXAGE environment variable.");
    process.exit(1);
}
