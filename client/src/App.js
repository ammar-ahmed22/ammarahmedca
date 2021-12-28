import React from "react";
import "./App.css";

import Main from "./pages/Main";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main}/>
            </Switch>
        </Router>
    )
};

export default App