import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';


const GETSELFORDERDETAIL = gql`
query {
  getSelfOrders{
    id
    items{
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
    address
    description
    status
  }
}
`

const getSelfOrders = () => {
  return client.query({
    query: GETSELFORDERDETAIL,
    fetchPolicy: "no-cache"
  }).then(res => {
    return res.data.getSelfOrders
  }).catch(err => {
    // message.error(err.message)
  })
}


export default getSelfOrders;