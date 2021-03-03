import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
    BrouserRouter,
    Switch,
    Route,
    BrowserRouter,
    Link,
} from "react-router-dom";
import ItemEdit from "./components/ItemEdit";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/:id/edit" component={ItemEdit} />
                    <App />
                </Switch>
            </div>
        </BrowserRouter>,

        document.getElementById("root")
    );
}
