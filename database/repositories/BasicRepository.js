"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRepository = (function () {
    function BasicRepository(collection) {
        var _this = this;
        this.getOne = function (id) {
            return _this.collection.findById(id);
        };
        this.getAll = function (sort) {
            var _a;
            if (sort === void 0) { sort = { sortBy: "updatedAt", asc: false }; }
            var tempSort = (_a = {},
                _a[sort.sortBy] = sort.asc ? 1 : -1,
                _a);
            return _this.collection.find()
                .sort(tempSort);
        };
        this.search = function (searchs, sort) {
            var _a, _b;
            if (sort === void 0) { sort = { sortBy: "updatedAt", asc: false }; }
            var tempSort = (_a = {},
                _a[sort.sortBy] = sort.asc ? 1 : -1,
                _a);
            var query = { $or: [] };
            if (!searchs) {
                return _this.getAll(sort);
            }
            for (var _i = 0, searchs_1 = searchs; _i < searchs_1.length; _i++) {
                var search = searchs_1[_i];
                var path = search.path, str = search.str, options = search.options;
                query.$or.push((_b = {}, _b[path] = { "$regex": str, "$options": options }, _b));
            }
            return _this.collection.find(query)
                .sort(tempSort);
        };
        this.check = function (ids) {
            return _this.collection.find({
                "_id": { $in: ids }
            }).then(function (founds) {
                if (founds && ids.length === founds.length) {
                    return founds;
                }
                return [];
            });
        };
        this.collection = collection;
    }
    return BasicRepository;
}());
exports.default = BasicRepository;
