"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../routes/index"));
var app = express_1.default();
exports.app = app;
app.use("/", express_1.default.static(path_1.default.resolve("public")));
app.use("/front-end-admin", express_1.default.static(path_1.default.resolve("front-end-admin")));
app.use("/front-end-web", express_1.default.static(path_1.default.resolve("front-end-web")));
index_1.default(app);
