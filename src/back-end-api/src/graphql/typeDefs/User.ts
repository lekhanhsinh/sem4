import { gql } from "apollo-server-express";

const UserTypeDefs = gql`
    extend type Query {
        getSelf: UserType

        getUser(id: String!): UserType
        getUsers(sort: SortInputType, searchs: [SearchInputType]): [UserType]
    }
    
    extend type Mutation {
        updateSelfDetail(detail: UserDetailInputType!): UserType
        updateSelfPassword(password: String!, newPassword: String!, repeatPassword: String!): UserType

        register(email: String!, password: String!, repeatPassword: String!, detail: UserDetailInputType!): UserType
        updateUser(id: String!, detail: UserDetailInputType!): UserType
        deleteUser(id: String!): String
    }
    
    type UserType {
        id: String
        email: EmailAddress
        createdAt: DateTime
        updatedAt: DateTime
    }

    input UserDetailInputType {
        name: String
        gender: String
        address: String
        phoneNumber: String
        dateOfBirth: DateTime
    }
`;

export default UserTypeDefs;