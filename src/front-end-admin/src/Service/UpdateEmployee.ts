import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const UPDATEEMPLOYEE = gql`
    mutation UpdateEmployee(
        $id:String!,
        $detail:EmployeeDetailInputType!,
    ){
        updateEmployee(
            id:$id,
            detail:$detail,
        ){
            id
            email
            name
            role
        }
    }
`
const updateEmployee = (id: string, detail: any) => {
    console.log(id);

    return client.mutate({
        mutation: UPDATEEMPLOYEE,
        variables: {
            id,
            detail,
        }
    }).then(res => {
        return console.log(res.data.updateEmployee);

    }).catch(err => {
        message.info(err.message);
    })
}
export default updateEmployee