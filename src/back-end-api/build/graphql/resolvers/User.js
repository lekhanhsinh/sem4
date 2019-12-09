"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var userResolvers = {
    Query: {
        getSelf: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.userRepository.getOnebyId(user.id);
        },
        getUser: function (obj, args, context, info) {
            var id = args.id;
            return _back_end_database_1.Repositories.userRepository.getOnebyId(id);
        },
        getUsers: function (obj, args, context, info) {
            var sort = args.sort, searchs = args.searchs;
            return _back_end_database_1.Repositories.userRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        updateSelfDetail: function (obj, args, context, info) {
            var detail = args.detail;
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.userRepository.updateDetail(user.id, detail);
        },
        updateSelfPassword: function (obj, args, context, info) {
            var password = args.password, newPassword = args.newPassword, repeatPassword = args.repeatPassword;
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.userRepository.updatePassword(user.id, password, newPassword, repeatPassword);
        },
        register: function (obj, args, context, info) {
            var email = args.email, password = args.password, repeatPassword = args.repeatPassword, detail = args.detail;
            return _back_end_database_1.Repositories.userRepository.register(email, password, repeatPassword, detail);
        },
        updateUser: function (obj, args, context, info) {
            var id = args.id, detail = args.detail;
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.userRepository.update(id, detail).then(function (user) {
                if (!user) {
                    throw new Error("User don\'t exist.");
                }
                return user;
            });
        },
        deleteUser: function (obj, args, context, info) {
            var id = args.id;
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.userRepository.delete(id).then(function (user) {
                if (!user) {
                    throw new Error("User don\'t exist.");
                }
                return "DELETED";
            });
        },
    }
};
exports.default = userResolvers;
