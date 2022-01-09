import React from "react";
import "./App.css";

import Main from "./pages/Main";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faFileDownload);

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