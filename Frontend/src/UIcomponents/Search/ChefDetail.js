"use strict";

import React from 'react';
import {Card, CardTitle, TextField, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon} from 'react-md';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import {UserCalendar} from "../Calendar/UserCalendar";
import UserCalendarService from '../../Services/UserCalendarService';
import BookingService from "../../Services/BookingService";
import UserService from "../../Services/UserService";
import Background from '../../Images/Homepage.jpg';

class ChefDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userCalendarBookings: []
        }
    }

    createBooking = (values) => {
        console.log('create Booking')
        let customer = UserService.getCurrentUser();
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
    addReview(){
        this.props.history.push(`/review/${this.props.chef._id}`)
    }

    componentWillMount(){
        UserCalendarService.getBookings().then((userCalendarBookings) => {
            this.setState({userCalendarBookings: [...userCalendarBookings].filter(userCalendarBooking => userCalendarBooking.chefName === this.props.chef.firstName + '' + this.props.chef.lastName)});
        }).catch((e) => {
            console.error(e);
        });
    }
    render() {
        //console.log(`Current user bookings for chef: ${this.props.chef.firstName}`)
        //console.log(this.state.userCalendarBookings)
        setTimeout(() => window.scrollTo(0,0), 150);
        return (
            <div className="md-grid" id="chefDetailBox" label="ChefDetail" style={{
                display: 'flex',
                maxWidth: '90%',
                marginTop: '2%',
                position:'relative',
                background: 'rgb(255,255,255,0.8)'
                }}>
            <div style={{
                marginTop: '5%',
                display: 'flex',
            }}>
                <img src={Background} className="bg"/>
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
                            <h2 style = {{marginBottom:'8%'}}>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                starCount={5}
                                value={this.props.averageOverallRating}
                            />
                            </h2>
                            <div>
                            <Button style={{
                                height: '30px',
                                marginTop:'-10%',
                                marginLeft: '-1%',
                                marginBottom:'3%',
                                fontSize: '20px',
                                background: 'clear'
                            }} onClick={() => this.addReview()}>{this.props.reviewsAmount} review(s)</Button>
                            </div>
                            
                            <Button flat style={{
                                height: '30px',
                                fontSize: '10px',
                                background: 'blue',
                                color: 'white',
                                marginLeft: '-2%'
                            }} onClick={() => this.addReview()}>add review</Button>

                            <div style={{
                                fontSize: '35px',
                                fontFamily: 'San Francisco',
                                marginTop: '10%'
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
                
                </div>

                <div style={{width: '100%', minWidth: '100%', marginTop: '5%'}}>
                <UserCalendar chef = {this.props.chef} userCalendarBookings = {this.state.userCalendarBookings} onSubmit={(userCalendarBooking) => this.createBooking(userCalendarBooking)} />
                </div>
                
            </div>
        );
    }
}

export default withRouter(ChefDetail);
