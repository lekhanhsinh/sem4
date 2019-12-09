import dotenv from "dotenv";
import fs from "fs";

import logger from "./logger";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV === "production" ? "production" : "development";
export const DOMAIN = process.env["DOMAIN"] + "";
export const PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : undefined;
export const SESSION_SECRET = process.env["SESSION_SECRET"] + "";
export const SESSION_MAXAGE = process.env["SESSION_MAXAGE"] ? parseInt(process.env["SESSION_MAXAGE"]) : undefined;

if (!process.env["DOMAIN"]) {
    logger.error("No domain string. Set DOMAIN environment variable.");
    process.exit(1);
}

if (!process.env["SESSION_SECRET"]) {
    logger.error("No session secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!process.env["SESSION_MAXAGE"]) {
    logger.error("No session maxAge. Set SESSION_MAXAGE environment variable.");
    process.exit(1);
}