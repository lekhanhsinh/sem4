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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var models_1 = require("../models");
var RoleRepository = (function (_super) {
    __extends(RoleRepository, _super);
    function RoleRepository() {
        var _this = _super.call(this, models_1.Role) || this;
        _this.create = function (role) {
            var newRole = new models_1.Role({ name: role.name, description: role.description });
            return newRole.save();
        };
        _this.update = function (id, role) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Role don\'t exist.");
                }
                found.description = role.description || found.description;
                return found.save();
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).populate(["folder"]).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                return found.remove();
            });
        };
        return _this;
    }
    return RoleRepository;
}(BasicRepository_1.default));
exports.RoleRepository = RoleRepository;
exports.roleRepository = new RoleRepository();
