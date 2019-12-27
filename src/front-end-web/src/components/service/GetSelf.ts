import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';

const GETSELF = gql`query{
    getSelf{
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
  }`

const getSelf = () => {
  return client.query({
    query: GETSELF
  }).then(res => {
    return res.data.getSelf;
  }).catch(err => {
    // message.error(err);
  })
}

export default getSelf;