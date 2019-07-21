import React, { PureComponent } from 'react';
import {DialogContainer, Button } from 'react-md';
import { PayPalButton } from "react-paypal-button";
import LoginService from "../../Services/LoginService";
import {withRouter} from "react-router-dom";

class PaymentDialog extends PureComponent {

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
        if(!LoginService.isAuthenticated()) {
            alert('please login first');
            this.props.history.push('/login');
            return;
        }
        this.setState({ visible: true });
    };

    paymentSuccess = (res) =>{
        console.log(res);
        alert('Successful payment')
        this.props.handleSubmit();
    }

    hide = () => {
        this.setState({ visible: false });
    };

    render() {
        console.log('price = '+  this.props.price);
        return (
            <div style = {{marginTop: '10%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Button raised onClick={this.show}>Pay here</Button>
                <DialogContainer
                    id="scrolling-content-dialog"
                    title='Confirm your Booking'
                    visible={this.state.visible}
                    onHide={this.hide}
                    focusOnMount={false}
                    actions={<PayPalButton
                     amount= {this.props.price}
                     currency='EUR'
                     sandboxID='AQmkwXCQvzEjf2jUqdTvG3hb_I9DlgZ0ahbE9cit9Izrvh0Wtz5cFTV_ZpZ4ICBS9tbc1zD94Hzdms7i'
                     onPaymentStart={() => {console.log('payment started')}}
                     onPaymentSuccess={(res) => this.paymentSuccess(res)}
                     onPaymentError={(msg) => {alert('Unsuccessful payment')}}
                     onPaymentCancel={(msg) => {}}
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
export default withRouter(PaymentDialog);