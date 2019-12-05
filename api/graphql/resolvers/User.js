"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("@database/index");
var userResolvers = {
    Query: {
        getSelf: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.userRepository.getOne(user.id);
        },
        getUser: function (obj, args, context, info) {
            var id = args.id;
            return index_1.Repositories.userRepository.getOne(id);
        },
        getUsers: function (obj, args, context, info) {
            var sort = args.sort, searchs = args.searchs;
            return index_1.Repositories.userRepository.search(searchs, sort);
        }
    },
    Mutation: {
        register: function (obj, args, context, info) {
            var email = args.email, password = args.password, detail = args.detail;
            return index_1.Repositories.userRepository.create(__assign({ email: email, password: password }, detail));
        },
        updateSelf: function (obj, args, context, info) {
            var req = context.req;
            var detail = args.detail;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.userRepository.updateDetail(user.id, __assign({}, detail));
        },
        updateUser: function (obj, args, context, info) {
            var id = args.id, roles = args.roles, detail = args.detail;
            var req = context.req;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.userRepository.update(id, __assign({ roles: roles }, detail));
        },
        deleteUser: function (obj, args, context, info) {
            var id = args.id;
            var req = context.req;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.userRepository.delete(id).then(function () {
                return "DELETED";
            });
        },
    }
};
exports.default = userResolvers;
