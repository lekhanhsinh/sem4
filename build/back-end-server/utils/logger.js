"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var alignedWithColorsAndTime = winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf(function (info) {
    var timestamp = info.timestamp, level = info.level, message = info.message, args = __rest(info, ["timestamp", "level", "message"]);
    var ts = timestamp.slice(0, 19).replace("T", " ");
    return ts + " [" + level + "]: " + message + " " + (Object.keys(args).length ? JSON.stringify(args, null, 2) : "");
}));
var options = {
    transports: [
        new winston_1.transports.Console({
            format: alignedWithColorsAndTime,
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
        new winston_1.transports.File({ filename: "debug.log", level: "debug" }),
    ],
};
var logger = winston_1.createLogger(options);
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
