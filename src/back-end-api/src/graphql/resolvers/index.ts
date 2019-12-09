import { IResolvers } from "graphql-tools";
import { resolvers as scalarsResolvers } from "graphql-scalars";
import userResolvers from "./User";
import authResolvers from "./Auth";

const resolvers: IResolvers = {
    ...scalarsResolvers,
    Query: Object.assign({},
        userResolvers.Query,
    ),
    Mutation: Object.assign({},
        userResolvers.Mutation,
        authResolvers.Mutation
    ),
    Subscription: Object.assign({}),
};

export default resolvers;
