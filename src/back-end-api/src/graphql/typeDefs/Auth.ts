import { gql } from "apollo-server-express";

const AuthTypeDefs = gql`
    extend type Mutation {
        login(email: String!, password: String!): UserType
        logout: String
    }
`;

export default AuthTypeDefs;