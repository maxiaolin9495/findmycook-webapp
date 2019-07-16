import {Component} from "react";
import {Button, Card, Toolbar} from "react-md/es";
import {withRouter} from "react-router-dom";
import React from "react";
import BookingService from "../../Services/BookingService";
import Dialog from "../Dialog";
import UserService from "../../Services/UserService";

class BookingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.id,
            customerFirstName: '',
            chefFirstName: '',
            loading: false,
            name: '',
            date: '',
            photo: '',
        }
    }

    ifFinished = () => {
        if (status === 'canceled' || status === 'closed') return true;
        else return false;
    }

    ifCanceled = () => {
        if (this.props.status === 'canceled') return true;
        else return false;
    }

    ifNeedConfirmation = () => {
        if (this.props.status === 'inProgress') return true;
        else return false;
    }


    componentWillMount() {
        this.setState({
            loading: true
        });
        BookingService.getCustomerName(this.props.customerEmail).then((data) => {
            this.setState({
                name: data.firstName + ' ' + data.lastName,
                customerFirstName: data.firstName,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        BookingService.getChefNameAndImg(this.props.chefEmail).then((data) => {
            this.setState({
                name: data.firstName + ' ' + data.lastName,
                chefFirstName: data.firstName,
                photo: data.photo,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        this.setState({date: this.getDate()});
    }

    getDate = () => {
        let startTime = new Date(parseInt(this.props.startTime));
        let endTime = new Date(parseInt(this.props.endTime));
        return startTime.toDateString() + '\n' + startTime.toTimeString().split('GMT')[0] + '- ' + endTime.toTimeString().split(' GMT')[0];
    }

    cancelBooking = () => {
        if(this.props.userType === 'Customer') {
            BookingService.emailNotification(this.props.chefEmail, this.state.chefFirstName,
                'Booking Canceled',
                BookingService.cancel_booking + 'Your Customer ' + this.state.customerFirstName + '.').then(data => {
                BookingService.cancelBooking(this.props.id, this.props.userType, 'canceled').then(
                    data => {
                        alert('Successfully canceled');
                        window.location.reload();
                    }
                )
            }).catch(e => {
                console.log(e)
            })
        }else {
            BookingService.emailNotification(this.props.customerEmail, this.state.customerFirstName,
                'Booking Canceled',
                BookingService.cancel_booking + 'Chef ' + this.state.chefFirstName + '.').then(data => {
                BookingService.cancelBooking(this.props.id, this.props.userType, 'canceled').then(
                    data => {
                        alert('Successfully canceled');
                        window.location.reload();
                    }
                )
            }).catch(e => {
                console.log(e);
            })
        }
    }

    confirmBooking = () => {
        console.log(this.state);
        BookingService.emailNotification(this.props.customerEmail, this.state.customerFirstName,
            'Booking Confirmed',
            BookingService.confirm_booking + this.state.chefFirstName + '.').then(data =>
            BookingService.confirmBooking(this.props.id, this.props.userType, 'confirmed').then(
                data => {
                    alert('Successfully confirmed');
                    window.location.reload();
                })).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <Card style={{
                marginTop: '10px',
                marginLeft: '5%',
                width: '70%',
                paddingBottom: '1%',
                paddingLeft: '1%',
                background: 'white',
                justifyContent: 'space-between',
            }}>
                <Toolbar style={{width: '100%', paddingBottom: '10px',}}
                         actions={<Button flat style={{
                             border: '2px yellow',
                             fontSize: '20px',
                             color: 'white',
                             background: this.ifCanceled() ? 'red' : this.ifNeedConfirmation() ? 'lightBlue' : 'green',
                             paddingBottom: '15px'
                         }}>{this.props.status === 'inProgress' ? 'Need Confirmation' : this.props.status}</Button>}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{width: '20%'}}>
                        {this.props.userType === 'Customer' ?
                            <img src={this.state.photo} alt="presentation" style={{
                                maxWidth: '80%', maxHeight: '100%',
                                objectFit: 'cover'
                            }}/> : ''
                        }
                    </div>
                    <div style={{
                        width: '45%',
                        background: 'white',
                    }}>
                        <h1 style={{
                            fontWeight: 'bolder',
                            fontFamily: 'Lucida Bright'
                        }}>{this.state.name}</h1>
                        <div style={{
                            marginTop: '10px',
                            color: 'grey'
                        }}
                        >{this.props.city}</div>
                        <div style={{
                            marginTop: '10px',
                            color: 'grey'
                        }}
                        >{this.props.address}</div>
                        <h2 style={{
                            fontWeight: 'bolder',
                            fontFamily: 'Lucida Bright',
                            width: '90%',
                            marginTop: '40px'
                        }}>{this.getDate()}</h2>
                    </div>
                    <div style={{width: '20%', marginLeft: '15%'}}>
                        <div style={{
                            color: 'green',
                            marginTop: '30%',
                            matginLeft: '15%',
                            marginRight: '50px',
                            fontSize: '40px',
                        }}>€{this.props.price}</div>
                        {
                            this.ifFinished() ? '' : this.ifCanceled() ? '' :
                                <Dialog actionName='cancel' onClick={() => this.cancelBooking()}/>
                        }
                        {this.props.userType === 'Customer' ? ''
                            : this.ifNeedConfirmation() ?
                                <Dialog actionName='confirm' onClick={() => this.confirmBooking()}/> : ''}

                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(BookingCard);