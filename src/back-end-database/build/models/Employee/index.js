"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var schema_1 = __importDefault(require("./schema"));
var middlewares_1 = __importDefault(require("./middlewares"));
var EmployeeClass = (function () {
    function EmployeeClass() {
    }
    EmployeeClass.prototype.comparePassword = function (candidatePassword) {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    };
    return EmployeeClass;
}());
schema_1.default.loadClass(EmployeeClass);
middlewares_1.default(schema_1.default);
exports.default = mongoose_1.default.model("Employee", schema_1.default);
