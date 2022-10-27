import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { CookiesProvider } from "react-cookie"
import { faFileDownload, faCircle, faExternalLinkAlt, faSearch, faEnvelope, faHome, faUser, faBriefcase, faFileAlt, faPen, faMouse, faChessPawn } from "@fortawesome/free-solid-svg-icons"
import theme from "./theme"

library.add(fab, faFileDownload, faCircle, faExternalLinkAlt, faSearch, faEnvelope, faHome, faUser, faBriefcase, faFileAlt, faPen, faMouse, faChessPawn)



ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

