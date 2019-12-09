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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var models_1 = require("../models");
var CouponRepository = (function (_super) {
    __extends(CouponRepository, _super);
    function CouponRepository() {
        var _this = _super.call(this, models_1.Coupon) || this;
        _this.create = function (coupon) {
            var newCoupon = new models_1.Coupon({
                name: coupon.name,
                description: coupon.description,
                mode: coupon.mode,
                pricePerCm: coupon.pricePerCm,
                pricePerImage: coupon.pricePerImage,
                discount: coupon.discount,
                discountPercent: coupon.discountPercent,
                count: coupon.count,
                isFinite: coupon.isFinite,
            });
            return newCoupon.save();
        };
        _this.update = function (id, coupon) {
            _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Coupon don\'t exist.");
                }
                found.description = coupon.description || found.description;
                found.mode = coupon.mode || found.mode;
                found.pricePerCm = coupon.pricePerCm || found.pricePerCm;
                found.pricePerImage = coupon.pricePerImage || found.pricePerImage;
                found.discount = coupon.discount || found.discount;
                found.discountPercent = coupon.discountPercent || found.discountPercent;
                found.count = coupon.count || found.count;
                found.isFinite = coupon.isFinite || found.isFinite;
                return found.save();
            });
        };
        _this.delete = function (id) {
            return _this.getOne(id).then(function (found) {
                if (!found) {
                    throw new Error("Coupon don\'t exist.");
                }
                return found.remove();
            });
        };
        return _this;
    }
    return CouponRepository;
}(BasicRepository_1.default));
exports.CouponRepository = CouponRepository;
exports.couponRepository = new CouponRepository();
