"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var schema_1 = __importDefault(require("./schema"));
var middlewares_1 = __importDefault(require("./middlewares"));
var UserClass = (function () {
    function UserClass() {
    }
    UserClass.prototype.comparePassword = function (candidatePassword) {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    };
    return UserClass;
}());
schema_1.default.loadClass(UserClass);
middlewares_1.default(schema_1.default);
exports.default = mongoose_1.default.model("User", schema_1.default);
