import React from "react";
import {withRouter} from "react-router-dom";
import {Button, CardTitle, TextField} from "react-md";

const defaultBody = 'Please input your issue here.';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            firstName: '',
            message: '',
            defaultBody: defaultBody
        }
    }


    render(){
        return (
            <div className="md-grid" id="ContactTable" label=""  style={{
            display: 'flex',
            width: '30%',
            margin: '0 auto',
            marginTop: '10%',
            background: 'white',
            minWidth: '200px'
        }}>
            <form className="md-grid" onSubmit={this.handleSubmit}>
                <CardTitle title="Contact Form" id='ContactTitle' style={{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}/>
                <TextField
                    id="floating-center-email"
                    label="Email"
                    required
                    lineDirection="center"
                    placeholder="Please input your email Address"
                    style={{marginTop: '10px', marginLeft: '20px', marginRight: '20px'}}
                    onChange={value => this.handleChange('email', value)}
                />
                <TextField
                    id="floating-center-firstName"
                    label="Name"
                    required
                    lineDirection="center"
                    placeholder="Please input your name"
                    style={{marginTop: '10px', marginLeft: '20px', marginRight: '20px'}}
                    onChange={value => this.handleChange('firstName', value)}
                />
                <TextField
                    id="message"
                    placeholder="Body"
                    block
                    rows={4}
                    paddedBlock
                    style={{marginTop: '20px', marginLeft: '10px', marginRight: '10px'}}
                    maxLength={1000}
                    placeholder={this.state.defaultBody}
                    errorText="Max 1000 characters."
                    onChange={value => this.handleChange('message', value)}
                />
                <Button id="submit" type="submit"
                        flat primary swapTheming
                        style={{
                            marginTop: '10%',
                            marginLeft: 'auto',
                            marginRight: 'auto'}}>Send</Button>
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
        if(this.state.message === ''){
            alert('Please input your message')
            return;
        }
        event.preventDefault();
        let contactForm = {
            email: this.state.email,
            message: this.state.message,
            firstName: this.state.firstName,
        };
        this.props.onSubmit(contactForm);
    }
}
export default withRouter(ContactForm);