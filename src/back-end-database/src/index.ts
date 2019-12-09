import mongoose from "mongoose";

import { MONGODB_URI } from "./utils/secrets";
import logger from "./utils/logger";
import * as Models from "./models";
import * as Repositories from "./repositories";

mongoose.set("useFindAndModify", false);

// Connect to MongoDB

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        logger.debug(`Connected to database at ${MONGODB_URI}`);
    },
).catch(err => {
    logger.debug("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});

export {
    mongoose,
    Models,
    Repositories
};