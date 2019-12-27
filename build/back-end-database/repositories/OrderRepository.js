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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRepository_1 = __importDefault(require("./BasicRepository"));
var Models = __importStar(require("../models"));
var OrderRepository = (function (_super) {
    __extends(OrderRepository, _super);
    function OrderRepository() {
        var _this = _super.call(this, Models.Order) || this;
        _this.getManybyUserId = function (userId, sort, populate) {
            var _a;
            if (sort === void 0) { sort = { sortBy: "updatedAt", asc: false }; }
            if (populate === void 0) { populate = []; }
            return _this._collection.find({ user: userId })
                .populate(populate)
                .sort((_a = {}, _a[sort.sortBy] = sort.asc ? 1 : -1, _a))
                .exec();
        };
        _this.create = function (docs) {
            return _this._collection.create(docs);
        };
        _this.update = function (id, docs, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findByIdAndUpdate(id, docs, { new: true })
                .populate(populate)
                .exec().then(function (found) {
                if (!found) {
                    throw new Error("Order don\'t exist.");
                }
                found.status = docs.status ? docs.status : found.status;
                found.description = docs.description ? docs.description : found.description;
                return found;
            });
        };
        return _this;
    }
    return OrderRepository;
}(BasicRepository_1.default));
exports.OrderRepository = OrderRepository;
exports.orderRepository = new OrderRepository();
