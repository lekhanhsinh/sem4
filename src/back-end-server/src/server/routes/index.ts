import { Express } from "express";

import web from "./web";
import admin from "./admin";


const routing = (app: Express): void => {
    app.use("/admin", admin);
    app.use("/", web);
};

export default routing;