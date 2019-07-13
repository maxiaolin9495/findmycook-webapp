"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {SearchPageView} from "./ViewController/SearchView/SearchPageView";
import {SearchResultView} from "./ViewController/SearchView/SearchResultView";
import {LoginView} from "./ViewController/LoginView";
import {RegisterView} from "./ViewController/RegisterView";
import {AboutUsView} from "./ViewController/AboutUsView";
import {ContactFormView} from "./ViewController/ContactFormView";
import {MyBookingsView} from "./ViewController/MyBookingsView";
import {ChefDetailView} from "./ViewController/SearchView/ChefDetailView";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'FindMyCook.com',
            routes: [
                {component: SearchPageView, path: '/', exact: true},
                {component: SearchResultView, path: '/searchresult', exact: true},
                {component: LoginView, path: '/login', exact: true},
                {component: ChefDetailView, path: '/chef/:id'},
                {component: RegisterView, path: '/register', exact: true},
                {component: AboutUsView, path: '/about-us', exact: true},
                {component: ContactFormView, path: '/contact-us', exact: true},
                {component: MyBookingsView, path: '/my-booking', exact: true},
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
