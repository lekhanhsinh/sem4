import { gql } from "apollo-server-express";

const AuthEmployeeTypeDefs = gql`
    extend type Mutation {
        loginEmployee(email: String!, password: String!): EmployeeType
        logoutEmployee: String
    }
`;

export default AuthEmployeeTypeDefs;