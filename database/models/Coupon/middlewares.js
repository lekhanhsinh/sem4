"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hookMiddlewares = function (schema) {
    schema.post("save", function (error, doc, next) {
        if (error.code === 11000) {
            next(new Error("User already exist."));
        }
        else {
            next(error);
        }
    });
};
exports.default = hookMiddlewares;
