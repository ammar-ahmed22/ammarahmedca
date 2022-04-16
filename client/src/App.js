import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" exact component={About}/>
                <Route path="/blog" exact component={Blog}/>
                <Route path="/blog/:postName" component={Post}/>
            </Switch>
        </Router>
    )
};

export default App