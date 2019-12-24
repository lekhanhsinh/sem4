"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web_1 = __importDefault(require("./web"));
var admin_1 = __importDefault(require("./admin"));
var routing = function (app) {
    app.use("/admin", admin_1.default);
    app.use("/", web_1.default);
};
exports.default = routing;
