import { gql } from "apollo-boost";
import client from './UrlClient';

const GETROLES = gql`
    query {
            getRoles{
              totalCount
              items{
                ... on RoleType{
                  id
                  name
                  permissions
                  description
                }
              }
            }
    }
`
const getRoles = () => {
  return client.query({
    query: GETROLES,
  }).then(res => {
    return res.data.getRoles
  })
}
export default getRoles;