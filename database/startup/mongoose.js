"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var secrets_1 = require("./secrets");
var logger_1 = __importDefault(require("./logger"));
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(secrets_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
    logger_1.default.debug("Connected to database at " + secrets_1.MONGODB_URI);
}).catch(function (error) {
    throw new Error("MongoDB connection error. Please make sure MongoDB is running. " + error);
});
exports.default = mongoose_1.default;
