import { Express } from "express";

import web from "./web";
import admin from "./admin";


const routing = (app: Express): void => {
    app.use("/", web);
    app.use("/admin", admin);
};

export default routing;