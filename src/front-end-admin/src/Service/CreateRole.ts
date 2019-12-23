import { gql } from "apollo-boost";
import client from './UrlClient';

const CREATEROLE = gql`
mutation CreateRole ($name:String!,
    $detail:RoleDetailInputType!){
    createRole(
        name:$name,
        detail:$detail
    ){
        id
        name
        description
        permissions
        createdAt
        updatedAt
    }
}
`;
const createRole = (name:string,detail:{}) => {
   return client.mutate({
        mutation: CREATEROLE,
        variables: {
            name: name,
            detail: {detail}
        }
    }).then(res => {
       return res.data.createRole
    })
}
export default createRole;