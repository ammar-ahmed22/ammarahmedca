import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: `${process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://ammarahmedca.fly.dev/'}`,
})

const cache = new InMemoryCache()

export const useClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache,
  })
}
