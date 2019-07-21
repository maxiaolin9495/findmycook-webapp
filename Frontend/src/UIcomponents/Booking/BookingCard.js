import {Component} from "react";
import {Button, Card, Toolbar} from "react-md/es";
import {withRouter} from "react-router-dom";
import React from "react";
import BookingService from "../../Services/BookingService";
import Dialog from "../Dialog";
import ChefService from "../../Services/ChefService";

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
            reviewId: '',
            status: this.props.status,
        }
    }

    ifFinished = () => {
        if (this.state.status  === 'closed' || this.state.status ==='reviewed') return true;
        else return false;
    }

    ifCanceled = () => {
        if (this.state.status === 'canceled') return true;
        else return false;
    }

    ifNeedConfirmation = () => {
        if (this.state.status === 'inProgress') return true;
        else return false;
    }

    ifReviewed = () => {
        if (this.state.status === 'reviewed') return true;
        else return false;
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        this.verifyDate();
        BookingService.getCustomerName(this.props.customerEmail).then((data) => {
            if(this.props.userType === 'Chef')
            this.setState({
                name: data.firstName + ' ' + data.lastName,
                customerFirstName: data.firstName,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        BookingService.getChefNameAndImg(this.props.chefEmail).then((data) => {
            if(this.props.userType === 'Customer')
            this.setState({
                name: data.firstName + ' ' + data.lastName,
                chefFirstName: data.firstName,
                photo: data.photo,
                city: data.city,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        ChefService.getChefBySearch(this.state.chefFirstName).then((chef) => {
            this.setState({
                reviewId: [...chef].filter(chef => chef.firstName === this.state.chefFirstName),
            });
        }).catch((e) => {
            console.error(e);
        });
        this.setState({date: this.getDate()});
    }

    getDate = () => {
        let startTime = new Date(parseInt(this.props.startTime));
        let endTime = new Date(parseInt(this.props.endTime));
        return startTime.toDateString();
    }

    getTimeSlot = () => {
        let startTime = new Date(parseInt(this.props.startTime));
        let endTime = new Date(parseInt(this.props.endTime));
        return startTime.getHours() + ':00' + '- ' + endTime.getHours() + ':00'
    }

    addReview(){
        this.setState({status: 'reviewed'})
        BookingService.reviewBooking(this.props.id, 'reviewed').then(
            data => {
                this.props.history.push(`/review/${this.state.reviewId[0]._id}`)
            }
        ).catch(e => {
            console.log(e);
        })
        
    }

    verifyDate = () => {
        let now = new Date();
        let bookingTime = new Date(parseInt(this.props.endTime));
        if (this.state.status === 'confirmed') {
            if (now.getFullYear() >= bookingTime.getFullYear()) {
                if (now.getMonth() === bookingTime.getMonth()) {
                    if (now.getDate() > bookingTime.getDate()) {
                        this.closeBooking();
                    }
                } else if (now.getMonth() > bookingTime.getMonth()) {
                    this.closeBooking();
                }
            }
        } else if (this.state.status === 'inProgress') {
            if (now.getFullYear() >= bookingTime.getFullYear()) {
                if (now.getMonth() === bookingTime.getMonth()) {
                    if (now.getDate() > bookingTime.getDate()) {
                        this.cancelBooking(true);
                    }
                } else if (now.getMonth() > bookingTime.getMonth()) {
                    this.cancelBooking(true);
                }
            }
        }
    }

    cancelBooking = (automatically) => {
        if (this.props.userType === 'Customer') {
            BookingService.emailNotification(this.props.chefEmail, this.state.chefFirstName,
                'Booking Canceled',
                BookingService.cancel_booking + 'Your Customer ' + this.state.customerFirstName + '.').then(data => {
                BookingService.cancelBooking(this.props.id, this.props.userType, 'canceled').then(
                    data => {
                        if(!automatically) {
                            alert('Successfully canceled');
                        }
                        window.location.reload();
                    }
                )
            }).catch(e => {
                console.log(e)
            })
        } else {
            BookingService.emailNotification(this.props.customerEmail, this.state.customerFirstName,
                'Booking Canceled',
                BookingService.cancel_booking + 'Chef ' + this.state.chefFirstName + '.').then(data => {
                BookingService.cancelBooking(this.props.id, this.props.userType, 'canceled').then(
                    data => {
                        if(!automatically) {
                            alert('Successfully canceled');
                        }
                        window.location.reload();
                    }
                )
            }).catch(e => {
                console.log(e);
            })
        }
        if (automatically) {
            BookingService.cancelBooking(this.props.id, this.props.userType, 'canceled').then(
                data => {
                    alert('Successfully canceled');
                    window.location.reload();
                }
            ).catch(e => {
                console.log(e);
            })
        }
    }

    closeBooking = () => {
        BookingService.closeBooking(this.props.id, 'closed').then(data => {
           this.state.status = 'closed';
           console.log(this.status);
        }).catch(e => {
            console.log(e)
        });
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
                             fontSize: 'block',
                             color: 'white',
                             background: this.ifCanceled() ? 'red' : this.ifNeedConfirmation() ? 'lightBlue' : this.ifReviewed()? 'purple': 'green',
                             paddingBottom: '15px'
                         }}>{this.state.status === 'inProgress' ? 'Need Confirmation' : this.state.status}</Button>}
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
                        >{this.props.city + '  ' + this.props.address}</div>

                        <h5 style={{
                            fontWeight: 'bolder',
                            fontFamily: 'Lucida Bright',
                            width: '90%',
                            marginTop: '30px'
                        }}>{this.getDate()} <br/> {this.getTimeSlot()}</h5>
                    </div>
                    <div style={{width: '100%'}}>
                    <div style={{width: '100%', marginLeft: '85%'}}>
                        {
                            this.ifFinished() ? '' : this.ifCanceled() ? '' :
                                <Dialog actionName='cancel' onClick={() => this.cancelBooking(false)}/>
                        }
                        {this.props.userType === 'Customer' ? ''
                            : this.ifNeedConfirmation() ?
                                <Dialog actionName='confirm' onClick={() => this.confirmBooking()}/> : ''}

                    </div>
                    <div style={{
                            color: 'green',
                            marginTop: '10%',
                            marginLeft: '85%',
                            marginRight: '40px',
                            fontSize: '40px',
                        }}>€{this.props.price}</div>
                </div>
                </div>
                <div>
                    {
                        this.props.userType === 'Customer' && this.ifFinished() && !this.ifReviewed()?
                        <Button style = {{color: 'white', background: 'grey'}} raised primary onClick={() => this.addReview()}add review> add review</Button>
                        : ''
                    }
                    </div>
            </Card>
        );
    }
}

export default withRouter(BookingCard);