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
var _back_end_database_1 = require("@back-end-database");
var orderResolvers = {
    Query: {
        getSelfOrders: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.orderRepository.getManybyUserId(user.id);
        },
        getOrder: function (obj, args, context, info) {
            var id = args.id;
            return _back_end_database_1.Repositories.orderRepository.getOnebyId(id);
        },
        getOrders: function (obj, args, context, info) {
            var sort = args.sort, searchs = args.searchs;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.orderRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        createOrder: function (obj, args, context, info) {
            var creditCardNumber = args.creditCardNumber, detail = args.detail;
            var req = context.req;
            var _a = req.session, user = _a.user, cart = _a.cart;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.orderRepository.create(__assign(__assign({ creditCardNumber: creditCardNumber, user: user.id, email: user.email }, cart), detail));
        },
        updateOrder: function (obj, args, context, info) {
            var id = args.id, detail = args.detail;
            var req = context.req;
            var order = req.session.order;
            if (!order) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.orderRepository.update(id, detail);
        },
        deleteOrder: function (obj, args, context, info) {
            var id = args.id;
            var req = context.req;
            var order = req.session.order;
            if (!order) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.orderRepository.delete(id).then(function (order) {
                if (!order) {
                    throw new Error("Order don\'t exist.");
                }
                return "DELETED";
            });
        },
    }
};
exports.default = orderResolvers;
