"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var cartResolvers = {
    Query: {
        getCart: function (obj, args, context, info) {
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            var cart = user.cart;
            if (!cart) {
                cart = { items: [], totalPrice: 0 };
            }
            return cart;
        }
    },
    Mutation: {
        updateCart: function (obj, args, context, info) {
            var items = args.items;
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            var cart = user.cart;
            var imageIds = items.map(function (i) { return i.image; });
            return _back_end_database_1.Repositories.imageRepository.check(imageIds).then(function (images) {
                var e_1, _a;
                var tempItems = [];
                var totalPrice = 0;
                if (!images) {
                    return cart;
                }
                var _loop_1 = function (image) {
                    var item = items.find(function (i) { return i.image === image.id; });
                    if (item) {
                        var size = item.size.split("x");
                        var price = (parseInt(size[0]) * parseInt(size[1])) * item.quantity * 0.5;
                        tempItems.push({
                            image: image,
                            size: item.size,
                            material: item.material,
                            quantity: item.quantity,
                            totalPrice: price
                        });
                        totalPrice += price;
                    }
                };
                try {
                    for (var images_1 = __values(images), images_1_1 = images_1.next(); !images_1_1.done; images_1_1 = images_1.next()) {
                        var image = images_1_1.value;
                        _loop_1(image);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (images_1_1 && !images_1_1.done && (_a = images_1.return)) _a.call(images_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                user.cart = {
                    items: tempItems,
                    totalPrice: totalPrice
                };
                return cart;
            });
        },
    },
};
exports.default = cartResolvers;
