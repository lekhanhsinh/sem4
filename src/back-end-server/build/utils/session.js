"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var secrets_1 = require("./secrets");
var initSession = function (app) {
    var sess = {
        secret: secrets_1.SESSION_SECRET,
        cookie: {
            maxAge: secrets_1.SESSION_MAXAGE,
            secure: secrets_1.ENVIRONMENT === "production"
        },
        resave: true,
        saveUninitialized: true
    };
    app.use(express_session_1.default(sess));
};
exports.default = initSession;
