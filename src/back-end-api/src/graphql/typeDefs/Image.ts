import { gql } from "apollo-server-express";

const ImageTypeDefs = gql`

    extend type Query {
        getImage(id: String!): ImageType
        getImages(sort: SortInputType, searchs: [SearchInputType]): [ImageType]
    }

    extend type Mutation {
        createImage(detail: ImageInputType!): ImageType
        updateImage(id: String!, detail: ImageInputType!): ImageType
        deleteImage(id: String!): String
    }

    type ImageType {
        id: String
        name: String
        description: String
        path: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    input ImageInputType {
        name: String
        description: String
        file: Upload
    }
`;

export default ImageTypeDefs;