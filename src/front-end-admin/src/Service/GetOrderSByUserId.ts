import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETORDERSBYUSERID = gql`
query 
    GetOrdersbyUserId($userId:String!) {
        getOrdersbyUserId(userId:$userId){
          createdAt
          updatedAt
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
          items {
              quantity
              size
              material
              image {
                id
              }
              totalPrice
            }
            totalPrice
            address
            status
          }
    }
  
`
const getOrdersbyUserId = (userId: string) => {
  return client.query({
    query: GETORDERSBYUSERID,
    variables: { userId }
  }).then(res => {

    return res.data.getOrdersbyUserId
  }).catch(err => {
    message.info(err.message);
  })
}
export default getOrdersbyUserId