import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";
const CREATEEMPLOYEE = gql`
    mutation CreateEmployee(
            $email:String!,
            $password:String!,
            $repeatPassword:String!,
            $detail:EmployeeDetailInputType!
        ){
            createEmployee(
                    email:$email,
                    password:$password,
                    repeatPassword:$repeatPassword,
                    detail:$detail
                    ){
                        name
                        role
                      }
        }
`;
const createEmployee = (email: string, password: string, repeatPassword: string, detail: any = {}) => {
  return client.mutate({
    mutation: CREATEEMPLOYEE,
    variables: {
      email,
      password,
      repeatPassword,
      detail
    }
  }).then(res => {
    return res.data.createEmployee;
  })
}
export default createEmployee;