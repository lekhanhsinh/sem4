import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';

const DELETEIAMGE = gql`
    mutation DeleteImage($id:String!) {
        deleteImage(id:$id)
    }
`;
const deleteImage = (id : string) => {
    return client
        .mutate({
            mutation: DELETEIAMGE,
            variables: { id }
        })
        .then(res => {
            return res.data.deleteImage;
        }).catch(err => {
            message.error(err.message);
        })
}
export default deleteImage;


