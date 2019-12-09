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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var User_1 = __importDefault(require("../models/User"));
var utils_1 = require("../utils");
var RoleRepository_1 = require("./RoleRepository");
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        var _this = _super.call(this, User_1.default) || this;
        _this.getOneByEmail = function (email) {
            return _this.collection.findOne({ email: email });
        };
        _this.create = function (user) {
            var newUser = new User_1.default({
                email: user.email,
                password: user.password
            });
            newUser.save();
        };
        _this.update = function (id, user) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("User don\'t exist.");
                }
                found.firstName = user.firstName || found.firstName;
                found.lastName = user.lastName || found.firstName;
                found.dateOfBirth = user.dateOfBirth || found.dateOfBirth;
                found.gender = user.gender || found.gender;
                found.address = user.address || found.address;
                found.phoneNumber = user.phoneNumber || found.phoneNumber;
                return RoleRepository_1.roleRepository.check(user.roles || []).then(function (roles) {
                    var _a;
                    found.roles = new ((_a = mongoose_1.default.Types.DocumentArray).bind.apply(_a, __spreadArrays([void 0], roles)))() || found.roles;
                }).then(function () {
                    if (!user.avatar) {
                        return found.save();
                    }
                    return utils_1.saveImage(id, user.avatar, found.avatar, "avatars").then(function (newName) {
                        found.avatar = newName;
                        return found.save();
                    });
                });
            });
        };
        _this.updateDetail = function (id, user) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("User don\'t exist.");
                }
                found.firstName = user.firstName || found.firstName;
                found.lastName = user.lastName || found.firstName;
                found.dateOfBirth = user.dateOfBirth || found.dateOfBirth;
                found.gender = user.gender || found.gender;
                found.address = user.address || found.address;
                found.phoneNumber = user.phoneNumber || found.phoneNumber;
                if (!user.avatar) {
                    return found.save();
                }
                return utils_1.saveImage(id, user.avatar, found.avatar, "avatars").then(function (newName) {
                    found.avatar = newName;
                    return found.save();
                });
            });
        };
        _this.updatePassword = function (id, password, newPassword) {
            return _this.getOne(id).then(function (found) {
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
        };
        _this.delete = function (id) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("User don\'t exist.");
                }
                return found.remove();
            });
        };
        return _this;
    }
    return UserRepository;
}(BasicRepository_1.default));
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
