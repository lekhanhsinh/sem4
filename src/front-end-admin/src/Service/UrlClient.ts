import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink, } from "apollo-link-http";
import { setContext } from "apollo-link-context";
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        }
    }
});
const link = createHttpLink({
    uri: "http://api.herebedragon.com:4000/graphql",
    credentials: 'include',
    fetchOptions: {
        credentials: 'include',
    }
});
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
});

export default client;