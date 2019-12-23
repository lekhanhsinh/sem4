import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const GETLOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginEmployee(email: $email, password: $password) {
        id      
        email
        name
        role
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
      localStorage.setItem("userInfo", res.data.loginEmployee);
      return res.data.loginEmployee;
    })
}
export default getLogin;