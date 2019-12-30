import { gql } from "apollo-server-express";

const OrderTypeDefs = gql`

    extend type Query {
        getSelfOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]

        getOrder(id: String!): OrderType
        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]
        getOrdersbyUserId(userId: String!): [OrderType]
    }

    extend type Mutation {
        createOrder(creditCardNumber: String, detail: OrderDetailInputType!): OrderType
        updateOrder(id: String!, detail: OrderDetailInputType!): OrderType
        deleteOrder(id: String!): OrderType
    }

    type OrderType {
        id: String
        items: [ItemType]
        totalPrice: Float
        user: UserType
        address: String
        description: String
        status: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    input OrderDetailInputType{
        address: String
        description: String
        status: String
    }
`;

export default OrderTypeDefs;