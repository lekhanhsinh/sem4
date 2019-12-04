"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Image_1 = __importDefault(require("../Image"));
var hookMiddlewares = function (schema) {
    schema.post("save", function (error, doc, next) {
        if (error.code === 11000) {
            next(new Error("Folder already exist."));
        }
        else {
            next(error);
        }
    });
    schema.pre("remove", function save(next) {
        var folder = this;
        Image_1.default.remove({
            "_id": {
                $in: folder.files
            }
        }, function (err) {
            if (err) {
                return next(err);
            }
        });
    });
};
exports.default = hookMiddlewares;
