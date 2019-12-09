import { gql } from "apollo-server-express";

const EmployeeTypeDefs = gql`
    extend type Query {
        getSelfEmployee: EmployeeType

        getEmployee(id: String!): EmployeeType
        getEmployees(sort: SortInputType, searchs: [SearchInputType]): [EmployeeType]
    }
    
    extend type Mutation {
        updateSelfEmployeeDetail(detail: EmployeeDetailInputType!): EmployeeType
        updateSelfEmployeePassword(password: String!, newPassword: String!, repeatPassword: String!): EmployeeType

        createEmployee(email: String!, password: String!, repeatPassword: String!, detail: EmployeeDetailInputType!): EmployeeType
        updateEmployee(id: String!, detail: EmployeeDetailInputType!): EmployeeType
        deleteEmployee(id: String!): String
    }
    
    type EmployeeType {
        id: String
        email: EmailAddress
        name: String
        role: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    input EmployeeDetailInputType {
        name: String
        role: String
    }
`;

export default EmployeeTypeDefs;