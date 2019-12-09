import { IResolvers } from "graphql-tools";
import { resolvers as scalarsResolvers } from "graphql-scalars";
import userResolvers from "./User";
import authResolvers from "./Auth";
import employeeResolvers from "./Employee";
import authEmployeeResolvers from "./AuthEmployee";

const resolvers: IResolvers = {
    ...scalarsResolvers,
    Query: Object.assign({},
        userResolvers.Query,
        employeeResolvers.Query,
    ),
    Mutation: Object.assign({},
        userResolvers.Mutation,
        authResolvers.Mutation,
        employeeResolvers.Mutation,
        authEmployeeResolvers.Mutation,
    ),
    Subscription: Object.assign({}),
};

export default resolvers;
