import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useAuthorizedApolloClient } from "./hooks/authorizedApolloClient";
import { useClient } from "./hooks/client";
import Router from "./Router";

const App: React.FC = () => {
  const client = useClient();

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
