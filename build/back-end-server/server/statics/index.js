"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var hookStatics = function (app) {
    app.use("/public", express_1.default.static(path_1.default.resolve("public")));
    app.use("/admin", express_1.default.static(path_1.default.resolve("front-end-admin")));
    app.use("/", express_1.default.static(path_1.default.resolve("front-end-web")));
};
exports.default = hookStatics;
