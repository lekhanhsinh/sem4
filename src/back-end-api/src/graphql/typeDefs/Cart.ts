import { gql } from "apollo-server-express";

const CartTypeDefs = gql`

    extend type Query {
        getCart: CartType
    }

    extend type Mutation {
        updateCart(items: [ItemlInputType]!): CartType
    }

    type CartType {
        items: [ItemType]
        totalPrice: Float
    }

    type ItemType {
        quantity: Int
        size: String
        material: String
        image: ImageType
        totalPrice: Float
    }

    input ItemlInputType {
        quantity: Int!
        material: String
        size: String!
        image: String!
    }
`;

export default CartTypeDefs;