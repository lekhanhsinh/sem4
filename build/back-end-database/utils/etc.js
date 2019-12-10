"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mime_types_1 = __importDefault(require("mime-types"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var readStreamtoBuffer = function (readStream) {
    return new Promise(function (resolve) {
        var buffers = [];
        readStream.on("data", function (data) {
            buffers.push(data);
        });
        readStream.on("end", function () {
            var actualContents = Buffer.concat(buffers);
            resolve(actualContents);
        });
    });
};
exports.saveImage = function (file, oldName) {
    if (oldName === void 0) { oldName = ""; }
    if (!file) {
        throw new Error("File is not a image.");
    }
    return file.then(function (file) {
        return readStreamtoBuffer(file.createReadStream()).then(function (buffer) {
            if (!file.mimetype.startsWith("image/")) {
                throw new Error("File is not a image.");
            }
            if (oldName) {
                return fs_extra_1.default.remove(path_1.default.resolve("public/images/" + oldName)).then(function () {
                    var newName = file.filename + "-" + Date.now() + "." + mime_types_1.default.extension(file.mimetype);
                    return fs_extra_1.default.writeFile(path_1.default.resolve("public/images/" + newName), buffer).then(function () {
                        return newName;
                    });
                });
            }
            else {
                var newName_1 = file.filename + "-" + Date.now() + "." + mime_types_1.default.extension(file.mimetype);
                return fs_extra_1.default.writeFile(path_1.default.resolve("public/images/" + newName_1), buffer).then(function () {
                    return newName_1;
                });
            }
        });
    });
};
