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
var folderResolvers = {
    Query: {
        getFolder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.getOne(id)
                .populate(["files", "user"]).then(function (folder) {
                if (!folder) {
                    throw new Error("Folder don\'t exist.");
                }
                if (user.id !== folder.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return index_1.Repositories.imageRepository.renameTemp(folder.files);
            });
        },
        getFoldersSelf: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort, searchs = args.searchs;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.search(__spreadArrays([{ path: "user", str: user.id, options: "" }], searchs), sort)
                .populate(["files", "user"]).then(function (folders) {
                var promises = [];
                for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
                    var folder = folders_1[_i];
                    var promise = index_1.Repositories.imageRepository.renameTemp(folder.files);
                    promises.push(promise);
                }
                return Promise.all(promises).then(function () {
                    return folders;
                });
            });
        },
        getFolders: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.getAll(sort)
                .populate(["files", "user"]).then(function (folders) {
                var promises = [];
                for (var _i = 0, folders_2 = folders; _i < folders_2.length; _i++) {
                    var folder = folders_2[_i];
                    var promise = index_1.Repositories.imageRepository.renameTemp(folder.files);
                    promises.push(promise);
                }
                return Promise.all(promises).then(function () {
                    return folders;
                });
            });
        }
    },
    Mutation: {
        createFolder: function (obj, args, context, info) {
            var req = context.req;
            var folder = args.folder;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.create(user.id, folder);
        },
        updateFolder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id, folder = args.folder;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Folder don\'t exist.");
                }
                if (user.id !== found.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return index_1.Repositories.folderRepository.update(id, folder);
            });
        },
        deleteFolder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.folderRepository.getOne(id).then(function (folder) {
                if (!folder) {
                    throw new Error("Folder don\'t exist.");
                }
                if (user.id !== folder.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return index_1.Repositories.folderRepository.delete(id).then(function () {
                    return "DELETED";
                });
            });
        },
    }
};
exports.default = folderResolvers;
