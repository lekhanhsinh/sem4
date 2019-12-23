import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const UPDATEORDER = gql`
    mutation UpdateOrder(
        $id:String!,
        $detail:OrderDetailInputType!,
    ){
        updateOrder(
            id:$id,
            detail:$detail,
        ){
            
                items {
                  quantity
                  size
                  image {
                    id
                    name
                    description
                    path
                  }
                  totalPrice
                }
                totalPrice
                address
              }
        
    }
`
const updateOrder = (id: string, detail: any) => {

    return client.mutate({
        mutation: UPDATEORDER,
        variables: {
            id,
            detail,
        }
    }).then(res => {
        return console.log(res.data.updateOrder);

    }).catch(err => {
        message.info(err.message);
    })
}
export default updateOrder