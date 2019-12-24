require("module-alias/register");

import express from "express";
import http from "http";
import vhost from "vhost-ts";
import cors from "cors";

import * as Api from "@back-end-api";
import * as Main from "./server";

import { DOMAIN, PORT, ENVIRONMENT } from "./utils/secrets";
import logger from "./utils/logger";
import initSession from "./utils/session";

const app = express();

initSession(app);

app.use(vhost(`api.${DOMAIN}`, Api.app));
app.use(vhost(`${DOMAIN}`, Main.app));

app.use(cors());

const httpServer = http.createServer(app);
Api.server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    logger.info(`Server ready at http://${DOMAIN}:${PORT}`);
    logger.info(`Api ready at http://api.${DOMAIN}:${PORT}${Api.server.graphqlPath}`);
    if (ENVIRONMENT === "development") {
        logger.info(`Server playground at http://api.${DOMAIN}:${PORT}${Api.server.graphqlPath}`);
    }
});

export { app };

