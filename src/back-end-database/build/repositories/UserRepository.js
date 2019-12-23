"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var Models = __importStar(require("../models"));
var UserModel = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/),
    name: joi_1.default.string(),
    gender: joi_1.default.string().valid("MALE", "FEMALE"),
    address: joi_1.default.string(),
    phoneNumber: joi_1.default.number(),
    dateOfBirth: joi_1.default.date().max("now")
});
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        var _this = _super.call(this, Models.User) || this;
        _this.getOnebyEmail = function (email, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findOne({ email: email })
                .populate(populate)
                .exec();
        };
        _this.register = function (email, password, repeatPassword, detail) {
            var RegisterModel = UserModel.concat(joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/).required(),
                repeatPassword: joi_1.default.ref("password"),
            }));
            return RegisterModel.validateAsync(__assign({ email: email,
                password: password,
                repeatPassword: repeatPassword }, detail)).then(function () {
                return _this.create(__assign({ email: email,
                    password: password,
                    repeatPassword: repeatPassword }, detail));
            });
        };
        _this.updateDetail = function (id, detail) {
            return UserModel.validateAsync(__assign({}, detail)).then(function () {
                return _this.getOnebyId(id).then(function (found) {
                    if (!found) {
                        throw new Error("User don\'t exist.");
                    }
                    found.name = detail.name || found.name;
                    found.gender = detail.gender || found.gender;
                    found.address = detail.address || found.address;
                    found.phoneNumber = detail.phoneNumber || found.phoneNumber;
                    found.dateOfBirth = detail.dateOfBirth || found.dateOfBirth;
                    return found.save();
                });
            });
        };
        _this.updatePassword = function (id, password, newPassword, repeatPassword) {
            var UpdatePasswordModel = joi_1.default.object({
                newPassword: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/).required(),
                repeatPassword: joi_1.default.ref("newPassword")
            });
            return UpdatePasswordModel.validateAsync({
                newPassword: newPassword,
                repeatPassword: repeatPassword
            }).then(function () {
                return _this.getOnebyId(id).then(function (found) {
                    if (!found) {
                        throw new Error("User don\'t exist.");
                    }
                    return found.comparePassword(password).then(function (isMatch) {
                        if (!isMatch) {
                            throw new Error("Password is incorrect.");
                        }
                        found.password = newPassword;
                        return found.save();
                    });
                });
            });
        };
        return _this;
    }
    return UserRepository;
}(BasicRepository_1.default));
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
