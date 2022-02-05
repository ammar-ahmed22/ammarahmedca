import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faFileDownload } from "@fortawesome/free-solid-svg-icons"

library.add(fab, faFileDownload)

const fonts = {
  body: "Manrope, sans-serif",
  heading: "DM Serif Display, sans-serif",
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
}

const theme = extendTheme({ fonts, config })


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

