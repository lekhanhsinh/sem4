require("module-alias/register");

import express from "express";

import { ApolloServer } from "apollo-server-express";
import { ENVIRONMENT, DOMAIN } from "./utils/secrets";
import { middleware, subscriptionOnConnect } from "./utils/middleware";
import { typeDefs, resolvers } from "./graphql";

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
        origin: [`${DOMAIN}`, `api.${DOMAIN}`, "http://localhost:3000"],
        credentials: true
    }
});

export { app, server };