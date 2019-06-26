import React from 'react';
import {withRouter} from "react-router-dom";
import {Button, TextField, SelectionControlGroup, Card}  from 'react-md';
import Languages from '../../UIcomponents/PageDesign/Languages.js';
function isEmail(email){
    let strEmail = document.getElementById(email).value;
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    } else {
        document.getElementById('floating-center-email').innerText = "Please input valid Email Address";
        document.getElementById('floating-center-email').focus();
        return false;
    }
}
function handleUserType(){
    let type =document.getElementById('selection-user-type-radios').value;
    if (type.toString().localeCompare('1') == 0){
        document.getElementById('language-List').hidden = true;
    } else{
        document.getElementById('language-List').hidden = false;
    }
    return
}

class RegisterTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Card className="md-grid" id="registrationTable" label="Login">
                <SelectionControlGroup
                    id="selection-user-type-radios"
                    name="customer-type"
                    type="radio"
                    label="Please choose your user type"
                    defaultValue='1'
                    onclick={handleUserType}
                    controls={[{
                        label: 'As a customer',
                        value: '1',
                    }, {
                        label: 'As a chef',
                        value: '2',
                    }]}
                />
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
                <TextField
                    id="floating-center-firstName"
                    label="firstname"
                    required
                    rows={3}
                    lineDirection="center"
                    placeholder="Please input your firstname"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="floating-center-lastName"
                    label="lastName"
                    required
                    rows={4}
                    lineDirection="center"
                    placeholder="Please input your lastname"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="floating-center-phoneNumber"
                    label="phonenumber"
                    required
                    rows={5}
                    lineDirection="center"
                    placeholder="Please input your common used phonenumber"
                    className="md-cell md-cell--bottom"
                />
                <Languages/>
                <Button flat primary swapTheming onClick={this.handleClick}>Register</Button>
            </Card>
        )
    }

    handleClick() {
        let emailAddress = document.getElementById('floating-center-email').value;
        let password = document.getElementById('floating-password').value;
        let phoneNumber = document.getElementById('phoneNumber').value;
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let type = document.getElementById('selection-user-type-radios').value;

        if (isEmail(emailAddress) && password.toString().length >= 6) {
            if (type.toString().localeCompare('2') == 0) {
                let languages = '';
                this.props.history.push(`/registerChef?email=${emailAddress}&password=${password}&phoneNumber=${phoneNumber}&firstName=${firstName}&lastName=${lastName}
            &languages=${languages}`)
            }
            else {
                this.props.history.push(`/registerCustomer?email=${emailAddress}&password=${password}&phoneNumber=${phoneNumber}&firstName=${firstName}&lastName=${lastName}`)
            }
        }

    }
}

export default withRouter(RegisterTab);