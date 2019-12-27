import { gql } from "apollo-boost";
import client from './UrlClient';
import { message } from "antd";


const UPDATESELFDETAIL = gql`
mutation UpdateSelfDetail($detail:UserDetailInputType!) {
    updateSelfDetail(detail:$detail){
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
  }
`

const updateSelfDetail = (detail: {
    name: string
    gender: string
    address: string
    phoneNumber: string
    dateOfBirth: Date
}) => {
    return client.mutate({
        mutation: UPDATESELFDETAIL,
        variables: {detail}
    }).then(res => {
        return res.data.updateSelfDetail
    }).catch(err => {
        message.error(err.message)
    })
}

export default updateSelfDetail;