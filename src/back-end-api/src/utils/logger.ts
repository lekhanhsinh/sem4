import { createLogger, LoggerOptions, transports, format } from "winston";

const alignedWithColorsAndTime = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info) => {
        const {
            timestamp, level, message, ...args
        } = info;

        const ts = timestamp.slice(0, 19).replace("T", " ");
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
    }),
);

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            format: alignedWithColorsAndTime,
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
        new transports.File({ filename: "debug.log", level: "debug" }),
    ],
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
