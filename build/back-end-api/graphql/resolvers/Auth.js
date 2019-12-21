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
                    if (req.session.user) {
                        req.session.user.logged = true;
                    }
                    else {
                        req.session.user = {
                            id: user.id,
                            email: user.email,
                            cart: { items: [], totalPrice: 0 },
                            logged: true
                        };
                    }
                    return user;
                });
            });
        },
        logout: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            user.logged = false;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
exports.default = authResolvers;
