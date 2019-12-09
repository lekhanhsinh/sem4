"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var hookMiddlewares = function (schema) {
    schema.pre("save", function save(next) {
        var user = this;
        if (!user.isNew && !user.isModified("password")) {
            return next();
        }
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                return next();
            });
        });
    });
    return schema;
};
exports.default = hookMiddlewares;
