import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETUSER = gql`
    query GetUser($id:String!) {
        getUser(id:$id) {
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
    }
`
const getUser = (id: string) => {
    return client.query({
        query: GETUSER,
        variables: { id }
    }).then(res => {


        return res.data.getUser
    }).catch(err => {
        message.info(err.message);
    })
}
export default getUser