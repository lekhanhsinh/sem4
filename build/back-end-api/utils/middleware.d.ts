import express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
export declare const middleware: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, connection: ExecutionParams<unknown> | undefined) => unknown;
export declare const subscriptionOnConnect: () => unknown;
