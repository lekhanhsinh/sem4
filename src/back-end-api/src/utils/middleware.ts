import express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";

export const middleware = (
    req: express.Request,
    connection: ExecutionParams<unknown> | undefined
): unknown => {
    return {
        req,
        connection
    };
};

export const subscriptionOnConnect = (): unknown => {
    return {

    };
};