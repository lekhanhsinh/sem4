import { gql } from "apollo-boost";
import client from './UrlClient';


const GETREGISTER = gql`
    mutation Register(
            $email:String!,
            $password:String!,
            $repeatPassword:String!,
            $detail:UserDetailInputType!
        ){
            register(
                    email:$email,
                    password:$password,
                    repeatPassword:$repeatPassword,
                    detail:$detail
                    ){
                        id
                        email
                        name
                        dateOfBirth
                        gender
                        address
                        phoneNumber
                      }
        }
`;
const getRegister = (email: string, password: string, repeatPassword: string, detail: any = {}) => {
  return client.mutate({
    mutation: GETREGISTER,
    variables: {
      email,
      password,
      detail,
      repeatPassword,
    },
  }).then(res => {
    return res.data.register;
  })

}
export default getRegister;