import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${
    process.env.REACT_APP_MOBILE
      ? "http://ammar.local:8080"
      : process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://ammarahmedca.fly.dev/"
  }`
});

const cache = new InMemoryCache();

export const useClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache,
  })
}