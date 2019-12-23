import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const DELETEORDER = gql`
    mutation DeleteOrder($id:String!){
        deleteOrder(id:$id)
    }
`
const deleteOrder = (id: string) => {
    return client.mutate({
        mutation: DELETEORDER,
        variables: { id }
    }
    ).then(res => {
        return res.data.deleteOrder
    }).catch(err => {
        message.info(err.message)
    }).catch(err => {
        message.info(err.message);
    })
}
export default deleteOrder