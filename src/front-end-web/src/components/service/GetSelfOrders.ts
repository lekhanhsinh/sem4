import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';


const GETSELFORDERDETAIL = gql`
query{
  getSelfOrders {
    items {
      quantity
      size
      material
      totalPrice
    }
    totalPrice
    description
    address
    status
  }
  }
`

const getSelfOrders = () => {
    return client.query({
        query : GETSELFORDERDETAIL
    }).then(res => {
        return res.data.getSelfOrders
    }).catch(err => {
        message.error(err.message)
    })
}


export default getSelfOrders;