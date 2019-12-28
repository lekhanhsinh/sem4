import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const UPDATIMAGE = gql`
    mutation UpdateImage(
        $id:String!,
        $detail:ImageInputType!,
    ){
        updateImage(
            id:$id,
            detail:$detail,
        ){
            
            id
            name
            description
            path
            user{
              id
            }
            createdAt
            updatedAt
          }
        
    }
`
const updateImage = (id: string, detail: any) => {

    return client.mutate({
        mutation: UPDATIMAGE,
        variables: {
            id,
            detail,
        }
    }).then(res => {
        return res.data.updateImage;

    }).catch(err => {
        message.info(err.message);
    })
}
export default updateImage