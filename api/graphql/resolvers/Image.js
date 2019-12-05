"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("@database/index");
var imageResolvers = {
    Query: {
        getImage: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.getOne(id)
                .populate(["user", "folder"]).then(function (image) {
                if (!image) {
                    throw new Error("Image don\'t exist.");
                }
                if (user.id !== image.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return image;
            });
        },
        getImagesSelf: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort, searchs = args.searchs;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.search(__spreadArrays([{ path: "user", str: user.id, options: "" }], searchs), sort)
                .populate(["user", "folder"]).exec();
        },
        getImages: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.getAll(sort)
                .populate(["user", "folder"]).exec();
        }
    },
    Mutation: {
        createImage: function (obj, args, context, info) {
            var req = context.req;
            var folderId = args.folderId, image = args.image;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.create(user.id, folderId, image);
        },
        updateImage: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id, image = args.image;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Image don\'t exist.");
                }
                if (user.id !== found.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return index_1.Repositories.imageRepository.update(id, image);
            });
        },
        deleteImage: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.imageRepository.getOne(id).then(function (image) {
                if (!image) {
                    throw new Error("Image don\'t exist.");
                }
                if (user.id !== image.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return index_1.Repositories.imageRepository.delete(id).then(function () {
                    return "DELETED";
                });
            });
        },
    }
};
exports.default = imageResolvers;
