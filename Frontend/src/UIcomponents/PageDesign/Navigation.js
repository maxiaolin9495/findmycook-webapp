"use strict";

import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {FontIcon, ListItem, NavigationDrawer, Button, Avatar, IconSeparator, Autocomplete, TextField} from 'react-md';
import imgURL from '../../Images/fmc.png';
import NavigationMenuStyle from '../../css/Navigation.css';


const Item = ({label, children}) => (
    <IconSeparator style={{fontFamily: 'cursive', fontSize: '25px', fontWeight: 'bold'}} label={label} iconBefore
                   component="li" className="md-cell md-cell--12">
        {children}
    </IconSeparator>
);

const NavLink = ({label, to, exact, icon}) => (
    <Route path={to} exact={exact}>
        {({match}) => {
            let leftIcon;
            if (icon) {
                leftIcon = <FontIcon>{icon}</FontIcon>;
            }

            return (
                <ListItem
                    component={Link}
                    active={!!match}
                    to={to}
                    primaryText={label}
                    leftIcon={leftIcon}
                />
            );
        }}
    </Route>
);

const defaultNavItems = [{
    exact: true,
    label: 'Home',
    to: '/',
    icon: '',
}, {
    label: 'Login',
    to: '/',
    icon: 'how_to_reg',
}, {
    label: 'Register',
    to: '/',
    icon: '',
}];


class NavigationMenu extends React.Component {

    constructor(props) {
        super(props);
        const navMap = {

        }
        this.state = {
            loading: false,
            data: [],
            navItems: defaultNavItems,
            searchValue: [],
            attractions: [],
            titles: [],
        };
    }


    render() {
        return (
            <div className={this.props.className}>
                <NavigationDrawer
                    hidden="true"
                style={NavigationMenuStyle}
            desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
            className="NavigationMenuStyle"
            drawerTitle="Menu"
            toolbarActions={
                    <div class="noneName" id="noneName">
                        <Button id="loginButton" flat primary swapTheming onClick={()=> this.props.history.push('/login')} hidden={this.props.loggedIn?true:false}>Login</Button>
                        <Button id="RegistrationButton" flat primary swapTheming onClick={()=> this.props.history.push('/register')} hidden={this.props.loggedIn?true:false}>Register</Button>
                    </div>
            }
            toolbarTitle={
                <Item label="FindMyCook.com" >
                <Button onClick={() => this.props.history.push('/')}><Avatar src={imgURL} role="presentation"
                                                                             suffix="green-300"/></Button>
                    </Item>

                }
                >

                </NavigationDrawer>

            </div>
        );
    }
};

export default withRouter(NavigationMenu);
