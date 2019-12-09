import { gql } from "apollo-server-core";
import { typeDefs } from "graphql-scalars";
import UserTypeDefs from "./User";
import AuthTypeDefs from "./Auth";

const rootTypeDefs = gql`

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }

    input SortInputType {
        sortBy: String
        asc: Boolean    
    }

    input SearchInputType {
        path: String
        str: String
        options: String
    }
`;

const scalarTypeDef = typeDefs.map(str => {
    return gql`${str}`;
});

export default [
    rootTypeDefs,
    UserTypeDefs,
    AuthTypeDefs,
    ...scalarTypeDef
];