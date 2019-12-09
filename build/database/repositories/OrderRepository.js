"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var models_1 = require("../models");
var ImageRepository_1 = require("./ImageRepository");
var CouponRepository_1 = require("./CouponRepository");
var UserRepository_1 = require("./UserRepository");
var OrderRepository = (function (_super) {
    __extends(OrderRepository, _super);
    function OrderRepository() {
        var _this = _super.call(this, models_1.Order) || this;
        _this.create = function (userId, order) {
            if (!order.images || order.images.length == 0) {
                throw new Error("Cart is empty.");
            }
            var tempImages = order.images;
            var imageIds = order.images.map(function (i) {
                return i.image;
            });
            var images = [];
            return ImageRepository_1.imageRepository.check(imageIds).then(function (founds) {
                var _loop_1 = function (image) {
                    var temp = tempImages.find(function (i) { return i.image === image.id; });
                    if (temp) {
                        images.push(__assign(__assign({}, temp), { image: image }));
                    }
                };
                for (var _i = 0, founds_1 = founds; _i < founds_1.length; _i++) {
                    var image = founds_1[_i];
                    _loop_1(image);
                }
                return _this.caculatePrice(images, order.coupon).then(function (totalPrice) {
                    return UserRepository_1.userRepository.getOne(userId).then(function (user) {
                        if (!user) {
                            throw new Error("User don\'t exist.");
                        }
                        var newOrder = new models_1.Order({
                            images: images,
                            user: user,
                            totalPrice: totalPrice,
                            description: order.description,
                            creditCardNumber: order.creditCardNumber
                        });
                        return newOrder.save();
                    });
                });
            });
        };
        _this.update = function (id, order) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Order don\'t exist.");
                }
                found.description = order.description || found.description;
                found.creditCardNumber = order.creditCardNumber || found.creditCardNumber;
                if (!order.images) {
                    return found.save();
                }
                var tempImages = order.images;
                var imageIds = order.images.map(function (i) {
                    return i.image;
                });
                return ImageRepository_1.imageRepository.check(imageIds).then(function (founds) {
                    var _loop_2 = function (image) {
                        var temp = tempImages.find(function (i) { return i.image === image.id; });
                        if (temp) {
                            found.images.push(__assign(__assign({}, temp), { image: image }));
                        }
                    };
                    for (var _i = 0, founds_2 = founds; _i < founds_2.length; _i++) {
                        var image = founds_2[_i];
                        _loop_2(image);
                    }
                    return _this.caculatePrice(found.images, order.coupon).then(function (totalPrice) {
                        found.totalPrice = totalPrice;
                        return found.save();
                    });
                });
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Order don\'t exist.");
                }
                return found.remove();
            });
        };
        _this.caculatePrice = function (images, couponName) {
            return CouponRepository_1.couponRepository.collection.findOne({ name: couponName }).then(function (coupon) {
                if (coupon) {
                    return coupon;
                }
                return CouponRepository_1.couponRepository.collection.findOne({ name: "default" });
            }).then(function (coupon) {
                if (!coupon) {
                    throw new Error("Default coupon is not exsit! Seed again!");
                }
                if (coupon.isFinite && coupon.count === 0) {
                    throw new Error("Coupon has expired!");
                }
                var totalPrice = 0;
                switch (coupon.mode) {
                    case "pricePerCm":
                        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                            var image = images_1[_i];
                            var size = image.printSize.split("x");
                            totalPrice += (parseInt(size[0]) * parseInt(size[1])) * image.count * coupon.pricePerCm;
                        }
                        break;
                    case "pricePerImage":
                        for (var _a = 0, images_2 = images; _a < images_2.length; _a++) {
                            var image = images_2[_a];
                            totalPrice += image.count * coupon.pricePerCm;
                        }
                        break;
                    default:
                        break;
                }
                if (coupon.discountPercent) {
                    totalPrice *= coupon.discountPercent / 100;
                }
                if (coupon.discount) {
                    totalPrice -= coupon.discount;
                }
                if (coupon.isFinite) {
                    coupon.count -= 1;
                }
                return totalPrice;
            });
        };
        return _this;
    }
    return OrderRepository;
}(BasicRepository_1.default));
exports.OrderRepository = OrderRepository;
exports.orderRepository = new OrderRepository();
