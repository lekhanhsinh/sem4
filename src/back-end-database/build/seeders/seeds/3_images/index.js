"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var faker_1 = __importDefault(require("faker"));
var mongoose_1 = __importDefault(require("mongoose"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var secrets_1 = require("../../../utils/secrets");
var _2_users_1 = __importDefault(require("../2_users"));
var fileNames = fs_extra_1.default.readdirSync(path_1.default.resolve("public/images"));
var images = [];
if (secrets_1.ENVIRONMENT === "development") {
    for (var i = 0; i < 100; i++) {
        var imageId = mongoose_1.default.Types.ObjectId();
        var fileName = faker_1.default.random.arrayElement(fileNames);
        images.push({
            _id: imageId,
            id: undefined,
            user: faker_1.default.random.arrayElement(_2_users_1.default)._id,
            name: fileName,
            path: fileName,
            description: faker_1.default.lorem.lines(2),
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
    }
}
module.exports = images;
