import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Chess from "./pages/Chess";
import ChessRouter from "./components/Chess/Routers/ChessRouter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SecureProvider } from "./components/Chess/Context/SecureContext";
import PlayRouter from "./components/Chess/Routers/PlayRouter";



const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" exact component={About}/>
                <Route path="/blog" exact component={Blog}/>
                <Route path="/blog/:postName" component={Post}/>
                <Route path="/chess" component={ChessRouter}/>
                {/* <Route path="/chess/:option" component={ChessRouter}/> */}
            </Switch>
            <Switch>
                <SecureProvider>
                    <Route path="/chess/play" component={PlayRouter}></Route>
                </SecureProvider>
            </Switch>
        </Router>
    )
};

export default App