import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faFileDownload, faCircle, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

library.add(fab, faFileDownload, faCircle, faExternalLinkAlt)

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

const theme = extendTheme({ fonts, config, colors })

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink])
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

