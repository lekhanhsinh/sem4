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
var UserRepository_1 = require("./UserRepository");
var ImageRepository = (function (_super) {
    __extends(ImageRepository, _super);
    function ImageRepository() {
        var _this = _super.call(this, models_1.Image) || this;
        _this.create = function (userId, folderId, image) {
            if (!image.file) {
                throw new Error("Image not uploaded.");
            }
            var tempFile = image.file;
            var newImage = new models_1.Image({
                description: image.description
            });
            return UserRepository_1.userRepository.getOne(userId).then(function (user) {
                if (!user) {
                    throw new Error("User don\'t exist.");
                }
                newImage.user = user;
                return FolderRepository_1.folderRepository.getOne(folderId).then(function (folder) {
                    if (!folder) {
                        throw new Error("Folder don\'t exist.");
                    }
                    newImage.folder = folder;
                    return utils_1.saveImage(undefined, undefined, folder.name, image.name, tempFile).then(function (_a) {
                        var newName = _a.newName, newTempName = _a.newTempName;
                        newImage.name = newName;
                        newImage.tempName = newTempName;
                        return newImage.save();
                    });
                });
            });
        };
        _this.update = function (id, image) {
            return _this.getOne(id).populate(["folder"]).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                found.description = image.description || found.description;
                return utils_1.saveImage(found.name, found.tempName, found.folder.name, image.name, image.file).then(function (_a) {
                    var newName = _a.newName, newTempName = _a.newTempName;
                    found.name = newName;
                    found.tempName = newTempName;
                    return found.save();
                });
            });
        };
        _this.renameTemp = function (images) {
            var promises = [];
            var _loop_1 = function (image) {
                var promise = utils_1.saveImage(image.name, image.tempName, image.folder.name).then(function (_a) {
                    var newName = _a.newName, newTempName = _a.newTempName;
                    image.name = newName;
                    image.tempName = newTempName;
                    return image.save();
                });
                promises.push(promise);
            };
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var image = images_1[_i];
                _loop_1(image);
            }
            return Promise.all(promises).then(function (images) {
                return images;
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).populate(["folder"]).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                return utils_1.deleteImage(found.tempName, found.folder.name).then(function () {
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
