import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

import { CookiesProvider } from "react-cookie"

import { faFileDownload, faCircle, faExternalLinkAlt, faSearch, faEnvelope, faHome, faUser, faBriefcase, faFileAlt, faPen, faMouse, faChessPawn } from "@fortawesome/free-solid-svg-icons"

library.add(fab, faFileDownload, faCircle, faExternalLinkAlt, faSearch, faEnvelope, faHome, faUser, faBriefcase, faFileAlt, faPen, faMouse, faChessPawn)


const fonts = {
  body: "Manrope, sans-serif",
  heading: "DM Serif Display, sans-serif",
}

const colors = {
  primaryLight: "#A10010",
  primaryDark: "#9c414a"
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
}

const shadows = {
  outline: "0 0 0 3px rgba(161, 0, 16, 0.6)",
}

const theme = extendTheme({ fonts, config, colors, shadows })
console.log(process.env.REACT_APP_MOBILE)
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_MOBILE ? "http://ammar.local:8080" : process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://api.ammarahmed.ca"}/graphql`
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('grapQLErrors', graphQLErrors);
    console.log('networkError', networkError)
  }
})


ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client} > */}
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
      </ChakraProvider>
    </CookiesProvider>
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

