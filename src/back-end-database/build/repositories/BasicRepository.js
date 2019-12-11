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
var BasicRepository = (function () {
    function BasicRepository(collection) {
        var _this = this;
        this.getOnebyId = function (id, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findById(id)
                .populate(populate)
                .exec();
        };
        this.getOne = function (conditions, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findOne(conditions)
                .populate(populate)
                .exec();
        };
        this.getMany = function (searchs, sort, populate) {
            var _a, e_1, _b, _c, _d;
            if (searchs === void 0) { searchs = []; }
            if (sort === void 0) { sort = { sortBy: "updatedAt", asc: false }; }
            if (populate === void 0) { populate = []; }
            var query = { $or: [] };
            if (searchs.length === 0) {
                return _this._collection.find()
                    .populate(populate)
                    .sort((_a = {}, _a[sort.sortBy] = sort.asc ? 1 : -1, _a))
                    .exec();
            }
            try {
                for (var searchs_1 = __values(searchs), searchs_1_1 = searchs_1.next(); !searchs_1_1.done; searchs_1_1 = searchs_1.next()) {
                    var search = searchs_1_1.value;
                    var path = search.path, str = search.str, options = search.options;
                    query.$or.push((_c = {}, _c[path] = { "$regex": str, "$options": options }, _c));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (searchs_1_1 && !searchs_1_1.done && (_b = searchs_1.return)) _b.call(searchs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _this._collection.find(query)
                .populate(populate)
                .sort((_d = {}, _d[sort.sortBy] = sort.asc ? 1 : -1, _d))
                .exec();
        };
        this.check = function (ids) {
            return _this._collection.find({
                "_id": { $in: ids }
            }).then(function (founds) {
                if (founds && ids.length === founds.length) {
                    return founds;
                }
                return [];
            });
        };
        this.create = function (docs) {
            return _this._collection.create(docs);
        };
        this.update = function (id, docs, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findByIdAndUpdate(id, docs, { new: true })
                .populate(populate)
                .exec();
        };
        this.delete = function (id, populate) {
            if (populate === void 0) { populate = []; }
            return _this._collection.findByIdAndDelete(id)
                .populate(populate)
                .exec();
        };
        this._collection = collection;
    }
    return BasicRepository;
}());
exports.default = BasicRepository;
