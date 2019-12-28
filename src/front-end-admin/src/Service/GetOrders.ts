import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETERODERS = gql`
    query GetOrders {
      getOrders{
        id
        user{
          id
          email
          name
          gender
          address
          phoneNumber
          dateOfBirth
          createdAt
          updatedAt
        }
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
const getOrders = () => {
  return client.query({
    query: GETERODERS,
  }).then(res => {

    return res.data.getOrders
  }).catch(err => {
    message.info(err.message);
  })
}
export default getOrders