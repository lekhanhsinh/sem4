import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETUSERS = gql`
    query GetUsers {
        getUsers {
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
const getUsers = () => {
  return client.query({
    query: GETUSERS,
  }).then(res => {
    return res.data.getUsers
  }).catch(err => {
    message.info(err.message);
  })
}
export default getUsers