import { gql } from "apollo-server-express";

const OrderTypeDefs = gql`

    extend type Query {
        getSelfOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]

        getOrder(id: String!): OrderType
        getOrders(sort: SortInputType, searchs: [SearchInputType]): [OrderType]
    }

    extend type Mutation {
        createOrder(creditCardNumber: String, detail: OrderDetailInputType!): OrderType
        updateOrder(id: String!, detail: OrderDetailInputType!): OrderType
        deleteOrder(id: String!): OrderType
    }

    type OrderType {
        items: [ItemType]
        totalPrice: Float
        address: String
    }

    input OrderDetailInputType{
        address: String
        description: String
    }
`;

export default OrderTypeDefs;