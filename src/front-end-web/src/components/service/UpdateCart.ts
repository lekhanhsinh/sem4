import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const UPDATECART = gql`
mutation UpdateCart($items : [ItemInputType]!) {
  updateCart(items:$items) {
    items {
      quantity
      size
      material
      image{
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

const updateCart = (items: {
    quantity: number,
    material: string,
    size: string,
    image: string
}[]) => {
    return client.mutate({
        mutation: UPDATECART,
        variables: {items}
    }).then(res => {
        return res.data.updateCart
    }).catch(err => {
        message.error(err.message)
    })
}

export default updateCart;
