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
var FolderRepository_1 = require("./FolderRepository");
var ImageRepository = (function (_super) {
    __extends(ImageRepository, _super);
    function ImageRepository() {
        var _this = _super.call(this, models_1.Image) || this;
        _this.create = function (folderId, image) {
            if (!image.file) {
                throw new Error("Image not uploaded.");
            }
            var tempFile = image.file;
            var newImage = new models_1.Image({
                description: image.description
            });
            return FolderRepository_1.folderRepository.getOne(folderId).then(function (folder) {
                if (!folder) {
                    throw new Error("Folder don\'t exist.");
                }
                return utils_1.saveImage(newImage.name, tempFile, "", folder.name).then(function (newName) {
                    newImage.name = newName;
                    newImage.folder = folder;
                    newImage.save();
                });
            });
        };
        _this.update = function (id, image) {
            return _this.getOne(id).populate(["folder"]).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                found.description = image.description || found.description;
                if (!image.name || !image.file) {
                    return found.save();
                }
                return utils_1.saveImage(image.name, image.file, image.name, found.folder.name).then(function (newName) {
                    found.name = newName;
                    return found.save();
                });
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).populate(["folder"]).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                return utils_1.deleteImage(found.name, found.folder.name).then(function () {
                    return found.remove();
                });
            });
        };
        return _this;
    }
    return ImageRepository;
}(BasicRepository_1.default));
exports.ImageRepository = ImageRepository;
exports.imageRepository = new ImageRepository();
