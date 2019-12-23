import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETERODERS = gql`
    query GetOrders {
        getOrders{
            items{
              quantity
              size
              image{
                id
                name
                description
                path
              }
              totalPrice
            }
            totalPrice
            address
            status  
          }
    }
`
const getOrders = () => {
  return client.query({
    query: GETERODERS,
  }).then(res => {

    return res.data.getOrders
  }).catch(err => {

  }).catch(err => {
    message.info(err.message);
  })
}
export default getOrders