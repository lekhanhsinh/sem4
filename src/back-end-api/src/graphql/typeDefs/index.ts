import { gql } from "apollo-server-core";
import { typeDefs } from "graphql-scalars";
import UserTypeDefs from "./User";
import AuthTypeDefs from "./Auth";
import EmployeeTypeDefs from "./Employee";
import AuthEmployeeTypeDefs from "./AuthEmployee";
import ImageTypeDefs from "./Image";
import CartTypeDefs from "./Cart";
import OrderTypeDefs from "./Order";

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
    ...scalarTypeDef,
    rootTypeDefs,
    UserTypeDefs,
    AuthTypeDefs,
    EmployeeTypeDefs,
    AuthEmployeeTypeDefs,
    ImageTypeDefs,
    CartTypeDefs,
    OrderTypeDefs,
];