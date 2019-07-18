"use strict";

import React from 'react';
import {Card, CardTitle, TextField, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon} from 'react-md';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import {UserCalendar} from "../Calendar/UserCalendar";
import BookingService from "../../Services/BookingService";
import UserService from "../../Services/UserService";



class ChefDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    handleBooking = (values) => {
        let token = window.localStorage['jwtTokenFMC'];
        if (!token) {
            alert('Please login first');
            this.props.histroy.push('/login')
        }
        let customer = UserService.getCurrentUser();
        console.log(this.props.chef);
        console.log(customer);
        BookingService.emailNotification(this.props.chef.email, this.props.chef.firstName,
            'New Booking from FindMyCook',
            BookingService.new_booking).then(data =>
            BookingService.createBooking({
                chefEmail: this.props.chef.email,
                customerEmail: customer.email,
                startTime: values.startTime,
                endTime: values.endTime,
                address: customer.address,
                price: this.props.chef.price,
                city: customer.city,
                payment: 'paid',
            }).then(
                data => {
                    this.props.history.push('/my-booking');
                })).catch(e => {
            console.log(e);
        })
    };

    render() {
        setTimeout(() => window.scrollTo(0,0), 150);
        return (
            <div style={{
                marginTop: '5%',
                display: 'flex',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: '70%'
                }}>
                    <div style={{
                        padding: '0 100px',
                    }}>
                        <div style={{}}>
                            <Media style={{borderRadius: '15px', boxShadow: '4px 4px 10px gray'}} aspectRatio="1-1">
                                <img src={this.props.chef.photo} alt="Something from unsplash it"/>
                            </Media></div>
                    </div>
                    <div>
                        <div style={{marginTop: '7%'}}>
                            <h1 style={{
                                fontSize: '50px',
                                fontWeight: 'bolder',
                                fontFamily: 'San Francisco'
                            }}>{this.props.chef.firstName}</h1>
                            <h2 style={{
                                marginTop: '20px'
                            }}>{this.props.chef.foodType}</h2>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                starCount={5}
                                value={this.props.chef.rating}
                            />
                            <div style={{
                                fontSize: '35px',
                                fontFamily: 'San Francisco'
                            }}>€{this.props.chef.price}
                            </div>
                        </div>
                        <div style={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '50px',
                            justifyContent: 'space-between',
                        }}>
                        </div>
                        <div style={{
                            width: '68%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        </div>
                    </div>
                    <div style={{
                        marginLeft: '18%',
                        width: '68%',
                        display: 'flex',
                        marginTop: '80px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <h4 style={{
                            fontSize: '30px',
                            fontWeight: 'bolder',
                            fontFamily: 'San Francisco'
                        }}>Short Bio</h4>
                        <h4 style={{
                            fontSize: '20px',
                            fontFamily: 'San Francisco'
                        }}>{this.props.chef.introduction}</h4>
                    </div>

                </div>
                <UserCalendar price={this.props.chef.price} onSubmit={values => this.handleBooking(values)}/>
            </div>
        );
    }
}

export default withRouter(ChefDetail);
