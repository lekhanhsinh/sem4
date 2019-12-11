"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var authResolvers = {
    Mutation: {
        login: function (obj, args, context, info) {
            var req = context.req;
            var email = args.email, password = args.password;
            return _back_end_database_1.Repositories.userRepository.getOnebyEmail(email)
                .then(function (user) {
                if (!user) {
                    throw new Error("Access Denied.");
                }
                return user.comparePassword(password).then(function (isMatch) {
                    if (!isMatch) {
                        throw new Error("Access Denied.");
                    }
                    req.session.cart = undefined;
                    req.session.user = {
                        id: user.id,
                    };
                    return user;
                });
            });
        },
        logout: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            req.session.user = undefined;
            req.session.cart = undefined;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
exports.default = authResolvers;
