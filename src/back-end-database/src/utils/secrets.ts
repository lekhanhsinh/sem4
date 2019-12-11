import dotenv from "dotenv";
import fs from "fs";

import logger from "./logger";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
export const MONGODB_URI = (ENVIRONMENT === "production" ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"]) + "";
export const STRIPE_KEY = process.env["STRIPE_PUBLISHABLE_KEY"] ? process.env["STRIPE_PUBLISHABLE_KEY"] : "";

if (!process.env["MONGODB_URI"] || !process.env["MONGODB_URI_LOCAL"]) {
    if (ENVIRONMENT === "production") {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!process.env["STRIPE_PUBLISHABLE_KEY"]) {
    logger.error("No stripe key string. Set STRIPE_PUBLISHABLE_KEY environment variable.");
    process.exit(1);
}