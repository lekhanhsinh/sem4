import dotenv from "dotenv";
import fs from "fs";

import logger from "./logger";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
export const PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : undefined;
export const DOMAIN = process.env["DOMAIN"] ? process.env["DOMAIN"] : "";
export const MONGODB_URI = (ENVIRONMENT === "production" ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"]) + "";

if (!process.env["MONGODB_URI"] || !process.env["MONGODB_URI_LOCAL"]) {
    if (ENVIRONMENT === "production") {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}