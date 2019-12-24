import NodeCache from "node-cache";
import { ApolloServer } from "apollo-server-express";
export declare const myCache: NodeCache;
declare const server: ApolloServer;
declare const app: import("express-serve-static-core").Express;
export { app, server };
