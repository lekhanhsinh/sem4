"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hookMiddlewares = function (schema) {
    schema.pre("save", function (next) {
        this.wasNew = this.isNew;
        next();
    });
    schema.post("save", function (error, doc, next) {
        if (error) {
            if (error.code === 11000) {
                next(new Error("Image already exist."));
            }
            else {
                next(error);
            }
        }
        var image = doc;
        if (!doc.wasNew) {
            next();
        }
        image.folder.files.push(image);
        image.folder.save().then(function () {
            next();
        });
    });
    schema.pre("remove", function save(next) {
        var image = this;
        image.folder.files.pull(image);
        image.folder.save().then(function () {
            next();
        });
    });
};
exports.default = hookMiddlewares;
