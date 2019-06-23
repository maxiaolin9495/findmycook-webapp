"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

import {SearchPageView} from "./ViewController/SearchView/SearchPageView.js";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'FindMyCook.com',
            routes: [
                {component: SearchPageView, path: '/', exact: true}

            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </div>
        );
    }
}
