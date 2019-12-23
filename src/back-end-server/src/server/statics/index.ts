import express, { Express } from "express";
import path from "path";

const hookStatics = (app: Express): void => {
    app.use("/public", express.static(path.resolve("public")));
    app.use("/admin", express.static(path.resolve("front-end-admin")));
    app.use("/", express.static(path.resolve("front-end-web")));
};

export default hookStatics;