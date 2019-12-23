import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const DELETEUSER = gql`
    mutation DeleteUser($id:String!){
        deleteUser(id:$id)
    }
`
const deleteUser = (id: string) => {
    return client.mutate({
        mutation: DELETEUSER,
        variables: { id }
    }
    ).then(res => {
        return res.data.deleteUser
    }).catch(err => {
        message.info(err.message);
    })
}
export default deleteUser