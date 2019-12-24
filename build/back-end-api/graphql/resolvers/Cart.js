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
var index_1 = require("../../index");
var cartResolvers = {
    Query: {
        getCart: function (obj, args, context, info) {
            var e_1, _a;
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            var cart = user.cart;
            if (!cart) {
                cart = { items: [], totalPrice: 0 };
            }
            var promises = [];
            var temp = {
                items: [],
                totalPrice: cart.totalPrice
            };
            var _loop_1 = function (item) {
                var promise = _back_end_database_1.Repositories.imageRepository.getOnebyId(item.image).then(function (image) {
                    if (!image) {
                        cart.items.splice(cart.items.indexOf(item), 1);
                    }
                    if (image) {
                        temp.items.push(__assign(__assign({}, item), { image: image }));
                    }
                });
                promises.push(promise);
            };
            try {
                for (var _b = __values(cart.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    _loop_1(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Promise.all(promises).then(function () {
                return temp;
            });
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
                var e_2, _a;
                var tempItems = [];
                var totalPrice = 0;
                if (!images) {
                    return cart;
                }
                var _loop_2 = function (image) {
                    var item = items.find(function (i) { return i.image === image.id; });
                    if (item) {
                        var size = item.size.split("x");
                        var price = 0;
                        if (index_1.myCache.get("method") === "PERCM") {
                            price = (parseInt(size[0]) * parseInt(size[1])) * item.quantity * parseFloat(index_1.myCache.get("pricePerCm") + "");
                        }
                        else {
                            price = item.quantity * parseFloat(index_1.myCache.get("pricePerPic") + "");
                        }
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
                        _loop_2(image);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (images_1_1 && !images_1_1.done && (_a = images_1.return)) _a.call(images_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                user.cart = {
                    items: tempItems,
                    totalPrice: totalPrice
                };
                return user.cart;
            });
        },
    },
};
exports.default = cartResolvers;
