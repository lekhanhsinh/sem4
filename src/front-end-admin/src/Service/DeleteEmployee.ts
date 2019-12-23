import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const DELETEEMPLOYEE = gql`
    mutation DeleteEmployee($id:String!){
        deleteEmployee(id:$id)
    }
`
const deleteEmployee = (id: string) => {
    return client.mutate({
        mutation: DELETEEMPLOYEE,
        variables: { id }
    }
    ).then(res => {
        return res.data.deleteEmployee
    }).catch(err => {
        message.info(err.message)
    })
}
export default deleteEmployee