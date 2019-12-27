import { gql } from 'apollo-boost';
import client from './UrlClient';

const UPDATESELFPASSWORD = gql`    
mutation UpdateSelfPassword(
      $password:String!,
      $newPassword:String!,
      $repeatPassword:String!
    ){
    updateSelfPassword(
      password : $password,
      newPassword : $newPassword,
      repeatPassword : $repeatPassword
    ) {
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

const updateSelfPassword = (password: string, newPassword: string, repeatPassword: string) => {
    return client.mutate({
        mutation: UPDATESELFPASSWORD,
        variables: {
            password,
            newPassword,
            repeatPassword
        },
    }).then(res => {
        return res.data.updateSelfPassword;
    })
}

export default updateSelfPassword;