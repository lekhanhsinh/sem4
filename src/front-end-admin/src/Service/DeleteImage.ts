import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";

const DELETEIMAGE = gql`
    mutation DeleteImage($id:String!){
        deleteImage(id:$id)
    }
`
const deleteImage = (id: string) => {
    return client.mutate({
        mutation: DELETEIMAGE,
        variables: { id }
    }
    ).then(res => {
        return res.data.deleteImage
    }).catch(err => {
        message.info(err.message)
    })
}
export default deleteImage