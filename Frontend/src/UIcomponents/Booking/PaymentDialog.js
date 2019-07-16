import React, { PureComponent } from 'react';
import {DialogContainer, Button } from 'react-md';
import { PayPalButton } from "react-paypal-button";

export default class PaymentDialog extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            title: true,
            footer: true,
            height: null,
            width: null,
            visible: false,

        };
    }

    show = () => {
        this.setState({ visible: true });
    };

    paymentSuccess = (res) =>{
        console.log(res);
        this.props.handleSubmit();
    }
    hide = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div style = {{marginTop: '10%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Button raised onClick={this.show}>book</Button>
                <DialogContainer
                    id="scrolling-content-dialog"
                    title='Confirm your Booking'
                    visible={this.state.visible}
                    onHide={this.hide}
                    focusOnMount={false}
                    actions={<PayPalButton
                     amount= {this.props.price}
                     currency='EUR'
                     sandboxID='ATU8nlBxIDUt7zr508CjRDWmHkM3kUqjDyMJufdwFhS-4ob5qrEMYtIsz43fcz27Eatcj96DG_w71XB7'
                     onPaymentStart={() => console.log('payment started')}
                     onPaymentSuccess={(res) => this.paymentSuccess(res)}
                     onPaymentError={(msg) => {alert('Unsuccessful payment');window.location.reload()}}
                     onPaymentCancel={(msg) => {window.location.reload()}}
                     env='sandbox'/>}
                >
                    <p>
                        Please choose a payment method.
                    </p>
                </DialogContainer>
            </div>
        )
    }
}