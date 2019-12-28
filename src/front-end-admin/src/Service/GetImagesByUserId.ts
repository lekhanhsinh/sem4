import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";
export { }
const GETIMAGESBYUSERID = gql`
    query GetImagesByUserId($userId:String!) {
        getImagesbyUserId(userId:$userId){
            id
    name
    description
    path
    user{
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
    createdAt
    updatedAt
          }
    }
`
const getImagesbyUserId = (userId: string) => {
    return client.query({
        query: GETIMAGESBYUSERID,
        variables: { userId }
    }).then(res => {

        return res.data.getImagesbyUserId
    }).catch(err => {
        message.info(err.message);
    })
}
export default getImagesbyUserId