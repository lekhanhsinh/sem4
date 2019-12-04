"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("@database/index");
var authResolvers = {
    Mutation: {
        login: function (obj, args, context, info) {
            var req = context.req;
            var email = args.email, password = args.password;
            return index_1.Repositories.userRepository.getOneByEmail(email)
                .populate(["roles", "folders"])
                .exec().then(function (user) {
                if (!user) {
                    throw new Error("Access Denied.");
                }
                return user.comparePassword(password).then(function (isMatch) {
                    if (!isMatch) {
                        throw new Error("Access Denied.");
                    }
                    req.session.user = {
                        id: user.id,
                        roles: user.roles
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
            return "LOGGED OUT";
        },
    }
};
exports.default = authResolvers;
