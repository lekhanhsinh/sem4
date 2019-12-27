import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from 'antd';


const CREATEIMAGE = gql`
mutation CreateImage($detail:ImageInputType!){
  createImage(detail:$detail) {
    name
    description
    path
    createdAt
    updatedAt
  }
}`

const createImage = (detail: { name: string, description: string, file: File }) => {
  return client
    .mutate({
      mutation: CREATEIMAGE,
      variables: { detail }
    })
    .then(res => {
      return res.data.createImage;
    }).catch(err => {
      message.error(err.message);
  })
}
export default createImage;