import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';


const GETLOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        id      
        email
        name
        gender
        address
        phoneNumber
        dateOfBirth
    }
  }
`;
const getLogin = (email: string, password: string) => {
  return client
    .mutate({
      mutation: GETLOGIN,
      variables: { email, password }
    })
    .then(res => {
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", res.data.login);
      return res.data.login;
    })

}
export default getLogin;