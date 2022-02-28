import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" exact component={About}/>
            </Switch>
        </Router>
    )
};

export default App