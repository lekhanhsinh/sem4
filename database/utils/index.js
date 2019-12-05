"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var mime_types_1 = __importDefault(require("mime-types"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
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
exports.genTempName = function (name) {
    if (name === void 0) { name = ""; }
    return bcryptjs_1.default.genSalt(10).then(function (salt) {
        return bcryptjs_1.default.hash(name + " - " + Date.now(), salt).then(function (str) {
            return str;
        });
    });
};
exports.saveImage = function (name, tempName, folder, newName, file) {
    if (name === void 0) { name = ""; }
    if (tempName === void 0) { tempName = ""; }
    if (folder === void 0) { folder = ""; }
    if (newName === void 0) { newName = ""; }
    return exports.genTempName(newName).then(function (newTempName) {
        if (!file) {
            if (tempName) {
                var ext_1 = tempName.slice((tempName.lastIndexOf(".") - 1 >>> 0) + 2);
                newTempName += "." + mime_types_1.default.extension(ext_1);
                return fs_extra_1.default.rename("public/images/" + folder + "/" + tempName, "public/images/" + folder + "/" + newTempName).then(function () {
                    if (newName) {
                        newName = newName + "." + mime_types_1.default.extension(ext_1);
                    }
                    else {
                        newName = name;
                    }
                    return {
                        newTempName: newTempName,
                        newName: newName
                    };
                });
            }
            else {
                throw new Error("File is not a image.");
            }
        }
        return file.then(function (file) {
            return readStreamtoBuffer(file.createReadStream()).then(function (buffer) {
                if (!file.mimetype.startsWith("image/")) {
                    throw new Error("File is not a image.");
                }
                newTempName += "." + mime_types_1.default.extension(file.mimetype);
                newName += "." + mime_types_1.default.extension(file.mimetype);
                if (tempName) {
                    return fs_extra_1.default.remove(path_1.default.resolve("public/images/" + folder + "/" + tempName)).then(function () {
                        return fs_extra_1.default.writeFile(path_1.default.resolve("public/images/" + folder + "/" + newTempName), buffer).then(function () {
                            return {
                                newTempName: newTempName,
                                newName: newName
                            };
                        });
                    });
                }
                else {
                    return fs_extra_1.default.writeFile(path_1.default.resolve("public/images/" + folder + "/" + newTempName), buffer).then(function () {
                        return {
                            newTempName: newTempName,
                            newName: newName
                        };
                    });
                }
            });
        });
    });
};
exports.deleteImage = function (fullName, folder) {
    if (fullName === void 0) { fullName = ""; }
    if (folder === void 0) { folder = ""; }
    return fs_extra_1.default.remove(path_1.default.resolve("public/images/" + folder + "/" + fullName));
};
exports.saveFolder = function (newName, name) {
    if (newName === void 0) { newName = ""; }
    if (name === void 0) { name = ""; }
    newName += " - " + Date.now();
    if (name) {
        return fs_extra_1.default.rename("public/images/" + name, "public/images/" + newName).then(function () {
            return newName;
        });
    }
    return fs_extra_1.default.mkdir("public/images/" + newName).then(function () {
        return newName;
    });
};
exports.deleteFolder = function (name) {
    if (name === void 0) { name = ""; }
    return fs_extra_1.default.remove("public/images/" + name);
};
