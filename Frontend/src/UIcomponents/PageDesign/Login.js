import React from 'react';
import {TextField, Button, Card} from 'react-md';
import {withRouter} from "react-router-dom";


const FloatingLabels = () => (
    <div className="md-grid">
    </div>
);

function isEmail(strEmail){
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    } else {
        document.getElementById('floating-center-email').innerText = "Please input valid Email Address";
        document.getElementById('floating-center-email').focus();
        return false;
    }
}

class LoginTab extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Card className="md-grid" id="loginTable" label="Login">
                <TextField
                    id="floating-center-email"
                    label="Email"
                    required
                    lineDirection="center"
                    placeholder="Please input your emailAddress"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="floating-password"
                    label="Please Input your password"
                    required
                    type="password"
                    rows={2}
                    className="md-cell md-cell--bottom"
                />
                <Button flat primary swapTheming onClick={this.handleClick}>Login</Button>
            </Card>
        )
    }
    isEmail(strEmail) {
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            document.getElementById('floating-center-email').innerText = "Please input valid Email Address";
            document.getElementById('floating-center-email').focus();
            return false;
        }
    }
    handleClick(){
        let emailAddress = document.getElementById(floating-center-email).value;
        let password = document.getElementById(floating-password).value;
        if(isEmail(emailAddress)){
            this.props.history.push(`/login?email=${emailAddress}&password=${password}`)
        }
    }

}

export default withRouter(LoginTab)