"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

import {SearchPageView} from "./ViewController/SearchView/SearchPageView.js";
import {SearchResultView} from "./ViewController/SearchView/SearchResultView.js";
import {LoginView} from "./ViewController/SearchView/LoginView.js";
import {RegisterView} from "./ViewController/SearchView/RegisterView.js";
import {CalendarView} from './ViewController/CalendarView/CalendarView.js';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'FindMyCook.com',
            routes: [
                {component: SearchPageView, path: '/', exact: true},
                {component: SearchResultView, path: '/searchresult', exact: true},
                {component: LoginView, path: '/login', exact: true},
                {component: RegisterView, path: '/register', exact: true},
                {component: CalendarView, path: '/userCalendar', exact: true}
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
