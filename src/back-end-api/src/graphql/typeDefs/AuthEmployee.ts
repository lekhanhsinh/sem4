import { gql } from "apollo-server-express";

const AuthEmployeeTypeDefs = gql`
    extend type Mutation {
        loginEmployee(email: String!, password: String!): EmployeeType
        logoutEmployee: String

        setPrice(price: Float!, method: METHODS!): String
    }
    enum METHODS {
        PERCM
        PERPIC
    }
`;

export default AuthEmployeeTypeDefs;