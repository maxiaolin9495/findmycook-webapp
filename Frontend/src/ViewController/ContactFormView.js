import React from 'react';
import ContactForm from '../UIcomponents/PageDesign/ContactForm';
import Navigation from "../UIcomponents/PageDesign/Navigation";
import Background from "../Images/Homepage.jpg";
import UserService from "../Services/UserService";

export class ContactFormView extends React.Component {
    validateInputs = (email) => {
        if (this.isEmail(email)) {
            return true;
        }
        else {
            alert('Please input valid email address')
            return false;
        }
    }
    send = (contactForm) => {
        if (!this.validateInputs()) return;
        UserService.contactUs(contactForm.email, contactForm.firstName).then(data => {
            UserService.uploadMessage(contactForm.message, contactForm.email).then(data => {
                alert('send successfully');
                this.props.history.push('/');
            })
        }).catch(e => {
            console.log(e);
        });
    }
    isEmail = () => {
        let strEmail = document.getElementById('floating-center-email').value;
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            document.getElementById('floating-center-email').value = '';
            document.getElementById('floating-center-email').focus();
            return false;
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
        };
    }

    render() {
        return (
            <div>
                <Navigation/>
                <section>
                    <img src={Background} className="bg"/>
                    <ContactForm onSubmit={(contactForm) => this.send(contactForm)} error={this.state.error}/>
                </section>
            </div>
        );
    }
}