import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";
export { }
const GETIMAGES = gql`
    query GetImages {
        getImages{
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
const getImages = () => {
    return client.query({
        query: GETIMAGES,
    }).then(res => {

        return res.data.getImages
    }).catch(err => {
        message.info(err.message);
    })
}
export default getImages