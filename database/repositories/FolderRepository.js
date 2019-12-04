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
var utils_1 = require("../utils");
var FolderRepository = (function (_super) {
    __extends(FolderRepository, _super);
    function FolderRepository() {
        var _this = _super.call(this, models_1.Folder) || this;
        _this.create = function (folder) {
            var newFolder = new models_1.Folder({
                description: folder.description
            });
            return utils_1.saveFolder(folder.name).then(function (newName) {
                newFolder.name = newName;
                return newFolder.save();
            });
        };
        _this.update = function (id, folder) {
            _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Folder don\'t exist.");
                }
                found.description = folder.description || found.description;
                if (!folder.name) {
                    return found.save();
                }
                return utils_1.saveFolder(folder.name, found.name).then(function (newName) {
                    found.name = newName;
                    return found.save();
                });
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Folder don\'t exist.");
                }
                return utils_1.deleteFolder(found.name).then(function () {
                    return found.remove();
                });
            });
        };
        return _this;
    }
    return FolderRepository;
}(BasicRepository_1.default));
exports.FolderRepository = FolderRepository;
exports.folderRepository = new FolderRepository();
