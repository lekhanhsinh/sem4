import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETEMPLOYEES = gql`
    query GetEmployees {
        getEmployees {
                id
                email
                name
                role
          }
    }
`
const getEmployees = () => {
    return client.query({
        query: GETEMPLOYEES,
    }).then(res => {

        return res.data.getEmployees
    }).catch(err => {
        message.info(err.message);
    })
}
export default getEmployees