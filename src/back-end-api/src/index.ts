require("module-alias/register");

import express from "express";
import NodeCache from "node-cache";

import { ApolloServer } from "apollo-server-express";
import { ENVIRONMENT, DOMAIN, PORT } from "./utils/secrets";
import { middleware, subscriptionOnConnect } from "./utils/middleware";
import { typeDefs, resolvers } from "./graphql";

export const myCache = new NodeCache();
myCache.set("pricePerCm", 0.5);
myCache.set("pricePerPic", 2);
myCache.set("method", "PERCM");

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req, connection }): unknown => middleware(req, connection),
    subscriptions: {
        onConnect: subscriptionOnConnect
    },
    playground: ENVIRONMENT === "development" ? {
        settings: {
            "request.credentials": "same-origin"
        },
    } : false
});

const app = express();

server.applyMiddleware({
    app,
    cors: {
        origin: [`http://${DOMAIN}${PORT ? `:${PORT}` : ""}`, `http://api.${DOMAIN}${PORT ? `:${PORT}` : ""}`, "http://localhost:3000"],
        credentials: true
    }
});

export { app, server };