import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETCART = gql`
query{
  getCart{
    items {
      quantity
      size
      material
      image {
        id
        name
        description
        path
        createdAt
        updatedAt
      }
      totalPrice
    }
    totalPrice
  }
}
`

const getCart = () => {
    return client.query({
        query: GETCART,
        fetchPolicy: "no-cache"
    }).then(res => {
        return res.data.getCart;
    }).catch(err => {
        message.error(err.message);
    })
}

export default getCart;