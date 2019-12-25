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
                    else {
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
            var e_2, _a;
            var items = args.items;
            var req = context.req;
            var user = req.session.user;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            var cart = user.cart;
            var promises = [];
            var tempItems = [];
            var totalPrice = 0;
            var _loop_2 = function (i) {
                var promise = _back_end_database_1.Repositories.imageRepository.getOnebyId(i.image).then(function (image) {
                    if (!image) {
                        items.splice(cart.items.indexOf(i), 1);
                    }
                    else {
                        var size = i.size.split("x");
                        var price = 0;
                        if (index_1.myCache.get("method") === "PERCM") {
                            price = (parseInt(size[0]) * parseInt(size[1])) * i.quantity * parseFloat(index_1.myCache.get("pricePerCm") + "");
                        }
                        else {
                            price = i.quantity * parseFloat(index_1.myCache.get("pricePerPic") + "");
                        }
                        tempItems.push({
                            image: i.image,
                            size: i.size,
                            material: i.material,
                            quantity: i.quantity,
                            totalPrice: price
                        });
                        totalPrice += price;
                    }
                });
                promises.push(promise);
            };
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var i = items_1_1.value;
                    _loop_2(i);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return Promise.all(promises).then(function () {
                var e_3, _a;
                user.cart = {
                    items: tempItems,
                    totalPrice: totalPrice
                };
                var promises = [];
                var temp = {
                    items: [],
                    totalPrice: user.cart.totalPrice
                };
                var _loop_3 = function (item) {
                    var promise = _back_end_database_1.Repositories.imageRepository.getOnebyId(item.image).then(function (image) {
                        if (!image) {
                            cart.items.splice(user.cart.items.indexOf(item), 1);
                        }
                        else {
                            temp.items.push(__assign(__assign({}, item), { image: image }));
                        }
                    });
                    promises.push(promise);
                };
                try {
                    for (var _b = __values(user.cart.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        _loop_3(item);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return Promise.all(promises).then(function () {
                    return temp;
                });
            });
        }
    },
};
exports.default = cartResolvers;
