"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var employees = [];
var salt = bcryptjs_1.default.genSaltSync(10);
var hash = bcryptjs_1.default.hashSync("St@r1234", salt);
var _id = mongoose_1.default.Types.ObjectId();
var admin = {
    _id: _id,
    id: _id + "",
    email: "admin@gmail.com",
    password: hash,
    name: "Admin",
    role: "Admin",
    createdAt: Date.now(),
    updatedAt: Date.now(),
};
employees.push(admin);
module.exports = employees;
