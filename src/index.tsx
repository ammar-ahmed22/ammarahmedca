import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";

import theme from "./theme";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element.");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);


reportWebVitals(console.log)

