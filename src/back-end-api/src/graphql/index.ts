import { PubSub } from "graphql-subscriptions";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export const pubsub = new PubSub();

export {
    typeDefs,
    resolvers
};