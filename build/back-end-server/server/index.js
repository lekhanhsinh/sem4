"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var statics_1 = __importDefault(require("./statics"));
var app = express_1.default();
exports.app = app;
statics_1.default(app);
routes_1.default(app);
