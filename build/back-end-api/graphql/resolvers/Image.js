"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var imageResolvers = {
    Query: {
        getImage: function (obj, args, context, info) {
            var id = args.id;
            return _back_end_database_1.Repositories.imageRepository.getOnebyId(id);
        },
        getImages: function (obj, args, context, info) {
            var sort = args.sort, searchs = args.searchs;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.imageRepository.getMany();
        },
        getSelfImages: function (obj, args, context, info) {
            var _a = args;
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.imageRepository.getManybyUserId(user.id);
        },
    },
    Mutation: {
        createImage: function (obj, args, context, info) {
            var detail = args.detail;
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.imageRepository.createWithValidate(user.id, detail);
        },
        updateImage: function (obj, args, context, info) {
            var id = args.id, detail = args.detail;
            var req = context.req;
            var _a = req.session, user = _a.user, employee = _a.employee;
            if (!user || !user.logged && !employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.imageRepository.updateWithValidate(id, detail);
        },
        deleteImage: function (obj, args, context, info) {
            var id = args.id;
            var req = context.req;
            var _a = req.session, user = _a.user, employee = _a.employee;
            if (!user || !user.logged && !employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.imageRepository.delete(id).then(function (image) {
                if (!image) {
                    throw new Error("Image don\'t exist.");
                }
                return "DELETED";
            });
        },
    }
};
exports.default = imageResolvers;
