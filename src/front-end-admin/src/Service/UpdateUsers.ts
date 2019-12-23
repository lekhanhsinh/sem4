import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const UPDATEUSER = gql`
    mutation UpdateUser(
        $id:String!,
        $detail:UserDetailInputType!,
    ){
        updateUser(
            id:$id,
            detail:$detail,
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
`
const updateUser = (id: string, detail: any) => {
    console.log(id);

    return client.mutate({
        mutation: UPDATEUSER,
        variables: {
            id,
            detail,
        }
    }).then(res => {
        return console.log(res.data.updateUser);

    }).catch(err => {
        message.info(err.message);
    })
}
export default updateUser