import { Seeder } from "mongo-seeding";
import path from "path";

import { MONGODB_URI } from "../utils/secrets";
import logger from "../utils/logger";

const seeder = new Seeder(
    {
        database: MONGODB_URI,
        dropDatabase: true
    }
);
const collectionReadingOptions = {
    extensions: ["js", "json"],
    transformers: []
};
const collections = seeder.readCollectionsFromPath(
    path.resolve(__dirname, "seeds"),
    collectionReadingOptions
);

seeder
    .import(collections)
    .then(() => {
        logger.info("Seeded success!");
    })
    .catch(err => {
        throw err;
    });