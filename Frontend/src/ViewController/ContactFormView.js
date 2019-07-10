import React from 'react';
import ContactForm from '../UIcomponents/PageDesign/ContactForm';

export class ContactFormView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
        };
    }
    render() {
        return (
            <ContactForm/>
        );
    }
}