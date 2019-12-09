"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
var ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
exports.ENVIRONMENT = ENVIRONMENT;
var DOMAIN = process.env["DOMAIN"] || "";
exports.DOMAIN = DOMAIN;
var PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : undefined;
exports.PORT = PORT;
var SESSION_SECRET = process.env["SESSION_SECRET"] || "";
exports.SESSION_SECRET = SESSION_SECRET;
var SESSION_EXPIRER = process.env["SESSION_EXPIRER"] ? parseInt(process.env["SESSION_EXPIRER"]) : 3600;
exports.SESSION_EXPIRER = SESSION_EXPIRER;
if (!process.env["DOMAIN"]) {
    throw new Error("No domain string. Set DOMAIN environment variable.");
}
