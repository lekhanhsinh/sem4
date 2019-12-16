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
var UserRepository_1 = require("./UserRepository");
var etc_1 = require("../utils/etc");
var ImageModel = joi_1.default.object({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
});
var ImageRepository = (function (_super) {
    __extends(ImageRepository, _super);
    function ImageRepository() {
        var _this = _super.call(this, Models.Image) || this;
        _this.getManybyUserId = function (userId) {
            return _this._collection.find({ user: userId }).populate(["user"]).exec();
        };
        _this.createWithValidate = function (userId, detail) {
            return ImageModel.validateAsync(detail, { allowUnknown: true }).then(function () {
                return UserRepository_1.userRepository.getOnebyId(userId).then(function (user) {
                    if (!user) {
                        throw new Error("User don\'t exist.");
                    }
                    var newImage = new _this._collection(__assign({ user: user }, detail));
                    if (!detail.file) {
                        return newImage.save();
                    }
                    return etc_1.saveImage(detail.file).then(function (path) {
                        newImage.path = path;
                        return newImage.save();
                    });
                });
            });
        };
        _this.updateWithValidate = function (id, detail) {
            return ImageModel.validateAsync(detail, { allowUnknown: true }).then(function () {
                return _this.getOnebyId(id).then(function (found) {
                    if (!found) {
                        throw new Error("Image don\'t exist.");
                    }
                    found.name = detail.name || found.name;
                    found.description = detail.description || found.description;
                    if (!detail.file) {
                        return found.save();
                    }
                    return etc_1.saveImage(detail.file, found.path).then(function (path) {
                        found.path = path;
                        return found.populate("user").execPopulate().then(function (image) {
                            return image.save();
                        });
                    });
                });
            });
        };
        return _this;
    }
    return ImageRepository;
}(BasicRepository_1.default));
exports.ImageRepository = ImageRepository;
exports.imageRepository = new ImageRepository();
