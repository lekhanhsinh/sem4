import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';

const LOGOUT = gql`
mutation{
    logout
}`

const logout = () => {
    return client.mutate({
        mutation: LOGOUT
    }).catch(err => {
        message.error(err.message)
    })
}

export default logout;


