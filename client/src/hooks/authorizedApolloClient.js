import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { useAuthToken } from "./authToken";

const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_MOBILE ? "http://ammar.local:8080" : process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://api.ammarahmed.ca"}/graphql`
})

const authMiddleware = authToken => {

    const authorization = token => {
        return `Bearer ${token}`
    }

    return new ApolloLink((operation, forward) => {
        if (authToken){
            operation.setContext({
                headers: {
                    Authorization: authorization(authToken)
                }
            })
        }

        return forward(operation);
    })
}

const cache = new InMemoryCache();

export const useAuthorizedApolloClient = () => {
    const [authToken] = useAuthToken();

    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink),
        cache
    })
}

