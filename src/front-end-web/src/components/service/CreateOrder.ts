import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';


const CREATEORDER = gql`
mutation CreateOrder($creditCardNumber:String, $detail : OrderDetailInputType!){
        createOrder(creditCardNumber:$creditCardNumber,detail:$detail) {
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

const createOrder = (creditCardNumber: string, detail: {
    address: string
    description: string
}) => {
    return client.mutate({
        mutation: CREATEORDER,
        variables: { creditCardNumber, detail }
    }).then(res => {
        return res.data.createOrder
    }).catch(err => {
        message.error(err.message)
    })
}

export default createOrder;