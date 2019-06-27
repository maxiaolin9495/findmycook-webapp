import React from 'react';
import {TextField, Button, Card, CardTitle} from 'react-md';
import {withRouter} from "react-router-dom";
import AlertMessage from './AlertMessage'

class LoginTab extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
        }
    }
    render() {
        return (
            <div className="md-grid" id="LoginTable" label=""  style={{
                display: 'flex',
                width: '25%',
                margin: '0 auto',
                marginTop: '10%',
                background: 'white',
            }}>
                <form className="md-grid" onSubmit={this.handleSubmit}>
                <CardTitle title="Login" id='LoginTitle' style={{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}/>
                <TextField
                    id="floating-center-email"
                    label="Email"
                    required
                    lineDirection="center"
                    placeholder="Please input your emailAddress"
                    style={{marginTop: '10px'}}
                    onChange={value => this.handleChange('email', value)}
                />
                <TextField
                    id="floating-password"
                    label="Password"
                    required
                    type="password"
                    style={{marginTop: '10px'}}
                    onChange={value => this.handleChange('password', value)}
                />
                <Button id="submit" type="submit"
                        flat primary swapTheming onClick={this.onClick}
                        style={{
                            marginTop: '10%',
                            marginLeft: 'auto',
                        marginRight: 'auto'}}>Login</Button>
                </form>
            </div>
        )
    }

    handleChange=(key, val) =>{
        this.setState({
            [key]: val
        })
    }


    handleSubmit =(event) =>{
        event.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.onSubmit(user);
    }
}

export default withRouter(LoginTab)