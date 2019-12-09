"use strict";
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
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
var secrets_1 = require("./utils/secrets");
var logger_1 = __importDefault(require("./utils/logger"));
var Models = __importStar(require("./models"));
exports.Models = Models;
var Repositories = __importStar(require("./repositories"));
exports.Repositories = Repositories;
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(secrets_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
    logger_1.default.debug("Connected to database at " + secrets_1.MONGODB_URI);
}).catch(function (err) {
    logger_1.default.debug("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});
