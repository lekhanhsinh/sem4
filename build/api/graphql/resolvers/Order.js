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
var orderResolvers = {
    Query: {
        getOrder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.getOne(id)
                .populate(["user", "images.image"]).then(function (order) {
                if (!order) {
                    throw new Error("Order don\'t exist.");
                }
                if (user.id !== order.user.id || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                    throw new Error("Access Denied.");
                }
                return order;
            });
        },
        getOrdersSelf: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort, searchs = args.searchs;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.search(__spreadArrays([{ path: "user", str: user.id, options: "" }], searchs), sort)
                .populate(["user", "images.image"]).exec();
        },
        getOrders: function (obj, args, context, info) {
            var req = context.req;
            var sort = args.sort;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.getAll(sort)
                .populate(["user", "images.image"]).exec();
        }
    },
    Mutation: {
        createOrder: function (obj, args, context, info) {
            var req = context.req;
            var order = args.order;
            var user = req.session.user;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.create(user.id, order);
        },
        updateOrder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id, order = args.order;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.update(id, order);
        },
        deleteOrder: function (obj, args, context, info) {
            var req = context.req;
            var id = args.id;
            var user = req.session.user;
            if (!user || user.roles && !user.roles.find(function (x) { return x.name === "Admin"; })) {
                throw new Error("Access Denied.");
            }
            return index_1.Repositories.orderRepository.delete(id).then(function () {
                return "DELETED";
            });
        },
    }
};
exports.default = orderResolvers;
