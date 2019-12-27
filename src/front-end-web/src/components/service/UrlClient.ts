import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        }
    }
});
const link = createUploadLink({
    uri: "http://api.herebedragon.com:4000/graphql",
    credentials: 'include'
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
});

export default client;