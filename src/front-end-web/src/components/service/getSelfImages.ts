import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';
export{}


const GETSELFIMAGES = gql`
    query{
        getSelfImages{
        id
        name
        description
        path
        createdAt
        updatedAt
        }
    }
`

const getSelfImages = () => {
    return client.query({
        query : GETSELFIMAGES,
        fetchPolicy:"no-cache"
    }).then(res => {
        return res.data.getSelfImages;
    }).catch(err => {
        message.error(err.message);
    })
}

export default getSelfImages;