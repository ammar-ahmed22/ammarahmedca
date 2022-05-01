import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Chess from "./pages/Chess";
import ChessRouter from "./components/Chess/Routers/ChessRouter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SecureRouter from "./components/Chess/Routers/SecureRouter";
import { ApolloProvider } from "@apollo/client"
import { useAuthorizedApolloClient } from "./hooks/authorizedApolloClient";


  


const App = () => {

    const client = useAuthorizedApolloClient();

    return (
        <ApolloProvider client={client} >
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/blog" exact component={Blog}/>
                    <Route path="/blog/:postName" component={Post}/>
                    <Route path="/chess" component={ChessRouter}/>
                    {/* <Route path="/chess/:option" component={ChessRouter}/> */}
                    {/* <Route path="/chess/secure" component={SecureRouter} exact></Route> */}
                </Switch>
                {/* <Switch>
                    <SecureProvider>
                        
                    </SecureProvider>
                </Switch> */}
            </Router>
        </ApolloProvider>
    )
};

export default App