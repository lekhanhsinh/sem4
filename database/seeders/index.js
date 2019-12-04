"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_seeding_1 = require("mongo-seeding");
var path_1 = __importDefault(require("path"));
var secrets_1 = require("../startup/secrets");
var logger_1 = __importDefault(require("../startup/logger"));
var seeder = new mongo_seeding_1.Seeder({
    database: secrets_1.MONGODB_URI,
    dropDatabase: true
});
var collectionReadingOptions = {
    extensions: ["js", "json"],
    transformers: [
        mongo_seeding_1.Seeder.Transformers.replaceDocumentIdWithUnderscoreId,
    ]
};
var collections = seeder.readCollectionsFromPath(path_1.default.resolve(__dirname, "seeds"), collectionReadingOptions);
seeder
    .import(collections)
    .then(function () {
    logger_1.default.info("Seeded success!");
})
    .catch(function (err) {
    throw err;
});
