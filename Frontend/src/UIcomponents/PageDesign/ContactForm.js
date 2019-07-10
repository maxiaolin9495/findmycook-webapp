import React from "react";
import {withRouter} from "react-router-dom";
import {Button, CardTitle, TextField, Card, CardText, FontIcon} from "react-md";


class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            firstName: '',
            message: '',
        }
    }



    validateInputs =()=>{
        if(this.isEmail(this.state.email)) {

        }
        else{
            alert('Please input valid email address')
        }
    }

    isEmail = (email) =>{
        let strEmail = document.getElementById(email).value;
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            document.getElementById('floating-center-email').value = '';
            document.getElementById('floating-center-email').focus();
            return false;
        }
    }

    render(){
        return (<Card className="md-cell md-cell--12 md-text-container" style={{ display: 'flex',
            width: '30%',
            margin: '0 auto',
            marginTop: '10%',
            background: 'white',
            minWidth: '200px'}}>
            <CardTitle title="Contact us" />
            <CardText>
                <Button raised primary onClick={this.sendMail} className="drawers__routing__send-btn">Send Mail!</Button>
                <FontIcon
                    className={cn('drawers__routing__send-icon', {
                        'drawers__routing__send-icon--active': sending,
                    })}
                >
                    send
                </FontIcon>
            </CardText>
        </Card>)
    }
}
export default withRouter(ContactForm);