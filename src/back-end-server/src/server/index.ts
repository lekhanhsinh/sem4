import express from "express";

import routing from "./routes";
import hookStatics from "./statics";

const app = express();

hookStatics(app);
routing(app);

export {
    app
};
